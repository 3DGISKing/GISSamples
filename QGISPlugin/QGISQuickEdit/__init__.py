# -*- coding: utf-8 -*-
"""
/***************************************************************************
 Quick Editing Attribute
                                 A QGIS plugin
 tool for quick editing attributes in field campaigns
                             -------------------
        begin                : 2019-02-19
        copyright            : (C) 2019 by haris
        email                :
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
 This script initializes the plugin, making it known to QGIS.
"""

# noinspection PyPep8Naming
def classFactory(iface):
    """Load QuickEdit class from file QuickEdit.

    :param iface: A QGIS interface instance.
    :type iface: QgsInterface
    """
    #

    from .QuickEdit import QuickEdit
    return QuickEdit(iface)
