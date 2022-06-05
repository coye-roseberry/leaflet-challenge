

var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"


// Creating the map object
var myMap = L.map("map", {
    center: [
        37.09, -95.71
      ],
      zoom: 5,
  });

// var legend = L.control({position: 'bottomright'});  

// legend.onAdd = function(myMap){
//     var div = L.DomUtil.create('div', 'info legend'),
    
// }

// legend.addTo(myMap)
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  d3.json(queryURL).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data

    var feature_details_earthquakes = featdeets(data)
    console.log(feature_details_earthquakes)

    var numOfEarthquakes = dataLength(feature_details_earthquakes)
    console.log(numOfEarthquakes)
 


    
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            
  

            var geojsonMarkerOptions = {
                radius: markerSize(feature.properties.mag),
                fillColor: colorScale(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p><strong>Date:</strong> ${new Date(feature.properties.time)}<br/><br/><strong>Magnitude:</strong> ${feature.properties.mag}<br/><br/><strong>Depth:</strong> ${feature.geometry.coordinates[2]}</p>`);}
    }).addTo(myMap);

//     var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend"),
//     limits = [0,150,300, 450, 600, 750],
//     labels = [];

    
//     for (var i = 0; i < limits.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(limits[i] + 1) + '"></i> ' +
//             limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
//     }

//     return div;
// };
//     // Add the minimum and maximum.
    

//   // Adding the legend to the map
//   legend.addTo(myMap);

///////////// Just couldn't get the legend working ¯\_(ツ)_/¯ /////////////////


});





  
function markerSize(magnitude) {
return Math.sqrt(magnitude) * 10;

}

function colorScale(depth){
    return depth >750 ? '#bd0026' :
    depth >600 ? '#f03b20' :
    depth >450 ? '#fd8d3c' :
    depth >300 ? '#feb24c' :
    depth >150 ? '#fed976' :
        '#ffffb2';
    
}

function dataLength (data){
    return Object.keys(data).length;
    
}

function featdeets(data){
    var eqfs =  data.features;
    return eqfs;
}