# coding=utf-8

from PyQt4 import QtCore, QtGui
from PyQt4 import uic
import os

class TextPolygonDialog(QtGui.QDialog ):
    def __init__(self):
        QtGui.QDialog.__init__(self)

        # Set up the user interface from Designer.
        ui_path = os.path.join(os.path.dirname(__file__), 'Ui_TextPolygon.ui')
        uic.loadUi(ui_path, self)




