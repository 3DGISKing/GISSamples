using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using OSGeo.OGR;

namespace GeoAPI
{
    public enum Data
    {
        Envelop = 0,
        MultiPolygon = 1,
        Polyline = 2
    }

    public struct LonLat
    {
        public LonLat(double lon, double lat)
        {
            longitude = lon;
            latitude = lat;
        }

        public double longitude;
        public double latitude;
    }

    public class GeoPoint
    {
        LonLat _lonlat;
        string _geojson;

        public GeoPoint()
        {
            _lonlat = new LonLat();
        }

        public void SetData(Geometry geometry)
        {
            wkbGeometryType geomType = geometry.GetGeometryType();

            if (geomType != wkbGeometryType.wkbPoint)
            {
                Console.WriteLine("internal error: geometry is not point");
                return;
            }

            int geomCount = geometry.GetGeometryCount();

            int pointCount = geometry.GetPointCount();

            if(pointCount > 0)
            {
                _lonlat.longitude = geometry.GetX(0);
                _lonlat.latitude = geometry.GetY(0);
            }
        }

        public LonLat GetData()
        {
            return _lonlat;
        }
        
        public void SetGeoJson(string s)
        {
            _geojson = s;
        }

        string GetGeoJson()
        {
            return _geojson;
        }

        public bool saveToGeoJson(string path)
        {
            bool ret = false;

            try
            {
                StreamWriter sw = new StreamWriter(path, true, Encoding.ASCII);
                sw.Write(_geojson);
                sw.Close();
            }

            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
                ret = false;
            }
            finally
            {
                ret = true;
            }

