CRSTransform = None

from qgis.core import *


def getTrasnformPoint(lat, lng):
    origPt = QgsPoint(lng, lat)

    if CRSTransform is None:
        destPt = origPt
    else:
        destPt = CRSTransform.transform(origPt)

    return destPt

