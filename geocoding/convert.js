const fs = require('fs');
const request = require('request');

let allData = [];
let  parse = require('csv-parse');

let rowCount = 0;

fs.createReadStream('test.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        if(rowCount === 0) {
            rowCount++;
            return;
        }

        // if(rowCount === )
        //     return;

        rowCount++;

        allData.push(csvrow);
    })
    .on('end',function() {
        convertAll();
    });

/*
// https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
// key=AIzaSyBPss1GNDODfwjyKOo0jviGRJ_gwFh9cO8
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway, +Mountain+View,+CA&key=AIzaSyBPss1GNDODfwjyKOo0jviGRJ_gwFh9cO8
// https://maps.googleapis.com/maps/api/geocode/json?address=Tucson, AZ, USA&key=AIzaSyBPss1GNDODfwjyKOo0jviGRJ_gwFh9cO8
// https://maps.googleapis.com/maps/api/geocode/json?address=Tucson, AZ, USA&key=AIzaSyBPss1GNDODfwjyKOo0jviGRJ_gwFh9cO8
// https://maps.googleapis.com/maps/api/geocode/json?address=Simpsonville, SC, USA&key=AIzaSyBPss1GNDODfwjyKOo0jviGRJ_gwFh9cO8

 */

let apiPath = "https://maps.googleapis.com/maps/api/geocode/json";
let apiKey = "AIzaSyBPss1GNDODfwjyKOo0jviGRJ_gwFh9cO8";
let country = "USA";
let timeout = 5;
let failedDownloadInfoList = [];
let convertedData = [];

function convertAll() {
    let downloadInfoList = [];

    for (let i = 0; i < allData.length; i++) {
        if(i === 100)
            break;

        /*
        csv-parser version

        let city = allData[i]["City"];

        let firstMarket = allData[i]["FirstMarket"];
        let postalCode = allData[i]["PostalCode"];

         */

        let city = allData[i][1];

        let firstMarket = allData[i][2];
        let postalCode = allData[i][4];

        if(firstMarket.trim() === "" || postalCode.trim() === "")
            continue;

        let data = {
            city: city,
            firstMarket: firstMarket,
            postalCode: postalCode
        };

        convertedData.push(data);

        let downloadInfo = {};

        downloadInfo.url = apiPath + "?" + "address=" + firstMarket + "&key=" + apiKey;
        downloadInfo.timout = timeout;

        downloadInfoList.push(downloadInfo);

        let downloadInfo1 = {};

        downloadInfo1.url = apiPath + "?" + "address=" + postalCode + "&key=" + apiKey;
        downloadInfo1.timout = timeout;

        console.log("first market " + firstMarket + "postal " + postalCode);

        downloadInfoList.push(downloadInfo1);
    }

    exports.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);
}

let processedCount = 0;

exports.recursivelyDownload = function(downloadInfoList, totalCount, timeout){
    if (downloadInfoList.length <= 0) {
        if(failedDownloadInfoList.length === 0) {
            console.log("all download completed!");
        }
        else {
            console.log("Failed count = " + failedDownloadInfoList.length);
            console.log("retrying...\n");

            downloadInfoList = failedDownloadInfoList;
            failedDownloadInfoList = [];

            recursivelyDownload(downloadInfoList, totalCount, timeout);
        }

        return;
    }

    let downloadInfo = downloadInfoList.shift();

    let currentCount = downloadInfoList.length;

    request.get(downloadInfo.url, { json: true }, (err, response, body) => {
        if (response.statusCode === 200) {
            let dataIndex = Math.floor(processedCount / 2);

            let latitude = body.results[0].geometry.location.lat;
            let longitude = body.results[0].geometry.location.lng;

            let formatedted_address =  body.results[0].formatted_address;
            let type = body.results[0].types[0];

            if(processedCount % 2 === 0) {
                convertedData[dataIndex].srcLat = latitude;
                convertedData[dataIndex].srcLng = longitude;
                convertedData[dataIndex].srcFormattedAddress = formatedted_address;
                convertedData[dataIndex].srcType = type;
            }
            else{
                convertedData[dataIndex].destLat = latitude;
                convertedData[dataIndex].destLng = longitude;
                convertedData[dataIndex].destFormattedAddress = formatedted_address;
                convertedData[dataIndex].destType = type;
            }

            console.log(dataIndex);

            if(dataIndex >= 100 ){
                console.log();
            }

        }
        else {
            console.log((totalCount - currentCount) + "/" + totalCount + " error occurs during downloading " + downloadInfo.url + " error code = " + response.statusCode);

            failedDownloadInfoList.push(downloadInfo);
        }

        processedCount++;
        exports.recursivelyDownload(downloadInfoList, totalCount, timeout);
    });
};

