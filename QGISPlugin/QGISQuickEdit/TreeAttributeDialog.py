# -*- coding: utf-8 -*-
"""
/***************************************************************************
 Draw Line
                                 A QGIS plugin
 Draw Lines
                             -------------------
        begin                : 2019-01-18
        copyright            : (C) 2019 by 3DGISKing
        email                : wugis1219@gmail.com
        skype                : 3DGISKing
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

from PyQt5.QtWidgets import QMessageBox
from qgis.PyQt.QtWidgets import *
from qgis.PyQt.QtGui import QFontMetrics
from qgis.PyQt.QtGui import QIntValidator
from qgis.gui import QgsProjectionSelectionWidget


class TreeAttributeDialog(QDialog):
    def __init__(self, parent=None):
        super(TreeAttributeDialog, self).__init__(parent=parent)

        self.combo_box_tree_type = QComboBox()

        self.combo_box_tree_type.addItem('Ahorn')
        self.combo_box_tree_type.addItem('Apfel')
        self.combo_box_tree_type.addItem('Birke')
        self.combo_box_tree_type.addItem('Buche')
        self.combo_box_tree_type.addItem('Eiche')
        self.combo_box_tree_type.addItem('Eiche')
        self.combo_box_tree_type.addItem('Eiche')
        self.combo_box_tree_type.addItem('Eiche')

        self.combo_box_tree_type.addItem('Eiche')
        self.combo_box_tree_type.addItem('Eiche')
        self.combo_box_tree_type.addItem('Eiche')
        self.combo_box_tree_type.addItem('Pappel')
        self.combo_box_tree_type.addItem('Tanne')
        self.combo_box_tree_type.addItem('Weide')
        self.combo_box_tree_type.addItem('Placeh1')
        self.combo_box_tree_type.addItem('Placeh2')
        self.combo_box_tree_type.addItem('Placeh3')
        self.combo_box_tree_type.addItem('Bestandsbaum')

        self.line_edit_tree_type = QLineEdit()

        self.line_edit_tree_diameter = QLineEdit()

        self.line_edit_tree_diameter.setText('1')
        self.line_edit_tree_diameter.setValidator(QIntValidator(1, 999))

        form = QFormLayout()

        form.addRow(self.tr('Type'), self.line_edit_tree_type)
        form.addRow(self.tr('Diameter'), self.line_edit_tree_diameter)

        buttonBox = QDialogButtonBox(accepted=self.onAccept,  rejected=self.reject)
        buttonBox.setStandardButtons(QDialogButtonBox.Cancel |  QDialogButtonBox.Ok)

        vbox = QVBoxLayout()
        vbox.addLayout(form)
        vbox.addWidget(buttonBox)

        self.setWindowTitle(self.tr('Tree Attribute'))
        self.setModal(True)
        self.setLayout(vbox)

    def onAccept(self):
        if self.line_edit_tree_type.text() == "":
            QMessageBox.critical(self, "Error", "Please input tree type!", QMessageBox.Ok)
            return

        self.accept()

if __name__ == '__main__':
    pass
