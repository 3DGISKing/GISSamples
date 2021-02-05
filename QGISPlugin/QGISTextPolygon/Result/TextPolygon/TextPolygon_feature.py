# coding=utf-8

from PyQt4.QtCore import QSettings

from qgis.core import *
from qgis.gui import *

def createFeature(mapCanvas, geom, editCommandTxt):
    layer = mapCanvas.currentLayer()
    provider = layer.dataProvider()

    f = QgsFeature()

    f.setGeometry(geom)

    # add attribute fields to feature
    fields = layer.pendingFields()

    # vector api change update
    f.initAttributes(fields.count())
    for i in range(fields.count()):
       f.setAttribute(i, provider.defaultValue(i))

    dlg = QgsAttributeDialog(layer, f, False)
    dlg.setIsAddDialog(True)

    ret = dlg.dialog().exec_()

    if not ret:
        return False

    return True

