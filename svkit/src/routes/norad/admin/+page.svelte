<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLEMAPS_MAP_ID } from '$env/static/public';
	import { logger } from '$lib/observability.js';

	const console = logger('admin page');

	const { data } = $props();
	console.log('$props.data', data);
	const { map: loadedMap, markerLibrary } = data;

	// Pick out some basics
	const commandCenter = loadedMap.features.find((f) => f.properties?.type === 'command_center');
	if (!commandCenter) throw Error('No command center found in map data');
	/*
    {
      "type": "Feature",
      "properties": {
        "type": "command_center",
        "id": "saltet"
      },
      "geometry": {
        "coordinates": [
          18.086257315067485,
          59.254397582091656
        ],
        "type": "Point"
      },
      "id": 1
    }
    */
	console.log('commandCenter', commandCenter);
	const [center_long, center_lat] = (commandCenter.geometry as GeoJSON.Point)
		.coordinates as GeoJSON.Position;

	// Bindings
	let mapElement: HTMLElement;

	let map = $state<google.maps.Map>();

	const populateMap = (map: google.maps.Map) => {
		// Map borders overlay
		map.data.addGeoJson(loadedMap, { idPropertyName: 'id' });

		const mapBorderStyle: google.maps.Data.StyleOptions = {
			fillColor: 'red',
			fillOpacity: 0.1,
			strokeOpacity: 0.7,
			strokeColor: 'red',
			strokeWeight: 2
		};
		map.data.setStyle(mapBorderStyle);
		console.log('features styled');

		// // Marker
		// const markerPos = [59.370868, 18.289363];
		// console.log('creating marker', google.maps);

		// // @ts-ignore
		// const marker = new markerLibrary.AdvancedMarkerElement({
		// 	map: map,
		// 	position: { lat: markerPos[0], lng: markerPos[1] },
		// 	title: 'Map feature'
		// });
		// console.log('marker created', marker);
	};

	let mapCenter = $state({ lat: center_lat, lng: center_long });

	onMount(async function () {
		const map = new google.maps.Map(mapElement, {
			mapId: PUBLIC_GOOGLEMAPS_MAP_ID,
			center: mapCenter,
			zoom: 16,
			// panControl: false // show/hide pan ui overlay
			colorScheme: google.maps.ColorScheme.DARK
		});
		populateMap(map);
	});
</script>

<div id="map" bind:this={mapElement} style:height={'100%'} style:width={'100%'}></div>

<style>
	div#map {
		margin: 0;
		height: 100%;
		min-height: 90vh;
	}
</style>
