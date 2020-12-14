/*-------------------------------------Attribution-------------------------------------*/
var marom_attrib = '<a href="http://www.maromgis.com" target ="_blank">MaromGIS</a>';
var osm_attrib = ' &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
var raster_group = new L.LayerGroup([]);
/*-------------------------------------BaseMap-------------------------------------*/

/*-------------------------------------Base Maps List-------------------------------------*/
/*var baseMaps = {
  'OSM Standard': basemap,
  'אורתופוטו 2015': ramot_menashe_15
};*/


/*-------------------------------------WMS Layers-------------------------------------*/

var noy = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_noy',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(10);
raster_group.addLayer(noy);

var tikshoret = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_tikshoret',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(9);
raster_group.addLayer(tikshoret);

var merkaziot_hashmal = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_merkaziot_hashmal',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  tiled: true,
  tilesorigin: [-180, 90],
  maxZoom: '25'
}).setZIndex(8);
raster_group.addLayer(merkaziot_hashmal);

var hashmal = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_hashmal',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(7);
raster_group.addLayer(hashmal);

var maim = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_maim',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(6);
raster_group.addLayer(maim);

var biuv = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_biuv',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(5);
raster_group.addLayer(biuv);

var parcel = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_parcel',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(4);
raster_group.addLayer(parcel);

var kav_binyan = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_kav_binyan',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(3);
raster_group.addLayer(kav_binyan);

var reka = L.tileLayer.wms('https://maps.marom.mobi:8443/geoserver/wms?', {
  layers: 'ramot_menashe:ramot_menashe_reka',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  continuousWorld: true,
  maxZoom: '25',
}).setZIndex(2);
raster_group.addLayer(reka);
/*-------------------------------------TABA Tiles-------------------------------------*/


/*-------------------------------------OrthoPhoto Tiles-------------------------------------*/
var ramot_menashe_15 = L.tileLayer('https://maps.marom.mobi:8443/ramot-menashe/tiles_256/{z}/{x}/{y}.jpg', {
  maxZoom: 28,
  maxNativeZoom: 21,
  zIndex: 100
}).setZIndex(1);
raster_group.addLayer(ramot_menashe_15);

/*-------------------------------------BaseMap Tiles-------------------------------------*/
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  subdomains: ["a", "b", "c"],
  maxZoom: 28,
  minZoom: 1,
  maxNativeZoom: 19,
  attribution: marom_attrib + osm_attrib,
  zIndex: 0
}).setZIndex(0);
raster_group.addLayer(basemap);

/*-------------------------------------Layers List-------------------------------------*/
var layers = {
  'שטחי נוי</br><img src="./layers/legend/noy.png" />': noy,
  'תקשורת</br><img src="./layers/legend/tikshoret.png" />': tikshoret,
  'מרכזיות חשמל</br><img src="./layers/legend/merkaziot_hashmal.png" />': merkaziot_hashmal,
  'חשמל</br><img src="./layers/legend/hashmal.png" />': hashmal,
  'מים</br><img src="./layers/legend/maim.png" />': maim,
  'ביוב</br><img src="./layers/legend/biuv.png" />': biuv,
  'פרצלציה</br><img src="./layers/legend/parcel.png" />': parcel,
  'קווי בניין</br><img src="./layers/legend/kav_binyan.png" />': kav_binyan,
  'רקע</br><img src="./layers/legend/reka.png" />': reka,
  'אורתופוטו 2015<br></br>': ramot_menashe_15,
  'OSM Standard<br></br>': basemap
};
