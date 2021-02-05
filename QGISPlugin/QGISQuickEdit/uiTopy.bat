call  "C:\Program Files\QGIS 3.4\bin\pyQGIS.bat"

@echo off

echo [START] converting .ui files...

rem convert all .ui files in current directory 

for %%i in (*.ui) do (

rem Display the file name
echo %%i -- ui_%%~ni.py

rem converting 

python -m PyQt5.uic.pyuic -x %%i -o ui_%%~ni.py

)

echo [END] converting .ui files...
pause