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

import math
from qgis.core import QgsPoint, QgsGeometry
from CADUtils import *


class CADPoint(object):
    def __init__(self, x=0.0, y=0.0, z=0.0, m=0.0):
        """Constructor."""
        if isinstance(x, QgsPoint):
            self._x = x.x()
            self._y = x.y()
        elif isinstance(x, CADPoint):
            self._x = x.x
            self._y = x.y
        else:
            self._x = x
            self._y = y
            self._z = z
            self._m = m

    def __repr__(self):
        return "CADPoint({}, {})".format(self._x, self._y)

    def __str__(self):
        return "CADPoint(%.3f, %.3f)" % (self._x, self._y)

    def __eq__(self, other, precision=False):
        """is Points equals"""
        if precision and isinstance(precision, (float, int, long)):
            if near(p1.x(), p2.x(), precision) and \
               near(p1.y(), p2.y(), precision):
                    return True
            return False

        elif self.x == other.x and self.y == other.y:
            return True
        else:
            return False

    def __add__(self, other):
        """Add other to self by incrementing self's coordinates by those of other.
        """

        if isinstance(other, CADPoint):
            return CADPoint(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        """Subtract two points, or subtract a factor from this point's
        coordinates."""
        return self + (-other)

    def __mul__(self, factor):
        """Multiply point's coordinates by a factor."""
        return CADPoint(self.x * factor, self.y * factor)

    def __div__(self, divisor):
        """Divide point's coordinates by a factor."""
        return CADPoint(self.x / divisor, self.y / divisor)

    __truediv__ = __div__

    def __neg__(self):
        """Negate the point."""
        return CADPoint(-self.x, -self.y)

    def __abs__(self):
        """Returns the distance between this point and the origin."""
        origin = CADPoint(0, 0)
        return CADPoint.distance(origin, self)

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, x):
        if isinstance(x, (float, long, int)):
            self._x = x
        else:
            raise AttributeError

    @property
    def y(self):
        return self._y

    @y.setter
    def y(self, y):
        if isinstance(y, (float, long, int)):
            self._y = y
        else:
            raise AttributeError

    @property
    def z(self):
        return self._z

    @z.setter
    def z(self, z):
        if isinstance(z, (float, long, int)):
            self._z = z
        else:
            raise AttributeError

    @property
    def m(self):
        return self._m

    @m.setter
    def m(self, m):
        if isinstance(m, (float, long, int)):
            self._m = m
        else:
            raise AttributeError

    def getAngleOfLineBetweenTwoPoints(self, p2):
        if not isinstance(p2, (QgsPoint, CADPoint)):
            raise AttributeError
        p2 = CADPoint(p2)
        xDiff = p2.x - self.x
        yDiff = p2.y - self.y

        angle = math.degrees(math.atan2(yDiff, xDiff))
        if angle < 0:
            return 360 + angle
        elif angle > 360:
            return 360 - angle
        return angle

    def pointProjected(self, length, angle):
        """
        Return a point projected on angle with the length
        """

        x = (self.x + length * math.cos(math.radians(angle)))
        y = (self.y + length * math.sin(math.radians(angle)))

        return CADPoint(x, y)

    def distance(self, p):
        """The Euclidean distance from self to point p.
        """
        if isinstance(p, (QgsPoint, CADPoint)):
            p = CADPoint(p)
            return math.sqrt((self.x - p.x)**2 + (self.y - p.y)**2)
        return None

    def midpoint(self, p):
        """The midpoint between self and point p.
        """
        if isinstance(p, (QgsPoint, CADPoint)):
            return ((self + CADPoint(p)) / 2)

        return None

    def dot(self, p2):
        """Return dot product of self with another Point."""
        if isinstance(p2, (QgsPoint, CADPoint)):
            x1, y1 = self.point2D()
            x2, y2 = CADPoint(p2).point2D()
            return x1*x2 + y1*y2
        return None

    def pointCompare(self, p2, precision=0.00001):
        if isinstance(p2, (QgsPoint, CADPoint)):
            self.__eq__(CADPoint(p2), precision)
        else:
            return False

    def toQgsPoint(self):
        return QgsPoint(self.x, self.y)

    def toQgsGeometry(self):
        return QgsGeometry.fromPoint(self.toQgsPoint())

    def point2D(self):
        return self.x, self.y

    def point3D(self):
        return self.x, self.y, self.z

    def point4D(self):
        return self.x, self.y, self.z, self.m

    @staticmethod
    def isCollinear(p0, p1, pCherche, precision=0.001):
        """Test if point pCherche is on left/on/right of the line [p0p1]
        1 left
        0 collinear
        -1 right
        """
        if not all(isinstance(p, (QgsPoint, CADPoint))
                   for p in [p0, p1, pCherche]):
            raise AttributeError

        p0 = CADPoint(p0)
        p1 = CADPoint(p1)
        pCherche = CADPoint(pCherche)

        sens = ((pCherche.x - p0.x) * (p1.y - p0.y) -
                (pCherche.y - p0.y) * (p1.x - p0.x)
                )

        if 0 <= sens <= precision:
            return 0
        elif sens > precision:
            return -1
        elif sens < -precision:
            return 1
        else:
            return 0
