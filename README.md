
# README for Module 15 Challenge (leaflet-challenge)

## Introduction

This challenge requires creating an earthquake visualization using USGS data. We'll be using `GEOjson` data to plot recent earthquake activity around the world. This challenge uses `JavaScript` and the `Leaflet` library to create an interactive plot on an `OpenStreetMap` tile layer.

## Data

The data for this challenge comes from the USGS GeoJSON Feed. It is a set of data regarding recent global earthquakes. This challenge focuses on data from the past 7 days. The `GEOjson` contains coordinates of the events, but also it's magnitude, depth and other relevant information. 

## Methodology

As you may see in the comments, I decided to work backwards to create `logic.js`. The first thing I did is import the data from USGS using the `d3` library. While in the script this appears at the bottom, and will be the final thing executed as the other functions will be applied to this `GEOjson` data. The next step was the create functions using `Leaflet` and `JavaScript` to create markers, a map, legend, and color scheme. In the `logic.js` file you it might be surprising to see the color scheme being created first (`getColor` function). This is a product of working backwards which was a helpful method for me.

## Results

The results show global earthquake activity from the last 7 days. The markers are color coded by depth, and their size is determind by the magnitude of the earthquakes. This shows many earthquakes, much more than I would have imagined. 

## Conclusion

The data was succesfully represented in `html` format thanks to the start code file. There are far more earthquakes happening every week than I thought. This is a good visual to show global seismic activity.

## References

Class materials were used extensively for this assignment, as well as:

* stackoverflow.com
* Xpert Learning Assistant
* ChatGPT.com

## Usage

The `index.html` file can be opened using your default browser.
