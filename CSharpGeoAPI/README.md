#sample data  
https://gadm.org/download_world.html

#Part 1: Create C# methods with the following signatures

##1a Envelope ReadGeoDataByCountryKey(iso3166_1CountryCode, Data.Envelope, lite) -- returns full country data  
##1b MultiPolygon ReadGeoDataByCountryKey(iso3166_1CountryCode, Data.MultiPolygon, lite) -- returns full country data  
##1c Polyline ReadGeoDataByCountryKey(iso3166_1CountryCode, Data.Polyline, lite) -- returns full country data

##2 ReadGeoCenterPointByCountryKey(iso3166_1CountryCode) -- returns the center point of country  
##3a Envelope ReadGeoDataByRegionKey(iso3166_2RegionCode, Data.Envelope, lite) -- returns full region data  
##3b MultiPolygon ReadGeoDataByRegionKey(iso3166_2RegionCode, Data.MultiPolygon, lite) -- returns full region data  
##3c Polyline ReadGeoDataByRegionKey(iso3166_2RegionCode, Data.Polyline, lite) -- returns full region data  
##4 ReadGeoCenterPointByCountryKey(iso3166_2RegionCode) -- returns the center point by region key  

If lite == false, return the full data  
If lite == true, return only 500 data points that fit the country or region no matter how big  

#Part 2: Country boundaries will be validated by testing randomly via GoogleMaps or via GPS MotionX mobile app.  
https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en  
https://gps.motionx.com/ less

#These are examples for what we are looking for. Simple arrays of long-lat data.  
###(1) Simple Geo Envelope (2.70938205700003 4.30875110600005,2.70938205700003 13.8841400150001,14.6760044100001 13.8841400150001,14.6760044100001 4.30875110600005,2.70938205700003 4.30875110600005)  
###(2) Simple MultiPolygon (5.54514694200003 13.8841400150001,6.92800808000004 12.9898529050001,9.65023899100004 12.803606987,13.634547234 13.7106885910001,14.6760044100001 12.166168213,11.5210742950001 6.61761665300003,10.1533517840001 7.03845167200006,8.27791690800007 4.53458309200005,5.98291587800003 4.30875110600005,5.52958488500008 5.81652879700005,2.70938205700003 6.37569379800004,3.64255595200007 12.520148277,5.54514694200003 13.8841400150001)  
###(3) Simple Polyline (5.54514694200003 13.8841400150001,6.92800808000004 12.9898529050001,9.65023899100004 12.803606987,13.634547234 13.7106885910001,14.6760044100001 12.166168213,11.5210742950001 6.61761665300003,10.1533517840001 7.03845167200006,8.27791690800007 4.53458309200005,5.98291587800003 4.30875110600005,5.52958488500008 5.81652879700005,2.70938205700003 6.37569379800004,3.64255595200007 12.520148277,5.54514694200003 13.8841400150001)  