# QGISMaking3DShapefile

This program was made by revising QGIS source.

[![](http://img.youtube.com/vi/D8zbxHxAmVw/0.jpg)](http://www.youtube.com/watch?v=D8zbxHxAmVw "")

We often have to test the accuracy of our UAV maps by using check points (in addition to Ground Control Points).   
The check points are pre-marked in the mapping area and surveyed accurately by means of terrestrial methods such as GPS or Total Station.
The coordinates (X,Y,H) determined by means of these well-established methods are assumed to be true.
To check the accuracy of the UAV-derived Ortho Photo and DSM, we observe the coordinates (x,y,h) of the check points in GIS and
then determine the differences dx,dy,dh where dx=x-X, dy=y-Y and dh=h-H. We refer to (dx,dy,dh) as the “error vector”. 
The coordinate comparison allows us to make the usual statistical analyses such as means, standard deviations and RMSEs.
However, without a visualization of the orientation of the error vectors,
it is difficult to quickly assess whether there is a bias in the orientation and magnitude of the errors or whether the errors have regional correlation. 
Since the errors are generally too small to be depicted on a map showing the entire mapping area,
it is necessary to show the differences at much larger scale than the mapping scale. A program is thus needed to produce a
GIS-compatible file to appropriately display the differences.
A convenient method of 2D visualization is to show the horizontal component of the error vector by means of a magnified arrow pointing from the true
position in the direction of the observed position as shown in the figure below.
The vertical component can easily be illustrated by means of either arrows pointing north for positive values and south for negative values or a 
suitable color based elevation symbology.

## Complete data
4/21/2017

# Hi, Enjoy my code.
I am finding a long term GIS project.
[This is my working experience.](https://docs.google.com/document/d/1LDBFsSW2ECTPW53f18EzqURBdfs8HDsvNumzYi7x9-Y/edit?usp=sharing) 
Feel free to get in touch to chat about partnership.