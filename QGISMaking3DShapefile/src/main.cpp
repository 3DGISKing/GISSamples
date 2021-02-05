#include "shapefileconverter.h"
#include <QtGui/QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    ShapefileConverter w;

    w.show();

    return a.exec();
}
