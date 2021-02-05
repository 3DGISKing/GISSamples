# -*- coding: utf-8 -*-
"""
/***************************************************************************
 CADDigitize
                                 A QGIS plugin
 CAD like tools for QGis
 Fork of Rectangles Ovals Digitizing. Inspired by CadTools, LibreCAD/AutoCAD.
                              -------------------
        begin                : 2016-01-25
        git sha              : $Format:%H$
        copyright            : (C) 2016 by Loïc BARTOLETTI
        email                : lbartoletti@tuxfamily.org
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

from __future__ import print_function
from __future__ import division

from qgis.core import (QgsPoint, QgsGeometry, QGis)
try:
    from qgis.core import QgsPointV2, QgsCircularStringV2
    CIRCSTRING = True
except:
    CIRCSTRING = False

from CADPoint import *
from CADUtils import *
import math


class CADCircularArc(object):
    def __init__(self, ptStart, ptEnd, ptArc):
        if not all([isinstance(p, (CADPoint, QgsPoint))
                    for p in [ptStart, ptEnd, ptArc]]):
            raise AttributeError
        else:
            self._ptStart = CADPoint(ptStart)
            self._ptEnd = CADPoint(ptEnd)
            self._ptArc = CADPoint(ptArc)
            self._ptCenter = self.__getArcCenter()

    def __getArcCenter(self):
        bx = self._ptStart.x
        by = self._ptStart.y
        cx = self._ptArc.x
        cy = self._ptArc.y
        dx = self._ptEnd.x
        dy = self._ptEnd.y

        temp = cx * cx + cy * cy
        bc = (bx * bx + by * by - temp) / 2.0
        cd = (temp - dx * dx - dy * dy) / 2.0
        det = (bx - cx) * (cy - dy) - (cx - dx) * (by - cy)

        try:
            det = 1 / det
            x = (bc * (cy - dy) - cd * (by - cy)) * det
            y = ((bx - cx) * cd - (cx - dx) * bc) * det

            return CADPoint(x, y)

        except ZeroDivisionError:
            return None

    def __str__(self):
        s = "Circular arc:\nStart:{}\nArc: {}\nEnd: {}".format(
                  self._ptStart,
                  self._ptArc,
                  self._ptEnd)
        return s

    def __repr__(self):
        return "CADCircularArc({}, {}, {})".format(self._ptStart,
                                                   self._ptEnd,
                                                   self._ptArce)

    @classmethod
    def by3Points(cls, ptStart, ptEnd, ptArc):
        """Create a CADCirclurArc with 3 points ABC
         A        C
         |        |
          \--B---/
        """
        if all([isinstance(p, (CADPoint, QgsPoint))
                for p in [ptStart, ptEnd, ptArc]]):
            return cls(ptStart, ptEnd, ptArc)
        else:
            raise AttributeError

    @classmethod
    def byCenter2Points(cls, ptCenter, ptStart, ptEnd, direction=1):
        """Create a CADCirclurArc with by Center C and 2 points AB
         A   C    B
         |        |
          \------/
        """
        if all([isinstance(p, (CADPoint, QgsPoint))
                for p in [ptCenter, ptStart, ptEnd]]) and \
           isinstance(direction, (int, long)):
            ptCenter = CADPoint(ptCenter)
            ptStart = CADPoint(ptStart)
            ptEnd = CADPoint(ptEnd)

            a1 = ptCenter.getAngleOfLineBetweenTwoPoints(ptStart)
            a2 = ptCenter.getAngleOfLineBetweenTwoPoints(ptEnd)
            return cls.byCenterPointAngle(ptCenter, ptStart, a2-a1, direction)

    @classmethod
    def byCenterPointAngle(cls, ptCenter, ptStart, inAngle, direction=1):
        """Create a CADCirclurArc with by Center C a point A and angle
         A   C
         |
          \------/Angle
        """
        if not all([isinstance(p, (CADPoint, QgsPoint))
                    for p in [ptCenter, ptStart]]) or \
           not isinstance(inAngle, (int, long, float)) or \
           not isinstance(direction, (int, long)):
                raise AttributeError

        ptCenter = CADPoint(ptCenter)
        ptStart = CADPoint(ptStart)
        angle = ptCenter.getAngleOfLineBetweenTwoPoints(ptStart)
        dist = ptCenter.distance(ptStart)

        if inAngle < 0:
            inAngle += 360
        ptAngle = 0
        if direction == 1:
            ptAngle = angle - (360 - inAngle)
        elif direction == -1:
            ptAngle = angle + inAngle

        ptEnd = ptCenter.pointProjected(dist, ptAngle)
        ptAngle_arc = ptCenter.getAngleOfLineBetweenTwoPoints(
                                                     ptStart.midpoint(
                                                                  ptEnd))
        if direction == 1:
            if inAngle < 180:
                ptAngle_arc = ptAngle_arc + 180
        if direction == -1:
            if inAngle > 180:
                ptAngle_arc = ptAngle_arc - 180
        ptArc = ptCenter.pointProjected(dist, ptAngle_arc)

        return cls(ptStart, ptEnd, ptArc)

    def exportToQgsGeometryPolyline(self, method="angle",
                                    interValue=1):
        """Export CADCircle to a QgsGeometry (Polyline)"""
        ptStart = self._ptStart
        ptArc = self._ptArc
        ptEnd = self._ptEnd

        if ptArc == ptEnd:
            return QgsGeometry.fromPolyline([ptStart.toQgsGeometry(),
                                             ptEnd.toQgsGeometry()])

        if self._ptCenter is None:
            return None

        center = self._ptCenter
        coords = []
        coords.append(ptStart.toQgsPoint())

        cx = center.x
        cy = center.y

        px = ptArc.x
        py = ptArc.y

        r = ((cx - px) * (cx - px) + (cy - py) * (cy - py)) ** 0.5

        # If the method is "pitch" (=Pfeilhöhe) then
        # we need to calculate the corresponding
        # angle.
        if method == "pitch":
            myAlpha = 2.0 * math.acos(1.0 - (interValue / 1000.0) / r)
            arcIncr = myAlpha
        else:
            arcIncr = interValue * math.pi / 180

        a1 = math.atan2(ptStart.y - center.y, ptStart.x - center.x)
        a2 = math.atan2(ptArc.y - center.y, ptArc.x - center.x)
        a3 = math.atan2(ptEnd.y - center.y, ptEnd.x - center.x)

        # Clockwise
        if a1 > a2 and a2 > a3:
            sweep = a3 - a1

        # Counter-clockwise
        elif a1 < a2 and a2 < a3:
            sweep = a3 - a1

        # Clockwise, wrap
        elif (a1 < a2 and a1 > a3) or (a2 < a3 and a1 > a3):
            sweep = a3 - a1 + 2 * math.pi

        # Counter-clockwise, wrap
        elif (a1 > a2 and a1 < a3) or (a2 > a3 and a1 < a3):
            sweep = a3 - a1 - 2 * math.pi

        else:
            sweep = 0.0

        ptcount = int(math.ceil(math.fabs(sweep / arcIncr)))

        if sweep < 0:
            arcIncr *= -1.0

        angle = a1

        for i in range(0,  ptcount-1):
            angle += arcIncr

            if arcIncr > 0.0 and angle > math.pi:
                angle -= 2*math.pi

            if arcIncr < 0.0 and angle < -1*math.pi:
                angle -= 2*math.pi

            x = cx + r * math.cos(angle)
            y = cy + r * math.sin(angle)

            point = QgsPoint(x, y)
            coords.append(point)

            if angle < a2 and (angle + arcIncr) > a2:
                coords.append(ptArc.toQgsPoint())

            if angle > a2 and (angle + arcIncr) < a2:
                coords.append(ptArc.toQgsPoint())

        coords.append(ptEnd.toQgsPoint())
        g = QgsGeometry.fromPolyline(coords)
        return g

    def exportToQgsGeometryPolygone(self, method="angle",
                                    interValue=1, polygon="pie"):

        """Export CADCircle to a QgsGeometry (Polygon)"""
        geom = self.exportToQgsGeometryPolyline(method, interValue)

        if polygon == "pie":
            if geom and self._ptCenter is not None:
                geom.insertVertex(self._ptCenter.x, self._ptCenter.y, 0)

        return geom.convertToType(QGis.Polygon)

    if CIRCSTRING:
        def exportToQgsCircularStringV2(self):
            """Export CADCircle to a QgsCircularStringV2"""
            QgsCircString = QgsCircularStringV2()
            QgsCircString.setPoints([QgsPointV2(p) for p in [self._ptStart,
                                                             self._ptArc,
                                                             self._ptEnd]])

            return QgsCircString
