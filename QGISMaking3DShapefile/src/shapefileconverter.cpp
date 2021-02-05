#include "shapefileconverter.h"

#include <float.h>
#include <qmath.h>

#include <QtCore/QFile>
#include <QFileDialog>
#include <QDir>
#include <QFileInfo>
#include <QMessageBox>
#include <QTextStream>

#include "ogrsf_frmts.h"

#include "qgsgenericprojectionselector.h"
#include "qgscoordinatereferencesystem.h"
#include "qgscoordinatetransform.h"

CsvFileData::CsvFileData()
{
	_crsId = "EPSG:32617";
	clear();
}

void CsvFileData::addOneRowData(QString id, qreal tx, qreal ty, qreal th, qreal ox, qreal oy, qreal oh)
{
	CsvOneRowData rowdata;

	rowdata._id = id;
	rowdata._truePoint._X = tx;
	rowdata._truePoint._Y = ty;
	rowdata._truePoint._H = th;

	rowdata._observedPoint._X = ox;
	rowdata._observedPoint._Y = oy;
	rowdata._observedPoint._H = oh;

	this->_csvFileData.push_back(rowdata);
}	

void CsvFileData::computeErrorInfo()
{
	_averageDx = 0;
	_averageDy = 0;
	_averageDh = 0;
	_averageDs = 0;

	_maxDx = -DBL_MAX;
	_maxDy = -DBL_MAX;
	_maxDh = -DBL_MAX;
    _maxDs = -DBL_MAX;

	_minDx = DBL_MAX;
	_minDy = DBL_MAX;
	_minDh = DBL_MAX;
	_minDs = DBL_MAX;

	double ds;
	double dx;
	double dy;
	double dh;

    _RMSEx  = 0;
    _RMSEy = 0;
    _RMSEh = 0;
	
	for ( int i = 0 ; i < _csvFileData.size(); i++)
	{
		Point trueP   = _csvFileData[i]._truePoint;
		Point observP = _csvFileData[i]._observedPoint;

		dx = trueP._X - observP._X;
		dy = trueP._Y - observP._Y;
		dh = trueP._H - observP._H;

		ds = qSqrt(dx * dx + dy * dy);	


		_averageDx += dx;
		_averageDy += dy;
		_averageDh += dh;
		_averageDs += ds;

		if(_maxDx < dx)
			_maxDx = dx;

		if(_maxDy < dy)
			_maxDy = dy;

		if(_maxDh < dh)
			_maxDh = dh;

		if(_maxDs < ds)
			_maxDs = ds;

		if(_minDx > dx)
			_minDx = dx;

		if(_minDy > dy)
			_minDy = dy;

		if(_minDh > dh)
			_minDh = dh;

		if(_minDs > ds)
			_minDs = ds;

        _RMSEx = _RMSEx + dx * dx;
        _RMSEy = _RMSEy + dy * dy;
        _RMSEh = _RMSEh + dh * dh;
	}

	_averageDx /= _csvFileData.size();
	_averageDy /= _csvFileData.size();
	_averageDh /= _csvFileData.size();
	_averageDs /= _csvFileData.size();

    _RMSEx = qSqrt(_RMSEx / _csvFileData.size());
    _RMSEy = qSqrt(_RMSEy / _csvFileData.size());
    _RMSEh = qSqrt(_RMSEh / _csvFileData.size());

	_stdDevDx = 0;
	_stdDevDy = 0;
	_stdDevDh = 0;
	_stdDevDs = 0;
	
	for ( int i = 0 ; i < _csvFileData.size(); i++)
	{
		Point trueP   = _csvFileData[i]._truePoint;
		Point observP = _csvFileData[i]._observedPoint;

		dx = trueP._X - observP._X;
		dy = trueP._Y - observP._Y;
		dh = trueP._H - observP._H;

		ds = qSqrt(dx * dx + dy * dy);	

		_stdDevDx = _stdDevDx + (dx - _averageDx) * (dx - _averageDx);
		_stdDevDy = _stdDevDy + (dy - _averageDy) * (dy - _averageDy);
		_stdDevDh = _stdDevDh + (dh - _averageDh) * (dh - _averageDh);
		_stdDevDs = _stdDevDs + (ds - _averageDs) * (ds - _averageDs);
	}

	_stdDevDx = qSqrt(_stdDevDx / _csvFileData.size());
	_stdDevDy = qSqrt(_stdDevDy / _csvFileData.size());
	_stdDevDh = qSqrt(_stdDevDh / _csvFileData.size());
	_stdDevDs = qSqrt(_stdDevDs / _csvFileData.size());
}

