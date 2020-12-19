window.GoogleMapDirectionWidget = (function () {
    let jqWidgetPaneToggleButton;
    let jqWidgetDirectionsOmniBox;
    let jqDirectionStart, jqDirectionEnd;
    let jqWidgetDirectionClose;
    let jqWalkingMode, jQDrivingMode;
    let jqContainer;

    let startLatlng;
    let endLatlng;

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    let travelMode = google.maps.TravelMode.WALKING;
    let directionPoints = [];
    let googleMap;

    let visible;

    function GoogleMapDirectionWidget(gMap) {
        if(!jQuery) {
            console.error("jQuery is required!");
            return;
        }

        if(!google) {
            console.error("jQuery is required!");
            return;
        }

        googleMap = gMap;

        // load css
        this._loadCss();

        let mapDiv = gMap.getDiv();

        // create html element
        let div = jQuery("<div/>");

        div.attr('id','googleMapDirectionWidget');
        div.appendTo(mapDiv);

        jqContainer = jQuery("#googleMapDirectionWidget");

        let htmlUrl;

        htmlUrl = "./googleMapDirectionWidget.html";

        div.load(htmlUrl, () => {
            initializeEventHandlers();
        });
    }

    GoogleMapDirectionWidget.prototype._loadCss = function() {
        var style = document.createElement('link');

        style.href = "./googleMapDirectionWidget.css";

        style.type = 'text/css';
        style.rel = 'stylesheet';

        var head = document.getElementsByTagName('head')[0];

        head.append(style);
    };

    GoogleMapDirectionWidget.prototype.getDirectionPoints = function () {
        return directionPoints;
    };

    function show() {
        jqWidgetDirectionsOmniBox.removeClass("left");
        jqWidgetDirectionsOmniBox.addClass("right");

        jqWidgetPaneToggleButton.removeClass("left");
        jqWidgetPaneToggleButton.addClass("right");

        visible = true;
    }

    function hide() {
        jqWidgetDirectionsOmniBox.removeClass("right");
        jqWidgetDirectionsOmniBox.addClass("left");

        jqWidgetPaneToggleButton.removeClass("right");
        jqWidgetPaneToggleButton.addClass("left");

        visible = false;
    }

    function initializeEventHandlers() {
        jqWidgetPaneToggleButton = jQuery(".widget-pane-toggle-button");
        jqWidgetDirectionsOmniBox = jQuery(".widget-directions-omnibox");
        jqDirectionStart = jQuery("#direction-start");
        jqDirectionEnd = jQuery("#direction-end");
        jqWidgetDirectionClose = jQuery(".widget-directions-close");
        jqWalkingMode = jQuery("#walking-mode");
        jQDrivingMode = jQuery("#driving-mode");

        jqWidgetPaneToggleButton.click(function () {
            if(jqWidgetDirectionsOmniBox.hasClass("left")) {
                show();
            }
            else {
                hide();
            }
        });

        google.maps.event.addListener(googleMap, 'click', function(mapsMouseEvent) {
            if(!visible)
                return;

            if(!startLatlng && !endLatlng) {
                startLatlng = mapsMouseEvent.latLng;
                jqDirectionStart.val(startLatlng.toString());

            }
            else if(startLatlng && !endLatlng) {
                endLatlng = mapsMouseEvent.latLng;
                jqDirectionEnd.val(endLatlng.toString());

                directionsRenderer.setMap(googleMap);

                calculateAndDisplayRoute(directionsService, directionsRenderer, travelMode, startLatlng, endLatlng);
            }
            else {
                console.warn("no action");
            }
        });

        jqWidgetDirectionClose.click(() =>{
            startLatlng = null;
            endLatlng = null;

            jqDirectionStart.val("");
            jqDirectionEnd.val("");

            //clear previous result
            directionsRenderer.setMap(null);
            directionPoints = [];
        });

        jqWalkingMode.click(()=> {
            jqWalkingMode.addClass("directions-selected-travel-mode");
            jQDrivingMode.removeClass("directions-selected-travel-mode");

            if(travelMode !== google.maps.TravelMode.WALKING) {
                travelMode = google.maps.TravelMode.WALKING;

                if(startLatlng && endLatlng) {
                    directionsRenderer.setMap(googleMap);

                    calculateAndDisplayRoute(directionsService, directionsRenderer, travelMode, startLatlng, endLatlng);
                }
            }
        });

        jQDrivingMode.click(()=> {
            jqWalkingMode.removeClass("directions-selected-travel-mode");
            jQDrivingMode.addClass("directions-selected-travel-mode");

            if(travelMode !== google.maps.TravelMode.DRIVING) {
                travelMode = google.maps.TravelMode.DRIVING;

                if(startLatlng && endLatlng) {
                    directionsRenderer.setMap(googleMap);

                    calculateAndDisplayRoute(directionsService, directionsRenderer, travelMode, startLatlng, endLatlng);
                }
            }
        });

        jQuery(document).ready(function () {
            visible = false;
            hide();
        });
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer, selectedMode, start, end) {
        directionsService.route(
            {
                origin: { lat: start.lat(), lng: start.lng() },
                destination: { lat: end.lat(), lng: end.lng() },
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."

                travelMode: travelMode
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);

                    var directionsData = response.routes[0].legs[0];

                    for (var i = 0; i < directionsData.steps.length; i++) {
                        const step = directionsData.steps[i];

                        for (let j = 0 ; j < step.lat_lngs.length; j++) {
                            const point = step.lat_lngs[j];

                            directionPoints.push(point.lng(), point.lat());
                        }
                    }

                    jqContainer[0].dispatchEvent(new CustomEvent("directionFound", {
                        detail : {
                            direction : directionPoints
                        }
                    }) )

                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }

    Object.defineProperty(GoogleMapDirectionWidget.prototype, "container" , {
       get : function() {
           return jqContainer[0];
       }
    });

    return GoogleMapDirectionWidget;
})();