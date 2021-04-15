### dev environment
- install Anaconda.
- open Anaconda prompt and create new virtual and install geopandas on it.  
```
   conda create -n geo_env
   conda activate geo_env
   conda config --env --add channels conda-forge
   conda config --env --set channel_priority strict
   conda install python=3 geopandas
```
- install PyCharm
- open Settings dialog and select Project Interpreter and click plus button.
- select Conda Environment, and select "Existing environment" and specify the created geo_env directory.
  for example C:\Users\wugis\.conda\envs\geo_env\python.exe
  
