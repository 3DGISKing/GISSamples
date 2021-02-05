using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OSGeo.OGR;

namespace GeoAPI
{
    class GeoAPITest
    {
        static void Main(string[] args)
        {
            // 1 configure API
            
            String geopackagePath = "E:/0Task/GeoAPI/gadm36_levels.gpkg";

            // geopackage file was downloaded from https://gadm.org/download_world.html

            if (!GeoAPI.Configure(geopackagePath))
            {
                Console.WriteLine("failed to configure!");
                return; 
            }
                        
            TestCountryCenterAPI();
            TestCountryEnvelopeAPI();
            TestCountryPolygonAPI();
            
            TestRegionCenterAPI();
            TestRegionEnvelopeAPI();
            TestRegionPolygonAPI();
        }

        static void TestCountryCenterAPI()
        {
            string countryCode = "NGA";

            GeoPoint NigeriaCenter = GeoAPI.ReadGeoCenterPointByCountryKey(countryCode);

            if (NigeriaCenter == null)
            {
                Console.WriteLine("failed to get country data for specified country code: {0}", countryCode);
                return;
            }

            // access lat long data

            LonLat NigeriaCenterLonLat = NigeriaCenter.GetData();

            Console.WriteLine("Nigeria Center x = {0}, y = {1}", NigeriaCenterLonLat.longitude, NigeriaCenterLonLat.latitude);

            bool saveSuccess = NigeriaCenter.saveToGeoJson("E:/Nigeria_Center.geojson");

            if (!saveSuccess)
            {
                Console.WriteLine("failed to save");
            }
        }

        static void TestCountryEnvelopeAPI()
        {
            string countryCode = "NGA";

            GeoEnvelope NigeriaEnvelope = GeoAPI.ReadGeoEnvelopeByCountryKey(countryCode);

            if (NigeriaEnvelope == null)
            {
                Console.WriteLine("failed to get country data for specified country code: {0}", countryCode);
                return;
            }

            // access lat long data

            List<LonLat> NigeriaEnvelopeLatLonArray = NigeriaEnvelope.GetData();

            for (int i = 0; i < NigeriaEnvelopeLatLonArray.Count; i++)
            {
                LonLat lonlat = NigeriaEnvelopeLatLonArray[i];
                Console.WriteLine("{0} th x = {1}, y = {2}", i, lonlat.longitude, lonlat.latitude);
            }

            // how to test result
            // we can save result to geojson file, open it in GIS tool(for example QGIS) and view it.

            bool saveSuccess = NigeriaEnvelope.saveToGeoJson("E:/Nigeria_Envelope.geojson");

            if (!saveSuccess)
            {
                Console.WriteLine("failed to save Nigeria_Envelope.geojson");
            }
        }

        static void TestCountryPolygonAPI()
        {
            // test polygon API

            string countryCode = "NGA";
            double simplifyTolerlance = 0.0;

            GeoMultiPolygon fullNigeriaData = GeoAPI.ReadGeoPolygonByCountryKey(countryCode, simplifyTolerlance);

            if (fullNigeriaData == null)
            {
                Console.WriteLine("failed to get country data for specified country code: {0}", countryCode);
                return;
            }

            fullNigeriaData.saveToGeoJson("E:/Full_Nigeria.geojson");

            simplifyTolerlance = 0.02 ;

            GeoMultiPolygon simplifiedNigeriaDataPreserveTopology = GeoAPI.ReadGeoPolygonByCountryKey(countryCode, simplifyTolerlance);

            if(simplifiedNigeriaDataPreserveTopology == null)
            {
                Console.WriteLine("failed to get country data for specified country code: {0}", countryCode);
                return;
            }

            // access lat long data

            for (int i = 0; i < simplifiedNigeriaDataPreserveTopology.GetData().Count; i++)
            {
                GeoPolygon polygon = simplifiedNigeriaDataPreserveTopology.GetData()[i];

                for (int j = 0; j < polygon.GetData().Count; j++)
                {
                    GeoLineString lineString = polygon.GetData()[j];

                    for (int k = 0; k < lineString.GetData().Count; k++)
                    {
                        LonLat lonlat = lineString.GetData()[k];
                        Console.WriteLine("{0}d th x = {1}, y = {2}", i, lonlat.longitude, lonlat.latitude);
                    }
                }
            }

            // how to test result
            // we can save result to geojson file, open it in GIS tool(for example QGIS) and view it.

            bool saveSuccess = simplifiedNigeriaDataPreserveTopology.saveToGeoJson("E:/Simplified_Nigeria_0.02.geojson");

            if (!saveSuccess)
            {
                Console.WriteLine("failed to save");
            }
        }

