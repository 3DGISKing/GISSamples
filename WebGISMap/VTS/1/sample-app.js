var browser = null;
var renderer = null;
var map = null;
var geodata = null;

function startDemo() {
    browser = vts.browser('map-div', {
        map: "https://cdn.melown.com/mario/store/melown2015/map-config/wugis1219-gmail-com/Landuse/mapConfig.json",
        authorization: "https://cdn.melown.com/mario/auth/GUmC1xZtoMAFBdnU4ZSd"
    });

//check whether browser is supported
    if (!browser) {
        console.log('Your web browser does not support WebGL');
        return;
    }

    //callback once is map config loaded
    browser.on('map-loaded', onMapLoaded);
}

function onMapLoaded() {
    // geojson loading here

    var url = "./asset/Land_bound_Lines.geojson";
    
    $.getJSON(url, function (data) {
        map = browser.map;

        // create geodata object
        geodata = map.createGeodata();

        // import GeoJSON data
        geodata.importGeoJson(data);

        geodata.processHeights('node-by-precision', 62, onHeightsProcessed);
    })
}

function onHeightsProcessed() {
    var style = {
        layers: {
            "track-line" : {
                "filter" : ["==", "#type", "line"],
                "line": true,
                "line-width" : 4,
                "line-color": [255,0,255,255],
                "zbuffer-offset" : [-0.5,0,0],
                "z-index" : -1
            },
            "track-shadow" : {
                "filter" : ["==", "#type", "line"],
                "line": true,
                "line-width" : 20,
                "line-color": [0,0,0,120],
                "zbuffer-offset" : [-0.5,0,0],
            }
        }
    };

    // make free layer
    var freeLayer = geodata.makeFreeLayer(style);

    // add free layer to the map
    map.addFreeLayer('geodatatest', freeLayer);

    // add free layer to the list of free layers
    // which will be rendered on the map

    var view = map.getView();

    view.freeLayers.geodatatest = {};
    map.setView(view);
}

startDemo();




