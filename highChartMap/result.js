var App = (function () {
    function split(text) {
        return text.replace(/^"/, '')
            .replace(/",$/, '')
            .split(',');
    }

    var App = function (options) {
        this._countryRegionMapCsvDataUrl = 'regionmap.csv';

        /*
            key: country code ex "AFG"
            value: object
                   ex:
                   {
                        countryName : Afghanistan,
                        regionName : FrontierMarket,
                        countryCode2: us
                   }
         */

        this._countryRegionMapData = {};

        this._regionCsvDataUrl = 'testdata.csv';
        /*
            key: region ex: "Global"
            value: object
                   ex:
                   {
                        equity: value array,
                        bonds: value array
                   }
         */

        this._regionData = {};

        this._mapCategory = options.mapCategory;

        this._mapData = [];
        this._categories = null;

        this._mapChartData = null;
        this._mapChart = null;

        this._equityDataChart = null;
        this._bondsDataChart = null;

        this._init();
    };

    App.prototype._init = function() {
        var self = this;

        $.ajax({
            url : self._countryRegionMapCsvDataUrl,
            success: self._onCountryRegionMapCsvDataSuccess.bind(this),
            error: function () {
                alert('failed to load data!');
            }
        });
    };

    App.prototype._onCountryRegionMapCsvDataSuccess = function(csvString) {
        this._parseCountryRegionMapCsvString(csvString);

        var self = this;

        $.ajax({
            url : self._regionCsvDataUrl,
            success: self._onRegionCsvDataSuccess.bind(this),
            error: function () {
                alert('failed to load data!');
            }
        });
    };

    App.prototype._onRegionCsvDataSuccess = function(csvString) {
        this._parseRegionCsvString(csvString);

        this._makeMapChart();
        this._doMakeDataCharts();

        var self = this;

        $('#develop-market').click(function() {
            self._selectRegionByRadio('DevelopedMarket');
        });

        $('#emerging-market').click(function() {
            self._selectRegionByRadio('EmergingMarket');
        });
    };

    App.prototype._parseCountryRegionMapCsvString = function(csvString) {
        var lines =  csvString.split(/\n/);

        var firstLine = lines[0];

        var firstLineTokens = split(firstLine);
        var validTokenCount = firstLineTokens.length;

        // fields
        // Country Name,Country Code,ISO2,Region
        var dataLines = lines.slice(1);

        for (var i = 0 ; i < dataLines.length; i++) {
            var line = dataLines[i];

            var tokens = split(line);

            if (tokens.length !== validTokenCount) {
                console.warn("invalid data line: " + line);
                continue;
            }

            var countryName = tokens[0];
            var countryCode = tokens[1];

            var iso2 = tokens[2];
            var region = tokens[3];

            if(!this._countryRegionMapData.hasOwnProperty(countryCode)) {
                this._countryRegionMapData[countryCode] = {
                    countryName: countryName,
                    regionName: region,
                    countryCode2: iso2
                }
            }

            this._mapData.push({
                countryName: countryName,
                countryCode: countryCode,
                region: region,
                value: region + " : " + countryName
            });
        }
    };

    App.prototype._parseRegionCsvString = function(csvString) {
        var lines =  csvString.split(/\n/);

        var firstLine = lines[0];
        var firstLineTokens = split(firstLine);
        var validTokenCount = firstLineTokens.length;

        // We ignore "Region,type,MapColour" and read categories
        this._categories = firstLineTokens.slice(3);

        var dataLines = lines.slice(1);

        for (var i = 0 ; i < dataLines.length; i++) {
            var line = dataLines[i];

            var tokens = split(line);

            if(tokens.length !== validTokenCount) {
                console.warn("invalid data line: " + line);
                continue;
            }

            var regionName = tokens[0];
            var type = tokens[1];

            //ignore
            var mapColor = tokens[2];

            var values = tokens.splice(3);

            for (var j = 0; j < values.length; j++)
                values[j] = parseFloat(values[j]);

            if(!this._regionData.hasOwnProperty(regionName)) {
                this._regionData[regionName] = {};

                this._regionData[regionName][type] = values;
            } else {
                this._regionData[regionName][type] = values;
            }
        }
    };

    App.prototype._selectRegionByRadio = function (regionName) {
        this._deSelectAll();

        this._equityDataChart.series.slice(0).forEach(function (s) {
            s.remove(false);
        });

        // make sure global always show
        this._equityDataChart.addSeries({
            data: this._regionData['Global'].equity
        }, false);

        this._equityDataChart.addSeries({
            data: this._regionData[regionName].equity
        }, false);

        this._selectRegion(regionName);

        this._equityDataChart.redraw();

        this._bondsDataChart.series.slice(0).forEach(function (s) {
            s.remove(false);
        });

        // make sure global always show
        this._bondsDataChart.addSeries({
            name: 'Global',
            data: this._regionData['Global'].bonds
        }, false);

        this._bondsDataChart.addSeries({
            name: regionName,
            data: this._regionData[regionName].bonds
        }, false);

        this._bondsDataChart.redraw();
    };

    App.prototype._onSelected = function () {
        var self = this;

        var points = self._mapChart.getSelectedPoints();

        if(points.length === 0) {
            self._initDataCharts();
            self._initMapChart();
            return;
        }

        var selectedCountryCodes = [];

        points.forEach(function (point, index) {
            if(!self._countryRegionMapData.hasOwnProperty(point.countryCode)) {
                alert("failed to find data for: " + point.countryName);
                return;
            }

            selectedCountryCodes.push(point.countryCode);
        });

        if(selectedCountryCodes.length === 0) {
            return;
        }

        this._equityDataChart.series.slice(0).forEach(function (s) {
            s.remove(false);
        });

        // make sure global always show
        this._equityDataChart.addSeries({
            data: this._regionData['Global'].equity
        }, false);

        this._selectedRegionsEquity = [];

        selectedCountryCodes.forEach(function (countryCode) {
            if(!self._countryRegionMapData.hasOwnProperty(countryCode)) {
                console.warn('cannot find region for country code : ' + countryCode);
                return;
            }

            var regionName = self._countryRegionMapData[countryCode].regionName;

            regionName = regionName.trim();

            if(!self._regionData.hasOwnProperty(regionName)) {
                alert('cannot find region data for ' + regionName);
                return;
            }

            if(self._selectedRegionsEquity.indexOf(regionName) === -1) {
                self._equityDataChart.addSeries({
                    data: self._regionData[regionName].equity
                }, false);

                self._selectRegion(regionName);
                self._selectedRegionsEquity.push(regionName);
            }
        });

        this._equityDataChart.redraw();

        this._bondsDataChart.series.slice(0).forEach(function (s) {
            s.remove(false);
        });

        // make sure global always show
        this._bondsDataChart.addSeries({
            name: 'Global',
            data: this._regionData['Global'].bonds
        }, false);

        this._selectedRegionsBonds = [];

        selectedCountryCodes.forEach(function (countryCode) {
            if(!self._countryRegionMapData.hasOwnProperty(countryCode)) {
                console.warn('cannot find region for country code : ' + countryCode);
                return;
            }

            var regionName = self._countryRegionMapData[countryCode].regionName;

            regionName = regionName.trim();

            if(!self._regionData.hasOwnProperty(regionName)) {
                alert('cannot find region data for ' + regionName);
                return;
            }

            if(self._selectedRegionsBonds.indexOf(regionName) === -1) {
                self._bondsDataChart.addSeries({
                    name: regionName,
                    data: self._regionData[regionName].bonds
                }, false);

                self._selectedRegionsBonds.push(regionName);
            }
        });

        this._bondsDataChart.redraw();
    };

    App.prototype._doMakeDataCharts = function() {
        $('#info h2').html('Comparing Market');
        $('#info .subheader').html('<small><em>(Shift + Click on map to compare countries)</em></small>');

        $('#equity-chart').width($('#map-chart-container').width() / 2);
        $('#bonds-chart').width($('#map-chart-container').width() / 2);

        var chartWidth = 200;

        this._equityDataChart = new Highcharts.chart('equity-chart', {
            chart: {
                type: 'bar',
                inverted: true
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Equity',
                align: 'left',
                x: chartWidth ,
                y: 25
            },
            xAxis: {
                categories: this._categories
            },
            yAxis: {
                reversed: true,
                title: {
                    text: 'Perc. of market capitalisation'
                },
                labels: {
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);

                        return label + '%';
                    }
                }
            },
            legend: {
                enabled: false
            }
        });

        // make sure global always show
        this._equityDataChart.addSeries({
            data: this._regionData['Global'].equity
        }, false);

        this._equityDataChart.redraw();

        this._bondsDataChart = new Highcharts.chart('bonds-chart', {
            chart: {
                type: 'bar',
                inverted: true
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Bonds',
                align: 'left',
                x: chartWidth ,
                y: 25
            },
            xAxis: {
                categories: this._categories,
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Perc. of corporate bonds outstanding'
                },
                labels: {
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);

                        return label + '%';
                    }
                }
            },
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 50,
                floating: true,
                borderWidth: 1,
                symbolRadius: 0,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            }
        });

        // make sure global always show
        this._bondsDataChart.addSeries({
            name: 'Global',
            data: this._regionData['Global'].bonds
        }, false);

        this._bondsDataChart.redraw();
    };

    App.prototype._deSelectAll = function() {
        for (var countryCode in this._countryRegionMapData) {
            var countryCode2 = this._countryRegionMapData[countryCode].countryCode2;

            countryCode2 = countryCode2.toLowerCase();

            if(this._mapChart.get(countryCode2) === undefined) {
                console.warn("can not select " + countryCode2);
            }
            else {
                var country = this._mapChart.get(countryCode2);

                country.select(false, false);
            }
       }
    };

    App.prototype._selectRegion = function(region) {
        for (var countryCode in this._countryRegionMapData) {
            if(this._countryRegionMapData[countryCode].regionName.trim() === region) {
                var countryCode2 = this._countryRegionMapData[countryCode].countryCode2;

                countryCode2 = countryCode2.toLowerCase();

                if(this._mapChart.get(countryCode2) === undefined) {
                    console.warn("can not select " + countryCode2);
                }
                else {
                    var country = this._mapChart.get(countryCode2);

                    if(country.series.selected === true)
                        continue;

                    console.log(countryCode2);
                    this._mapChart.get(countryCode2).select(true, true);
                }
            }
        }
    };

    App.prototype._makeMapChart = function() {
        this._mapChartData = Highcharts.geojson(Highcharts.maps['custom/world']);

        $.each(this._mapChartData, function () {
            this.id = this.properties['hc-key']; // for Chart.get()
            this.flag = this.id.replace('UK', 'GB').toLowerCase();
        });

        var self = this;

        // Initiate the map chart
        this._mapChart = Highcharts.mapChart('container', {
            title: {
                text: 'AUM by Market'
            },
            credits: {
                enabled: false
            },
            subtitle: {
                text: '(Listed equity and corporate bonds outstanding)'
            },
            legend: {
                enabled: false
            },
            colorAxis: {
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            tooltip: {
                headerFormat: '',
                pointFormat: '{point.countryName} ',
                footerFormat: '<span style="font-size: 10px">(Click for details)</span>'
            },

            series: [{
                data: this._mapData ,
                mapData: this._mapChartData,
                joinBy: ['iso-a3', 'countryCode'],
                name: this._mapCategory,
               // allowPointSelect: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (event) {
                            var accumulate = event.shiftKey;

                            var point = this;

                            var selected = this.selected;

                            point.select(!selected, accumulate);

                            self._onSelected();
                        }
                    }
                },
                states: {
                    select: {
                        color: 'blue',
                        borderColor: 'red',
                        dashStyle: 'solid'
                    },
                    hover: {
                        color: Highcharts.getOptions().colors[2]
                    }
                }
            }]
        });

        $('#wrapper').width(this._mapChart.chartWidth + $('#radio-div').width());
    };

    return App;
})();

var theApp = new App({
});
