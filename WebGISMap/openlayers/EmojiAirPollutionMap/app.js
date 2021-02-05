(function () {
    var map = null;
    var fireVectorSource= null;
    var baseLayerGroup;
    var overlayGroup = null;
    var pollutionLayerGroup = null;
    var emojiDict;
    var canvasForExport = document.createElement('canvas');

    /**
     * @constructor
     * @extends {module:ol/control/Control~Control}
     * @param {Object=} opt_options Control options.
     */
    var BaseLayerSwitcherControl = (function (Control) {
        function BaseLayerSwitcherControl(opt_options) {
            var options = opt_options || {};

            var button = document.createElement('button');

            button.innerHTML = '🌐';

            var element = document.createElement('div');

            element.className = 'rotate-north ol-unselectable ol-control';
            element.appendChild(button);

            Control.call(this, {
                element: element,
                target: options.target
            });

            button.addEventListener('click', this.handleRotateNorth.bind(this), false);
        }

        if ( Control ) BaseLayerSwitcherControl.__proto__ = Control;
        BaseLayerSwitcherControl.prototype = Object.create( Control && Control.prototype );
        BaseLayerSwitcherControl.prototype.constructor = BaseLayerSwitcherControl;

        BaseLayerSwitcherControl.prototype.handleRotateNorth = function handleRotateNorth () {
            var baseLayers = baseLayerGroup.getLayers().getArray();

            var layer0 = baseLayers[0];
            var layer1 = baseLayers[1];

            if(layer1.getVisible())
            {
               layer0.setVisible(true);
               layer1.setVisible(false);
            }
            else
            {
                layer0.setVisible(false);
                layer1.setVisible(true);
            }
        };

        return BaseLayerSwitcherControl;
    }(ol.control.Control));

    function flyTo(location, done) {
        var duration = 2000;

        var view = map.getView();
        var zoom =  view.getZoom();
        var parts = 2;
        var called = false;

        function callback(complete) {
            --parts;
            if (called) {
                return;
            }
            if (parts === 0 || !complete) {
                called = true;
                done(complete);
            }
        }
        view.animate({
            center: location,
            duration: duration
        }, callback);
        view.animate({
            zoom: zoom - 1,
            duration: duration / 2
        }, {
            zoom: zoom,
            duration: duration / 2
        }, callback);
    }

    function initInterface() {
        var data = [
            {
                label: "Delhi",
                lat: 28.7041,
                lon: 77.1025
            },
            {
                label: "New York",
                lat: 40.7128,
                lon: -74.00605
            },
            {
                label: "Minneapolis",
                lat: 44.9778,
                lon: -93.2650
            },
            {
                label: "Beijing",
                lat: 39.9042,
                lon: 116.4074
            },
            {
                label: "Kathmandu",
                lat: 27.7172,
                lon: 85.3240
            }
        ];

        var buttonBox = document.getElementById("buttons_box");

        for(var i = 0; i < data.length; i++) {
            (function (buttonData) {
                var button = document.createElement("button");

                button.textContent = buttonData.label;
                button.style.margin = "5px";
                buttonBox.appendChild(button);

                var lat = buttonData.lat;
                var lon = buttonData.lon;

                button.addEventListener("click", function (ev) {
                    var location = ol.proj.fromLonLat([lon, lat]);

                    flyTo(location, function () {

                    });
                });
            })(data[i]);
        }

        document.getElementById('export-png').addEventListener('click', function() {
           exportPng();
        });

        $('.pp-open').on('click', function() {
            $('#popup-1').slickModals({
                // Hide on pages
                hideOnPages: [
                    '/foo/page1/',
                    '/foo/page2/',
                    '/foo/page3/'
                ],
                // Popup type
                popupType: 'delayed',
                delayTime: 0,
                scrollTopDistance: 400,
                autoClose: false,
                autoCloseDelay: 4000,
                enableStats: false,
                fileLocation: '',
                modalName: 'My awesome modal 1',
                modalSummary: 'Lorem ipsum dolor sit amet',
                callToAction: 'cta',
                setCookie: false,
                cookieDays: 30,
                cookieTriggerClass: 'setCookie-1',
                cookieName: 'slickModal-1',
                cookieScope: 'domain',
                overlayVisible: true,
                overlayClosesModal: true,
                overlayColor: 'rgba(0, 0, 0, 0.6)',
                overlayAnimationDuration: '0.4',
                overlayAnimationEffect: 'fadeIn',
                pageAnimationDuration: '0.4',
                pageAnimationEffect: 'none',
                pageBlurRadius: '2px',
                pageScaleValue: '0.9',
                pageMoveDistance: '30%',
                popupWidth: '420px',
                popupHeight: '100%',
                popupLocation: 'topRight',
                popupAnimationDuration: '0.4',
                popupAnimationEffect: 'slideRight',
                popupBoxShadow: 'none',
                popupBackground: '#fff',
                popupRadius: '0',
                popupMargin: '0px',
                popupPadding: '0px',
                // Mobile rules
                showOnMobile: true,
                responsive: true,
                mobileBreakPoint: '420px',
                mobileLocation: 'topCenter',
                mobileWidth: '100%',
                mobileHeight: '100%',
                mobileRadius: '0',
                mobileMargin: '0',
                mobilePadding: '0px',
                // Animate content
                contentAnimation: false,
                contentAnimationEffect: 'slideBottom',
                contentAnimationDuration: '0.6',
                contentAnimationDelay: '0.4',
                // Youtube videos
                videoSupport: false,
                videoAutoPlay: true,
                videoStopOnClose: true,
                // Close and reopen button
                addCloseButton: true,
                buttonStyle: 'icon',
                enableESC: true,
                reopenClass: 'pp-open',
                // Additional events
                onSlickLoad: function() {
                    // Your code goes here
                },
                onSlickClose: function() {
                    // Your code goes here
                }
            });
        });

        $('#goToNewYork').on("click", function(){
            var location = ol.proj.fromLonLat([-74.00605, 40.7128]);

            flyTo(location, function () {

            });
        });

        $('#goToDelhi').on("click", function(){
            var location = ol.proj.fromLonLat([77.1025, 28.7041]);

            flyTo(location, function () {

            });
        });
    }

    function exportPng() {
        map.once('postcompose', function(event) {
            var canvas = event.context.canvas;

            canvasForExport.width = canvas.width;
            canvasForExport.height = canvas.height;

            var ctx = canvasForExport.getContext('2d');

            ctx.drawImage(canvas, 0, 0);

            var logoImage = document.getElementById('logo');

            ctx.drawImage(logoImage, 5, 5, 50, 50);

            canvasForExport.toBlob(function (blob1) {
                saveAs(blob1, 'map.png');
            });
        });

        map.renderSync();
    }

    function creatMap() {
        // create base layer group

        baseLayerGroup = new ol.layer.Group({
            title: 'Base Maps ',
            layers: [
            ]
        });

        var osmTiledLayer = new ol.layer.Tile({
            title: "OSM",
            type: 'base',
            source: new ol.source.OSM()
        });

        var bingMapKey = "ArOe8U81_RyKcnEcY8zM3yl71TUd8wG9SFM2ANCWkPR1CAafKwAZ_eD2PSZMoYL8";

        var bingMapArialTiledLayer = new ol.layer.Tile({
            title: 'BingMap Aerial',
            type: 'base',
            source: new ol.source.BingMaps({
                key: bingMapKey,
                imagerySet: 'Aerial'
            })
        });

        baseLayerGroup.getLayers().push(bingMapArialTiledLayer);
        baseLayerGroup.getLayers().push(osmTiledLayer);

        pollutionLayerGroup = new ol.layer.Group({
            title: 'Pollution',
            combine: true,
            visible: true,
            layers: [
            ]
        });

        // create a group for overlays. Add the group to the map when it's created
        // but add the overlay layers later

        overlayGroup = new ol.layer.Group({
            title: 'Overlays',
            layers: [
            ]
        });

        overlayGroup.getLayers().push(pollutionLayerGroup);

        fireVectorSource = new ol.source.Vector({
        });

        var iconUrl = "http://res.cloudinary.com/kohinoor/image/upload/w_0.2,c_scale/v1502868343/fire.png";

        var image =  new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
            color: [255, 255, 255],
            crossOrigin:'anonymous',
            src: iconUrl,
            scale: 0.6
        }));

        var options = {
            image: image
        };

        var fireStyle = new ol.style.Style(options);

        var fireLayer = new ol.layer.Vector({
            title: 'Fire',
            source: fireVectorSource,
            updateWhileInteracting: false,
            //minResolution: option.minResolution,
            //maxResolution: option.maxResolution,
            renderBuffer: 50
        });

        fireLayer.setStyle(fireStyle);

        overlayGroup.getLayers().push( fireLayer );

        // create a map containing two group layers

        var initLonLat = ol.proj.fromLonLat([-121.08370563712802, 37.463459505816814]);
        var initZoom = 8;

        map = new ol.Map({
            layers: [
                baseLayerGroup,
                overlayGroup
            ],
            target: 'map',
            controls: ol.control.defaults().extend([
                new ol.control.FullScreen(),
                new BaseLayerSwitcherControl()
            ]),
            view: new ol.View({
                center: initLonLat,
                zoom: initZoom,
                minZoom: 5,
                maxZoom: 25
            })
        });

        // select interaction working on "click"
        var selectClick = new ol.interaction.Select({
            condition: ol.events.condition.click,
            style: null
        });

        map.addInteraction(selectClick);

        selectClick.on('select', function(e) {
            // https://openlayers.org/en/latest/examples/select-features.html

            var selected = e.selected;
            // var deselected = e.deselected;
            // var features = e.target.getFeatures();

            if(selected.length === 0) return;

            selectClick.getFeatures().clear();

            var feature = selected[0];

            var zIndex = feature.get('zIndex', zIndex);

            if(zIndex)
            {
                var emoji = feature.get('emoji', zIndex);
                showPopupPollution(emoji, zIndex);
            }
            else
                showPopupFire();
        });
    }

    function initMap() {
        // Create a LayerSwitcher instance and add it to the map
        var layerSwitcher = new ol.control.LayerSwitcher();
        map.addControl(layerSwitcher);

        map.on('moveend', function () {
            setUrl();
        } );

        setQueryParameter();
        loadPollutionLayer();
        loadFireLayer();
    }

    function loadPollutionLayer() {
        $.ajax({
            url: "https://s3.amazonaws.com/stat_data/24h.json",
            type: "GET"
        }).done(function(json) {
            var data = JSON.parse(json);

            var pollutionData = data.pollutions;

            for (var i = 0; i < pollutionData.length; i++) {
                var lat = pollutionData[i][0];
                var lon = pollutionData[i][1];
                var zIndex = pollutionData[i][2];

                var emoji = "http://res.cloudinary.com/kohinoor/image/upload/v1502868343/" + zIndex + ".png";

                var pollutionFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
                });

                pollutionFeature.set('zIndex', zIndex);
                pollutionFeature.set('emoji', emoji);

                var pollutionVectorSource = new ol.source.Vector({ });

                pollutionVectorSource.addFeature(pollutionFeature);

                var pollutionLayer = new ol.layer.Vector({
                    title: 'Pollution',
                    source: pollutionVectorSource,
                    updateWhileInteracting: false,
                    //minResolution: option.minResolution,
                    //maxResolution: option.maxResolution,
                    renderBuffer: 50
                });

                pollutionLayer.setZIndex(zIndex);

                function getScaleFromZoom() {
                    var zoom = map.getView().getZoom();

                    var scale = 0.2;

                    if(zoom < 8)
                        scale = 0.2;
                    else if(zoom >=8 && zoom < 16)
                        scale = 0.25;
                    else if (zoom >=16 && zoom < 22)
                        scale = 0.35;

                    return scale;
                }

                (function (pollutionLayer, zIndex) {
                    var styleFunc = function (feature, resolution) {
                        var iconUrl = "http://res.cloudinary.com/kohinoor/image/upload/v1502868343/" + zIndex + ".png";

                        var scale = getScaleFromZoom();

                        var image =  new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
                            color: [255, 255, 255],
                            crossOrigin: 'anonymous',
                            src: iconUrl,
                            scale: scale
                        }));

                        var options = {
                            image: image
                        };

                        return new ol.style.Style(options);
                    };

                    pollutionLayer.setStyle(styleFunc);
                })(pollutionLayer, zIndex);

                pollutionLayerGroup.getLayers().push( pollutionLayer );
            }
        });
    }

    function loadFireLayer() {
        $.ajax({
            url: "https://s3.amazonaws.com/stat_data/fire.json",
            type: "GET"
        }).done(function(json) {
            var data = JSON.parse(json);

            var fireData = data.fires;

            for (var i = 0; i < fireData.length; i++) {
                var lat = fireData[i][0];
                var lon = fireData[i][1];

                var marker = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
                });

                fireVectorSource.addFeature(marker);
            }
        });
    }

    function addSocialLinks(e) {
        $(".mob-fb").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e));
        $(".mob-fbm").attr("href", "fb-messenger://share/?link=Did%20you%20know%20that%20air%20pollution%20causes%20nearly%207%20million%20premature%20deaths%20every%20year%3F%20That%27s%20almost%2020%2C000%20deaths%20every%20single%20day.%20Breathing%20kills.%0A%0AYou%20should%20look%20at%20this%20map.%20It%27s%20a%20beautiful%20visualization%20of%20the%20air%20quality%20around%20the%20world%20-%20with%20live%20traffic%20data%20from%20Google%20and%20wildfires%20that%20NASA%20satellites%20detect.%20It%27s%20free%20and%20updates%20with%20fresh%20data%20every%20hour!%20%0A%0A" + encodeURIComponent(e) + "&app_id=515633718781326");
        $(".mob-tw").attr("href", "https://twitter.com/home?status=%F0%9F%98%B7%20The%20Only%20%23AirPollution%20Map%20You'll%20Ever%20Need.%20It's%20%F0%9F%94%A5!%20" + encodeURIComponent(e));
        $(".mob-wa").attr("href", "whatsapp://send?text=Did%20you%20know%20that%20air%20pollution%20causes%20nearly%207%20million%20premature%20deaths%20every%20year%3F%20That%27s%20almost%2020%2C000%20deaths%20every%20single%20day.%20Breathing%20kills.%0A%0AYou%20should%20look%20at%20this%20map.%20It%27s%20a%20beautiful%20visualization%20of%20the%20air%20quality%20around%20the%20world%20-%20with%20live%20traffic%20data%20from%20Google%20and%20wildfires%20that%20NASA%20satellites%20detect.%20It%27s%20free%20and%20updates%20with%20fresh%20data%20every%20hour!%20%0A%0A" + encodeURIComponent(e));
    }

    function setUrl(){
        var center3857 = map.getView().getCenter();

        var center4326 = ol.proj.transform(center3857, 'EPSG:3857', 'EPSG:4326');

        var url = /^([^?]+)/gm.exec(window.location.href)[0] + "?zoom=" + map.getView().getZoom() + "&lat=" + center4326[1] + "&lng=" + center4326[0];

        history.pushState({}, "", url);

        addSocialLinks(url);
    }

    function transformToAssocArray(e) {
        for (var o = {}, a = e.split("&"), t = 0; t < a.length; t++) {
            var i = a[t].split("=");
            o[i[0]] = i[1]
        }
        return o
    }

    function setQueryParameter() {
        var queryString = window.location.search.substr(1);

        var queryObject = transformToAssocArray(queryString);

        if(queryObject === null || queryObject === "" )
            return;

        if (queryObject.hasOwnProperty("lat") && queryObject.hasOwnProperty("lng") ) {
            var center4326 = [parseFloat(queryObject.lng), parseFloat(queryObject.lat)];
            var center3857 = ol.proj.transform(center4326,'EPSG:4326',  'EPSG:3857');

            map.getView().setCenter(center3857);
        }

        if(queryObject.hasOwnProperty("zoom") )
            map.getView().setZoom(parseInt(queryObject.zoom));
    }

    function showPopupPollution(emoji, zIndex) {
        $("#popup-5").find(".slickOverlay").remove();

        $("#popup-5").slickModals({
            popupType: "delayed",
            delayTime: 0,
            scrollTopDistance: 400,
            autoClose: !1,
            autoCloseDelay: 3e3,
            enableStats: !1,
            fileLocation: "slickStats/collect.php",
            modalName: "My awesome modal 1",
            modalSummary: "Lorem ipsum dolor sit amet",
            callToAction: "cta",
            setCookie: !1,
            cookieDays: 30,
            cookieTriggerClass: "setCookie-1",
            cookieName: "slickModal-1",
            cookieScope: "domain",
            overlayVisible: !0,
            overlayClosesModal: !0,
            overlayColor: "rgba(0, 0, 0, 0.2)",
            overlayAnimationDuration: "0.3",
            overlayAnimationEffect: "fadeIn",
            pageAnimationDuration: "0.4",
            pageAnimationEffect: "blur",
            pageBlurRadius: "2px",
            pageScaleValue: "0.9",
            pageMoveDistance: "30%",
            popupWidth: "520px",
            popupHeight: "auto",
            popupLocation: "bottomCenter",
            popupAnimationDuration: "0.4",
            popupAnimationEffect: "slideBottom",
            popupBoxShadow: "none",
            popupBackground: "#fff",
            popupRadius: "0",
            popupMargin: "20px",
            popupPadding: "30px",
            showOnMobile: !0,
            responsive: !0,
            mobileBreakPoint: "520px",
            mobileLocation: "bottomCenter",
            mobileWidth: "100%",
            mobileHeight: "auto",
            mobileRadius: "0",
            mobileMargin: "0",
            mobilePadding: "20px",
            contentAnimation: !0,
            contentAnimationEffect: "slideBottom",
            contentAnimationDuration: "0.4",
            contentAnimationDelay: "0.4",
            videoSupport: !1,
            videoAutoPlay: !0,
            videoStopOnClose: !0,
            addCloseButton: !0,
            buttonStyle: "icon",
            enableESC: !0,
            reopenClass: "openSlickModal-1",
            onSlickLoad: function() {
                var o = emojiDict[zIndex];
                $("#popup-5").find(".title").html(o.header),
                    $("#popup-5").find("span").html(o.text),
                    $("#popup-5").find(".cta").html(o.label_url_1),
                    $("#popup-5").find(".cta").attr("href", o.url_1),
                    $("#popup-5").find(".cta-1").html(o.label_url_2),
                    $("#popup-5").find(".cta-1").attr("href", o.url_2),
                    $("#popup-5").find(".pollution-callout-pic").attr("src", emoji)
            },
            onSlickClose: function() {}
        });
    }

    function showPopupFire() {
        $("#popup-2").find(".slickOverlay").remove();

        $("#popup-2").slickModals({
            popupType: "delayed",
            delayTime: 0,
            scrollTopDistance: 400,
            autoClose: !1,
            autoCloseDelay: 3e3,
            enableStats: !1,
            fileLocation: "slickStats/collect.php",
            modalName: "My awesome modal 1",
            modalSummary: "Lorem ipsum dolor sit amet",
            callToAction: "cta",
            setCookie: !1,
            cookieDays: 30,
            cookieTriggerClass: "setCookie-1",
            cookieName: "slickModal-1",
            cookieScope: "domain",
            overlayVisible: !0,
            overlayClosesModal: !0,
            overlayColor: "rgba(0, 0, 0, 0.2)",
            overlayAnimationDuration: "0.3",
            overlayAnimationEffect: "fadeIn",
            pageAnimationDuration: "0.4",
            pageAnimationEffect: "blur",
            pageBlurRadius: "2px",
            pageScaleValue: "0.9",
            pageMoveDistance: "30%",
            popupWidth: "520px",
            popupHeight: "auto",
            popupLocation: "bottomCenter",
            popupAnimationDuration: "0.4",
            popupAnimationEffect: "slideBottom",
            popupBoxShadow: "none",
            popupBackground: "#fff",
            popupRadius: "0",
            popupMargin: "20px",
            popupPadding: "30px",
            showOnMobile: !0,
            responsive: !0,
            mobileBreakPoint: "520px",
            mobileLocation: "bottomCenter",
            mobileWidth: "100%",
            mobileHeight: "auto",
            mobileRadius: "0",
            mobileMargin: "0",
            mobilePadding: "20px",
            contentAnimation: !0,
            contentAnimationEffect: "slideBottom",
            contentAnimationDuration: "0.4",
            contentAnimationDelay: "0.4",
            videoSupport: !1,
            videoAutoPlay: !0,
            videoStopOnClose: !0,
            addCloseButton: !0,
            buttonStyle: "icon",
            enableESC: !0,
            reopenClass: "openSlickModal-1",
            onSlickLoad: function () {
            },
            onSlickClose: function () {
            }
        });
    }

    function prepareEmojiDic() {
        emojiDict = {
            11: {
                header: "Good",
                text: "Awesome! The air quality is good. It's a great day to be active outside.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/good?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_11",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_11"
            },
            12: {
                header: "Good",
                text: "Awesome! The air quality is good. It's a great day to be active outside.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/good?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_12",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_12"
            },
            13: {
                header: "Good",
                text: "Awesome! The air quality is good. It's a great day to be active outside.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/good?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_13",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_13"
            },
            21: {
                header: "Moderate",
                text: "It's a good day to be active outside. But if you're unusually sensitive, please consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/moderate?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_21",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_21"
            },
            22: {
                header: "Moderate",
                text: "It's a good day to be active outside. But if you're unusually sensitive, please consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/moderate?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_22",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_22"
            },
            23: {
                header: "Moderate",
                text: "It's a good day to be active outside. But if you're unusually sensitive, please consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/moderate?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_23",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_23"
            },
            31: {
                header: "Unhealthy for Sensitive Groups",
                text: "People with heart or lung disease, older adults, children and teenagers should reduce prolonged exertion. It's ok to be active outside, but take more breaks and do less intense activities.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/unhealthy-for-sensitive-groups?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_31",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_31"
            },
            32: {
                header: "Unhealthy for Sensitive Groups",
                text: "People with heart or lung disease, older adults, children and teenagers should reduce prolonged exertion. It's ok to be active outside, but take more breaks and do less intense activities.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/unhealthy-for-sensitive-groups?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_32",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_32"
            },
            33: {
                header: "Unhealthy for Sensitive Groups",
                text: "People with heart or lung disease, older adults, children and teenagers should reduce prolonged exertion. It's ok to be active outside, but take more breaks and do less intense activities.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/unhealthy-for-sensitive-groups?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_33",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_33"
            },
            41: {
                header: "Unhealthy",
                text: "Everyone should reduce prolonged or heavy exertion. Take more breaks during all outdoor activities. People who have heart or lung disease, older adults, children and teenagers should avoid heavy exertion.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/unhealthy?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_41",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_41"
            },
            42: {
                header: "Unhealthy",
                text: "Everyone should reduce prolonged or heavy exertion. Take more breaks during all outdoor activities. People who have heart or lung disease, older adults, children and teenagers should avoid heavy exertion.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/unhealthy?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_42",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_42"
            },
            43: {
                header: "Unhealthy",
                text: "Everyone should reduce prolonged or heavy exertion. Take more breaks during all outdoor activities. People who have heart or lung disease, older adults, children and teenagers should avoid heavy exertion.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/unhealthy?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_43",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_43"
            },
            51: {
                header: "Very Unhealthy",
                text: "Yikes. Air quality is very unhealthy! Everyone should avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/very-unhealthy?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_51",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_51"
            },
            52: {
                header: "Very Unhealthy",
                text: "Yikes. Air quality is very unhealthy! Everyone should avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/very-unhealthy?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_52",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_52"
            },
            53: {
                header: "Very Unhealthy",
                text: "Yikes. Air quality is very unhealthy! Everyone should avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/very-unhealthy?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_53",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_53"
            },
            61: {
                header: "Hazardous",
                text: "Do not breathe. Air quality here is hazardous! Everyone should avoid all physical activity outdoors. Remain indoors and keep activity levels low.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/hazardous?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_61",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_61"
            },
            62: {
                header: "Hazardous",
                text: "Do not breathe. Air quality here is hazardous! Everyone should avoid all physical activity outdoors. Remain indoors and keep activity levels low.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/hazardous?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_62",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_62"
            },
            63: {
                header: "Hazardous",
                text: "Do not breathe. Air quality here is hazardous! Everyone should avoid all physical activity outdoors. Remain indoors and keep activity levels low.",
                label_url_1: "Learn More",
                url_1: "http://airairair.org/airquality/hazardous?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_63",
                label_url_2: "Fight Air Pollution ⟶",
                url_2: "http://airairair.org/shop?utm_source=emoji-map&utm_campaign=website&utm_medium=emoji_click_63"
            }
        };
    }

    creatMap();
    initMap();
    initInterface();
    prepareEmojiDic();
})();
