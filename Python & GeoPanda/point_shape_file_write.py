import fiona

shape_file_path = "D:/point.shp"

schema = {
    "geometry": "Point",
    "properties": {
        "string_field": "str:10",
        "int_field": "int:10"
    }
}

with fiona.open(shape_file_path, 'w', driver='ESRI Shapefile', schema=schema) as shape_file:
    shape_file.write({
        "geometry": {
            "type": "Point",
            "coordinates": (1, 2)
        },
        "properties": {
            "string_field": "a",
            "int_field": "1"
        }
    })

    shape_file.write({
        "geometry": {
            "type": "Point",
            "coordinates": (3, 4)
        },
        "properties": {
            "string_field": "b",
            "int_field": "2"
        }
    })
