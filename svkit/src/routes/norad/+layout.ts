import * as appwrite from "$lib/appwrite";
import type { LayoutLoad } from "./$types";

// Turn off SSR globally, turning the project into a static site
// export const prerender = false;
// export const ssr = false;

const getAccount = async () => {
    try {
        console.log('[norad layout] get account')
        const account = await appwrite.account.get();
        console.log('[norad layout] got account', account)
        return {
            account
        };
    } catch {
        console.log('[norad layout] no account')
        return {
            account: null,
        };
    }
}

export const load: LayoutLoad = async () => {
    const account = await getAccount()
    return account
};