        static void TestRegionCenterAPI()
        {
            string regionCode = "NG-KD";

            GeoPoint NigeriaKadunaCenter = GeoAPI.ReadGeoCenterPointByRegionKey(regionCode);

            if (NigeriaKadunaCenter == null)
            {
                Console.WriteLine("failed to get country data for specified country code: {0}", regionCode);
                return;
            }

            // access lat long data

            LonLat NigeriaKadunaCenterLonLat = NigeriaKadunaCenter.GetData();

            Console.WriteLine("Nigeria Kaduna Center x = {0}, y = {1}", NigeriaKadunaCenterLonLat.longitude, NigeriaKadunaCenterLonLat.latitude);

            bool saveSuccess = NigeriaKadunaCenter.saveToGeoJson("E:/NigeriaKaduna_Center.geojson");

            if (!saveSuccess)
            {
                Console.WriteLine("failed to save");
            }
        }

        static void TestRegionEnvelopeAPI()
        {
            string regionCode = "NG-KD";

            GeoEnvelope NigeriaKadunaEnvelope = GeoAPI.ReadGeoEnvelopeByRegionKey(regionCode);

            if (NigeriaKadunaEnvelope == null)
            {
                Console.WriteLine("failed to get country data for specified region code: {0}", regionCode);
                return;
            }

            // access lat long data

            List<LonLat> NigeriaKaduanEnvelopeLatLonArray = NigeriaKadunaEnvelope.GetData();

            for (int i = 0; i < NigeriaKaduanEnvelopeLatLonArray.Count; i++)
            {
                LonLat lonlat = NigeriaKaduanEnvelopeLatLonArray[i];
                Console.WriteLine("{0} th x = {1}, y = {2}", i, lonlat.longitude, lonlat.latitude);
            }

            // how to test result
            // we can save result to geojson file, open it in GIS tool(for example QGIS) and view it.

            bool saveSuccess = NigeriaKadunaEnvelope.saveToGeoJson("E:/Nigeria_Kaduna_Envelope.geojson");

            if (!saveSuccess)
            {
                Console.WriteLine("failed to save Nigeria_Kaduna_Envelope.geojson");
            }
        }

        static void TestRegionPolygonAPI()
        {
            // test polygon API

            string regionCode = "NG-KD";
            double simplifyTolerlance = 0.0;

            GeoMultiPolygon fullNigeriaKadunaData = GeoAPI.ReadGeoPolygonByRegionKey(regionCode, simplifyTolerlance);

            if (fullNigeriaKadunaData == null)
            {
                Console.WriteLine("failed to get data for specified region code: {0}", regionCode);
                return;
            }

            fullNigeriaKadunaData.saveToGeoJson("E:/Full_Nigeria_Kaduna.geojson");

            simplifyTolerlance = 0.02;

            GeoMultiPolygon simplifiedNigeriaKadunaData = GeoAPI.ReadGeoPolygonByRegionKey(regionCode, simplifyTolerlance);

            if (simplifiedNigeriaKadunaData == null)
            {
                Console.WriteLine("failed to get data for specified region code: {0}", regionCode);
                return;
            }

            // access lat long data

            for (int i = 0; i < simplifiedNigeriaKadunaData.GetData().Count; i++)
            {
                GeoPolygon polygon = simplifiedNigeriaKadunaData.GetData()[i];

                for (int j = 0; j < polygon.GetData().Count; j++)
                {
                    GeoLineString lineString = polygon.GetData()[j];

                    for (int k = 0; k < lineString.GetData().Count; k++)
                    {
                        LonLat lonlat = lineString.GetData()[k];
                        Console.WriteLine("{0}d th x = {1}, y = {2}", i, lonlat.longitude, lonlat.latitude);
                    }
                }
            }

            // how to test result
            // we can save result to geojson file, open it in GIS tool(for example QGIS) and view it.

            bool saveSuccess = simplifiedNigeriaKadunaData.saveToGeoJson("E:/Simplified_Nigeria_Kaduna_0.02.geojson");

            if (!saveSuccess)
            {
                Console.WriteLine("failed to save");
            }
        }

    }
}
