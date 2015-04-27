/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	// show name/type in popup and
	// get marker symbol/color from popup
	function setPopUpAndIcon(f, l) {
		var out, icon, markerSymbol, markerColor;
		if (!f.properties) {
			return;
		}
		// bind popup
		out = [];
		out.push('Name: ' + f.properties.Name);
		out.push('Type: ' + f.properties.Type);
		l.bindPopup(out.join('<br />'));
		// custom icon
		markerSymbol = f.properties['marker-symbol'];
		markerColor = f.properties['marker-color'];
		if (!markerSymbol || !markerColor) {
			return;
		}
		icon = L.MakiMarkers.icon({
			icon: markerSymbol,
			color: markerColor,
			size: 'm'
		});
		l.setIcon(icon);
	}

	L.Icon.Default.imagePath = 'images/';

	/* create leaflet map */
	var map = L.map('map', {
		center: [34.1100, -117.7197],
		zoom: 15
	});

	/* add default stamen tile layer */
	new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
		minZoom: 0,
		maxZoom: 18,
		attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
	}).addTo(map);

	// add places
	L.geoJson.ajax('data/claremont-kid-places.geojson', {
		onEachFeature: setPopUpAndIcon
	}).addTo(map);

	// var icon = L.MakiMarkers.icon({icon: 'rocket', color: '#b0b', size: 'm'});
	// L.marker([30.287, -97.72], {icon: icon}).addTo(map);

}(window, document, L));