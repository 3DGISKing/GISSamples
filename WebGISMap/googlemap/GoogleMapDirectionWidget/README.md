# Very simple Google Map Direction Widget

## How to use

```
 const googleMapOptions = {
        center: new google.maps.LatLng(37.77, -122.447),
        zoom: 14,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
 };

const googleMap = new google.maps.Map(document.getElementById("map"), googleMapOptions);

const googleMapDirectionWidget = new GoogleMapDirectionWidget(googleMap);

googleMapDirectionWidget.container.addEventListener("directionFound", function (e) {
    console.log(e.detail.direction);
});
```

[![](http://img.youtube.com/vi/0iZl7Srcirg/0.jpg)](http://www.youtube.com/watch?v=0iZl7Srcirg "")

## Hi, Enjoy my code.
I am finding a opportunity to work on a great 3D Web GIS project.
[This is my working experience.](https://docs.google.com/document/d/1LDBFsSW2ECTPW53f18EzqURBdfs8HDsvNumzYi7x9-Y/edit?usp=sharing) 
Feel free to get in touch to chat about partnership.
