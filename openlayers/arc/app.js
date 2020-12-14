(function () {
    var map = null;
    var fireVectorSource= null;
    var baseLayerGroup;
    var overlayGroup = null;
    var pollutionLayerGroup = null;


    function creatMap() {
        var osmTiledLayer = new ol.layer.Tile({
            title: "OSM",
            type: 'base',
            source: new ol.source.OSM()
        });

        var initLonLat = ol.proj.fromLonLat([-96.943407, 38.504751]);

        map = new ol.Map({
            layers: [
                osmTiledLayer
            ],
            target: 'map',
            view: new ol.View({
                center: initLonLat,
                zoom: 5,
                minZoom: 1,
                maxZoom: 25
            })
        });

        var arcLineSource = new ol.source.Vector({
            wrapX: false,
            attributions: 'Flight data by ' +  '<a href="http://openflights.org/data.html">OpenFlights</a>, ',
            loader: function() {
                var url = 'data.json';
                fetch(url).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    var flightsData = json;

                    for (var i = 0; i < flightsData.length; i++) {
                        var flight = flightsData[i];

                        var arcGenerator = new arc.GreatCircle(
                            {x: flight.srcLng, y: flight.srcLat},
                            {x: flight.destLng, y: flight.destLat}
                            );

                        var arcLine = arcGenerator.Arc(100, {offset: 10});

                        if (arcLine.geometries.length === 1) {
                            var line = new ol.geom.LineString(arcLine.geometries[0].coords);
                            line.transform('EPSG:4326', 'EPSG:3857');

                            var feature = new ol.Feature({
                                geometry: line,
                                finished: false
                            });

                            arcLineSource.addFeature(feature);
                        }
                    }
                });
            }
        });

        var arcLineStyle = new  ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF0000',
                width: 3
            })
        });

        var arcLineLayer = new ol.layer.Vector({
            source: arcLineSource,
            style: function(feature) {
                return arcLineStyle;
            }
        });

        var pointLayerSource = new ol.source.Vector({
            wrapX: false,
            attributions: 'Flight data by ' +  '<a href="http://openflights.org/data.html">OpenFlights</a>, ',
            loader: function() {
                var url = 'data.json';
                fetch(url).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    var flightsData = json;

                    for (var i = 0; i < flightsData.length; i++) {
                        var flight = flightsData[i];

                        var srcPoint = new ol.Feature({
                            geometry: new ol.geom.Point(ol.proj.transform([flight.srcLng, flight.srcLat], 'EPSG:4326', 'EPSG:3857'))
                        });

                        pointLayerSource.addFeature(srcPoint);

                        var destPoint = new ol.Feature({
                            geometry: new ol.geom.Point(ol.proj.transform([flight.destLng, flight.destLat], 'EPSG:4326', 'EPSG:3857'))
                        });

                        pointLayerSource.addFeature(destPoint);
                    }
                });
            }
        });

        var image = new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 1)'
            }),
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        });

        var style = new  ol.style.Style({
            image: image
        });

        var pointLayer = new ol.layer.Vector({
            source: pointLayerSource,
            style: function(feature) {
                return style;
            }
        });

        map.addLayer(arcLineLayer);
        map.addLayer(pointLayer);
    }

    creatMap();
})();
