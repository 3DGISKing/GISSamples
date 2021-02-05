var fs = require('fs');
const url = require('url');
var downLoader = require('./Downloader');
var readLine = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./black_marble.kml');
var outstream = new stream;
var rl = readLine.createInterface(instream, outstream);
var downloadInfoList = [];

var kmlLines = [];

var rootPath = "E:/";

rl.on('line', function(line) {
    // process line here

    /*
         <href>http://earthobservatory.nasa.gov/Feeds/GoogleEarth/BlackMarble/0.kmz</href>
    */

    var urlMarker = "<href>http://earthobservatory.nasa.gov";

    var start = line.indexOf(urlMarker);

    if(start != -1) {
        var url = line.substring(start + '<href>'.length , line.length - '</href>'.length);
        var fileName = rootPath + line.substring(start + '<href>http://earthobservatory.nasa.gov/'.length, line.length  - '</href>'.length);

        downloadInfoList.push({
            url:  url,
            filename: fileName,
            headers: []
        });
    }
});

rl.on('close', function() {
    // do something on finish here
    console.log('kmlLines', kmlLines);
    startDownload();
});

function startDownload() {
    var timeout = 1000; // 1s

    downLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);
}


