
//This class represent Edification Information System
define([
         'turf'
    ], function(
        turf) {

    'use strict';

    var EdfInfSysClass = L.Class.extend({
        initialize: function () {
            this._queriedEdificationStyle = {
                weight: 4,
                color: '#f6ff5b'
            };

            this._queriedAreaStyle = {
                weight: 4,
                color: '#ff150e'
            };

            L.mapbox.accessToken = 'pk.eyJ1Ijoia2thbmc2MjgiLCJhIjoiY2owODFxcTA5MDQ2MTMzcGQ5MXgwM3NpeSJ9.VI9WZmTbZQxAiXhY8AQ1Ww';

            this._propertyPopup = L.popup({
                maxWidth: 1000,
                maxHeight: 500,
                autoPan: false,
                closeButton: false
            });
            this._loadData();
            this._createControl();
        },

        _loadData: function () {
            var mapoption = {
                minZoom: 1,
                maxZoom: 22
            };

            var map = this._map = L.mapbox.map('map', null, mapoption);
            map.setView([45.06183, 7.6594], 16);

            var baseLayers = {
                Streets: L.mapbox.tileLayer('mapbox.streets'),
                Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
                Satellite: L.mapbox.tileLayer('mapbox.satellite')
            };

            baseLayers.Streets.addTo(map);

            this._areaLayer = L.mapbox.featureLayer();
            this._edificationLayer = L.mapbox.featureLayer();

            var featureLayers = {
                "Area": this._areaLayer,
                "Edification": this._edificationLayer
            };

            L.control.layers(baseLayers, featureLayers).addTo(map);

            this._edificationLayerStyle = {
                fillColor: '#ff5a19',
                fillOpacity: 1,
                weight: 1,
                color: '#464646'
            };


            var wfsserviceurl = this._readCookie('WFSServiceURL');

            wfsserviceurl = decodeURIComponent(wfsserviceurl);

            var wfstedification = new L.WFST({
                url:  wfsserviceurl,
                typeNS: 'ms',
                typeName: 'edification',
                crs: L.CRS.EPSG4326,
                geometryField: 'msGeometry'
            });

            wfstedification.once('load', function () {
                wfstedification.eachLayer(function (layer) {
                    //layer made by WFS service does not have geometry property of feature property,
                    //therefore we need to add geometry property manually!.

                    var geojson = layer.toGeoJSON();

                    layer.feature.geometry = geojson.geometry;

                    this._edificationLayer.addLayer(layer);

                    var popupHtml = this._getPropertyHtml(layer, 'Edification Property', 'geometria');

                    layer.bindPopup(popupHtml, {closeButton: false, autoPan: false, maxHeight: 250});
                }.bind(this));

                this._edificationLayer.setStyle(this._edificationLayerStyle);
                this._edificationLayer.addTo(map);

            }.bind(this));

            this._areaLayerStyle = {
                fillColor: '#312aff',
                fillOpacity: 1,
                weight: 1,
                color: '#464646'
            };

            var wfstarea = new L.WFST({
                url:  wfsserviceurl,
                typeNS: 'ms',
                typeName: 'area',
                crs: L.CRS.EPSG4326,
                geometryField: 'msGeometry',
            });

            wfstarea.once('load', function () {
                wfstarea.eachLayer(function (layer) {
                    //layer made by WFS service does not have geometry property of feature property,
                    //therefore we need to add geometry property manually!.

                    var geojson = layer.toGeoJSON();
                    layer.feature.geometry = geojson.geometry;

                    this._areaLayer.addLayer(layer);
                    var popupHtml = this._getPropertyHtml(layer, 'Area Property', '');

                    layer.bindPopup(popupHtml, {closeButton: false, autoPan: false});
                }.bind(this));

                //make query interface
                var properties = this._areaLayer.getLayers()[0].feature.properties;

                var fields = L.DomUtil.get('field_name');

                for (var fieldName in properties) {
                    var option = document.createElement('option');
                    option.innerHTML = fieldName;

                    fields.appendChild(option);
                }

                var applybutton = L.DomUtil.get('applybutton');
                L.DomEvent.addListener(applybutton, 'click', this._runAreaQuery, this);

                var clearbutton = L.DomUtil.get('clearbutton');
                L.DomEvent.addListener(clearbutton, 'click', this._clearAreaQuery, this);

                this._areaLayer.setStyle(this._areaLayerStyle);
                this._areaLayer.addTo(map);

            }.bind(this));

            map.on('popupclose', function (e) {

                //if(e.popup.options.closeButton == true) //This popup is not property popup
                this._clearSelection();
            }, this);
        },

        _readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');

            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },

        _createControl: function () {
            var map = this._map;

            this._editedFeatureGroup = L.featureGroup().addTo(map);

            var drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: this._editedFeatureGroup
                },
                draw: {
                    polygon: true,
                    polyline: false,
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            });

            drawControl.addTo(this._map);

            var drawsections = document.getElementsByClassName('leaflet-draw-section');

            drawsections[1].style = 'display: none;';

            map.on('draw:created', this._onSelectionFinished.bind(this));

            //create legend
            this._map.legendControl.addLegend(document.getElementById('legend').innerHTML);
        },

        _clearSelection: function () {
            this._editedFeatureGroup.clearLayers();
            this._initAreaLayerStyle();
            this._initEdificationLayerStyle();
        },

        _initEdificationLayerStyle: function () {
            this._edificationLayer.setStyle(this._edificationLayerStyle);
        },

        _initAreaLayerStyle: function () {
            this._areaLayer.setStyle(this._areaLayerStyle);
        },

        _clearAreaQuery: function () {
            this._initEdificationLayerStyle();
            this._initAreaLayerStyle();
        },

        _runAreaQuery: function () {
            var fieldValue = L.DomUtil.get('field_value').value;

            if (fieldValue == '') {
                alert("Please input value!");
                return;
            }

            if (isNaN(fieldValue)) {
                alert("Please input valid value!");
                return;
            }

            var fieldName = L.DomUtil.get('field_name').value;
            var operator = L.DomUtil.get('operator').value;

            var numValue = parseFloat(fieldValue);

            this._areaLayer.setFilter(function (f) {
                if (operator === '>')
                    return f.properties[fieldName] > numValue;
                else if (operator === '<')
                    return f.properties[fieldName] < numValue;
                else if (operator === '==')
                    return f.properties[fieldName] == numValue;
            });

            var filteredAreas = [];

            this._areaLayer.eachLayer(function (layer) {
                filteredAreas.push(layer);
            });

            //make again area layer to initial state
            this._areaLayer.setFilter(function (f) {
                return true;
            });

            this._initAreaLayerStyle();

            this._areaLayer.eachLayer(function (layer) {

                var popupHtml = this._getPropertyHtml(layer, 'Area Property', '');

                layer.bindPopup(popupHtml, {closeButton: false, autoPan: false});

            }.bind(this));

            for (var i = 0; i < filteredAreas.length; i++) {
                filteredAreas[i].setStyle(this._queriedAreaStyle);
            }

            this._initEdificationLayerStyle();

            var edifications = this._edificationLayer.getLayers();

            var edificationCount = 0;

            for (var ii = 0; ii < edifications.length; ii++) {
                for (var jj = 0; jj < filteredAreas.length; jj++) {
                    if (edifications[ii]._bounds.intersects(filteredAreas[jj]._bounds) == false)
                        continue;

                    if (turf.intersect(edifications[ii].feature, filteredAreas[jj].feature) != undefined) {
                        edifications[ii].setStyle(this._queriedEdificationStyle);
                        edificationCount++;
                    }
                }
            }

            if (edificationCount == 0)
                alert('No edification searched!');
        },

         //this function will be invoked when user has complete polygon drawing.
        _onSelectionFinished: function (event) {

            //first make geojson format polygon
            var selectionArea = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                }
            };

            var points = [];

            for (var i = 0; i < event.layer._latlngs[0].length; i++) {
                var latlng;

                latlng = event.layer._latlngs[0][i];
                points.push([latlng.lng, latlng.lat]);

                //make polygon
                // in polygon first point is identical to last point
                if (i == event.layer._latlngs[0].length - 1) {
                    latlng = event.layer._latlngs[0][0];
                    points.push([latlng.lng, latlng.lat]);
                }
            }

            selectionArea.geometry.coordinates.push(points);

            this._selectedAreaMarkers = [];
            this._selectedEdificationMarkers = [];

            this._edificationLayer.eachLayer(function (edification) {
                if (edification._bounds.intersects(event.layer._bounds) == false)
                    return;

                if (turf.intersect(edification.feature, selectionArea) != undefined) {
                    edification.setStyle(this._queriedEdificationStyle);
                    this._selectedEdificationMarkers.push(edification);
                }
            }.bind(this));

            this._areaLayer.eachLayer(function (area) {
                if (area._bounds.intersects(event.layer._bounds) == false)
                    return;

                if (turf.intersect(area.feature, selectionArea) != undefined) {
                    area.setStyle(this._queriedEdificationStyle);
                    this._selectedAreaMarkers.push(area);
                }
            }.bind(this));

            this._editedFeatureGroup.clearLayers(event.layer);
            this._editedFeatureGroup.addLayer(event.layer);

            this._selectedMarkers = [];
            //this._showResult(event);
            this._showSelectionPopup(event);
        },

        _showResult: function (event) {
            var propTableElement;

            if (this._selectedAreaMarkers.length == 0 && this._selectedEdificationMarkers.length > 0) {
                //only edifications selected!
                propTableElement = this._getPropertyTable(this._selectedEdificationMarkers);

                this._propertyPopup.layer = event.layer;
                this._propertyPopup.setLatLng(event.layer._bounds.getNorthWest());
                this._propertyPopup.setContent(propTableElement);
                this._propertyPopup.addTo(this._map);
            } else if (this._selectedAreaMarkers.length > 0 && this._selectedEdificationMarkers.length == 0) {
                //only areas selected!

                propTableElement = this._getPropertyTable(this._selectedAreaMarkers);

                this._propertyPopup.layer = event.layer;
                this._propertyPopup.setLatLng(event.layer._bounds.getNorthWest());
                this._propertyPopup.setContent(propTableElement);
                this._propertyPopup.addTo(this._map);
            }
            else if (this._selectedAreaMarkers.length > 0 && this._selectedEdificationMarkers.length > 0) {
                propTableElement = this._getCompoundPropertyTable(this._selectedEdificationMarkers, this._selectedAreaMarkers);

                this._propertyPopup.layer = event.layer;
                this._propertyPopup.setLatLng(event.layer._bounds.getNorthWest());
                this._propertyPopup.setContent(propTableElement);
                this._propertyPopup.addTo(this._map);
            }
            else { //no selected
                this._editedFeatureGroup.clearLayers(event.layer);
                alert("No selected!");
            }
        },

        _showSelectionPopup: function (event) {
            var parentdiv = document.createElement('div');
            parentdiv.style = "border: 4px solid #888;";

            var div1 = document.createElement('div');
            div1.style = "margin: -5px;";

            parentdiv.appendChild(div1);

            var areaButton = document.createElement("button");
            areaButton.innerHTML = "Area";
            areaButton.className = "button";
            areaButton.style = "margin-left: 6px;margin-right: 20px;";

            L.DomEvent.on(areaButton, 'click', function () {
                this._areaButtonClicked(event);
            }, this);

            div1.appendChild(areaButton);

            var buildingButton = document.createElement("button");
            buildingButton.innerHTML = "Building";
            buildingButton.className = "button";

            L.DomEvent.on(buildingButton, 'click', function () {
                this._buildingButtonClicked(event);
            }, this);

            div1.appendChild(buildingButton);

            var div2 = document.createElement('div');
            div2.style = "margin: -5px; text-align: center;";

            parentdiv.appendChild(div2);

            var simulationButton = document.createElement("button");
            simulationButton.innerHTML = "Simulation";
            simulationButton.className = "button";
            simulationButton.style = "margin-right: 10px;";

            L.DomEvent.on(simulationButton, 'click', function () {
                this._simulationButtonClicked(event);
            }, this);

            div2.appendChild(simulationButton);

            this._propertyPopup.layer = event.layer;
            this._propertyPopup.setLatLng(event.layer._bounds.getCenter());
            this._propertyPopup.setContent(parentdiv);

            this._propertyPopup.addTo(this._map);
        },

        _areaButtonClicked: function (event) {
            if (this._selectedAreaMarkers.length > 0) {
                //only areas selected!

                var propTableElement = this._getPropertyTable(this._selectedAreaMarkers);

                this._propertyPopup.layer = event.layer;
                this._propertyPopup.setLatLng(event.layer._bounds.getSouthWest());
                this._propertyPopup.setContent(propTableElement);
                this._propertyPopup.addTo(this._map);
            } else {
                alert("No area selected!");
            }
        },

        _buildingButtonClicked: function (event) {
            if (this._selectedEdificationMarkers.length > 0) {
                //only areas selected!

                var propTableElement = this._getPropertyTable(this._selectedEdificationMarkers);

                this._propertyPopup.layer = event.layer;
                this._propertyPopup.setLatLng(event.layer._bounds.getSouthWest());
                this._propertyPopup.setContent(propTableElement);
                this._propertyPopup.addTo(this._map);
            } else {
                alert("No edification selected!");
            }
        },

        _createSimulationPopup: function(event) {
            var simulationdivinnerhtml =
                ['<div style="border: 3px solid #888; border-bottom-width: 0; padding: 8px;text-align: center;  background-color: #B0B0B0;font-weight: bold; font-size: 20px">',
                    'DATE',
                    '</div>',

                    '<div style="border: 3px solid #888; border-bottom-width: 0; font-weight: bold;">',
                    '<table>',
                    '<tbody>',
                    '<tr>',
                    '<td>Start&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>',
					
					// bootstrap datetimepicker	
					'<td>',
					'<div class="input-group date col-md-5" id="startdate" data-date="1979/09/16 05:25" data-date-format="yyyy/mm/dd HH:ii">',
                    '<input style="border: 3px solid #888; width : 150px;"class="form-control" size="16" type="text" value="1979-09-16 05:25" >',
                    '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>',
                    '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>',
                    '</div>',
					'</td>',
									
					
                    '</tr>',
                    '<tr>',
                    '<td>End&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>',
					
					// bootstrap datetimepicker	
                    '<td>',
					'<div class="input-group date col-md-5" id="enddate" data-date="1979/09/16 05:25" data-date-format="yyyy/mm/dd HH:ii">',
                    '<input style="border: 3px solid #888; width : 150px;"class="form-control" size="16" type="text" value="1979-09-16 05:25" >',
                    '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>',
                    '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>',
                    '</div>',
					'</td>',
					
                    '</tr>',
                    '</tbody>',
                    '</table>',
                    '</div>',

                    '<div style="border: 3px solid #888; padding: 8px ; border-bottom-width: 0; text-align: center; background-color: #B0B0B0;font-weight: bold; font-size: 20px">',
                    'PV FEATURES',
                    '</div>',

                    '<div style="border: 3px solid #888; padding: 0; text-align: center; font-weight: bold;">',
                    '<table style="margin:5px; border-spacing: 1px">',
                    '<tbody>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;eta</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="eta" type="text" value = "0.20"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;alpha</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="alpha" type="text" value = "-0.0038"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;power</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="power" type="text" value = "333.33"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;square_meters</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="square_meters" type="text" value="1.63"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;Tc_noct</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="Tc_noct" type="text" value = "0"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;T_ex_noct</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="T_ex_noct" type="text" value="0"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;G_noct</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="G_noct" type="text" value="0"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;G_stc</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="G_stc" type="text" value="0"/></td>',
                    '</tr>',
                    '<tr>',
                    '<td style="text-align: left;">&nbsp;Tc_stc</td>',
                    '<td>&nbsp; <input style="border: 3px solid #888;" id="Tc_stc" type="text" value="0"/></td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',

                    '<div>',
                    '<button class = "button" id = "gobutton">GO</button>',
                    '</div>',
                    '</div>'].join('\n');

            var simulationdiv = document.createElement("div");

            simulationdiv.innerHTML = simulationdivinnerhtml;

            this._propertyPopup.layer = event.layer;
            this._propertyPopup.setLatLng(event.layer._bounds.getSouthWest());
            this._propertyPopup.setContent(simulationdiv);
            this._propertyPopup.addTo(this._map);

            //initialize control
			
			$("#startdate").datetimepicker(
			{ autoclose:true,
			  clearBtn:true	}
			);
			$("#enddate").datetimepicker(
			{
			  autoclose:true,
			  clearBtn:true
				});
		
			$("#startdate").datetimepicker("update", new Date());
			$("#enddate").datetimepicker("update", new Date());

            //establish event listener.

            var goButton = document.getElementById('gobutton');

            L.DomEvent.on(goButton, 'click', function () {
                this._goButtonClicked(event);
            }, this);
        },

        _simulationButtonClicked: function (event) {
            if (this._selectedEdificationMarkers.length == 0) {
                window.alert("No edification selected!");
                return;
            }

            this._createSimulationPopup(event);
        },

        _sendJsonStringToServer: function(startdate, enddate, eta, alpha, power, square_meters, Tc_noct, T_ex_noct, G_noct, G_stc, Tc_stc) {
            var result = {};

            result.startdate = startdate;
            result.enddate = enddate;
            result.decomposition_model = "Karatasou"; //As is, exactly like this
            result.station_id = "Man_01";             //As is, exactly like this

            var PV_features = {};
            PV_features.eta = eta;
            PV_features.alpha = alpha;
            PV_features.power = power;
            PV_features.square_meters = square_meters;
            PV_features.Tc_noct = Tc_noct;
            PV_features.T_ex_noct = T_ex_noct;
            PV_features.G_noct = G_noct;
            PV_features.G_stc = G_stc;
            PV_features.Tc_stc = Tc_stc;

            result.PV_features = PV_features;

            var suitable_area = {};

            //As is, exactly like this

            suitable_area.isToCalculate = "False";
            suitable_area.slope_min = "13";
            suitable_area.slope_max = "33";
            suitable_area.aspect_min = "234.5";
            suitable_area.aspect_max = "334.5";
            suitable_area.neighbour_number = "5";

            result.suitable_area = suitable_area;

            var buildings = {};
            buildings.type = "FeatureCollection";
            buildings.features = [];

            for (var i = 0; i < this._selectedEdificationMarkers.length; i++) {
                buildings.features.push(this._selectedEdificationMarkers[i].feature);
            }

            result.buildings = buildings;

            var jsonstring = JSON.stringify(result, null, '\t');
			
			var starttoken = [
				        '<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0/wpsExecute_request.xsd">',
						'<ows:Identifier>pv_calc</ows:Identifier>',
						'<ows:Title>Calculates suitable area for PV delpoyment</ows:Title>',
						'<wps:DataInputs>',
						'	<wps:Input minOccurs="1" maxOccurs="1">',
						'		<ows:Identifier>data_in</ows:Identifier>',
						'		<ows:Title>Input_data</ows:Title>',
						'		<wps:Data>',
						'		<wps:ComplexData>',
							].join('\n');
							
			var endtoken = [
				'</wps:ComplexData>',
				'</wps:Data>',
				'    </wps:Input>',
				'    </wps:DataInputs>',
				'<wps:ResponseForm><wps:RawDataOutput>',
				'<ows:Identifier>data_out</ows:Identifier>',
				'</wps:RawDataOutput>  </wps:ResponseForm></wps:Execute>',
			].join('\n');
			
			
			jsonstring = starttoken + '\n'+ jsonstring + '\n' + endtoken;

            $.ajax({
                type: "POST",
                url: "php/writejson.php",
                data: {jsonstring: jsonstring},
                error: function(jqXHR, textStatus, errorThrown) {
                    window.alert("Failed to send!")
                },
                success: function () {
                    window.alert("Successful to send!");
                }
            });
        },

        _goButtonClicked: function () {
            var strstartdate = $('#startdate').data('date'); 
			var strenddate = $('#enddate').data('date');
            var eta = document.getElementById('eta').value;
            var alpha = document.getElementById('alpha').value;
            var power = document.getElementById('power').value;
            var square_meters = document.getElementById('square_meters').value;
            var Tc_noct = document.getElementById('Tc_noct').value;
            var T_ex_noct = document.getElementById('T_ex_noct').value;
            var G_noct = document.getElementById('G_noct').value;
            var G_stc = document.getElementById('G_stc').value;
            var Tc_stc = document.getElementById('Tc_stc').value;


            var startdate = new Date(strstartdate);
            var enddate = new Date(strenddate);

            if (enddate > startdate)
                this._sendJsonStringToServer(strstartdate, strenddate, eta, alpha, power, square_meters, Tc_noct, T_ex_noct, G_noct, G_stc, Tc_stc);
            else
                alert("Can not upload data! end date is invalid. That should be after start date!");

            //close popup
            this._map.closePopup(this._propertyPopup);
        },

        _getPropertyHtml: function (layer, title, ignoredField) {
            var popupHtml = '<h3>' + title + '</h3>';

            var table = document.createElement('table');

            for (var key in layer.feature.properties) {
                if (key === ignoredField) {
                    continue;
                }

                var row = table.insertRow(-1);
                var th = document.createElement('th');
                th.innerHTML = key;
                row.appendChild(th);

                var td = document.createElement('td');
                if (layer.feature.properties.hasOwnProperty(key))
                    td.innerHTML = layer.feature.properties[key];
                row.appendChild(td);
            }

            popupHtml = popupHtml + table.outerHTML;

            return popupHtml;
        },

        //make HTML element
        _getPropertyTable: function (markers) {
            var pane = document.createElement('div');

            pane.style = 'overflow:auto;';

            var h1 = document.createElement('h1');

            h1.style = 'width: 100%; background: #888; color: #ffffff;  margin: 0; display: block; padding: 10px;  border-radius: 3px 3px 0 0; font-weight: 700;';

            var count = markers.length;
            h1.innerHTML = 'Property Table (' + count.toString() + ' features selected)';
            pane.appendChild(h1);

            var table = document.createElement('table');
            table.style = 'width: 100%; border: 1px solid black; border-collapse: collapse;';

            pane.appendChild(table);

            var header = document.createElement('thead');
            table.appendChild(header);

            var headertr = document.createElement('tr');
            header.appendChild(headertr);

            var properties = markers[0].feature.properties;

            //make headers
            for (var fieldname in properties) {
                var thele = document.createElement('th');
                thele.style = 'border: 1px solid black; border-collapse: collapse;';
                thele.innerHTML = '<span>' + fieldname + '</span>';

                header.appendChild(thele);
            }

            //make body
            var tbodyele = document.createElement('tbody');
            table.appendChild(tbodyele);

            for (var i = 0; i < markers.length; i++) {
                var trelement = document.createElement('tr');

                var key = L.Util.stamp(markers[i]);

                this._selectedMarkers[key] = markers[i];
                trelement.id = key;

                L.DomEvent.on(trelement, 'click', function () {
                    var trelement = event.currentTarget;
                    var id = trelement.id;
                    this._moveToMarker(id);
                }, this);

                for (var fieldname in markers[i].feature.properties) {
                    var tdele = document.createElement('td');
                    tdele.style = 'border: 1px solid black; border-collapse: collapse;';

                    if (markers[i].feature.properties[fieldname] != null) {
                        tdele.innerHTML = markers[i].feature.properties[fieldname].toString();
                    }

                    trelement.appendChild(tdele);
                }

                tbodyele.appendChild(trelement);
            }

            return pane;
        },

        _getCompoundPropertyTable: function (edificationMarkers, areaMarkers) {
            var pane = document.createElement('div');
            pane.classname = 'pane';
            pane.style = 'overflow:auto;';

            var h1 = document.createElement('h1');
            h1.style = 'width: 100%; background: #888; color: #ffffff;  margin-left: 0px; display: block; padding: 10px;  border-radius: 3px 3px 0 0; font-weight: 700;';

            var edificationCount = edificationMarkers.length;
            var areaCount = areaMarkers.length;

            h1.innerHTML = 'Edification ' + edificationCount.toString() + ', Area ' + areaCount.toString() + ' selected';
            pane.appendChild(h1);

            var table = document.createElement('table');
            table.style = 'width: 100%; border: 1px solid black; border-collapse: collapse;';

            pane.appendChild(table);

            var header = document.createElement('thead');
            table.appendChild(header);

            //make headers
            var headertr = document.createElement('tr');
            header.appendChild(headertr);

            var CASEele = document.createElement('th');
            CASEele.style = 'border: 1px solid black; border-collapse: collapse;';
            CASEele.innerHTML = '<span>' + 'CASE_NAME' + '</span>';

            header.appendChild(CASEele);

            var properties = areaMarkers[0].feature.properties;

            for (var fieldname in properties) {
                if (fieldname == 'Area_reale')
                    continue;

                var thele = document.createElement('th');

                thele.style = 'border: 1px solid black; border-collapse: collapse;';
                thele.innerHTML = '<span>' + fieldname + '</span>';

                header.appendChild(thele);
            }

            var intersectedAreaCount = 0;

            //make body
            var tbodyele = document.createElement('tbody');
            table.appendChild(tbodyele);

            for (var i = 0; i < edificationMarkers.length; i++) {

                var edification = edificationMarkers[i];

                for (var j = 0; j < areaMarkers.length; j++) {
                    var area = areaMarkers[j];

                    //insert new row
                    var trelement = document.createElement('tr');

                    var key = L.Util.stamp(edification);
                    this._selectedMarkers[key] = edification;
                    trelement.id = key;

                    L.DomEvent.on(trelement, 'click', function () {
                        var trelement = event.currentTarget;
                        var id = trelement.id;
                        this._moveToMarker(id);
                    }, this);

                    var CASEtd = document.createElement('td');
                    CASEtd.style = 'border: 1px solid black; border-collapse: collapse;';

                    if (edification.feature.properties['CASE_NAME'] != null)
                        CASEtd.innerHTML = edification.feature.properties['CASE_NAME'].toString();

                    trelement.appendChild(CASEtd);

                    if (turf.intersect(edification.feature, area.feature) != undefined) {
                        intersectedAreaCount++;

                        for (var fieldkey in area.feature.properties) {
                            if (fieldkey == 'Area_reale')
                                continue;

                            var tdele = document.createElement('td');
                            tdele.style = 'border: 1px solid black; border-collapse: collapse;';

                            if (area.feature.properties.hasOwnProperty(fieldkey))
                                if (area.feature.properties[fieldkey] != null) {
                                    tdele.innerHTML = area.feature.properties[fieldkey].toString();
                            }

                            trelement.appendChild(tdele);
                        }

                        tbodyele.appendChild(trelement);
                    }
                    else {  //There is no intersected area
                        for (var fieldname in area.feature.properties) {
                            if (fieldname == 'Area_reale')
                                continue;

                            var tdele1 = document.createElement('td');
                            tdele1.style = 'border: 1px solid black; border-collapse: collapse;';
                            tdele1.innerHTML = '';
                            trelement.appendChild(tdele1);
                        }

                        tbodyele.appendChild(trelement);
                    }
                }
            }

            if (intersectedAreaCount == 0)
                h1.innerHTML = h1.innerHTML + '. Intersected area no found!';

            return pane;
        },

        //id must be for marker
        _moveToMarker: function (id) {
            var marker = this._selectedMarkers[id];
            //move map
            this._map.fitBounds(marker.getBounds());
        }

    });

    return {EdfInfSys: EdfInfSysClass};
});
