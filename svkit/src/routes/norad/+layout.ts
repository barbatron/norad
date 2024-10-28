import * as appwrite from "$lib/appwrite";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { logger } from "$lib/observability";
import { getAccount } from "$lib/auth";

const console = logger('norad layout');

export const load: LayoutLoad = async () => {
  const account = await getAccount()
  console.log(!!account ? '✅' : '🚫', { gotAccount: !!account });

  if (!account) {
    throw redirect(303, '/login');
  }
  return account
};
