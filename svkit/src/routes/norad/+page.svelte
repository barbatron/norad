<script lang="ts">
	import { onMount } from 'svelte';
	import * as mapsLoader from '@googlemaps/js-api-loader';
	const { Loader } = mapsLoader;

	import * as publicEnv from '$env/static/public';
	const { PUBLIC_GOOGLEMAPS_API_KEY } = publicEnv;

	// Bindings
	let mapElement: HTMLElement;

	onMount(async function () {
		const loader = new Loader({
			apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
			version: 'weekly'
		});

		const { Map } = await loader.importLibrary('maps');

		let hoggarnMap = new Map(mapElement, {
			center: { lat: 59.3696333, lng: 18.2889347 },
			zoom: 16
		});

		setInterval(() => console.log('zoom level', hoggarnMap.getZoom()), 1000);
	});
</script>

<div bind:this={mapElement} style:height={'100%'} style:width={'100%'} />
