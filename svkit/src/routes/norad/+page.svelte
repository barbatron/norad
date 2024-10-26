<script lang="ts">
	import { onMount } from 'svelte';
	import * as mapsLoader from '@googlemaps/js-api-loader';
	const { Loader } = mapsLoader;

	import * as publicEnv from '$env/static/public';
	const { PUBLIC_GOOGLEMAPS_API_KEY } = publicEnv;

	// Bindings
	let mapElement: HTMLElement;

	let map = $state<google.maps.Map>();

	onMount(async function () {
		const loader = new Loader({
			apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
			version: 'weekly'
		});

		const { Map } = await loader.importLibrary('maps');

		map = new Map(mapElement, {
			center: { lat: 59.3696333, lng: 18.2889347 },
			zoom: 16
		});
	});

	const zoom = $derived(map?.getZoom());
</script>

<h1>{zoom}</h1>
<div id="map" bind:this={mapElement} style:height={'80vh'} style:width={'100vw'}></div>

<style>
	h1 {
		color: red;
	}
	div {
		margin: 0;
		height: 100%;
	}
</style>
