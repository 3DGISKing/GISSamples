import React from 'react';

import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css'

import {Group as LayerGroup} from 'ol/layer'
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import View from 'ol/View';
import Map from 'ol/Map';
import LayerSwitcher from 'ol-layerswitcher'
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON'
import {fromLonLat} from 'ol/proj'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {ZoomSlider} from 'ol/control';
import {ScaleLine} from 'ol/control'
import {Ion} from "cesium";
import {IonResource} from "cesium";

import BackgroundLayersToolbar from "./BackgroundLayersToolbar"

class MapView extends React.Component {
    constructor(props) {
        super(props);

        this._initMap();
        this._addBaseLayers();
        this._addGeoJSONLayers();

        /*
        const bounds = [-10463943.7325488, 5093035.105300802,
            -10442906.952900356, 5104630.004104899];

        console.log(this.olmap.getSize());

        this.olmap.getView().fit(bounds, this.olmap.getSize());
        */
    }

    _initMap() {
        this.baseLayerGroup = new LayerGroup({
            title: 'Base Maps ',
            layers: [
            ]
        });

        // create a group for overlays. Add the group to the map when it's created
        // but add the overlay layers later

        this.overlayGroup = new LayerGroup({
            title: 'Overlays',
            layers: [
            ]
        });

        let initialZoom = 14;
        let initialLonLat = [-93.8984, 41.5841];

        let initialView = new View({
            center: fromLonLat(initialLonLat),
            zoom: initialZoom
        });

        this.olmap = new Map({
            target: null,
            layers: [
                this.baseLayerGroup,
                this.overlayGroup
            ],
            view: initialView
        });

        const zoomSlider = new ZoomSlider();

        this.olmap.addControl(zoomSlider);

        const scaleControl = this._createScaleControl();

        this.olmap.addControl(scaleControl);

        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YWI4ODc3Ny03YTU3LTQ4YjktYTVkMy0xZmQ2NWQzNDY3MTEiLCJpZCI6MTU2NzEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Njg1NjA2ODZ9.H4pyfJmsHmtNz8eo8Hb8EuIfqDuxq69InpMDgVQCPFY';
    }

    _createBaseLayer(baseLayerOptions) {
        const type = baseLayerOptions.type;

        switch (type) {
            case "OSM" :
                let baseLayer = new TileLayer({
                    source: new OSM({
                        url: baseLayerOptions.url,
                        crossOrigin: 'anonymous',
                        maxZoom: baseLayerOptions || 19,
                        // attributions: [new ol.Attribution({
                        //     html: baseLayerOptions.attribution
                        // })]
                    }),
                    visible: baseLayerOptions.visible
                });

                baseLayer.set('name', baseLayerOptions.label);
                baseLayer.set('blid', baseLayerOptions.id);

                //_backgroundLayers.push(baseLayer);

                this.olmap.addLayer(baseLayer);
        }
    }

    _createScaleControl() {
        const scaleType = 'scaleline';
        const scaleBarSteps = 4;
        const scaleBarText = true;
        let control;

        if (scaleType === 'scaleline') {
            control = new ScaleLine({
                units: 'metric'
            });
            return control;
        }

        control = new ScaleLine({
            units: 'metric', // degrees, imperial, us, nautical
            bar: true,
            steps: scaleBarSteps,
            text: scaleBarText,
            minWidth: 140
        });

        return control;
    }

    _addBaseLayers() {
        let naip = new TileLayer({
            title: "NAIP",
            visible: true,
            type: 'base',
            source: new TileWMS({
                url: 'http://geospatialtechnicalsolutions.com:8080/geoserver/Landuse2d/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    "LAYERS": 'Landuse2d:NAIP_lot_boundaries31',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                    tilesOrigin: -10463943.7325488 + "," + 5093035.105300802
                }
            })
        });

        let osmTiledLayer = new TileLayer({
            title: "Open Street Map",
            type: 'base',
            source: new OSM()
        });

        let bingMapKey = "ArOe8U81_RyKcnEcY8zM3yl71TUd8wG9SFM2ANCWkPR1CAafKwAZ_eD2PSZMoYL8";

        let bingMapArialTiledLayer = new TileLayer({
            title: 'BingMap Aerial',
            type: 'base',
            source: new BingMaps({
                key: bingMapKey,
                imagerySet: 'Aerial'
            })
        });

        let bingMapArialWithLabelTiledLayer = new TileLayer({
            title: 'BingMap Aerial With Label',
            type: 'base',
            source: new BingMaps({
                key: bingMapKey,
                imagerySet: 'AerialWithLabels'
            })
        });

        let bingMapRoadTiledLayer = new TileLayer({
            title: 'BingMap Road',
            type: 'base',
            source: new BingMaps({
                key: bingMapKey,
                imagerySet: 'Road'
            })
        });

        this.baseLayerGroup.getLayers().push(bingMapRoadTiledLayer);
        this.baseLayerGroup.getLayers().push(bingMapArialWithLabelTiledLayer);
        this.baseLayerGroup.getLayers().push(bingMapArialTiledLayer);
        this.baseLayerGroup.getLayers().push(osmTiledLayer);
        this.baseLayerGroup.getLayers().push(naip);
    }

    _addGeoJSONLayers() {
        this._addGeoJsonLayerFromIon(61847, 'LandGlide_Dallas_Waukee_12_5');
        this._addGeoJsonLayerFromIon(61811, 'Prices_12_4_2019_Layer_Featu');

        this._addGeoJsonLayerFromIon(47361, 'Road', new Style({
            stroke: new Stroke({
                color: 'yellow',
                width: 1
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.1)'
            })
        }));

        this._addGeoJsonLayerFromIon(51736, 'Flooding Potential (FEMA and Soil)');
        this._addGeoJsonLayerFromIon(51757, 'Flooding Potential (FEMA)');
        this._addGeoJsonLayerFromIon(47363, 'Flooding Potential (Soil)');
        this._addGeoJsonLayerFromIon(51758, 'Basins');
    }

    _addGeoJsonLayerFromIon(ionId, title, style) {
        const self = this;

        IonResource.fromAssetId(ionId).then(function (resource) {
            resource.fetchJson().then(function(jsonData) {
                let format = new GeoJSON({
                    featureProjection:"EPSG:3857"
                });

                let vectorSource = new VectorSource({
                    features: format.readFeatures(jsonData),
                });

                let layer = new VectorLayer({
                        title: title,
                        source: vectorSource,
                        style : style
                    }
                );

                self.overlayGroup.getLayers().push(layer);
            }).otherwise(function(error) {
                // an error occurred
                console.log(error);
            });
        }).otherwise(console.error);
    }

    componentDidMount() {
        this.olmap.setTarget("map");
    }

    updateMap() {
        // Create a LayerSwitcher instance and add it to the map
        let layerSwitcher = new LayerSwitcher();
        this.olmap.addControl(layerSwitcher);
    }

    render() {
        this.updateMap(); // Update map on render?

        const styles = {
            height: "100vh",
        };

        return (
            <div>
            <div id = 'map' style={styles}/>
            <BackgroundLayersToolbar/>
            </div>
        )
    }
}

export default MapView;

