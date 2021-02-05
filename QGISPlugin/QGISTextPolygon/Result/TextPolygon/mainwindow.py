# coding=utf-8

from qgis.core import *
from qgis.gui import *

from PyQt4.QtCore import *
from PyQt4.QtGui import *

class MainWindow(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.canvas = QgsMapCanvas(self)
        self.canvas.setCanvasColor(Qt.white)

        self.dockWidget = QWidget()
        layout = QVBoxLayout()

        self.w1 = QFrame(self)
        self.l = QVBoxLayout()
        self.l.setMargin(0)
        self.l.setSpacing(0)
        self.l.addWidget(self.canvas)
        self.w1.setLayout(self.l)
        layout.addWidget(self.w1)

        layout.setContentsMargins(0,0,0,0)
        layout.setSpacing(0)
        self.dockWidget.setLayout(layout)
        self.dockWidget.setContentsMargins(0,0,0,0)
        self.setCentralWidget(self.dockWidget)

        self.createToolbar()

    def createToolbar(self):
        self.toolbarBaseAction = self.addToolBar("Base actions")

        actionZoomIn = QAction(self)
        actionZoomIn.setObjectName("ZoomIn")
        actionZoomIn.setText("Zoom In")

        actionZoomOut = QAction(self)
        actionZoomOut.setObjectName("ZoomOut")
        actionZoomOut.setText("Zoom Out")

        self.actionPan = QAction(self)
        self.actionPan.setObjectName("mpActionPan")
        self.actionPan.setText("Pan")


        self.connect(actionZoomIn, SIGNAL("triggered()"), self.zoomIn)
        self.connect(actionZoomOut, SIGNAL("triggered()"), self.zoomOut)
        self.connect(self.actionPan, SIGNAL("triggered()"), self.pan)

        self.toolbarBaseAction.addAction(actionZoomIn)
        self.toolbarBaseAction.addAction(actionZoomOut)
        self.toolbarBaseAction.addAction(self.actionPan)

        self.toolZoomIn = QgsMapToolZoom(self.canvas, False)
        self.toolZoomIn.setAction(actionZoomIn)
        self.toolZoomOut = QgsMapToolZoom(self.canvas, True) # True = out
        self.toolZoomOut.setAction(actionZoomOut)



    def zoomIn(self):
       self.canvas.setMapTool(self.toolZoomIn)

    def zoomOut(self):
       self.canvas.setMapTool(self.toolZoomOut)

    def pan(self):
       self.canvas.setMapTool(self.toolPan)








