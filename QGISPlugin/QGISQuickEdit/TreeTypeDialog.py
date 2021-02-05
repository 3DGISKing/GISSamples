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
from .ui_treetypedialog import Ui_TreeTypeDialog


class TreeTypeDialog(QtWidgets.QDialog):
    # signal definition
    confirm = pyqtSignal(QgsVectorLayer, QgsFeature)

    def __init__(self):
        QtWidgets.QDialog.__init__(self)

        ui = Ui_TreeTypeDialog()
        ui.setupUi(self)

        ui.pushButtonCancel.clicked.connect(self.onCancelClicked)
        ui.pushButtonSpruce.clicked.connect(self.onPushButtonSpruceClicked)
        ui.pushButtonPine.clicked.connect(self.onPushButtonPineClicked)
        ui.pushButtonBirch.clicked.connect(self.onPushButtonBirchClicked)
        ui.pushButtonOak.clicked.connect(self.onPushButtonOakClicked)
        ui.pushButtonAsh.clicked.connect(self.onPushButtonAshClicked)
        ui.pushButtonBeech.clicked.connect(self.onPushButtonBeechClicked)
        ui.pushButtonPoplar.clicked.connect(self.onPushButtonPoplarClicked)
        ui.pushButtonAlder.clicked.connect(self.onPushButtonAlderClicked)
        ui.pushButtonLarch.clicked.connect(self.onPushButtonLarchClicked)



        self.selectedLayer = None
        self.selectedFeature = None

    # noinspection PyPep8Naming
    def onCancelClicked(self):
        self.reject()

    def set_tree_type_and_close(self, tree_type):
        self.set_tree_type(tree_type)

        self.accept()
        self.confirm.emit(self.selectedLayer, self.selectedFeature)

    def set_tree_type(self, tree_type):
        tree_type_field_id = self.selectedLayer.fields().indexFromName('tree_type')

        self.selectedLayer.startEditing()

        self.selectedLayer.changeAttributeValue(self.selectedFeature.id(), tree_type_field_id, tree_type)

        self.selectedLayer.commitChanges()

    # noinspection PyPep8Naming
    def onPushButtonSpruceClicked(self):
        self.set_tree_type_and_close('spruce')

    # noinspection PyPep8Naming
    def onPushButtonPineClicked(self):
        self.set_tree_type_and_close('pine')

    # noinspection PyPep8Naming
    def onPushButtonBirchClicked(self):
        self.set_tree_type_and_close('birch')

    # noinspection PyPep8Naming
    def onPushButtonOakClicked(self):
        self.set_tree_type_and_close('oak')

    # noinspection PyPep8Naming
    def onPushButtonAshClicked(self):
        self.set_tree_type_and_close('ash')

    # noinspection PyPep8Naming
    def onPushButtonBeechClicked(self):
        self.set_tree_type_and_close('beech')

    # noinspection PyPep8Naming
    def onPushButtonPoplarClicked(self):
        self.set_tree_type_and_close('poplar')

    # noinspection PyPep8Naming
    def onPushButtonAlderClicked(self):
        self.set_tree_type_and_close('alder')

    # noinspection PyPep8Naming
    def onPushButtonLarchClicked(self):
        self.set_tree_type_and_close('larch')


