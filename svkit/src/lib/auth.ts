import * as appwrite from "$lib/appwrite";
import { logger } from "$lib/observability";

const console = logger("lib auth");

export const getAccount = async () => {
  try {
    console.log("get account");
    const account = await appwrite.account.get();
    console.log("got account", account);
    return {
      account,
    };
  } catch {
    console.log("no account");
    return {
      account: null,
    };
  }
};
