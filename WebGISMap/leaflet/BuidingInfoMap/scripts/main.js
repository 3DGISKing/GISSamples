require.config({
    paths: {
        'jQuery':      'thirdparty/jquery-3.2.1.min',

        //Turf.js is a JavaScript library for spatial analysis.
        'turf':        'thirdparty/mapbox/plugins/turf_v2.0.2_turf.min'
     },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'turf': {
            exports: 'turf'
        }
    }
});


require(['edfinfsys'], function(edfinfsys) {
    'use strict';

    var g_edfInfSys = new edfinfsys.EdfInfSys();
});