void CsvFileData::writeShapefile(QString filename, double errorscale, QString authid)
{
	GDALAllRegister();

	const char *pszDriverName = "ESRI Shapefile";

	GDALDriver *poDriver;

	poDriver = GetGDALDriverManager()->GetDriverByName(pszDriverName );

	if( poDriver == NULL )
	{
		printf( "%s driver not available.\n", pszDriverName );
		exit( 1 );
	}

	QFileInfo info(filename);

	QString path = info.absolutePath();
	QString layername = info.baseName();

	GDALDataset *poDS;

	poDS = poDriver->Create( path.toLocal8Bit().data() , 0, 0, 0, GDT_Unknown, NULL );

	if( poDS == NULL )
	{
		printf( "Creation of output file failed.\n" );
		exit( 1 );
	}

	QgsCoordinateReferenceSystem srccrs(_crsId);
	QgsCoordinateReferenceSystem destcrs(authid);

	QgsCoordinateTransform transform(srccrs, destcrs);

	OGRSpatialReference ogrcrs;

	OGRErr err;

	QString    qstr = destcrs.toProj4();
	QByteArray bytearr = qstr.toLocal8Bit();

	char* buffer = bytearr.data();

	err = ogrcrs.importFromProj4(buffer);
	
	OGRLayer *poLayer;

	poLayer = poDS->CreateLayer( layername.toLocal8Bit().data(), &ogrcrs, wkbLineString25D, NULL );

	if( poLayer == NULL )
	{
		printf( "Layer creation failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn pointidField( "PointID", OFTString );
	pointidField.SetWidth(32);

	if( poLayer->CreateField( &pointidField ) != OGRERR_NONE )
	{
		printf( "Creating PointID field failed.\n" );
		exit( 1 );
	}


	OGRFieldDefn txField( "tX", OFTReal);
	txField.SetPrecision(5);

	if( poLayer->CreateField( &txField ) != OGRERR_NONE )
	{
		printf( "Creating  tX field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn tyField( "tY", OFTReal);
	tyField.SetPrecision(5);

	if( poLayer->CreateField( &tyField ) != OGRERR_NONE )
	{
		printf( "Creating tY field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn thField( "tH", OFTReal);
	thField.SetPrecision(5);

	if( poLayer->CreateField( &thField ) != OGRERR_NONE )
	{
		printf( "Creating tH field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn oxField( "oX", OFTReal);
	oxField.SetPrecision(5);

	if( poLayer->CreateField( &oxField ) != OGRERR_NONE )
	{
		printf( "Creating oX field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn oyField( "oY", OFTReal);
	oyField.SetPrecision(5);

	if( poLayer->CreateField( &oyField ) != OGRERR_NONE )
	{
		printf( "Creating oY field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn ohField( "oH", OFTReal);
	ohField.SetPrecision(5);

	if( poLayer->CreateField( &ohField ) != OGRERR_NONE )
	{
		printf( "Creating oH field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn dxField( "dx", OFTReal);
	dxField.SetPrecision(5);

	if( poLayer->CreateField( &dxField ) != OGRERR_NONE )
	{
		printf( "Creating dx field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn dyField( "dy", OFTReal);
	dyField.SetPrecision(5);

	if( poLayer->CreateField( &dyField ) != OGRERR_NONE )
	{
		printf( "Creating dy field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn dhField( "dh", OFTReal);
	dhField.SetPrecision(5);

	if( poLayer->CreateField( &dhField ) != OGRERR_NONE )
	{
		printf( "Creating dh field failed.\n" );
		exit( 1 );
	}

	OGRFieldDefn dsField( "ds", OFTReal);
	dsField.SetPrecision(5);

	if( poLayer->CreateField( &dsField ) != OGRERR_NONE )
	{
		printf( "Creating ds field failed.\n" );
		exit( 1 );
	}

	double ds;
	double dx;
	double dy;
	double dh;

	for ( int i = 0; i < _csvFileData.size(); i++)
	{
		Point trueP   = _csvFileData[i]._truePoint;
		Point observP = _csvFileData[i]._observedPoint;

		dx = trueP._X - observP._X;
		dy = trueP._Y - observP._Y;
		dh = trueP._H - observP._H;

		ds = qSqrt(dx * dx + dy * dy);	

		OGRFeature *poFeature;
		poFeature = OGRFeature::CreateFeature( poLayer->GetLayerDefn() );

		poFeature->SetField( "PointID", _csvFileData[i]._id.toLocal8Bit().data());
		poFeature->SetField( "tX", trueP._X);
		poFeature->SetField( "tY", trueP._Y);
		poFeature->SetField( "tH", trueP._H);

		poFeature->SetField( "oX", observP._X);
		poFeature->SetField( "oY", observP._Y);
		poFeature->SetField( "oH", observP._H);

		poFeature->SetField( "dx", dx);
		poFeature->SetField( "dy", dy);
		poFeature->SetField( "dh", dh);
        poFeature->SetField( "ds",  ds);

		OGRLinearRing line;

		double x, y, h;

		x = trueP._X;
		y = trueP._Y;
		h = 0;

		transform.transformInPlace(x, y, h);

		line.addPoint(x, y, trueP._H);

		x = trueP._X + errorscale * dx;
		y = trueP._Y + errorscale * dy;
		h = 0;

		transform.transformInPlace(x, y, h);

		line.addPoint(x, y, trueP._H + errorscale * dh);

		poFeature->SetGeometry( &line );

		if( poLayer->CreateFeature( poFeature ) != OGRERR_NONE )
		{
			printf( "Failed to create feature in shapefile.\n" );
			exit( 1 );
		}

		OGRFeature::DestroyFeature( poFeature );
	}

	GDALClose( poDS );
}

void CsvFileData::clear()
{
	_csvFileData.clear();

	_averageDx = 0;
	_averageDy = 0;
	_averageDh = 0;
	_averageDs = 0;

	_maxDx = 0;
	_maxDy = 0;
	_maxDh = 0;
	_maxDs = 0;

	_minDx = 0;
	_minDy = 0;
	_minDh = 0;
	_minDs = 0;

	_stdDevDx = 0;
	_stdDevDy = 0;
	_stdDevDh = 0;
	_stdDevDs = 0;
}

ShapefileConverter::ShapefileConverter(QWidget *parent, Qt::WFlags flags)
	: QMainWindow(parent, flags)
{
	ui.setupUi(this);

	QgsCoordinateReferenceSystem crs(_csvFileData._crsId);

	ui.textEditInputCRS->setText(crs.toWkt());

	_outpurCRSId = "EPSG:4326";
	QgsCoordinateReferenceSystem destcrs(_outpurCRSId);

	ui.textEditOutputCRS->setText(destcrs.toWkt());

    ui.pushButtonSaveStatTable->setVisible(false);
}

ShapefileConverter::~ShapefileConverter()
{

}

//path must be exist

void ShapefileConverter::readCsvFile(QString filename)
{
	QFile file(filename);
		
    if (file.open(QIODevice::ReadOnly | QIODevice::Text))
	{
		
		bool firstline = true;

		while (!file.atEnd())
		{
			QString line = file.readLine();

			QStringList list = line.split(",");

			if(list.size() < 7)
				continue;

			bool dataok= true;

			for (int i =0; i< 7; i++)
			{
				QString data = list[i];

				data.trimmed();

				if(data.isEmpty())
				{
					dataok = false;
					break;
				}
			}

			if(dataok == false)
				continue;

			if(firstline)
			{
				firstline = false;
				continue;
			}

			this->_csvFileData.addOneRowData(list[0], list[1].toDouble(), list[2].toDouble(),list[3].toDouble(),
				                                      list[4].toDouble(),list[5].toDouble(),list[6].toDouble());
		}

		file.close();
	}

	_csvFileData.computeErrorInfo();
}

void ShapefileConverter::on_pushButtonCsvFileOpen_clicked()
{
	QString fileName = QFileDialog::getOpenFileName(this, tr("Open csv File"),
		QDir::rootPath(),
		tr("csvFile (*.csv)"));

	if(fileName.isEmpty())
		return;

	QFileInfo info(fileName);

	QDir::setCurrent(info.absolutePath());

	ui.lineEditCsvFilePath->setText(fileName);
	
	_csvFileData.clear();
	
	readCsvFile(fileName);	
	
	ui.lineEditMindx->setText(QString::number(_csvFileData._minDx, 'g', 10));
	ui.lineEditMindy->setText(QString::number(_csvFileData._minDy,'g', 10));
	ui.lineEditMindh->setText(QString::number(_csvFileData._minDh,'g', 10));
	ui.lineEditMinds->setText(QString::number(_csvFileData._minDs,'g', 10));

	ui.lineEditMaxdx->setText(QString::number(_csvFileData._maxDx, 'g', 10));
	ui.lineEditMaxdy->setText(QString::number(_csvFileData._maxDy, 'g', 10));
	ui.lineEditMaxdh->setText(QString::number(_csvFileData._maxDh, 'g', 10));
	ui.lineEditMaxds->setText(QString::number(_csvFileData._maxDs, 'g', 10));

	ui.lineEditAveragedx->setText(QString::number(_csvFileData._averageDx, 'g', 10));
	ui.lineEditAveragedy->setText(QString::number(_csvFileData._averageDy, 'g', 10));
	ui.lineEditAveragedh->setText(QString::number(_csvFileData._averageDh, 'g', 10));
	ui.lineEditAverageds->setText(QString::number(_csvFileData._averageDs, 'g', 10));

	ui.lineEditStddevdx->setText(QString::number(_csvFileData._stdDevDx, 'g', 10));
	ui.lineEditStddevdy->setText(QString::number(_csvFileData._stdDevDy, 'g', 10));
	ui.lineEditStddevdh->setText(QString::number(_csvFileData._stdDevDh, 'g', 10));
	ui.lineEditStddevds->setText(QString::number(_csvFileData._stdDevDs, 'g', 10));

	ui.lineEditRangedx->setText(QString::number(_csvFileData._maxDx - _csvFileData._minDx, 'g', 10));
	ui.lineEditRangedy->setText(QString::number(_csvFileData._maxDy - _csvFileData._minDy, 'g', 10));
	ui.lineEditRangedh->setText(QString::number(_csvFileData._maxDh - _csvFileData._minDh, 'g', 10));
	ui.lineEditRangeds->setText(QString::number(_csvFileData._maxDs - _csvFileData._minDs, 'g', 10));

    ui.lineEditRMSEx->setText(QString::number(_csvFileData._RMSEx, 'g', 10));
    ui.lineEditRMSEy->setText(QString::number(_csvFileData._RMSEy, 'g', 10));
    ui.lineEditRMSEh->setText(QString::number(_csvFileData._RMSEh, 'g', 10));
}

void ShapefileConverter::on_pushButtonSave_clicked()
{
	if(_csvFileData.size() == 0)
	{
		QMessageBox::critical ( this, "Error", "No data imported!");
		return;
	}

    QString fileName = QFileDialog::getSaveFileName(this, tr("Save Shape File"),
		QDir::currentPath(),
		tr("Esri Shapefile (*.shp)"));

	if(fileName.isEmpty())
		return;

    bool ok;

    double errroscale = ui.lineEditErrorScale->text().toDouble(&ok);

    if(ok == false)
    {
         QMessageBox::critical(this, "Error", "Please input error exaggeration factor !");
        return;
    }

	_csvFileData.writeShapefile(fileName, errroscale, _outpurCRSId);

    QFileInfo info(fileName);

    fileName = info.absolutePath() + QDir::separator() + info.baseName() + ".csv";

    QFile file(fileName);

    if (file.open(QFile::WriteOnly))
    {
        QTextStream out(&file);

        out<<",dx,dy,dh,\"ds			\"\n";
        out<<"Min,"<<_csvFileData._minDx<<","<<_csvFileData._minDy<<","<<_csvFileData._minDh<<","<<_csvFileData._minDs<<"\n";
        out<<"Max,"<<_csvFileData._maxDx<<","<<_csvFileData._maxDy<<","<<_csvFileData._maxDh<<","<<_csvFileData._maxDs<<"\n";
        out<<"Range,"<<_csvFileData._maxDx -_csvFileData._minDx<<","<<_csvFileData._maxDy -_csvFileData._minDy<<","<<_csvFileData._maxDh - _csvFileData._minDh<<","<<_csvFileData._maxDs -_csvFileData._minDs<<"\n";
        out<<"Average,"<<_csvFileData._averageDx<<","<<_csvFileData._averageDy<<","<<_csvFileData._averageDh<<","<<_csvFileData._averageDs<<"\n";
        out<<"Std Dev,"<<_csvFileData._stdDevDx<<","<<_csvFileData._stdDevDy<<","<<_csvFileData._stdDevDh<<","<<_csvFileData._stdDevDs<<"\n";
        out<<"RMSE,"<<_csvFileData._RMSEx<<","<<_csvFileData._RMSEy<<","<<_csvFileData._RMSEh<<","<<"\n";
        out<<"Exaggeration Factor,"<<ui.lineEditErrorScale->text()<<",,,";

        file.close();
    }

}

void ShapefileConverter::on_pushButtonOutputCRS_clicked()
{
	QgsGenericProjectionSelector  projdlg(this);

	if( projdlg.exec() == QDialog::Accepted)
	{
		QString selectedAuthId = projdlg.selectedAuthId();

		this->_outpurCRSId = selectedAuthId;

		QgsCoordinateReferenceSystem crs(selectedAuthId);

		ui.textEditOutputCRS->setText(crs.toWkt());
	}
}

void ShapefileConverter::on_pushButtonInputCRS_clicked()
{
	QgsGenericProjectionSelector  projdlg(this);

	if( projdlg.exec() == QDialog::Accepted)
	{
		QString selectedAuthId = projdlg.selectedAuthId();

		_csvFileData._crsId = selectedAuthId;

		QgsCoordinateReferenceSystem crs(selectedAuthId);

		ui.textEditInputCRS->setText(crs.toWkt());
	}
}

void ShapefileConverter::on_lineEditErrorScale_editingFinished()
{
    bool ok;

    ui.lineEditErrorScale->text().toDouble(&ok);

    if(ok == false)
    {
        QMessageBox::critical(this, "Error", "Please input number!");
        ui.lineEditErrorScale->setText("");
    }
}

void ShapefileConverter::on_pushButtonSaveStatTable_clicked()
{
    QString filename = ui.lineEditCsvFilePath->text();

    if (filename.isEmpty())
    {
        QMessageBox::critical ( this, "Error", "No data imported!");
        return;
    }

    QFileInfo info(filename);

    filename = info.absolutePath() + QDir::separator() + info.baseName() + ".csv";

    QMessageBox::critical ( this, "Error", filename);

    QFile file(filename);

    if (file.open(QIODevice::Text))
    {
        QTextStream out(&file);

        out<<",dx,dy,dh,\"ds			\"\n";
        out<<"Min,"<<_csvFileData._minDx<<_csvFileData._minDy<<_csvFileData._minDh<<_csvFileData._minDs<<"\n";
        out<<"Max,"<<_csvFileData._maxDx<<_csvFileData._maxDy<<_csvFileData._maxDh<<_csvFileData._maxDs<<"\n";
        out<<"Range,"<<_csvFileData._maxDx -_csvFileData._minDx<<_csvFileData._maxDy -_csvFileData._minDy<<_csvFileData._maxDh - _csvFileData._minDh<<_csvFileData._maxDs -_csvFileData._minDs<<"\n";
        out<<"Average,"<<_csvFileData._averageDx<<_csvFileData._averageDy<<_csvFileData._averageDh<<_csvFileData._averageDs<<"\n";
        out<<"Std Dev,"<<_csvFileData._stdDevDx<<_csvFileData._stdDevDy<<_csvFileData._stdDevDh<<_csvFileData._stdDevDs<<"\n";
        out<<"RMSE,"<<_csvFileData._RMSEx<<_csvFileData._RMSEy<<_csvFileData._RMSEh<<","<<"\n";
        out<<"Exaggeration Factor,"<<ui.lineEditErrorScale->text()<<",,,";

        file.close();
    }

     QMessageBox::information ( this, "Shapefile Converter", "successful!");
}