            return ret;
        }
    }

    public class GeoEnvelope
    {
        List<LonLat> _lonlatArray;
        string _geojson; 

        public GeoEnvelope()
        {
            _lonlatArray = new List<LonLat>();
        }

        public void SetData(Envelope envelope)
        {
            LonLat leftBottom = new LonLat(envelope.MinX, envelope.MinY);
            LonLat rightBottom = new LonLat(envelope.MaxX, envelope.MinY);
            LonLat rightTop = new LonLat(envelope.MaxX, envelope.MaxY);
            LonLat leftTop = new LonLat(envelope.MinX, envelope.MaxY);

            _lonlatArray.Add(leftBottom);
            _lonlatArray.Add(rightBottom);
            _lonlatArray.Add(rightTop);
            _lonlatArray.Add(leftTop);
        }
        
        void GenerateGeoJson()
        {
            Geometry polygon = new Geometry(wkbGeometryType.wkbPolygon);

            Geometry lineString = new Geometry(wkbGeometryType.wkbLinearRing);

            for (int i = 0; i < _lonlatArray.Count; i++)
            {
                lineString.AddPoint_2D(_lonlatArray[i].longitude, _lonlatArray[i].latitude);
            }

            polygon.AddGeometry(lineString);

            string[] options = new string[1];
            _geojson = polygon.ExportToJson(options);
        }      

        public List<LonLat> GetData()
        {
            return _lonlatArray;
        }
        public void SetGeoJson(string s)
        {
            _geojson = s;
        }

        string GetGeoJson()
        {
            return _geojson;
        }
        public bool saveToGeoJson(string path)
        {
            bool ret = false;

            GenerateGeoJson();

            try
            {
                StreamWriter sw = new StreamWriter(path, true, Encoding.ASCII);
                sw.Write(_geojson);
                sw.Close();
            }

            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
                ret = false;
            }
            finally
            {
                ret = true;
            }

            return ret;
        }
    }

    public class GeoLineString
    {
        List<LonLat> _lonlatArray;

        public GeoLineString()
        {
            _lonlatArray = new List<LonLat>();
        }

        public void SetData(Geometry geometry)
        {
            _lonlatArray = new List<LonLat>();

            wkbGeometryType geomType = geometry.GetGeometryType();

            if (geomType != wkbGeometryType.wkbLineString && geomType != wkbGeometryType.wkbLineString25D)
            {
                Console.WriteLine("internal error: geometry is not linestring");
                return;
            }

            int pointCount = geometry.GetPointCount();

            for (int i = 0; i < pointCount; i++)
            {
                LonLat lonlat = new LonLat(geometry.GetX(i), geometry.GetY(i));

                _lonlatArray.Add(lonlat);
            }
        }

        public List<LonLat> GetData()
        {
            return _lonlatArray;
        }
    }
    public class GeoPolygon
    {
        List<GeoLineString> _lineStringArray;

        public GeoPolygon()
        {
            _lineStringArray = new List<GeoLineString>();
        }

        public void SetData(Geometry geometry)
        {
            wkbGeometryType geomType = geometry.GetGeometryType();

            if (geomType != wkbGeometryType.wkbPolygon && geomType != wkbGeometryType.wkbPolygon25D)
            {
                Console.WriteLine("internal error: geometry is neither polygon");
                return;
            }

            int geomCount = geometry.GetGeometryCount();

            for (int i = 0; i < geomCount; i++)
            {
                Geometry geom = geometry.GetGeometryRef(i);

                if (geom.GetGeometryType() == wkbGeometryType.wkbLineString || geom.GetGeometryType() == wkbGeometryType.wkbLineString25D)
                {
                    GeoLineString lineString = new GeoLineString();
                    lineString.SetData(geom);

                    _lineStringArray.Add(lineString);
                }
                else
                    Console.WriteLine("internal error: geom is not linestring!");
            }
        }

        public List<GeoLineString> GetData()
        {
            return _lineStringArray;
        }
    }

    public class GeoMultiPolygon
    {
        List<GeoPolygon> _polygonArray;
        string _geojson;

        public GeoMultiPolygon()
        {
            _polygonArray = new List<GeoPolygon>();
        }

        public void SetData(Geometry geometry)
        {
            wkbGeometryType geomType = geometry.GetGeometryType();

            if (geomType != wkbGeometryType.wkbMultiPolygon &&
                geomType != wkbGeometryType.wkbMultiPolygon25D &&
                geomType != wkbGeometryType.wkbPolygon &&
                geomType != wkbGeometryType.wkbPolygon25D)
            {
                Console.WriteLine("internal error: geometry type is neither polygon nor polygon!");
                return;
            }

            if (geomType == wkbGeometryType.wkbMultiPolygon || geomType == wkbGeometryType.wkbMultiPolygon25D)
                SetDataFromMultiPolygon(geometry);
            else
                SetDataFromPolygon(geometry);
        }

        private void SetDataFromMultiPolygon(Geometry geometry)
        {
            int geomCount = geometry.GetGeometryCount();

            for (int i = 0; i < geomCount; i++)
            {
                Geometry geom = geometry.GetGeometryRef(i);

                if (geom.GetGeometryType() == wkbGeometryType.wkbPolygon)
                {
                    GeoPolygon polygon = new GeoPolygon();

                    polygon.SetData(geom);

                    _polygonArray.Add(polygon);
                }
                else
                    Console.WriteLine("unknown geometry type!");
            }
        }

        private void SetDataFromPolygon(Geometry geometry)
        {
            GeoPolygon polygon = new GeoPolygon();

            polygon.SetData(geometry);

            _polygonArray.Add(polygon);
        }

        public List<GeoPolygon> GetData()
        {
            return _polygonArray;
        }

        public void SetGeoJson(string s)
        {
            _geojson = s;
        }

        string GetGeoJson()
        {
            return _geojson;
        }

        public bool saveToGeoJson(string path)
        {
            bool ret = false;

            try
            {
                StreamWriter sw = new StreamWriter(path, true, Encoding.ASCII);
                sw.Write(_geojson);
                sw.Close();
            }

            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
                ret = false;
            }
            finally
            {
                ret = true;
            }

            return ret;
        }
    }

    public static partial class GeoAPI
    {
        private static volatile bool       _configured;
        private static volatile String     _geopackagePath;
        private static volatile DataSource _dataSource;

        public static bool Configure(String geopackagePath)
        {
            if (_configured)
                return true;

            if (!File.Exists(geopackagePath)){
                Console.WriteLine("geopackage path: " + geopackagePath + " does not exist!");
                return false;
            }

            GdalConfiguration.ConfigureOgr();

            _geopackagePath = geopackagePath;

            _dataSource = Ogr.Open(_geopackagePath , 0);

            if (_dataSource == null)
            {
                Console.WriteLine("failed to open geopackage file!");
                return false;
            }

            _configured = true;

            return true;
        }

        public static GeoPoint ReadGeoCenterPointByCountryKey(string iso3166_1CountryCode)
        {
            String sql = "SELECT geom FROM level0 WHERE GID_0 = " + "'" + iso3166_1CountryCode + "'";

            Layer resultLayer = _dataSource.ExecuteSQL(sql, null, "");

            if (resultLayer == null)
                return null;

            if (resultLayer.GetFeatureCount(0) == 0)
                return null;

            Feature feature = resultLayer.GetNextFeature();
            Geometry geometry = feature.GetGeometryRef();

            geometry = geometry.Centroid();

            wkbGeometryType geomType = geometry.GetGeometryType();

            string[] options = new string[1];
            string geometryJson = geometry.ExportToJson(options);

            GeoPoint point = new GeoPoint();

            point.SetData(geometry);
            point.SetGeoJson(geometryJson);

            return point;
        }

        public static GeoEnvelope ReadGeoEnvelopeByCountryKey(string iso3166_1CountryCode)
        {
            String sql = "SELECT geom FROM level0 WHERE GID_0 = " + "'" + iso3166_1CountryCode + "'";

            Layer resultLayer = _dataSource.ExecuteSQL(sql, null, "");

            if (resultLayer == null)
                return null;

            if (resultLayer.GetFeatureCount(0) == 0)
                return null;

            Envelope envelope = new Envelope();

            int ret = resultLayer.GetExtent(envelope, 1);

            GeoEnvelope geoEnvelope = new GeoEnvelope();

            geoEnvelope.SetData(envelope);

            return geoEnvelope;
        }

        public static GeoMultiPolygon ReadGeoPolygonByCountryKey(string iso3166_1CountryCode, double simplifyTolerlance, bool preserveTopology = true)
        {
            String sql = "SELECT geom FROM level0 WHERE GID_0 = " + "'" + iso3166_1CountryCode + "'";

            Layer resultLayer = _dataSource.ExecuteSQL(sql, null, "");

            if (resultLayer == null)
                return null;

            if (resultLayer.GetFeatureCount(0) == 0)
            {
                return null;
            }

            Feature feature = resultLayer.GetNextFeature();
            Geometry geometry = feature.GetGeometryRef();

            if (simplifyTolerlance > 0)
                if (preserveTopology == true)
                    geometry = geometry.SimplifyPreserveTopology(simplifyTolerlance);
                else
                    geometry = geometry.Simplify(simplifyTolerlance);

            int geometryCount = geometry.GetGeometryCount();
            wkbGeometryType geomType = geometry.GetGeometryType();

            string[] options = new string[1];
            string geometryJson = geometry.ExportToJson(options);

            GeoMultiPolygon multiPoygon = new GeoMultiPolygon();

            multiPoygon.SetData(geometry);
            multiPoygon.SetGeoJson(geometryJson);

            return multiPoygon;
        }

        private static  string ConvertRegionCodeToIso3166_2RegionCode(string regionCode)
        {
            return regionCode.Replace("-", ".");
        }

        public static GeoPoint ReadGeoCenterPointByRegionKey(string iso3166_2RegionCode)
        {
            iso3166_2RegionCode = ConvertRegionCodeToIso3166_2RegionCode(iso3166_2RegionCode);

            String sql = "SELECT geom FROM level1 WHERE HASC_1 = " + "'" + iso3166_2RegionCode + "'";

            Layer resultLayer = _dataSource.ExecuteSQL(sql, null, "");

            if (resultLayer == null)
                return null;

            if (resultLayer.GetFeatureCount(0) == 0)
                return null;

            Feature feature = resultLayer.GetNextFeature();
            Geometry geometry = feature.GetGeometryRef();

            geometry = geometry.Centroid();

            wkbGeometryType geomType = geometry.GetGeometryType();

            string[] options = new string[1];
            string geometryJson = geometry.ExportToJson(options);

            GeoPoint point = new GeoPoint();

            point.SetData(geometry);
            point.SetGeoJson(geometryJson);

            return point;
        }

        public static GeoEnvelope ReadGeoEnvelopeByRegionKey(string iso3166_2RegionCode)
        {
            iso3166_2RegionCode = ConvertRegionCodeToIso3166_2RegionCode(iso3166_2RegionCode);

            String sql = "SELECT geom FROM level1 WHERE HASC_1 = " + "'" + iso3166_2RegionCode + "'";

            Layer resultLayer = _dataSource.ExecuteSQL(sql, null, "");

            if (resultLayer == null)
                return null;

            if (resultLayer.GetFeatureCount(0) == 0)
                return null;

            Envelope envelope = new Envelope();

            int ret = resultLayer.GetExtent(envelope, 1);

            GeoEnvelope geoEnvelope = new GeoEnvelope();

            geoEnvelope.SetData(envelope);

            return geoEnvelope;
        }

        public static GeoMultiPolygon ReadGeoPolygonByRegionKey(string iso3166_2RegionCode, double simplifyTolerlance)
        {
            iso3166_2RegionCode = ConvertRegionCodeToIso3166_2RegionCode(iso3166_2RegionCode);

            String sql = "SELECT geom FROM level1 WHERE HASC_1 = " + "'" + iso3166_2RegionCode + "'";

            Layer resultLayer = _dataSource.ExecuteSQL(sql, null, "");

            if (resultLayer == null)
                return null;

            if (resultLayer.GetFeatureCount(0) == 0)
            {
                return null;
            }

            Feature feature = resultLayer.GetNextFeature();
            Geometry geometry = feature.GetGeometryRef();

            if (simplifyTolerlance > 0)
                geometry = geometry.SimplifyPreserveTopology(simplifyTolerlance);

            int geometryCount = geometry.GetGeometryCount();
            wkbGeometryType geomType = geometry.GetGeometryType();

            string[] options = new string[1];
            string geometryJson = geometry.ExportToJson(options);

            GeoMultiPolygon multiPoygon = new GeoMultiPolygon();

            multiPoygon.SetData(geometry);
            multiPoygon.SetGeoJson(geometryJson);

            return multiPoygon;
        }

    }
}
