import { PUBLIC_GOOGLEMAPS_API_KEY } from '$env/static/public';
import { loadMap } from '$lib/db';
import { logger } from '$lib/observability';
import type { LayoutLoad } from '../$types';
import gmapiloader from '@googlemaps/js-api-loader';
const { Loader } = gmapiloader;

const console = logger('norad admin page');

export const load: LayoutLoad = async () => {
	const hoggarnMap = await loadMap();

	const loader = new Loader({
		apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
		version: 'weekly'
	});

	const mapsLibrary = await loader.importLibrary('maps');

	return { hoggarn: hoggarnMap, mapsLibrary };
};
