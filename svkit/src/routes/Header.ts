import { getAccount } from "$lib/auth";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  const account = await getAccount();
  return { account };
}