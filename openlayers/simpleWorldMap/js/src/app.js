theMap = (function () {
   var countryList = [
       {
           "code": "KP",
           "lon": 126.451,
           "lat": 39.778
       },
       {
           "code": "KG",
           "lon": 74.555,
           "lat": 41.465
       },
       {
           "code": "MN",
           "lon": 102.876,
           "lat": 46.056
       },
       {
           "code": "NP",
           "lon": 83.939,
           "lat": 28.253
       },
       {
           "code": "BT",
           "lon": 90.429,
           "lat": 27.415
       },
       {
           "code": "AF",
           "lon": 65.216,
           "lat": 33.677
       },
       {
           "code": "KR",
           "lon": 128.103,
           "lat": 36.504
       },
       {
           "code": "TM",
           "lon": 59.384,
           "lat": 39.122
       },
       {
           "code": "TJ",
           "lon": 69.42,
           "lat": 38.665
       },
       {
           "code": "UZ",
           "lon": 63.17,
           "lat": 41.75
       },
       {
           "code": "CN",
           "lon": 106.514,
           "lat": 33.42
       },
       {
           "code": "PK",
           "lon": 69.386,
           "lat": 29.967
       },
       {
           "code": "BD",
           "lon": 89.941,
           "lat": 24.218
       },
       {
           "code": "MO",
           "lon": 113.545,
           "lat": 22.2
       },
       {
           "code": "TW",
           "lon": 120.946,
           "lat": 23.754
       },
       {
           "code": "HK",
           "lon": 114.129,
           "lat": 22.423
       },
       {
           "code": "JP",
           "lon": 139.068,
           "lat": 36.491
       },
       {
           "code": "AZ",
           "lon": 47.395,
           "lat": 40.43
       },
       {
           "code": "AM",
           "lon": 44.563,
           "lat": 40.534
       },
       {
           "code": "KZ",
           "lon": 67.301,
           "lat": 48.16
       },
       {
           "code": "GE",
           "lon": 43.518,
           "lat": 42.176
       },
       {
           "code": "BG",
           "lon": 25.231,
           "lat": 42.761
       },
       {
           "code": "MD",
           "lon": 28.599,
           "lat": 47.193
       },
       {
           "code": "BY",
           "lon": 28.047,
           "lat": 53.54
       },
       {
           "code": "JO",
           "lon": 36.319,
           "lat": 30.703
       },
       {
           "code": "IL",
           "lon": 34.851,
           "lat": 31.026
       },
       {
           "code": "PS",
           "lon": 35.278,
           "lat": 32.037
       },
       {
           "code": "SY",
           "lon": 38.506,
           "lat": 35.013
       },
       {
           "code": "LB",
           "lon": 35.888,
           "lat": 33.92
       },
       {
           "code": "CY",
           "lon": 33.219,
           "lat": 35.043
       },
       {
           "code": "TR",
           "lon": 35.179,
           "lat": 39.061
       },
       {
           "code": "EG",
           "lon": 29.872,
           "lat": 26.494
       },
       {
           "code": "QA",
           "lon": 51.191,
           "lat": 25.316
       },
       {
           "code": "AE",
           "lon": 54.163,
           "lat": 23.549
       },
       {
           "code": "IR",
           "lon": 54.301,
           "lat": 32.565
       },
       {
           "code": "BH",
           "lon": 50.562,
           "lat": 26.019
       },
       {
           "code": "KW",
           "lon": 47.376,
           "lat": 29.476
       },
       {
           "code": "IQ",
           "lon": 43.772,
           "lat": 33.048
       },
       {
           "code": "SK",
           "lon": 19.491,
           "lat": 48.707
       },
       {
           "code": "PL",
           "lon": 19.401,
           "lat": 52.125
       },
       {
           "code": "LT",
           "lon": 23.897,
           "lat": 55.336
       },
       {
           "code": "EE",
           "lon": 25.793,
           "lat": 58.674
       },
       {
           "code": "LV",
           "lon": 25.641,
           "lat": 56.858
       },
       {
           "code": "FI",
           "lon": 26.272,
           "lat": 64.504
       },
       {
           "code": "AX",
           "lon": 19.952,
           "lat": 60.198
       },
       {
           "code": "HR",
           "lon": 16.693,
           "lat": 45.723
       },
       {
           "code": "BA",
           "lon": 17.786,
           "lat": 44.169
       },
       {
           "code": "RO",
           "lon": 24.969,
           "lat": 45.844
       },
       {
           "code": "UA",
           "lon": 31.388,
           "lat": 49.016
       },
       {
           "code": "SM",
           "lon": 12.46,
           "lat": 43.942
       },
       {
           "code": "SI",
           "lon": 14.827,
           "lat": 46.124
       },
       {
           "code": "HU",
           "lon": 19.134,
           "lat": 47.07
       },
       {
           "code": "GR",
           "lon": 21.766,
           "lat": 39.666
       },
       {
           "code": "MK",
           "lon": 21.698,
           "lat": 41.6
       },
       {
           "code": "AL",
           "lon": 20.068,
           "lat": 41.143
       },
       {
           "code": "MT",
           "lon": 14.442,
           "lat": 35.89
       },
       {
           "code": "ME",
           "lon": 19.254,
           "lat": 42.792
       },
       {
           "code": "RS",
           "lon": 20.806,
           "lat": 44.032
       },
       {
           "code": "VA",
           "lon": 12.451,
           "lat": 41.904
       },
       {
           "code": "PW",
           "lon": 134.57,
           "lat": 7.501
       },
       {
           "code": "MH",
           "lon": 168.963,
           "lat": 7.595
       },
       {
           "code": "VN",
           "lon": 105.314,
           "lat": 21.491
       },
       {
           "code": "MP",
           "lon": 145.623,
           "lat": 15.005
       },
       {
           "code": "GU",
           "lon": 144.707,
           "lat": 13.385
       },
       {
           "code": "KH",
           "lon": 104.564,
           "lat": 12.714
       },
       {
           "code": "TL",
           "lon": 125.878,
           "lat": -8.822
       },
       {
           "code": "TV",
           "lon": 179.219,
           "lat": -8.514
       },
       {
           "code": "BN",
           "lon": 114.591,
           "lat": 4.468
       },
       {
           "code": "FM",
           "lon": 158.235,
           "lat": 6.883
       },
       {
           "code": "NR",
           "lon": 166.93,
           "lat": -0.522
       },
       {
           "code": "SG",
           "lon": 103.808,
           "lat": 1.351
       },
       {
           "code": "PH",
           "lon": 122.466,
           "lat": 11.118
       },
       {
           "code": "NC",
           "lon": 165.447,
           "lat": -21.359
       },
       {
           "code": "NF",
           "lon": 167.953,
           "lat": -29.037
       },
       {
           "code": "AU",
           "lon": 136.189,
           "lat": -24.973
       },
       {
           "code": "VU",
           "lon": 166.899,
           "lat": -15.376
       },
       {
           "code": "SB",
           "lon": 160.109,
           "lat": -9.611
       },
       {
           "code": "PG",
           "lon": 143.459,
           "lat": -5.949
       },
       {
           "code": "CX",
           "lon": 105.704,
           "lat": -10.444
       },
       {
           "code": "LK",
           "lon": 80.704,
           "lat": 7.612
       },
       {
           "code": "IN",
           "lon": 78.5,
           "lat": 21
       },
       {
           "code": "DJ",
           "lon": 42.516,
           "lat": 11.9
       },
       {
           "code": "MM",
           "lon": 96.041,
           "lat": 21.718
       },
       {
           "code": "OM",
           "lon": 57.407,
           "lat": 21.656
       },
       {
           "code": "YE",
           "lon": 48.355,
           "lat": 15.807
       },
       {
           "code": "LA",
           "lon": 102.471,
           "lat": 19.905
       },
       {
           "code": "CC",
           "lon": 96.839,
           "lat": -12.173
       },
       {
           "code": "ID",
           "lon": 114.252,
           "lat": -0.976
       },
       {
           "code": "SC",
           "lon": 55.474,
           "lat": -4.647
       },
       {
           "code": "IO",
           "lon": 72.416,
           "lat": -7.335
       },
       {
           "code": "MV",
           "lon": 72.92,
           "lat": 3.548
       },
       {
           "code": "MY",
           "lon": 102.195,
           "lat": 4.201
       },
       {
           "code": "TH",
           "lon": 100.844,
           "lat": 15.7
       },
       {
           "code": "TF",
           "lon": 69.117,
           "lat": -49.302
       },
       {
           "code": "HM",
           "lon": 73.507,
           "lat": -53.111
       },
       {
           "code": "MG",
           "lon": 46.706,
           "lat": -19.374
       },
       {
           "code": "KM",
           "lon": 43.337,
           "lat": -11.758
       },
       {
           "code": "MU",
           "lon": 57.583,
           "lat": -20.255
       },
       {
           "code": "RE",
           "lon": 55.538,
           "lat": -21.122
       },
       {
           "code": "YT",
           "lon": 45.155,
           "lat": -12.777
       },
       {
           "code": "UG",
           "lon": 32.386,
           "lat": 1.28
       },
       {
           "code": "ET",
           "lon": 39.616,
           "lat": 8.626
       },
       {
           "code": "CF",
           "lon": 20.483,
           "lat": 6.571
       },
       {
           "code": "SD",
           "lon": 30.05,
           "lat": 13.832
       },
       {
           "code": "SA",
           "lon": 44.585,
           "lat": 24.023
       },
       {
           "code": "ER",
           "lon": 38.219,
           "lat": 16.045
       },
       {
           "code": "TD",
           "lon": 18.665,
           "lat": 15.361
       },
       {
           "code": "MW",
           "lon": 33.808,
           "lat": -13.4
       },
       {
           "code": "CD",
           "lon": 23.654,
           "lat": -2.876
       },
       {
           "code": "BI",
           "lon": 29.887,
           "lat": -3.356
       },
       {
           "code": "RW",
           "lon": 29.917,
           "lat": -1.998
       },
       {
           "code": "TZ",
           "lon": 34.823,
           "lat": -6.27
       },
       {
           "code": "SO",
           "lon": 48.316,
           "lat": 9.774
       },
       {
           "code": "KE",
           "lon": 37.858,
           "lat": 0.53
       },
       {
           "code": "LS",
           "lon": 28.243,
           "lat": -29.581
       },
       {
           "code": "SZ",
           "lon": 31.497,
           "lat": -26.562
       },
       {
           "code": "MZ",
           "lon": 37.923,
           "lat": -14.422
       },
       {
           "code": "ZM",
           "lon": 26.32,
           "lat": -14.614
       },
       {
           "code": "ZW",
           "lon": 29.872,
           "lat": -19
       },
       {
           "code": "BW",
           "lon": 23.815,
           "lat": -22.182
       },
       {
           "code": "ZA",
           "lon": 23.121,
           "lat": -30.558
       },
       {
           "code": "BE",
           "lon": 4.664,
           "lat": 50.643
       },
       {
           "code": "NL",
           "lon": 5.389,
           "lat": 52.077
       },
       {
           "code": "IM",
           "lon": -4.527,
           "lat": 54.229
       },
       {
           "code": "DK",
           "lon": 9.264,
           "lat": 56.058
       },
       {
           "code": "SE",
           "lon": 15.27,
           "lat": 62.011
       },
       {
           "code": "NO",
           "lon": 8.74,
           "lat": 61.152
       },
       {
           "code": "AT",
           "lon": 14.912,
           "lat": 47.683
       },
       {
           "code": "LI",
           "lon": 9.555,
           "lat": 47.153
       },
       {
           "code": "DE",
           "lon": 9.851,
           "lat": 51.11
       },
       {
           "code": "CZ",
           "lon": 15.338,
           "lat": 49.743
       },
       {
           "code": "JE",
           "lon": -2.129,
           "lat": 49.219
       },
       {
           "code": "GG",
           "lon": -2.576,
           "lat": 49.459
       },
       {
           "code": "LU",
           "lon": 6.088,
           "lat": 49.771
       },
       {
           "code": "AD",
           "lon": 1.576,
           "lat": 42.549
       },
       {
           "code": "LY",
           "lon": 18.023,
           "lat": 27.044
       },
       {
           "code": "TN",
           "lon": 9.596,
           "lat": 35.383
       },
       {
           "code": "FR",
           "lon": 2.55,
           "lat": 46.565
       },
       {
           "code": "IT",
           "lon": 12.8,
           "lat": 42.7
       },
       {
           "code": "MC",
           "lon": 7.412,
           "lat": 43.75
       },
       {
           "code": "CH",
           "lon": 7.908,
           "lat": 46.861
       },
       {
           "code": "GI",
           "lon": -5.345,
           "lat": 36.138
       },
       {
           "code": "PM",
           "lon": -56.325,
           "lat": 47.042
       },
       {
           "code": "GB",
           "lon": -1.6,
           "lat": 53
       },
       {
           "code": "FO",
           "lon": -6.864,
           "lat": 62.05
       },
       {
           "code": "IS",
           "lon": -18.48,
           "lat": 64.764
       },
       {
           "code": "IE",
           "lon": -8.152,
           "lat": 53.177
       },
       {
           "code": "SJ",
           "lon": 18.374,
           "lat": 78.83
       },
       {
           "code": "AG",
           "lon": -61.783,
           "lat": 17.078
       },
       {
           "code": "EH",
           "lon": -13.706,
           "lat": 24.554
       },
       {
           "code": "DZ",
           "lon": 2.632,
           "lat": 28.163
       },
       {
           "code": "KN",
           "lon": -62.769,
           "lat": 17.34
       },
       {
           "code": "ES",
           "lon": -3.649,
           "lat": 40.227
       },
       {
           "code": "MA",
           "lon": -5.758,
           "lat": 32.706
       },
       {
           "code": "PT",
           "lon": -8.058,
           "lat": 40.309
       },
       {
           "code": "LC",
           "lon": -60.969,
           "lat": 13.898
       },
       {
           "code": "MQ",
           "lon": -61.021,
           "lat": 14.653
       },
       {
           "code": "MR",
           "lon": -10.332,
           "lat": 20.26
       },
       {
           "code": "CV",
           "lon": -23.634,
           "lat": 15.071
       },
       {
           "code": "DM",
           "lon": -61.356,
           "lat": 15.475
       },
       {
           "code": "GP",
           "lon": -61.441,
           "lat": 16.286
       },
       {
           "code": "MS",
           "lon": -62.187,
           "lat": 16.736
       },
       {
           "code": "CU",
           "lon": -77.781,
           "lat": 21.297
       },
       {
           "code": "BS",
           "lon": -78.014,
           "lat": 24.628
       },
       {
           "code": "TC",
           "lon": -71.95,
           "lat": 21.902
       },
       {
           "code": "BM",
           "lon": -64.709,
           "lat": 32.336
       },
       {
           "code": "CA",
           "lon": -109.433,
           "lat": 59.081
       },
       {
           "code": "RU",
           "lon": 96.689,
           "lat": 61.988
       },
       {
           "code": "GL",
           "lon": -41.391,
           "lat": 74.719
       },
       {
           "code": "BL",
           "lon": -63.043,
           "lat": 18.04
       },
       {
           "code": "AI",
           "lon": -63.032,
           "lat": 18.237
       },
       {
           "code": "MF",
           "lon": -63.041,
           "lat": 18.094
       },
       {
           "code": "VG",
           "lon": -64.39,
           "lat": 18.483
       },
       {
           "code": "HT",
           "lon": -72.278,
           "lat": 19.142
       },
       {
           "code": "US",
           "lon": -98.606,
           "lat": 39.622
       },
       {
           "code": "KY",
           "lon": -81.198,
           "lat": 19.314
       },
       {
           "code": "GT",
           "lon": -90.398,
           "lat": 15.256
       },
       {
           "code": "PR",
           "lon": -66.466,
           "lat": 18.221
       },
       {
           "code": "VI",
           "lon": -64.785,
           "lat": 17.741
       },
       {
           "code": "BZ",
           "lon": -88.602,
           "lat": 17.219
       },
       {
           "code": "DO",
           "lon": -70.729,
           "lat": 19.015
       },
       {
           "code": "JM",
           "lon": -77.32,
           "lat": 18.151
       },
       {
           "code": "MX",
           "lon": -102.535,
           "lat": 23.951
       },
       {
           "code": "BJ",
           "lon": 2.469,
           "lat": 10.541
       },
       {
           "code": "SL",
           "lon": -11.792,
           "lat": 8.56
       },
       {
           "code": "GN",
           "lon": -10.942,
           "lat": 10.439
       },
       {
           "code": "ML",
           "lon": -3.524,
           "lat": 17.35
       },
       {
           "code": "BF",
           "lon": -1.74,
           "lat": 12.278
       },
       {
           "code": "NE",
           "lon": 9.398,
           "lat": 17.426
       },
       {
           "code": "ST",
           "lon": 6.629,
           "lat": 0.201
       },
       {
           "code": "CM",
           "lon": 12.277,
           "lat": 5.133
       },
       {
           "code": "NG",
           "lon": 8.105,
           "lat": 9.594
       },
       {
           "code": "LR",
           "lon": -9.657,
           "lat": 6.682
       },
       {
           "code": "CI",
           "lon": -5.556,
           "lat": 7.632
       },
       {
           "code": "GH",
           "lon": -1.207,
           "lat": 7.96
       },
       {
           "code": "TG",
           "lon": 1.081,
           "lat": 8.799
       },
       {
           "code": "BV",
           "lon": 3.412,
           "lat": -54.422
       },
       {
           "code": "SH",
           "lon": -5.71,
           "lat": -15.953
       },
       {
           "code": "NA",
           "lon": 17.218,
           "lat": -22.133
       },
       {
           "code": "AO",
           "lon": 17.544,
           "lat": -12.296
       },
       {
           "code": "CG",
           "lon": 15.986,
           "lat": -0.055
       },
       {
           "code": "GA",
           "lon": 11.797,
           "lat": -0.591
       },
       {
           "code": "GQ",
           "lon": 10.488,
           "lat": 1.607
       },
       {
           "code": "GD",
           "lon": -61.678,
           "lat": 12.118
       },
       {
           "code": "AN",
           "lon": -68.87,
           "lat": 12.123
       },
       {
           "code": "AW",
           "lon": -69.977,
           "lat": 12.517
       },
       {
           "code": "VC",
           "lon": -61.194,
           "lat": 13.248
       },
       {
           "code": "GM",
           "lon": -15.386,
           "lat": 13.453
       },
       {
           "code": "SN",
           "lon": -14.881,
           "lat": 15.013
       },
       {
           "code": "BB",
           "lon": -59.559,
           "lat": 13.153
       },
       {
           "code": "PE",
           "lon": -75.552,
           "lat": -9.326
       },
       {
           "code": "VE",
           "lon": -66.166,
           "lat": 7.125
       },
       {
           "code": "GW",
           "lon": -14.651,
           "lat": 12.125
       },
       {
           "code": "GY",
           "lon": -58.974,
           "lat": 4.792
       },
       {
           "code": "SR",
           "lon": -55.912,
           "lat": 4.127
       },
       {
           "code": "TT",
           "lon": -61.253,
           "lat": 10.468
       },
       {
           "code": "GF",
           "lon": -53.241,
           "lat": 3.924
       },
       {
           "code": "FK",
           "lon": -58.694,
           "lat": -51.665
       },
       {
           "code": "GS",
           "lon": -36.891,
           "lat": -54.209
       },
       {
           "code": "AR",
           "lon": -65.167,
           "lat": -35.377
       },
       {
           "code": "UY",
           "lon": -56.012,
           "lat": -32.8
       },
       {
           "code": "PY",
           "lon": -58.391,
           "lat": -23.236
       },
       {
           "code": "BO",
           "lon": -64.671,
           "lat": -16.715
       },
       {
           "code": "BR",
           "lon": -53.089,
           "lat": -10.772
       },
       {
           "code": "CO",
           "lon": -73.076,
           "lat": 3.9
       },
       {
           "code": "UM",
           "lon": -160.027,
           "lat": -0.385
       },
       {
           "code": "HN",
           "lon": -86.863,
           "lat": 14.819
       },
       {
           "code": "NI",
           "lon": -85.034,
           "lat": 12.84
       },
       {
           "code": "CR",
           "lon": -83.946,
           "lat": 9.971
       },
       {
           "code": "PA",
           "lon": -80.92,
           "lat": 8.384
       },
       {
           "code": "SV",
           "lon": -88.866,
           "lat": 13.736
       },
       {
           "code": "NU",
           "lon": -169.869,
           "lat": -19.052
       },
       {
           "code": "AS",
           "lon": -170.73,
           "lat": -14.318
       },
       {
           "code": "WS",
           "lon": -172.414,
           "lat": -13.652
       },
       {
           "code": "TK",
           "lon": -171.853,
           "lat": -9.193
       },
       {
           "code": "WF",
           "lon": -178.131,
           "lat": -14.289
       },
       {
           "code": "KI",
           "lon": 175.036,
           "lat": -1.508
       },
       {
           "code": "EC",
           "lon": -78.497,
           "lat": -1.385
       },
       {
           "code": "NZ",
           "lon": 172.235,
           "lat": -42.634
       },
       {
           "code": "PF",
           "lon": -149.462,
           "lat": -17.626
       },
       {
           "code": "CL",
           "lon": -69.433,
           "lat": -23.389
       },
       {
           "code": "PN",
           "lon": -128.316,
           "lat": -24.366
       },
       {
           "code": "TO",
           "lon": -175.185,
           "lat": -21.202
       },
       {
           "code": "CK",
           "lon": -159.782,
           "lat": -21.219
       },
       {
           "code": "FJ",
           "lon": 177.974,
           "lat": -17.819
       }
   ];

   var initialZoom = 2;
   var initialLonLat = [0, 0];

    var initialView = new ol.View({
        projection: 'EPSG:4326',
        center: ol.proj.fromLonLat(initialLonLat),
        zoom: initialZoom
    });

    var map = null;
    var continentLayer = null;
    var markerIconStyle = null;
    var markerSource = null;
    var continentLayerStyle = null;
    var selectedContinentLayerStyle = null;

    start();

    function start() {
        createMap();
    }

    function identify(countryCode) {
        countryCode = countryCode.toUpperCase();

        var foundCountries = getCountry(countryCode);

        if(foundCountries.length == 0) {
            alert('Failed to find country!');
            return;
        }

        addCountryMarker(foundCountries[0]);
        selectContinent(foundCountries[0]);
        showFlagOverlay();
        changeFlag(countryCode);
    }

    function addCountryMarker(countryData) {
        var lat = countryData.lat;
        var lng = countryData.lon;

        markerSource.clear();

        var feature = new ol.Feature({
            geometry: new ol.geom.Point([lng, lat])
        });

        feature.setStyle(markerIconStyle);

        markerSource.addFeature(feature);
    }

    function selectContinent(countryData) {
        var lat = countryData.lat;
        var lng = countryData.lon;

        var countryCoordinate = [lng, lat];

        var features = continentLayer.getSource().getFeatures();

        var focusContinentFeature = null;

        for (var i = 0; i < features.length; i++) {
            features[i].setStyle(continentLayerStyle);

            var continentPolygonGeometry = features[i].getGeometry();

            if(continentPolygonGeometry.intersectsCoordinate(countryCoordinate)) {
                focusContinentFeature = features[i];
            }
        }

        focusContinentFeature.setStyle(selectedContinentLayerStyle);
    }

    function getCountry(countryCode) {
        var foundCountries = [];

        for (var i = 0; i < countryList.length; i++) {
            var country = countryList[i];

            if ( country.code == countryCode)
                foundCountries.push(country);
        }

        return foundCountries;
    }

    function createMap() {
        continentLayerStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color:  'rgba(255, 255, 255, 0)',
                width: 0
            }),
            fill: new ol.style.Fill({
                color: 'rgba(228, 233, 236, 1)'
            })
        });

        selectedContinentLayerStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 255, 255, 0)',
                width: 0
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 133, 254, 1)'
            })
        });

        continentLayer = new ol.layer.Vector({
           source: new ol.source.Vector({
               format: new ol.format.GeoJSON(),
               url: './mapdata/json/continent.geojson',
               wrapX: false // no horizontal repeat
           }),
           style: continentLayerStyle
        });

        markerIconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                //size: [160, 160],
                scale: 0.5,
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: './mapdata/image/marker.png'
            }))
        });

        markerSource = new ol.source.Vector({
            features: [],
            wrapX: false
        });

        var markerLayer = new ol.layer.Vector({
            source: markerSource
        });

        map = new ol.Map({
            target: 'map',
            layers: [
                continentLayer,
                markerLayer
            ],

            view: initialView
        });

        // for disable mouse wheel zoom
        map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof ol.interaction.MouseWheelZoom) {
                interaction.setActive(false);
            }
        }, this);

        // for remove default map control
        map.getControls().forEach(function(control) {
            if (control instanceof ol.control.Zoom) {
                map.removeControl(control);
            }
        }, this);

        var container = document.getElementById('flag_container');

        var flagOverlay = new ol.Overlay({
            element: container,
            positioning: 'bottom-left'
        });

        map.addOverlay(flagOverlay);
    }

    function showFlagOverlay() {
        var flagDiv  = document.getElementById('flag_container');

        var parentElement = flagDiv.parentElement;

        parentElement.style.position = "absolute";
        parentElement.style.width = "180px";
        parentElement.style.height = "84px";
        parentElement.style.right = "60px";
        parentElement.style.bottom = "42px";
        parentElement.style.display = "block";
    }

    function changeFlag(countryCode) {
        var image = document.getElementById('flag');

        image.src = './mapdata/image/flag/' + countryCode + '.png';
    }

    return {
        identify: identify
    }

})();  // App entry point (singleton)