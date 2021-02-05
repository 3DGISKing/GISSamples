import math
import urllib.request
import os
import glob
import subprocess
import shutil
from tile_converter import bbox_to_xyz, tile_edges
from osgeo import gdal
import os


def geo_reference_raster_tile(x, y, z, path):
    bounds = tile_edges(x, y, z)
    # filename, extension = os.path.splitext(path)
    filename = output_dir + '/' + str(int(z)) + '_' + str(int(y)) + '_' + str(int(x)) + ".tif"
    gdal.Translate(filename,
                   path,
                   outputSRS='EPSG:4326',
                   outputBounds=bounds)


def merge_tiles(input_pattern, output_path):
    gm = os.path.join('C:\\', 'users', 'ugi', '.conda', 'envs', 'geo_env', 'Scripts', 'gdal_merge.py')

    merge_command = ['python', gm, '-o', output_path]

    for name in glob.glob(input_pattern):
        merge_command.append(name)

    subprocess.call(merge_command)


input_dir = 'E:/0Source/Erdi/verticalSection/16'
output_dir = 'E:/0Source/Erdi/verticalSection/tmp'

if not os.path.exists(input_dir):
    print('input_dir should exist')
    exit(1)

if not os.path.exists(output_dir):
    print('output_dir should exist')
    exit(1)

for subdir, dirs, files in os.walk(input_dir):
    for file in files:
        path = os.path.join(subdir, file)
        split = path.split('/')
        last_token = split[-1]

        if last_token.find(".png") == -1:
            continue

        tokens = last_token.split("\\")

        y = tokens[2].split(".")[0]

        x = tokens[1]
        z = tokens[0]

        x = float(x)
        y = float(y)
        z = float(z)

        geo_reference_raster_tile(x, y, z, path)

        print(path)

merge_tiles(output_dir + "/*.tif", output_dir + '/merged.tif')





