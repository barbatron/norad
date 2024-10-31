import type { Account } from '$lib/appwrite';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			account?: Account;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
