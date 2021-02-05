# -*- coding: utf-8 -*-
"""
/***************************************************************************
Name			 	 : QuickWKT
Description          : GQuick WKT viewer
Date                 : 11/Oct/2010
copyright            : (C) 2010 by ItOpen
email                : info@itopen.it
 ***************************************************************************/

 This script initializes the plugin, making it known to QGIS.
"""


def classFactory(iface):

    from TextPolygon import TextPolygon

    return TextPolygon(iface)
