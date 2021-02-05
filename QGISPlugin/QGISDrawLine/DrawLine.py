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

import os
import math
from qgis.PyQt.QtCore import QSettings, QLocale, QTranslator, QCoreApplication, Qt
from qgis.PyQt.QtWidgets import QAction, QTableView
from qgis.core import *
from .DrawLineDialog import DrawLineDialog


class DrawLine:
    def __init__(self, iface):
        self.iface = iface

        try:
            self.qgis_version = Qgis.QGIS_VERSION_INT
        except NameError:
            self.qgis_version = QGis.QGIS_VERSION_INT

        # we store geometry type
        self.Point, self.Line, self.Polygon = (
                [QgsWkbTypes.PointGeometry, QgsWkbTypes.LineGeometry, QgsWkbTypes.PolygonGeometry]
                if self.qgis_version >= 29900 else
                [QGis.Point, QGis.Line, QGis.Polygon])

        if QSettings().value('locale/overrideFlag', type=bool):
            locale = QSettings().value('locale/userLocale')
        else:
            locale = QLocale.system().name()
        if locale:
            locale_path = os.path.join(
                    os.path.dirname(__file__),
                    'i18n', locale)
            self.translator = QTranslator()
            if self.translator.load(locale_path):
                QCoreApplication.installTranslator(self.translator)

    def tr(self, message):
        return QCoreApplication.translate(self.__class__.__name__, message)


    def initGui(self):
        self.action = QAction(self.tr('Draw Line...'), self.iface.mainWindow())
        self.action.triggered.connect(self.run)

        if self.qgis_version >= 29900:
            self.iface.addCustomActionForLayerType(self.action, None, QgsMapLayer.VectorLayer, True)
        else:
            self.iface.legendInterface().addLegendLayerAction(self.action, None, self.__class__.__name__, QgsMapLayer.VectorLayer, True)

        self.iface.layerTreeView().clicked.connect(self.layer_tree_view_clicked)

    def unload(self):
        self.iface.layerTreeView().clicked.disconnect(self.layer_tree_view_clicked)
        if self.qgis_version >= 29900:
            self.iface.removeCustomActionForLayerType(self.action)
        else:
            self.iface.legendInterface().removeLegendLayerAction(self.action)

    # invoked when layer tree view clicked
    def layer_tree_view_clicked(self):
        layers = self.iface.layerTreeView().selectedLayers()

        if len(layers) == 1:
            self.action.setVisible(True)

            layer = layers[0]

            if layer.__class__.__name__ == 'QgsVectorLayer':
                dp = layer.dataProvider()
                self.action.setEnabled(bool(dp.capabilities() & dp.ChangeAttributeValues) and (not layer.readOnly()))
        else:
            self.action.setVisible(False)


    # invoked when our action triggered
    def run(self):
        QgsMessageLog.logMessage(self.tr('run'), 'DrawLine')

        layer = self.iface.layerTreeView().currentLayer()

        # only support polygon layer
        if layer.geometryType() not in [self.Polygon]:
            self.iface.messageBar().pushCritical(self.tr('Unsupported geometry type'), layer.name())
            return

        self.dialog = DrawLineDialog()

        # show dialog
        self.dialog.show()

        result = self.dialog.exec_()

        if result:
            self.do_logic(layer)

        self.dialog.deleteLater()


    def do_logic(self, layer):
        is_regenerate_front1 = self.dialog.check_box_regenerate_front1.isChecked()
        is_regenerate_front2 = self.dialog.check_box_regenerate_front2.isChecked()
        is_regenerate_rear = self.dialog.check_box_regenerate_rear.isChecked()

        if is_regenerate_front1:
            self.remove_layer_by_name('LINES_FRONT_SET1')

        if is_regenerate_front2:
            self.remove_layer_by_name('LINES_FRONT_SET2')

        if is_regenerate_rear:
            self.remove_layer_by_name('LINES_REAR_SET')

        front_lines_layer1 = QgsVectorLayer("LineString", "LINES_FRONT_SET1", "memory")
        front_lines_layer2 = QgsVectorLayer("LineString", "LINES_FRONT_SET2", "memory")

        rear_lines_layer = QgsVectorLayer("LineString", "LINES_REAR_SET", "memory")

        front_rotate_angle1 = float(self.dialog.line_edit_front_rotate_angle1.text())
        front_distance1 = float(self.dialog.line_edit_front_distance1.text())

        front_rotate_angle2 = float(self.dialog.line_edit_front_rotate_angle2.text())
        front_distance2 = float(self.dialog.line_edit_front_distance2.text())

        rear_rotate_angle = float(self.dialog.line_edit_rear_rotate_angle.text())
        rear_distance = float(self.dialog.line_edit_rear_distance.text())

        features = layer.getFeatures()

        for f in features:
            geometry = f.geometry()

            if layer.wkbType() == QgsWkbTypes.CurvePolygon or layer.wkbType() == QgsWkbTypes.CurvePolygon:
                polygon = geometry.asPolygon()
            elif layer.wkbType() == QgsWkbTypes.MultiPolygon:
                multi_polygon = geometry.asMultiPolygon()
                polygon = multi_polygon[0]

            # Polygon: first item of the list is outer ring, inner rings (if any) start from second item */
            # typedef QVector<QgsPolyline> QgsPolygon;

            polyline_count = len(polygon)

            if polyline_count == 0:
                continue

            # this is polyline

            outer_ring = polygon[0]

            count_of_point = len(outer_ring)

            if count_of_point != 5:
                continue

            first_point = outer_ring[0]
            second_point = outer_ring[1]
            third_point = outer_ring[2]
            fourth_point = outer_ring[3]

            # front1
            p1 = self.get_rotated_point(first_point, second_point, front_rotate_angle1, front_distance1)
            p2 = self.get_rotated_point(second_point, first_point, -front_rotate_angle1, front_distance1)

            self.add_line_to_layer(front_lines_layer1, first_point, p1)
            self.add_line_to_layer(front_lines_layer1, second_point, p2)

            # front2
            p1 = self.get_rotated_point(first_point, second_point, front_rotate_angle2, front_distance2)
            p2 = self.get_rotated_point(second_point, first_point, -front_rotate_angle2, front_distance2)

            self.add_line_to_layer(front_lines_layer2, first_point, p1)
            self.add_line_to_layer(front_lines_layer2, second_point, p2)

            # rear

            p3 = self.get_rotated_point(third_point, fourth_point, rear_rotate_angle, rear_distance)
            p4 = self.get_rotated_point(fourth_point, third_point, -rear_rotate_angle, rear_distance)

            self.add_line_to_layer(rear_lines_layer, third_point, p3)
            self.add_line_to_layer(rear_lines_layer, fourth_point, p4)

        QgsProject.instance().addMapLayer(front_lines_layer1)
        QgsProject.instance().addMapLayer(front_lines_layer2)
        QgsProject.instance().addMapLayer(rear_lines_layer)

    @staticmethod
    def add_line_to_layer(line_layer, start_point, end_point):
        # create a new feature
        """

        :param line_layer:
        :type line_layer QgsVectorLayer
        :param start_point:
        :type  start_point QgsPoint
        :param end_point:
        :type end_point QgsPoint
        """

        first_point_type = start_point.__class__.__name__

        # why
        # start_point 's type maybe is QgsPointXY so it result in bugs

        if first_point_type != 'QgsPoint':
            start_point = QgsPoint(start_point.x(), start_point.y())

        feature = QgsFeature()
        # noinspection PyCallByClass
        line = QgsGeometry.fromPolyline([start_point, end_point])

        feature.setGeometry(line)

        # add the feature to the layer
        data_provider = line_layer.dataProvider()
        data_provider.addFeatures( [ feature ] )

        line_layer.updateExtents()


    @staticmethod
    def get_rotated_point(first_point, second_point, rotate_angle, distance):
        """

        :param first_point:
        :type first_point QgsPoint
        :param second_point:
        :type second_point QgsPoint
        :param rotate_angle: in degree
        :type rotate_angle float
        :param distance:
        :type distance float
        """

        rotate_angle = math.radians(rotate_angle)

        # from https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
        # rotate second point around first point by angle

        rotated_x = first_point.x() + (second_point.x() - first_point.x()) * math.cos(rotate_angle) - (second_point.y() - first_point.y()) * math.sin(rotate_angle)
        rotated_y = first_point.y() + (second_point.x() - first_point.x()) * math.sin(rotate_angle) + (second_point.y() - first_point.y()) * math.cos(rotate_angle)

        # from https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point

        length = math.sqrt( (first_point.x() - second_point.x()) * (first_point.x() - second_point.x()) + (first_point.y() - second_point.y()) * (first_point.y() - second_point.y()))

        ratio = distance / length

        x = ( 1 - ratio ) * first_point.x() + ratio * rotated_x
        y = ( 1 - ratio ) * first_point.y() + ratio * rotated_y

        x = first_point.x() + ratio * (rotated_x - first_point.x())
        y = first_point.y() + ratio * (rotated_y - first_point.y())

        return QgsPoint(x, y)

    @staticmethod
    def remove_layer_by_name(layer_name):
        layers = QgsProject.instance().mapLayersByName(layer_name)

        for layer in layers:
             QgsProject.instance().removeMapLayer(layer.id())


    def property_changed(self):
        if self.dialog.comboBox_property.currentIndex() == -1:
            return

if __name__ == '__main__':
    pass
