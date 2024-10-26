import { Account, ID } from "appwrite";
import { client } from "./appwrite";

export { ID } from "appwrite";

export const account = new Account(client);

export const createAccount = async (args: {
  email: string;
  password: string;
}) => {
  const acc = await account.create(ID.unique(), args.email, args.password);
  console.log(`✅ Session acquired`, acc);
  return acc;
};

let current: ReturnType<typeof account.getSession>;
export const currentSession = async () => {
  try {
    if (current) return await current;
    const sess = await account.getSession("current");
    console.log(!!sess ? "got existing session" : "no existing session", sess);
    if (sess) current = Promise.resolve(sess);
    return sess;
  } catch {
    return null;
  }
};

export const login = async (args: { email: string; password: string }) => {
  await account.deleteSessions();
  const session = await account.createEmailPasswordSession(
    args.email,
    args.password
  );
  console.log(`${session ? "✅" : "⛔"} Attempted login result`, session);
  return session;
};
