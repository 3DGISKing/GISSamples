QT += core
QT -= gui


QT += core gui xml

CONFIG += c++11

TARGET = ShapefileConverter
CONFIG -= app_bundle

TEMPLATE = app

INCLUDEPATH += C:/OSGeo4W/include

LIBS += -lgdal_i
LIBS += -lsqlite3_i
LIBS += -lproj_i
LIBS += -L"C:/OSGeo4W/lib"

SOURCES += main.cpp \
    qgscoordinatereferencesystem.cpp \
    qgscoordinatetransform.cpp \
    qgscrscache.cpp \
    qgsfilterlineedit.cpp \
    qgsgenericprojectionselector.cpp \
    qgslocalec.cpp \
    qgsprojectionselector.cpp \
    shapefileconverter.cpp

# The following define makes your compiler emit warnings if you use
# any feature of Qt which as been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

RESOURCES += \
    shapefileconverter.qrc

FORMS += \
    qgsgenericprojectionselectorbase.ui \
    qgsprojectionselectorbase.ui \
    shapefileconverter.ui

HEADERS += \
    qgscoordinatereferencesystem.h \
    qgscoordinatereferencesystem_p.h \
    qgscoordinatetransform.h \
    qgscrscache.h \
    qgsfilterlineedit.h \
    qgsgenericprojectionselector.h \
    qgslocalec.h \
    qgsprojectionselector.h \
    shapefileconverter.h
