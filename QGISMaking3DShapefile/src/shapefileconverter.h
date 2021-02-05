#ifndef SHAPEFILECONVERTER_H
#define SHAPEFILECONVERTER_H

#include <QString>
#include <QList>

struct Point {
	double _X; 
	double _Y; 
	double _H; 
};

struct CsvOneRowData {
	QString _id;

	Point _truePoint;
	Point _observedPoint;

	double _ds;
};

class CsvFileData {
public:
	CsvFileData();

	double _averageDx;
	double _averageDy;
	double _averageDh;
	double _averageDs;

	double _maxDx;
	double _maxDy;
	double _maxDh;
	double _maxDs;
	
	double _minDx;
	double _minDy;
	double _minDh;
	double _minDs;
	
	double _stdDevDx;
	double _stdDevDy;
	double _stdDevDh;
	double _stdDevDs;

    double _RMSEx;
    double _RMSEy;
    double _RMSEh;

	QString _crsId;

public:
	int size() {return _csvFileData.size() ;}
	void clear();
	void addOneRowData(QString id, qreal tx, qreal ty, qreal th, qreal ox, qreal oy, qreal oh);
	void computeErrorInfo();
	void writeShapefile(QString filename, double errorscale, QString authid);

	QList <CsvOneRowData> _csvFileData;

};

#include <QtGui/QMainWindow>
#include "ui_shapefileconverter.h"

class ShapefileConverter : public QMainWindow
{
	Q_OBJECT

public:
	ShapefileConverter(QWidget *parent = 0, Qt::WFlags flags = 0);
	~ShapefileConverter();

private slots:
	void on_pushButtonCsvFileOpen_clicked();
	void on_pushButtonSave_clicked();
    void on_pushButtonSaveStatTable_clicked();
	void on_pushButtonOutputCRS_clicked();
	void on_pushButtonInputCRS_clicked();
    void on_lineEditErrorScale_editingFinished();

public:
	void readCsvFile(QString path);

private:
	Ui::ShapefileConverterClass ui;

	CsvFileData _csvFileData;
	QString     _outpurCRSId;
};

#endif // SHAPEFILECONVERTER_H
