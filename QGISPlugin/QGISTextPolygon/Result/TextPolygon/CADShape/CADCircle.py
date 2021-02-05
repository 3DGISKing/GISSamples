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

from qgis.core import (QgsPoint, QgsGeometry)
from CADPoint import *
try:
    from qgis.core import QgsPointV2, QgsCircularStringV2
    CIRCSTRING = True
except:
    CIRCSTRING = False

import math


class CADCircle(object):
    def __init__(self, pc, radius):
        if not isinstance(pc, (CADPoint, QgsPoint)) or \
           not isinstance(radius, (float, long, int)):
            raise AttributeError
        else:
            self._center = CADPoint(pc)
            self._radius = radius

    def __iter__(self, segments=36):
        for t in [(2 * math.pi) / segments * i for i in range(segments)]:
            yield self._center.pointProjected(self._radius, math.degrees(t))

    def __repr__(self):
        return "CADCircle({}, {})".format(self.center, self.radius)

    def __str__(self):
        s = "Circle:\n"
        s += "Center: %s\nRadius: %.3f\n" % (self.center, self.radius)
        s += "Area: %.3f\nPerimeter: %.3f\n" % (self.area, self.perimeter)

        return s

    def quadrant(self):
        """Return 4 coordinates [East, North, West, South]
        of circle's quadrant"""
        N = CADPoint(self._center.x, self._center.y + self._radius)
        S = CADPoint(self._center.x, self._center.y - self._radius)
        E = CADPoint(self._center.x + self._radius, self._center.y)
        W = CADPoint(self._center.x - self._radius, self._center.y)
        return [E, N, W, S]

    @property
    def center(self):
        return self._center

    @center.setter
    def center(self, pc):
        if not isinstance(pc, (CADPoint, QgsPoint)):
            raise AttributeError
        else:
            self._center = CADPoint(pc)

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, r):
        if not isinstance(radius, (float, long, int)):
            raise AttributeError
        else:
            self._radius = r

    @property
    def area(self):
        return math.pi * self.radius * self.radius

    @property
    def perimeter(self):
        return 2 * math.pi * self.radius

    @classmethod
    def by2Points(cls, p1, p2):
        """Create a CADCircle with 2 points (from diameter : AB)
          /------\
         |        |
         A        B
         |        |
          \------/
        """
        if not all(isinstance(p, (QgsPoint, CADPoint)) for p in [p1, p2]):
            raise AttributeError

        p1 = CADPoint(p1)
        p2 = CADPoint(p2)

        center = p1.midpoint(p2)
        radius = p1.distance(center)

        return cls(center, radius)

    @classmethod
    def by3Points(cls, p1, p2, p3, epsilon=1e-8):
        """Create a CADCircle with 3 points ABC
          /------\
         |        |
         A        C
         |        |
          \--B---/
        """
        if not all(isinstance(p, (QgsPoint, CADPoint)) for p in [p1, p2, p3]):
            raise AttributeError

        p1 = CADPoint(p1)
        p2 = CADPoint(p2)
        p3 = CADPoint(p3)

        # Paul Bourke's algorithm
        m_Center = CADPoint()
        m_dRadius = -1
        yDelta_a = p2.y - p1.y
        xDelta_a = p2.x - p1.x
        yDelta_b = p3.y - p2.y
        xDelta_b = p3.x - p2.x

        try:
            aSlope = yDelta_a / xDelta_a
        except ZeroDivisionError:
            return None

        try:
            bSlope = yDelta_b / xDelta_b
        except ZeroDivisionError:
            return None

        if (math.fabs(xDelta_a) <= epsilon and math.fabs(yDelta_b) <= epsilon):
            m_Center.x = (0.5 * (p2.x + p3.x))
            m_Center.y = (0.5 * (p1.y + p2.y))
            m_dRadius = m_Center.distance(p1)

            return cls(m_Center, m_dRadius)

        if math.fabs(aSlope-bSlope) <= epsilon:
            return None

        m_Center.x = (
                      (aSlope * bSlope * (p1.y - p3.y) +
                       bSlope * (p1.x + p2.x) -
                       aSlope * (p2.x + p3.x)) /
                      (2.0 * (bSlope - aSlope))
                     )
        m_Center.y = (
                      -1.0 * (m_Center.x - (p1.x + p2.x) / 2.0) /
                      aSlope + (p1.y + p2.y) / 2.0
                     )

        m_dRadius = m_Center.distance(p1)

        return cls(m_Center, m_dRadius)

    @classmethod
    def byCenterRadius(cls, pc, radius):
        """Create a CADCircle with 2 points (from radius : CA)
          /------\
         |        |
         A   C    |
         |        |
          \------/
        """
        if not isinstance(pc, (CADPoint, QgsPoint)) or \
           not isinstance(radius, (float, long, int)):
            raise AttributeError

        return cls(pc, radius)

    @classmethod
    def byCenterDiameter(cls, pc, diameter):
        """Create a CADCircle with 2 points (from diameter : AB)
          /------\
         |        |
         A        B
         |        |
          \------/
        """
        if not isinstance(pc, (CADPoint, QgsPoint)) or \
           not isinstance(diameter, (float, long, int)):
            raise AttributeError

        return cls(pc, radius / 2.0)

    @classmethod
    def byCenterPoint(cls, pc, p1):
        """Create a CADCircle by Extent CA
          /------\A
         |        |
         |   C    |
         |        |
          \------/
        """
        if not all(isinstance(p, (QgsPoint, CADPoint)) for p in [p1, pc]):
            raise AttributeError

        p1 = CADPoint(p1)
        pc = CADPoint(pc)

        return cls(pc, pc.distance(p1))
    # Todo: fromTangents

    def exportToQgsGeometry(self, segments=36):
        """Export CADCircle to a QgsGeometry (Polygon)"""
        points = list(self.__iter__(segments))

        return QgsGeometry.fromPolygon([[QgsPoint(p.x, p.y) for p in points]])

    if CIRCSTRING:
        def exportToQgsCircularStringV2(self):
            """Export CADCircle to a QgsCircularStringV2"""
            quadrant = self.quadrant()
            quad = [QgsPointV2(p.x, p.y) for p in quadrant] + \
                   [QgsPointV2(quadrant[0].x, quadrant[0].y)]
            QgsCircString = QgsCircularStringV2()
            QgsCircString.setPoints(quad)

            return QgsCircString
