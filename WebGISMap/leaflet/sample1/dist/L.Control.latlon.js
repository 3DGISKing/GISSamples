L.Control.Latlon = L.Control.extend({
    options: {
        position: 'bottomright',
        title: 'Latlon'
    },
    onAdd: function(map){
        var container = L.DomUtil.create('div','leaflet-control-latlon');
        container.innerHTML = "<div id='leaflet-control-latlon-box'></div>";
        return container
    }
});
	function leaflet_control_latlon(){
		proj4.defs('EPSG:2039', '+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-48,55,52,0,0,0,0 +units=m +no_defs');
		var src = new proj4.Proj('EPSG:4326');
		var dest = new proj4.Proj('EPSG:2039');
		var center = map.getCenter();
		var latlon = new proj4.Point(center.lng +','+ center.lat);
		proj4.transform(src,dest,latlon);
			var results = String(latlon);
			var x = results.substring(2,11);
			var y = results.substring(23,32);
		document.getElementById('leaflet-control-latlon-box').innerHTML = 'X=' + x + '</br> Y=' + y;
	};