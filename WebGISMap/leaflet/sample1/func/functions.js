
// Leaflet getFeatureInfo for WMS
$(function() {
    map.on('click', function getFeatureInfo(e) {

        if (map.hasLayer(biuv)) { //map.hasLayer - LAYER

            // Build the URL for a GetFeatureInfo
            var url = getFeatureInfoUrl(
                map,
                biuv, // - LAYER
                e.latlng, {
                    'info_format': 'application/json',
                    'propertyName': 'LAYER,GM_TYPE,ELEVATION' // Fields
                }
            );

            // Send the request and create a popup showing the response
            reqwest({
                url: url,
                type: 'json',
            }).then(function(data) {
                var feature = data.features[0];
                var popup = L.popup()
                    .setLatLng(e.latlng)
                    //.setContent - Fields Style & Content
                    .setContent(L.Util.template(
					//<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10">
					"<p><h3 dir=\"rtl\", align=\"right\">סוג - <input type=\"text\", id=\"input_0\", value=\"{LAYER}\", size=\"8\"</input></h3>" + 
                    "<p><h3 dir=\"rtl\", align=\"right\">GM_TYPE - <input type=\"text\", id=\"input_1\", value=\"{GM_TYPE}\", size=\"8\"</input></h3>" + 
                    "<p><h3 dir=\"rtl\", align=\"right\">ELEVATION - <input type=\"text\", id=\"input_2\", value=\"{ELEVATION}\", size=\"8\"</input></h3>" + 
                    "<p><h3 dir=\"rtl\", align=\"right\">LAYER - <input type=\"text\", id=\"input_1\", value=\"{LAYER}\", size=\"8\"</input></h3>",feature.properties))
                    .openOn(map)

					//.getContent()
				console.log(data);
				var str = biuv.options.layers;
				var workspace = str.substring(0, str.indexOf(":"));
				console.log("workspace: " + workspace);
				console.log(feature.id);
				console.log(workspace + ":" + feature.id);
				console.log(popup.getContent());

				

            });
		     }
    });
});

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/* Leaflet patch to make layer control scrollable on touch browsers
jQuery(function() {
    var container = $(".leaflet-control-layers")[0];
    if (!L.Browser.touch) {
        L.DomEvent
            .disableClickPropagation(container)
            .disableScrollPropagation(container);
    } else {
        L.DomEvent.disableClickPropagation(container);
    }
});*/
