# -*- coding: utf-8 -*-
"""
/***************************************************************************
 Quick Editing Attribute
                                 A QGIS plugin
 tool for quick editing attributes in field campaigns
                             -------------------
        begin                : 2019-02-19
        copyright            : (C) 2019 by Jingli Wu
        email                : wugis1219@gmail.com
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

from PyQt5.QtCore import pyqtSignal
from PyQt5 import QtWidgets
from qgis.core import QgsVectorLayer, QgsFeature
from .ui_treetypedialogex import Ui_TreeTypeDialogEx


class TreeTypeDialogEx(QtWidgets.QDialog):
    # signal definition
    confirm = pyqtSignal(QgsVectorLayer, QgsFeature)

    def __init__(self):
        QtWidgets.QDialog.__init__(self)

        ui = Ui_TreeTypeDialogEx()
        ui.setupUi(self)

        ui.pushButtonCancel.clicked.connect(self.onCancelClicked)
        ui.pushButtonAhorn.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonApfel.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonBirke.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonBuche.clicked.connect(self.onPushButtonClicked)

        ui.pushButtonEiche.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonErle.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonEsche.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonFichte.clicked.connect(self.onPushButtonClicked)

        ui.pushButtonKiefer.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonKirsche.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonLinde.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonPappel.clicked.connect(self.onPushButtonClicked)

        ui.pushButtonTanne.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonWeide.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonPlaceh1.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonPlaceh2.clicked.connect(self.onPushButtonClicked)

        ui.pushButtonPlaceh3.clicked.connect(self.onPushButtonClicked)
        ui.pushButtonBestandsbaum.clicked.connect(self.onPushButtonClicked)

        self.ui = ui

        self.selectedLayer = None
        self.selectedFeature = None
        self.isNew = None

    # noinspection PyPep8Naming
    def onCancelClicked(self):
        self.reject()

    def set_tree_type_and_close(self, tree_type):
        self.set_tree_type(tree_type)

        self.accept()
        self.confirm.emit(self.selectedLayer, self.selectedFeature)

    def set_tree_type(self, tree_type):
        if self.isNew:
            self.selectedFeature['tree_type'] = tree_type
        else:
            tree_type_field_id = self.selectedLayer.fields().indexFromName('tree_type')

            self.selectedLayer.startEditing()

            self.selectedLayer.changeAttributeValue(self.selectedFeature.id(), tree_type_field_id, tree_type)

            self.selectedLayer.commitChanges()

    # noinspection PyPep8Naming
    def onPushButtonClicked(self):
        button  = self.sender()
        buttons = self.findChildren(QtWidgets.QPushButton, button.objectName())

        if len(buttons) == 0:
            return

        self.set_tree_type_and_close(buttons[0].text())


