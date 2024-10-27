<script lang="ts">
	const { data } = $props();
	console.log('[page: /norad/admin', { account: data.account });

	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import { PUBLIC_GOOGLEMAPS_API_KEY } from '$env/static/public';

	import { hoggarn } from '$lib/maps';

	// Bindings
	let mapElement: HTMLElement;

	let map = $state<google.maps.Map>();

	onMount(async function () {
		const loader = new Loader({
			apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
			version: 'weekly'
		});

		const { Map } = await loader.importLibrary('maps');

		const mapCenter = { lat: 59.3696333, lng: 18.2889347 };
		map = new Map(mapElement, {
			mapId: '130a5dfbf103f118', // google.maps.Map.DEMO_MAP_ID,
			center: mapCenter,
			zoom: 16,
			// panControl: false // show/hide pan ui overlay
			colorScheme: google.maps.ColorScheme.DARK
		});

		// Map borders overlay
		const features = map.data.addGeoJson(hoggarn);
		const mapBorderStyle: google.maps.Data.StyleOptions = {
			fillColor: 'red',
			fillOpacity: 0.1,
			strokeOpacity: 0.7,
			strokeColor: 'red',
			strokeWeight: 2
		};
		features.forEach((f) => map?.data.overrideStyle(f, mapBorderStyle));

		// Marker
		const markerPos = [59.370868, 18.289363];
		const marker = new google.maps.marker.AdvancedMarkerElement({
			map: map,
			position: { lat: markerPos[0], lng: markerPos[1] },
			title: 'Map feature'
		});
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
