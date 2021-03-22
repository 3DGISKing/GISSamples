echo "export GEOSERVER_HOME=/home/jin/geoserver-2.16.1" >> ~/.profile
. ~/.profile
sudo chown -R jin /home/jin/geoserver-2.16.1
nohup /home/jin/geoserver-2.16.1/bin/startup.sh &