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

from qgis.PyQt.QtWidgets import *
from qgis.PyQt.QtGui import QFontMetrics
from qgis.gui import QgsProjectionSelectionWidget


class DrawLineDialog(QDialog):
    def __init__(self, parent=None):
        super(DrawLineDialog, self).__init__(parent=parent)

        self.line_edit_front_rotate_angle1 = QLineEdit()
        self.line_edit_front_distance1 = QLineEdit()

        self.line_edit_front_rotate_angle2 = QLineEdit()
        self.line_edit_front_distance2 = QLineEdit()

        self.line_edit_rear_rotate_angle = QLineEdit()
        self.line_edit_rear_distance = QLineEdit()

        self.line_edit_front_rotate_angle1.setText('100')
        self.line_edit_front_distance1.setText('100')

        self.line_edit_front_rotate_angle2.setText('150')
        self.line_edit_front_distance2.setText('20')

        self.line_edit_rear_rotate_angle.setText('120')
        self.line_edit_rear_distance.setText('50')

        self.check_box_regenerate_front1 = QCheckBox()
        self.check_box_regenerate_front2 = QCheckBox()
        self.check_box_regenerate_rear = QCheckBox()

        self.check_box_regenerate_front1.setChecked(True)
        self.check_box_regenerate_front2.setChecked(True)
        self.check_box_regenerate_rear.setChecked(True)

        form = QFormLayout()

        form.addRow(self.tr('Front1 Rotate Angle(in Degree)'), self.line_edit_front_rotate_angle1)
        form.addRow(self.tr('Front1 Distance'), self.line_edit_front_distance1)

        form.addRow(self.tr('Front2 Rotate Angle(in Degree)'), self.line_edit_front_rotate_angle2)
        form.addRow(self.tr('Front2 Distance'), self.line_edit_front_distance2)

        form.addRow(self.tr('Rear Rotate Angle(in Degree)'), self.line_edit_rear_rotate_angle)
        form.addRow(self.tr('Rear Distance'), self.line_edit_rear_distance)

        form.addRow(self.tr('Regenerate Front 1 Layer'), self.check_box_regenerate_front1)
        form.addRow(self.tr('Regenerate Front 2 Layer'), self.check_box_regenerate_front2)
        form.addRow(self.tr('Regenerate Rear Layer'), self.check_box_regenerate_rear)

        buttonBox = QDialogButtonBox(accepted=self.accept,  rejected=self.reject)
        buttonBox.setStandardButtons(QDialogButtonBox.Cancel |  QDialogButtonBox.Ok)

        vbox = QVBoxLayout()
        vbox.addLayout(form)
        vbox.addWidget(buttonBox)

        self.setWindowTitle(self.tr('Draw Line'))
        self.setModal(True)
        self.setLayout(vbox)


if __name__ == '__main__':
    pass
