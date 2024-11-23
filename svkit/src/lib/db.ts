import { PUBLIC_APPWRITE_MAPS_COLL_ID, PUBLIC_APPWRITE_DB_ID } from '$env/static/public';
import { Databases, ID } from 'appwrite';
import { client } from './appwrite';
import { logger } from './observability';
import { hoggarnGeoJson } from './maps';

const console = logger("lib db");

const databases = new Databases(client);

export const testCreateDoc = async () => {
	const response = await databases.createDocument(
		PUBLIC_APPWRITE_DB_ID,
		PUBLIC_APPWRITE_MAPS_COLL_ID,
		ID.unique(),
		{ name: 'test hoggarn', geoJson: JSON.stringify(hoggarnGeoJson) }
	);
	console.log({ response });
};

export const loadMap = async (name = 'test hoggarn') => {
	const { documents } = await databases.listDocuments(
		PUBLIC_APPWRITE_DB_ID,
		PUBLIC_APPWRITE_MAPS_COLL_ID
	);
	console.log('loadMap documents', documents);
	const map = documents.find((map) => map.name == name);
	console.log('loadMap map', map);
	return map?.geoJson;
};
