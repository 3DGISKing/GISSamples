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

from PyQt5.QtCore import pyqtSignal
from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QMessageBox
from qgis.core import QgsVectorLayer, QgsFeature
from .ui_diameterdialog import Ui_DiameterDialog


class DiameterDialog(QtWidgets.QDialog):
    # signal definition
    back = pyqtSignal(QgsVectorLayer, QgsFeature)

    def __init__(self):
        QtWidgets.QDialog.__init__(self)

        self.ui = Ui_DiameterDialog()
        self.ui.setupUi(self)

        self.ui.pushButtonBack.clicked.connect(self.onPushButtonBackClicked)
        self.ui.pushButtonConform.clicked.connect(self.onPushButtonConfirmClicked)
        self.ui.pushButtonDeleteNumber.clicked.connect(self.onPushButtonDeleteNumberClicked)

        self.ui.pushButtonOne.clicked.connect(self.onPushButtonOneClicked)
        self.ui.pushButtonTwo.clicked.connect(self.onPushButtonTwoClicked)
        self.ui.pushButtonThree.clicked.connect(self.onPushButtonThreeClicked)
        self.ui.pushButtonFour.clicked.connect(self.onPushButtonFourClicked)
        self.ui.pushButtonFive.clicked.connect(self.onPushButtonFiveClicked)
        self.ui.pushButtonSix.clicked.connect(self.onPushButtonSixClicked)
        self.ui.pushButtonSeven.clicked.connect(self.onPushButtonSevenClicked)
        self.ui.pushButtonEight.clicked.connect(self.onPushButtonEightClicked)
        self.ui.pushButtonNine.clicked.connect(self.onPushButtonNineClicked)
        self.ui.pushButtonZero.clicked.connect(self.onPushButtonZeroClicked)

        self.selectedLayer = None
        self.selectedFeature = None
        self.isNew = None

        self.str_diameter = '0'
        self.set_diameter_label()

    def set_diameter_label(self):
        self.ui.labelDiameter.setText( '=' + self.str_diameter + ' cm diameter')

    # noinspection PyPep8Naming
    def onPushButtonBackClicked(self):
        self.reject()
        self.back.emit(self.selectedLayer, self.selectedFeature)

    # noinspection PyPep8Naming
    def onPushButtonConfirmClicked(self):
        diameter = int(self.str_diameter)

        if diameter < 10 or diameter > 999:
            QMessageBox.critical(self, 'Error', 'Invalid diameter')
            return

        self.set_diameter(diameter)

        if self.isNew:
            self.set_status('orange')
        else:
            self.set_status('green')

        if self.isNew:
             self.selectedLayer.dataProvider().addFeature(self.selectedFeature)
             self.selectedLayer.updateExtents()
             self.mapCanvas.refreshAllLayers()

        self.accept()

    # noinspection PyPep8Naming
    def onPushButtonDeleteNumberClicked(self):
        str_diameter_length = len(self.str_diameter)

        if str_diameter_length > 1:
            self.str_diameter = self.str_diameter[0:str_diameter_length - 1]
        else:
            self.str_diameter = '0'

        self.set_diameter_label()

    # noinspection PyPep8Naming
    def onPushButtonOneClicked(self):
        self.on_number_button_clicked('1')

    # noinspection PyPep8Naming
    def onPushButtonTwoClicked(self):
        self.on_number_button_clicked('2')

    # noinspection PyPep8Naming
    def onPushButtonThreeClicked(self):
        self.on_number_button_clicked('3')

    # noinspection PyPep8Naming
    def onPushButtonFourClicked(self):
        self.on_number_button_clicked('4')

    # noinspection PyPep8Naming
    def onPushButtonFiveClicked(self):
        self.on_number_button_clicked('5')

    # noinspection PyPep8Naming
    def onPushButtonSixClicked(self):
        self.on_number_button_clicked('6')

    # noinspection PyPep8Naming
    def onPushButtonSevenClicked(self):
        self.on_number_button_clicked('7')

    # noinspection PyPep8Naming
    def onPushButtonEightClicked(self):
        self.on_number_button_clicked('8')

    # noinspection PyPep8Naming
    def onPushButtonNineClicked(self):
        self.on_number_button_clicked('9')

    # noinspection PyPep8Naming
    def onPushButtonZeroClicked(self):
        self.on_number_button_clicked('0')

    def on_number_button_clicked(self, number):
        if self.str_diameter == '0':
            self.str_diameter = number
        else:
            length = len(self.str_diameter)

            if length >= 3:
                return

            self.str_diameter = self.str_diameter + number

        self.set_diameter_label()

    def set_diameter(self, diameter):
        if self.isNew:
            self.selectedFeature['diameter'] = diameter
        else:
            diameter_field_id = self.selectedLayer.fields().indexFromName('diameter')

            self.selectedLayer.startEditing()

            self.selectedLayer.changeAttributeValue(self.selectedFeature.id(), diameter_field_id, diameter)

            self.selectedLayer.commitChanges()

    def set_status(self, status):
        if self.isNew:
            self.selectedFeature['status'] = status
        else:
            status_field_id = self.selectedLayer.fields().indexFromName('status')

            self.selectedLayer.startEditing()

            self.selectedLayer.changeAttributeValue(self.selectedFeature.id(), status_field_id, status)

            self.selectedLayer.commitChanges()