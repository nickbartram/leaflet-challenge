// Going all the way to the back, I'll do getColor first (or last)
// Create 6 ranges the earthquake magnitude
function getColor(depth) {
    if (depth >= 90) {
        return "red";  // Highest magnitude: Red
    } else if (depth >= 70) {
        return "orange";  // Strong earthquake: Orange
    } else if (depth >= 50) {
        return "yellow";  // Moderate earthquake: Yellow
    } else if (depth >= 30) {
        return "yellowgreen";  // Light earthquake: Yellow-Green
    } else if (depth >= 10) {
        return "lightgreen";  // Minor earthquake: Light Green
    } else if (depth >= -10) {
        return "green";  // Very minor: Green
    }
};
// Function to create the legend
function addLegend(map) {
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend');
        let grades = [-10, 10, 30, 50, 70, 90];
        let labels = [];

        // Loop through our depth intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
};

// Working even more backwards let's make the map
// createMap function is the simplest to understand
// It's also at the bottom of this working backwards tree
// Doing it this way I think helps? At least there's a bit
// of a flow but, this is the easiest stuff...
function createMap(quakeMarkers) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a baseMaps object to hold the streetmap layer.
let baseMaps = {
    "Street Map": streetmap
  };

let overlayMaps = {
"Earthquakes": quakeMarkers
};

// Create the map object with options.
let map = L.map("map", {
    center: [39.46463, -98.11159],
    zoom: 3,
    layers: [streetmap, quakeMarkers]
  });

// Add legend
addLegend(map);
}
// Working backwards now, have to create a create markers function
function createMarkers(response) {

    // Initialize a blank list for quake markers
    let quakeMarkers = [];

    // Loop through response
    response.features.forEach(feature => {

        // find coordinate, reverse because of order in GEOJSON
        let coordinates = feature.geometry.coordinates.slice(0,2).reverse();

        // depth
        let depth = feature.geometry.coordinates[2];

        // find magnitude
        let magnitude = feature.properties.mag;
        
        // Create quake markers
        let quakeMarker = L.circleMarker(coordinates, {
            radius: magnitude * 2,  // Dynamically set radius
            color: getColor(depth)  // Dynamically set color based on a function
        }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${magnitude}</p>`);   

        quakeMarkers.push(quakeMarker);
    });
    // This will eventually call createMap function
    // These may not be markers, have to come back to it
    // quakeMarkers might be renamed
    createMap(L.layerGroup(quakeMarkers));
}

// This is where the JSON API url is finally imported
// It's kind of backwards to how it's done in python.
// We're creating something to be run first, then running it.
// Essentially a large function, a chain of functions...
// Something like this will be the last thing we do,
// Get d3 to read JSON file at this location, then run your function:
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);