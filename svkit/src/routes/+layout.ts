import { getAccount } from '$lib/auth';

export const ssr = false;
export const prerender = false;

export const load = async () => {
	const account = await getAccount();
	return {
		account
	};
};
