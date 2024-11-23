<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLEMAPS_MAP_ID } from '$env/static/public';
	import { logger } from '$lib/observability.js';

	const console = logger('admin page');

	const { data } = $props();
	console.log('$props.data', data);
	const { hoggarn, mapsLibrary } = data;

	// Bindings
	let mapElement: HTMLElement;

	let map = $state<google.maps.Map>();

	const populateMap = (map: google.maps.Map) => {
		// Map borders overlay
		console.log('hoggarn is', hoggarn);
		const features = map.data.addGeoJson(hoggarn.features);
		const mapBorderStyle: google.maps.Data.StyleOptions = {
			fillColor: 'red',
			fillOpacity: 0.1,
			strokeOpacity: 0.7,
			strokeColor: 'red',
			strokeWeight: 2
		};
		map.data.setStyle(mapBorderStyle);
		console.log('features styled');

		// Marker
		const markerPos = [59.370868, 18.289363];
		console.log('creating marker');

		const marker = new google.maps.marker.AdvancedMarkerElement({
			map: map,
			position: { lat: markerPos[0], lng: markerPos[1] },
			title: 'Map feature'
		});
		console.log('marker created', marker);
	};

	let mapCenter = $state({ lat: 59.3696333, lng: 18.2889347 });

	onMount(async function () {
		const map = new google.maps.Map(mapElement, {
			mapId: PUBLIC_GOOGLEMAPS_MAP_ID, // google.maps.Map.DEMO_MAP_ID,
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
