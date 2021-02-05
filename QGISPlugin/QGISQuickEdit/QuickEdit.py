# -*- coding: utf-8 -*-
"""
/***************************************************************************
 Quick Editing Attribute
                                 A QGIS plugin
 tool for quick editing attributes in field campaigns
                             -------------------
        begin                : 2019-02-19
        copyright            : (C) 2019 by haris
        email                :
        git sha              : $Format:%H$
 ***************************************************************************/

/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 ***************************************************************************/
"""

import os
from PyQt5 import QtGui, QtWidgets
from PyQt5.QtWidgets import QMessageBox
from qgis.PyQt.QtCore import QSettings, QLocale, QTranslator, QCoreApplication, Qt, QVariant
from qgis.core import *
from qgis.gui import *
from .QuickEditMapTool import QuickEditMapTool
from .TreeTypeDialogEx import TreeTypeDialogEx
from .DiameterDialog import DiameterDialog
from .TreeAttributeDialog import TreeAttributeDialog

class QuickEdit:
    def __init__(self, iface):
        """Constructor.

        :param iface: An interface instance that will be passed to this class
            which provides the hook by which you can manipulate the QGIS
            application at run time.
        :type iface: QgsInterface
        """

        self.iface = iface

        try:
            self.qgis_version = Qgis.QGIS_VERSION_INT
        except NameError:
            self.qgis_version = QGis.QGIS_VERSION_INT

        # we store geometry type
        self.Point, self.Line, self.Polygon = (
                [QgsWkbTypes.PointGeometry, QgsWkbTypes.LineGeometry, QgsWkbTypes.PolygonGeometry]
                if self.qgis_version >= 29900 else
                [QGis.Point, QGis.Line, QGis.Polygon])

        if QSettings().value('locale/overrideFlag', type=bool):
            locale = QSettings().value('locale/userLocale')
        else:
            locale = QLocale.system().name()

        if locale:
            locale_path = os.path.join(os.path.dirname(__file__), 'i18n', locale)
            self.translator = QTranslator()

            if self.translator.load(locale_path):
                QCoreApplication.installTranslator(self.translator)

        # Save reference to the QGIS interface
        self.iface = iface
        self.mapCanvas = iface.mapCanvas()

        # initialize plugin directory
        self.plugin_dir = os.path.dirname(__file__)

        icon_path = os.path.join(self.plugin_dir, "icons", "quickEdit_edit.png")
        self.mapToolActionEdit = QtWidgets.QAction(QtGui.QIcon(icon_path),"Edit Tree", self.iface.mainWindow())
        self.mapToolActionEdit.setCheckable(True)
        self.mapToolActionEdit.triggered.connect(self.onEditActionTriggered)

        icon_path = os.path.join(self.plugin_dir, "icons", "quickEdit_new.png")
        self.mapToolActionNew = QtWidgets.QAction(QtGui.QIcon(icon_path),"New Tree", self.iface.mainWindow())
        self.mapToolActionNew.setCheckable(True)
        self.mapToolActionNew.triggered.connect(self.onNewActionTriggered)

        icon_path = os.path.join(self.plugin_dir, "icons", "quickEdit_delete.png")
        self.mapToolActionDelete = QtWidgets.QAction(QtGui.QIcon(icon_path),"Delete Tree", self.iface.mainWindow())
        self.mapToolActionDelete.setCheckable(True)
        self.mapToolActionDelete.triggered.connect(self.onDeleteActionTriggered)

        self.actionGroup =  QtWidgets.QActionGroup(self.iface.mainWindow())

        self.actionGroup.addAction(self.mapToolActionEdit)
        self.actionGroup.addAction(self.mapToolActionNew)
        self.actionGroup.addAction(self.mapToolActionDelete)

        self.actionGroup.setExclusive(True)

        self.mapTool = QuickEditMapTool(self.mapCanvas)

        self.mapTool.clicked.connect(self.onCanvasClicked)
        self.mapTool.identified.connect(self.onIdentified)

        self.mapTool.setAction(self.mapToolActionEdit)

        self.mapCanvas.setMapTool(self.mapTool)

        self.treeAttributeDialog = None

    def tr(self, message):
        return QCoreApplication.translate(self.__class__.__name__, message)

    # noinspection PyPep8Naming
    def initGui(self):
        self.iface.addToolBarIcon(self.mapToolActionEdit)
        self.iface.addToolBarIcon(self.mapToolActionNew)
        self.iface.addToolBarIcon(self.mapToolActionDelete)

        self.iface.addPluginToMenu("&Quick Edit", self.mapToolActionEdit)
        self.iface.addPluginToMenu("&Quick Edit", self.mapToolActionNew)
        self.iface.addPluginToMenu("&Quick Edit", self.mapToolActionDelete)

    def unload(self):
        self.iface.removePluginMenu("&Quick Edit", self.mapToolActionEdit)
        self.iface.removeToolBarIcon(self.mapToolActionEdit)

        self.iface.removePluginMenu("&Quick Edit", self.mapToolActionNew)
        self.iface.removeToolBarIcon(self.mapToolActionNew)

        self.iface.removePluginMenu("&Quick Edit", self.mapToolActionDelete)
        self.iface.removeToolBarIcon(self.mapToolActionDelete)

    # noinspection PyPep8Naming
    def onEditActionTriggered(self):
        self.mapTool.setAction(self.mapToolActionEdit)
        self.mapCanvas.setMapTool(self.mapTool)

    # noinspection PyPep8Naming
    def onNewActionTriggered(self):
        self.mapTool.setAction(self.mapToolActionNew)
        self.mapCanvas.setMapTool(self.mapTool)

    # noinspection PyPep8Naming
    def onDeleteActionTriggered(self):
        self.mapTool.setAction(self.mapToolActionDelete)
        self.mapCanvas.setMapTool(self.mapTool)

    def show_tree_type_dialog(self, selected_layer, selected_feature):
        tree_type_dialog = TreeTypeDialogEx()

        tree_type_dialog.selectedLayer = selected_layer
        tree_type_dialog.selectedFeature = selected_feature
        tree_type_dialog.isNew = self.mapTool.action() == self.mapToolActionNew

        tree_type_dialog.confirm.connect(self.onTreeTypeDialogConfirmed)

        tree_type_dialog.exec_()

    # noinspection PyPep8Naming
    def doEditLogic(self, selectedLayer, selectedFeature):
        if selectedLayer is None:
            return

        if not self.checkTreeLayer(selectedLayer):
            return

        self.show_tree_type_dialog(selectedLayer, selectedFeature)

    # noinspection PyPep8Naming
    def doNewLogic(self, mapPoint):
        layer = self.mapCanvas.currentLayer()

        if not self.checkTreeLayer(layer):
            return

        # if not layer.isEditable():
        #     self.showCriticalMessageBox("The current layer is not editable!")
        #     return

        feature = QgsFeature()

        feature.setGeometry(QgsGeometry.fromPointXY(mapPoint))

        # dlg = QgsAttributeDialog(layer, feature, False)
        #
        # ret = dlg.show()
        #
        # if not ret:
        #     return False

        # why crash
        # https://gis.stackexchange.com/questions/168448/why-does-openfeatureform-crash-qgis
        # https://lists.osgeo.org/pipermail//qgis-developer/2015-November/040376.html
        # https://lists.osgeo.org/pipermail/qgis-developer/2014-August/034225.html

        # ret = self.iface.openFeatureForm (layer, feature)
        #
        # if not ret:
        #     return

        fields = layer.fields()

        feature.setFields(fields)

        self.show_tree_type_dialog(layer, feature)

        #
        # feature['tree_type'] = self.treeAttributeDialog.line_edit_tree_type.text()
        # feature['diameter'] = int(self.treeAttributeDialog.line_edit_tree_diameter.text())
        # feature['status'] = 'orange'
        #
        # layer.dataProvider().addFeature(feature)
        # layer.updateExtents()
        # self.iface.mapCanvas().refreshAllLayers()


    # noinspection PyPep8Naming
    def doDeleteLogic(self, selectedLayer, selectedFeature):
        if selectedLayer is None:
            return

        if not self.checkTreeLayer(selectedLayer):
            return

        reply = QMessageBox.question(self.iface.mainWindow(), "QuickEdit", "Are you sure you want to delete?", QMessageBox.Yes | QMessageBox.No, QMessageBox.Yes)

        if reply != QMessageBox.Yes:
            return

        selectedLayer.dataProvider().deleteFeatures([selectedFeature.id()])
        self.iface.mapCanvas().refreshAllLayers()

    # noinspection PyPep8Naming
    def onCanvasClicked(self, mapPoint):
        activeMapToolAction = self.mapTool.action()

        if activeMapToolAction == self.mapToolActionNew:
            self.doNewLogic(mapPoint)

    # noinspection PyPep8Naming
    def onIdentified(self, selectedLayer, selectedFeature):
        activeMapToolAction = self.mapTool.action()

        if activeMapToolAction == self.mapToolActionEdit:
            self.doEditLogic(selectedLayer, selectedFeature)

        if activeMapToolAction == self.mapToolActionDelete:
            self.doDeleteLogic(selectedLayer, selectedFeature)


    # noinspection PyPep8Naming
    def onTreeTypeDialogConfirmed(self, selectedLayer, selectedFeature):
        diameterDialog = DiameterDialog()

        diameterDialog.selectedLayer = selectedLayer
        diameterDialog.selectedFeature = selectedFeature
        diameterDialog.isNew = self.mapTool.action() == self.mapToolActionNew
        diameterDialog.mapCanvas = self.iface.mapCanvas()

        diameterDialog.back.connect(self.onDiameterDialogBacked)

        diameterDialog.exec()

    # noinspection PyPep8Naming
    def onDiameterDialogBacked(self, selectedLayer, selectedFeature):
        self.show_tree_type_dialog(selectedLayer, selectedFeature)

    # noinspection PyPep8Naming
    def checkTreeLayer(self, layer):
        if layer is None:
            infoString = QCoreApplication.translate('Error', "No Selected Layer!")
            self.showCriticalMessageBox(infoString)
            return False

        if layer.name() != "tree":
            infoString = QCoreApplication.translate('Error', self.tr('All tools shall only query a shape layer with the named "tree"!'))
            self.showCriticalMessageBox(infoString)
            return False

        if layer.type() != QgsMapLayer.VectorLayer:
            infoString = QCoreApplication.translate('Error', "Selected layer is not a vector layer!")
            self.showCriticalMessageBox(infoString)
            return False

        geomType = layer.geometryType()

        if geomType is not None:
            if geomType not in [self.Point]:
                infoString = QCoreApplication.translate('Error', "Selected layer is point layer!")
                self.showCriticalMessageBox(infoString)
                return False

        if layer.dataProvider().fieldNameIndex("tree_type") == -1:
            infoString = QCoreApplication.translate('Error', self.tr('Selected layer is not Tree layer! Can not find "tree_type" attribute.'))
            self.showCriticalMessageBox(infoString)
            return False

        if layer.dataProvider().fieldNameIndex("diameter") == -1:
            infoString = QCoreApplication.translate('Error', self.tr('Selected layer is not Tree layer! Can not find "diameter" attribute.'))
            self.showCriticalMessageBox(infoString)
            return False

        if layer.dataProvider().fieldNameIndex("status") == -1:
            self.iface.messageBar().pushCritical(self.tr('Error'), self.tr('Selected layer is not Tree layer! Can not find "status" attribute.'))
            return

        return True

    # noinspection PyPep8Naming
    def showCriticalMessageBox(self, infoString):
        QMessageBox.critical(self.iface.mainWindow(), "Error", infoString, QMessageBox.Ok)

if __name__ == '__main__':
    pass