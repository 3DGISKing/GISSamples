# coding=utf-8

"""
/***************************************************************************
 Generating polygon from text
                                 A QGIS plugin

                              -------------------
        begin                : 2017-7-3
        email                : wugis3@yahoo.com
 ***************************************************************************/
"""

# Import the PyQt and QGIS libraries


from qgis.core import *
from qgis.gui import *
import TextPolygonGlobal
from PyQt4.QtGui import *

# Initialize Qt resources from file resources.py
import resources

import TextPolygon_feature
from Parser.imp_parser import *

from TextPolygonDialog import TextPolygonDialog

class TextPolygon:

    def __init__(self, iface):
        # Save reference to the QGIS interface

        self.iface = iface
        self.canvas = iface.mapCanvas()
        self.currentLayer = None;


    def initGui(self):
        # Create action that will start plugin
        self.action = QAction(QIcon(":/plugins/TextPolygon/textpolygon_icon.png"), \
        "&TextPolygon", self.iface.mainWindow())
        # connect the action to the run method
        self.action.triggered.connect(self.run)

        # Add toolbar button and menu item

        self.iface.addToolBarIcon(self.action)
        self.iface.addPluginToMenu("TextPolygon", self.action)

        # create dialog

        self.dlg = TextPolygonDialog()

        self.dlg.setWindowTitle("Generating polygon from text Tool")

        self.dlg.clearButton.clicked.connect(self.clearButtonClicked)
        self.dlg.drawButton.clicked.connect(self.drawButtonClicked)
        self.dlg.closeButton.clicked.connect(self.dlg.reject)

    def run(self):
        self.dlg.show()
        self.dlg.adjustSize()
        result = self.dlg.exec_()

    def unload(self):
        # Remove the plugin menu item and icon
        self.iface.removePluginMenu("TextPoygon", self.action)
        self.iface.removeToolBarIcon(self.action)

    def clearButtonClicked(self):
        self.dlg.polygonTextEdit.setPlainText('')

    def drawButtonClicked(self):
        if not self.checkCurrentLayer():
            return

        text = unicode(self.dlg.polygonTextEdit.toPlainText())

        if text == "":
            self.showCriticalMessageBox("Please input!")
            return

        crsSRSId = self.currentLayer.crs().postgisSrid()

        # check CRS
        if self.currentLayer.crs().authid() is None:
            self.showCriticalMessageBox("Coordinate reference System of current layer is not specified! WGS84 is assumed!")
            crsSRSId = 4326

        sourceCrs = QgsCoordinateReferenceSystem(4326)
        destCrs = QgsCoordinateReferenceSystem(crsSRSId)

        TextPolygonGlobal.CRSTransform = QgsCoordinateTransform(sourceCrs, destCrs)

        tokens = imp_lex(text)

        try:
            parse_result = imp_parse(tokens)
        except:
            self.showCriticalMessageBox("Unknown keyword exist!")
            return

        if parse_result is None:
            self.showCriticalMessageBox("Parsing error!")
            return

        stmt_list = get_stmt_list(parse_result.value)

        if stmt_list.__len__() == 1:
            stmt = stmt_list[0]

            if isinstance(stmt, LatLngStatment):
                self.showCriticalMessageBox("Parsing error! Maybe you have typed one Latlng!")
                return

            if isinstance(stmt, ThenToStatment):
                self.showCriticalMessageBox("Parsing error! Maybe you have typed one Then Latlng!")
                return

            if isinstance(stmt, ThenArcStatment):
                self.showCriticalMessageBox("Parsing error! Maybe you have typed one ThenArcStatment!")
                return

        pointlistlist = []

        for i, stmt in enumerate(stmt_list):
            stmt.run(pointlistlist)

        geometry = QgsGeometry.fromPolygon(pointlistlist)

        if geometry is None:
            self.showCriticalMessageBox("Parsing error! Failed to get geometry!")
            return

        if self.currentLayer.geometryType() == QGis.Line:
            multipart = False

            if pointlistlist.__len__() > 1:
                multipart = True

            geometry = geometry.convertToType(QGis.Line, multipart)

            if geometry is None:
                self.showCriticalMessageBox("Parsing error! Failed to convert into Line!")
                return

        if geometry.isEmpty():
            self.showCriticalMessageBox("Parsing error! Geometry is empty!")
            return

        if not TextPolygon_feature.createFeature(self.canvas, geometry, ""):
            self.showCriticalMessageBox("Failed to createFeature!")
            return

        self.canvas.refresh()

    def testParser(self):
        filename = "E:/test1.txt"
        text = open(filename).read()
        tokens = imp_lex(text)

        parse_result = imp_parse(tokens)

        stmt_list = get_stmt_list(parse_result.value)

        pointlistlist = []

        for i, stmt in enumerate(stmt_list):
            stmt.run(pointlistlist)

        geometry = QgsGeometry.fromPolygon(pointlistlist)

        if not geometry.isEmpty():
            self.showCriticalMessageBox(self, "Parsing Error")

        TextPolygon_feature.createFeature(self.canvas, geometry, "")


    def showCriticalMessageBox(self, infoString):
        QMessageBox.critical(self.dlg, "Error TextPolygon", infoString, QMessageBox.Ok)

    def checkCurrentLayer(self):
        layer = self.canvas.currentLayer()

        if layer is None:
            infoString = QCoreApplication.translate('TextPolygon', "No current Layer!")
            self.showCriticalMessageBox(infoString)
            return False

        if layer.type() != QgsMapLayer.VectorLayer:
            infoString = QCoreApplication.translate('TextPolygon', "The current layer is not a vector layer!")
            self.showCriticalMessageBox(infoString)
            return False

        if not layer.isEditable():
            infoString = QCoreApplication.translate('TextPolygon', "The current layer is not editable!")
            self.showCriticalMessageBox(infoString)
            return False

        provider = layer.dataProvider()

        if not (provider.capabilities() & QgsVectorDataProvider.EditingCapabilities):
            infoString = QCoreApplication.translate('TextPolygon', "The current layer does not support Editing Capability!")
            self.showCriticalMessageBox(infoString)
            return False

        geomType = layer.geometryType()

        if geomType is not None:
            if geomType == QGis.Point:
                infoString = QCoreApplication.translate('TextPolygon', "The current layer is point layer!")
                self.showCriticalMessageBox(infoString)
                return False

        self.currentLayer = layer
        return True


if __name__ == "__main__":
    pass


