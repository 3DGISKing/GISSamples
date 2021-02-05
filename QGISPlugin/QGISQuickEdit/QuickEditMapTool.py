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
from PyQt5.QtGui import QPixmap, QCursor
from qgis.core import QgsVectorLayer, QgsFeature, QgsPointXY,QgsProject
from qgis.gui import QgsMapToolIdentify

class QuickEditMapTool(QgsMapToolIdentify):
    # signal definition

    identified = pyqtSignal(QgsVectorLayer, QgsFeature)
    clicked = pyqtSignal(QgsPointXY)

    def __init__(self, canvas, layerType = 'AllLayers'):
        self.layerType = getattr(QgsMapToolIdentify, layerType)
        self.canvas = canvas
        QgsMapToolIdentify.__init__(self, canvas)
        self.setCursor(QCursor())

    # noinspection PyPep8Naming
    def canvasReleaseEvent(self, mouseEvent):
        layers = QgsProject.instance().mapLayersByName('tree')

        try:
            results = self.identify(mouseEvent.x(), mouseEvent.y(), layers)
        except Exception as e:
            print ("Identify  EXCEPTION: ", e)
            results = []

        if len(results) > 0:
            layer = results[0].mLayer
            self.identified.emit(layer, QgsFeature(results[0].mFeature))
        else:
            self.clicked.emit(mouseEvent.originalMapPoint())
