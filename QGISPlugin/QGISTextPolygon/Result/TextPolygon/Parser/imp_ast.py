# coding=utf-8

# for plugin
from ..CADShape.CADCircularArc import CADCircularArc
from ..CADShape.CADCircle import CADCircle
from TextPolygon import TextPolygonGlobal

# for debug
#from CADShape.CADCircularArc import CADCircularArc
#from CADShape.CADCircle import CADCircle

from qgis.core import *

def get_stmt_list(stmt):
    stmt_list = []

    if not isinstance(stmt, CompoundStatement):
        stmt_list.append(stmt)
        return stmt_list

    while isinstance(stmt, CompoundStatement):
        if isinstance(stmt.first, CompoundStatement):
            stmt_list.append(stmt.second)
            stmt = stmt.first
        else:
            stmt_list.append(stmt.second)
            stmt_list.append(stmt.first)
            break

    stmt_list.reverse()

    return stmt_list

class Statement:
    pass


class ArcStatement(Statement):
    def __init__(self, fromlat, fromlng, tolat, tolng, centerlat, centerlng, direction):
        self.startPt = TextPolygonGlobal.getTrasnformPoint(fromlat, fromlng)
        self.endPt = TextPolygonGlobal.getTrasnformPoint(tolat, tolng)
        self.centerPt = TextPolygonGlobal.getTrasnformPoint(centerlat, centerlng)
        self.direction = direction

    def __repr__(self):
        return 'ArcStatement'

    def run(self, pointlistlist):
        circulararc = CADCircularArc.byCenter2Points(self.centerPt, self.startPt, self.endPt, self.direction)

        geometry = circulararc.exportToQgsGeometryPolyline()

        arcpoints = geometry.asPolyline()

        arcpoints.pop()

        if len(pointlistlist) == 0:
            pointlistlist.append([])

        for point in arcpoints:
            pointlistlist[0].append(point)


class ThenArcStatment(Statement):
    def __init__(self, tolat, tolng, centerlat, centerlng, direction):
        self.endPt = TextPolygonGlobal.getTrasnformPoint(tolat, tolng)
        self.centerPt = TextPolygonGlobal.getTrasnformPoint(centerlat, centerlng)
        self.direction = direction

    def __repr__(self):
        return 'ThenArcStatment'

    def run(self, pointlistlist):
        startPt = pointlistlist[0].pop()

        circulararc = CADCircularArc.byCenter2Points(self.centerPt, startPt, self.endPt, self.direction)

        geometry = circulararc.exportToQgsGeometryPolyline()
        arcpoints = geometry.asPolyline()

        arcpoints.pop()

        if len(pointlistlist) == 0:
            pointlistlist.append([])

        for point in arcpoints:
            pointlistlist[0].append(point)


class PolygonStatment(Statement):
    def __init__(self, stmt, direction):
        self.stmtlist = get_stmt_list(stmt)
        self.direction = direction

    def __repr__(self):
        return 'PolygonStatment'

    def run(self, pointlistlist):
        pointlist = []

        for i, stmt in enumerate(self.stmtlist):
            pointlist.append(stmt.pt)

        if self.direction == -1:
            pointlist.reverse()

        pointlistlist.append(pointlist)


class CircleStatment(Statement):
    def __init__(self, centerlat, centerlng, radius, direction, unit):
        self.centerPt = TextPolygonGlobal.getTrasnformPoint(centerlat, centerlng)
        self.radius = radius
        self.direction = direction

        fromunit = QGis.Meters

        if unit == "NM":
            fromunit = QGis.NauticalMiles
        elif unit == "m":
            fromunit = QGis.Meters
        elif unit == "degree":
            fromunit = QGis.Degrees

        toUnit = QGis.Degrees

        if TextPolygonGlobal.CRSTransform is not None:
            toUnit = TextPolygonGlobal.CRSTransform.destCRS().mapUnits()

        self.radius = radius * QgsUnitTypes.fromUnitToUnitFactor(fromunit, toUnit)

    def __repr__(self):
        return 'CircleStatment'

    def run(self, pointlistlist):
        circle = CADCircle.byCenterRadius(self.centerPt, self.radius)

        geometry = circle.exportToQgsGeometry()
        points = geometry.asPolygon()

        if self.direction == -1:
            points[0].reverse()

        pointlistlist.append(points[0])


class ThenToStatment(Statement):
    def __init__(self, lat, lng):
        self.pt = TextPolygonGlobal.getTrasnformPoint(lat, lng)

    def __repr__(self):
        return 'ThenToStatment'

    def run(self, pointlistlist):
        if len(pointlistlist) == 0:
            pointlistlist.append([])

        pointlistlist[0].append(self.pt)


class LatLngStatment(Statement):
    def __init__(self, lat, lng):
        self.pt = TextPolygonGlobal.getTrasnformPoint(lat, lng)

    def __repr__(self):
        return 'LatLngStatment'

    def run(self, pointlistlist):
        if len(pointlistlist) == 0:
            pointlistlist.append([])

        pointlistlist[0].append(self.pt)


class CompoundStatement(Statement):
    def __init__(self, first, second):
        self.first = first
        self.second = second

    def __repr__(self):
        return 'CompoundStatement(%s, %s)' % (self.first, self.second)

    def eval(self, env):
        self.first.eval(env)
        self.second.eval(env)
