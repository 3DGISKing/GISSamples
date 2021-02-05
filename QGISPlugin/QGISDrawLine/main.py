# coding=utf-8

import sys

from PyQt5.QtCore import *
from PyQt5.QtGui import *
from qgis.core import *
from qgis.gui import *
from DrawLine import *


import sys

def main(argv):
    # create QGis application
    app = QgsApplication([], True)

    QCoreApplication.setOrganizationName("IRSG")
    QCoreApplication.setOrganizationDomain("irsg.dev@yahoo.com")
    QCoreApplication.setApplicationName("FlightPlanner")

    # Initialize qgis libraries
    QgsApplication.setPrefixPath(".", True)
    QgsApplication.initQgis()

    layer = QgsVectorLayer("E:/POLY_EXAMPLE.shp", "testlayer", "ogr")

    draw_line = DrawLine()
    draw_line.do_logic(layer)


    retval = app.exec_()
    QgsApplication.exitQgis()

if __name__ == "__main__":
    main(sys.argv)

