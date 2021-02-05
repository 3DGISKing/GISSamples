/***************************************************************************
                          qgsgenericprojectionselector.cpp
                    Set user defined CRS using projection selector widget
                             -------------------
    begin                : May 28, 2004
    copyright            : (C) 2004 by Gary E.Sherman
    email                : sherman at mrcc.com
 ***************************************************************************/

/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 ***************************************************************************/

#include <qgsgenericprojectionselector.h>
#include <QtGui/QApplication>
#include <QSettings>

/**
 * \class QgsGenericProjectionSelector
 * \brief A generic dialog to prompt the user for a Coordinate Reference System
 */
QgsGenericProjectionSelector::QgsGenericProjectionSelector( QWidget * parent, Qt::WindowFlags f )
    : QDialog( parent, f )
{
  setupUi( this );

  QSettings settings;
  restoreGeometry( settings.value( "/Windows/ProjectionSelector/geometry" ).toByteArray() );

  //we will show this only when a message is set
  textEdit->hide();

  //apply selected projection upon double click on item
  connect( projectionSelector, SIGNAL( projectionDoubleClicked() ), this, SLOT( accept() ) );
}

void QgsGenericProjectionSelector::setMessage( QString theMessage )
{
  //short term kludge to make the layer selector default to showing
  //a layer projection selection message. If you want the selector
  if ( theMessage.isEmpty() )
  {
    // Set up text edit pane
    QString format( "<h1>%1</h1>%2 %3" );
    QString header = tr( "Define this layer's coordinate reference system:" );
    QString sentence1 = tr( "This layer appears to have no projection specification." );
    QString sentence2 = tr( "By default, this layer will now have its projection set to that of the project, "
                            "but you may override this by selecting a different projection below." );
    theMessage = format.arg( header, sentence1, sentence2 );
  }

  QString myStyle = reportStyleSheet();
  theMessage = "<head><style>" + myStyle + "</style></head><body>" + theMessage + "</body>";
  textEdit->setHtml( theMessage );
  textEdit->show();
}

QString QgsGenericProjectionSelector::reportStyleSheet()
{
	//
	// Make the style sheet desktop preferences aware by using qappliation
	// palette as a basis for colors where appropriate
	//
	//  QColor myColor1 = palette().highlight().color();
	QColor myColor1( Qt::lightGray );
	QColor myColor2 = myColor1;
	myColor2 = myColor2.lighter( 110 ); //10% lighter
	QString myStyle;
	myStyle = "p.glossy{ background-color: qlineargradient(x1:0, y1:0, x2:0, y2:1, "
		"  stop: 0 " + myColor1.name()  + ","
		"  stop: 0.1 " + myColor2.name() + ","
		"  stop: 0.5 " + myColor1.name()  + ","
		"  stop: 0.9 " + myColor2.name() + ","
		"  stop: 1 " + myColor1.name() + ");"
		"  color: black;"
		"  padding-left: 4px;"
		"  padding-top: 20px;"
		"  padding-bottom: 8px;"
		"  border: 1px solid #6c6c6c;"
		"}"
		"p.subheaderglossy{ background-color: qlineargradient(x1:0, y1:0, x2:0, y2:1, "
		"  stop: 0 " + myColor1.name()  + ","
		"  stop: 0.1 " + myColor2.name() + ","
		"  stop: 0.5 " + myColor1.name()  + ","
		"  stop: 0.9 " + myColor2.name() + ","
		"  stop: 1 " + myColor1.name() + ");"
		"  font-weight: bold;"
		"  font-size: medium;"
		"  line-height: 1.1em;"
		"  width: 100%;"
		"  color: black;"
		"  padding-left: 4px;"
		"  padding-right: 4px;"
		"  padding-top: 20px;"
		"  padding-bottom: 8px;"
		"  border: 1px solid #6c6c6c;"
		"}"
		"th.glossy{ background-color: qlineargradient(x1:0, y1:0, x2:0, y2:1, "
		"  stop: 0 " + myColor1.name()  + ","
		"  stop: 0.1 " + myColor2.name() + ","
		"  stop: 0.5 " + myColor1.name()  + ","
		"  stop: 0.9 " + myColor2.name() + ","
		"  stop: 1 " + myColor1.name() + ");"
		"  color: black;"
		"  border: 1px solid #6c6c6c;"
		"}"
		".overview{ font: 1.82em; font-weight: bold;}"
		"body{  background: white;"
		"  color: black;"
		"  font-family: arial,sans-serif;"
		"}"
		"h1{  background-color: #F6F6F6;"
		"  color: #8FB171; "
		"  font-size: x-large;  "
		"  font-weight: normal;"
		"  font-family: luxi serif, georgia, times new roman, times, serif;"
		"  background: none;"
		"  padding: 0.75em 0 0;"
		"  margin: 0;"
		"  line-height: 3em;"
		"}"
		"h2{  background-color: #F6F6F6;"
		"  color: #8FB171; "
		"  font-size: medium;  "
		"  font-weight: normal;"
		"  font-family: luxi serif, georgia, times new roman, times, serif;"
		"  background: none;"
		"  padding: 0.75em 0 0;"
		"  margin: 0;"
		"  line-height: 1.1em;"
		"}"
		"h3{  background-color: #F6F6F6;"
		"  color: #729FCF;"
		"  font-family: luxi serif, georgia, times new roman, times, serif;"
		"  font-weight: bold;"
		"  font-size: large;"
		"  text-align: right;"
		"  border-bottom: 5px solid #DCEB5C;"
		"}"
		"h4{  background-color: #F6F6F6;"
		"  color: #729FCF;"
		"  font-family: luxi serif, georgia, times new roman, times, serif;"
		"  font-weight: bold;"
		"  font-size: medium;"
		"  text-align: right;"
		"}"
		"h5{    background-color: #F6F6F6;"
		"   color: #729FCF;"
		"   font-family: luxi serif, georgia, times new roman, times, serif;"
		"   font-weight: bold;"
		"   font-size: small;"
		"   text-align: right;"
		"}"
		"a{  color: #729FCF;"
		"  font-family: arial,sans-serif;"
		"  font-size: small;"
		"}"
		"label{  background-color: #FFFFCC;"
		"  border: 1px solid black;"
		"  margin: 1px;"
		"  padding: 0px 3px; "
		"  font-size: small;"
		"}";
	return myStyle;
}

//! Destructor
QgsGenericProjectionSelector::~QgsGenericProjectionSelector()
{
  QSettings settings;
  settings.setValue( "/Windows/ProjectionSelector/geometry", saveGeometry() );
}

void QgsGenericProjectionSelector::setSelectedCrsName( const QString& theName )
{
  projectionSelector->setSelectedCrsName( theName );
}

void QgsGenericProjectionSelector::setSelectedCrsId( long theID )
{
  projectionSelector->setSelectedCrsId( theID );
}

void QgsGenericProjectionSelector::setSelectedAuthId( const QString& theID )
{
  projectionSelector->setSelectedAuthId( theID );
}

long QgsGenericProjectionSelector::selectedCrsId()
{
  //@note don't use getSelectedWkt as that just returns the name part!
  return projectionSelector->selectedCrsId();
}

QString QgsGenericProjectionSelector::selectedAuthId()
{
  return projectionSelector->selectedAuthId();
}

void QgsGenericProjectionSelector::setOgcWmsCrsFilter( const QSet<QString>& crsFilter )
{
  projectionSelector->setOgcWmsCrsFilter( crsFilter );
}
