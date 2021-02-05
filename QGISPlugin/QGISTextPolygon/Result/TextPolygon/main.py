# coding=utf-8

import sys

from qgis.core import *
from qgis.gui import *

from PyQt4.QtCore import *
from PyQt4.QtGui import *


import TextPolygon_feature
from CADShape.CADCircularArc import CADCircularArc
from Parser.imp_parser import *

from mainwindow import MainWindow

import sys

def main(argv):
    filename = "E:/test1.txt"
    text = open(filename).read()
    tokens = imp_lex(text)

    parse_result = imp_parse(tokens)

    stmt_list = get_stmt_list(parse_result.value)

    pointlist = [[]]

    for i, stmt in enumerate(stmt_list):
        stmt.run(pointlist)

    #geometry = QgsGeometry.fromPolyline(pointlist)

    #TextPolygon_feature.createFeature(self.canvas, geometry, "")


    # create QGis application
    app = QgsApplication(argv, True)

    QCoreApplication.setOrganizationName("IRSG")
    QCoreApplication.setOrganizationDomain("irsg.dev@yahoo.com")
    QCoreApplication.setApplicationName("FlightPlanner")

    # Initialize qgis libraries
    QgsApplication.setPrefixPath(".", True)
    QgsApplication.initQgis()

    mainwindow = MainWindow()
    mainwindow.show()

    retval = app.exec_()
    QgsApplication.exitQgis()

if __name__ == "__main__":
    main(sys.argv)

