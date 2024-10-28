import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    console.log('[/norad page load] awaiting parent...');
    const { account } = await parent();
    console.log(`[/norad page load] parent done ${!!account ? '✅' : '🚫'}`, { gotAccount: !!account });

    if (!account) {
        throw redirect(303, '/login');
    }
}
