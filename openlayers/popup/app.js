var App = (function () {
    function _() {
        this._map = null;
        this._attributesPopup = null;
        this._initialZoom = 10;
        this._wmsPublicSchool = null;
        this._wmsPrivateSchool = null;

        this._init();

        this._setupClick();
        this._loadWMSSchoolLayers();
        this._loadLocalGeoJsonLayers();

        var self = this;

        this._map.on('click', function(evt) {
            self._identifyTileWMSLayer(self._wmsPublicSchool, 'school', evt.coordinate);
            self._identifyTileWMSLayer(self._wmsPrivateSchool, 'school', evt.coordinate);
            self._identifyTileWMSLayer(self._wmsTestLayer, 'qq', evt.coordinate);
        });
    }

    _.prototype._init = function () {
        var OSM = new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        });

        var googleLayerSatellite =new ol.layer.Tile({
            title: "Google Satellite",
            type: 'base',
            visible: true,
            source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}' }),
        });

        var wms3 = new ol.layer.Tile({
            visible: true,
            type: 'classification',
            source: new ol.source.TileWMS({
                url: 'http://jade.uncc.edu:8080/geoserver/wms',  params: {'LAYERS':'cxing1:MecklenburgCounty_Boundary', 'TILED': true},
                serverType: 'geoserver',
                transition: 0
            })
        });

        var baseLayerGroup = new ol.layer.Group({
            'title': 'Base maps',
            layers: [OSM, googleLayerSatellite]
        });

        var group2 = new ol.layer.Group({
            'title': 'Mecklenburg County',
            layers: [wms3]
        });

        this._map = new ol.Map({
            target: 'map',
            layers: [baseLayerGroup, group2],
            view: new ol.View({
                center: [-8997228.97, 4192319.53],
                zoom: this._initialZoom
            })
        });

        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: 'Legend' // Optional label for button
        });

        this._map.addControl(layerSwitcher);
    };

    _.prototype._setupClick = function() {
        var container = document.getElementById('popup');
        var closer = document.getElementById('popup-closer');

        this._attributesPopup = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        var self =this;

        closer.onclick = function() {
            self._attributesPopup.setPosition(undefined);
            closer.blur();
            return false;
        };

        this._map.addOverlay(this._attributesPopup);

        // select interaction working on "click"
        var selectClick = new ol.interaction.Select({
            condition: ol.events.condition.click
        });

        this._map.addInteraction(selectClick);

        selectClick.on('select', function(e) {
            // https://openlayers.org/en/latest/examples/select-features.html

            var selected = e.selected;
            // var deselected = e.deselected;
            // var features = e.target.getFeatures();

            if(selected.length === 0) return;

            var feature = selected[0];

            var properties = feature.getProperties();

            document.getElementById('school-name').innerText = properties.school;

            var coordinate = feature.getGeometry().flatCoordinates;

            self._attributesPopup.setPosition(coordinate);
        });
    };

    _.prototype._loadWMSSchoolLayers = function () {
        this._wmsPublicSchool = new ol.layer.Tile({
            type: 'classification',
            visible: true,
            source: new ol.source.TileWMS({
                url: 'http://jade.uncc.edu:8080/geoserver/wms',  params: {'LAYERS':'cxing1:Public School', 'TILED': true},
                serverType: 'geoserver',
                transition: 0
            })
        });

        var group = new ol.layer.Group({
            'title': 'Public school',
            layers: [this._wmsPublicSchool]
        });

        this._map.getLayers().push(group);

        this._wmsPrivateSchool = new ol.layer.Tile({
            visible: true,
            type: 'classification',
            source: new ol.source.TileWMS({
                url: 'http://jade.uncc.edu:8080/geoserver/wms',  params: {'LAYERS':'cxing1:Schools_Private', 'TILED': true},
                serverType: 'geoserver',
                transition: 0
            })
        });

        group = new ol.layer.Group({
            'title': 'Private school',
            layers: [this._wmsPrivateSchool]
        });

        this._map.getLayers().push(group);
    };

    _.prototype._loadLocalGeoJsonLayers = function () {
        var wmsPublicSchool = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: 'asset/public_school.geojson'
            })
        });

        var group = new ol.layer.Group({
            'title': 'Local Public school',
            layers: [wmsPublicSchool]
        });

        this._map.getLayers().push(group);

        this._wmsTestLayer = new ol.layer.Tile({
            visible: true,
            type: 'classification',
            source: new ol.source.TileWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states', 'TILED': true},
                serverType: 'geoserver',
                transition: 0
            })
        });

        group = new ol.layer.Group({
            'title': 'Private school',
            layers: [this._wmsTestLayer]
        });

        this._map.getLayers().push(group);
    };

    _.prototype._identifyTileWMSLayer = function(layer, propertyName, coordinate) {
        var url = layer
            .getSource()
            .getFeatureInfoUrl(
                coordinate,
                this._map.getView().getResolution(),
                this._map.getView().getProjection(),
                {
                    'INFO_FORMAT': 'application/json',
                    'propertyName': ''
                }
            );

        var self = this;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                if(res.features.length === 0) {
                    console.warn('no feature');
                    return;
                }

                var feature = res.features[0];

                if(feature.properties[propertyName]) {
                    self._attributesPopup.setPosition(coordinate);
                    document.getElementById('school-name').innerText = feature.properties[propertyName];
                }
                else {
                    console.warn('failed to get property : ' + propertyName);

                    self._attributesPopup.setPosition(coordinate);
                    document.getElementById('school-name').innerText = feature.id;
                }
            },
            error: function () {
                console.error('failed to get feature!');
            }
        });
    };

    return _;
})();