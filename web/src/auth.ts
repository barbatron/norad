import { Account, ID } from "appwrite";
import { client } from "./appwrite";

export { ID } from "appwrite";

export const account = new Account(client);

export const createAccount = async (args: {
  email: string;
  password: string;
}) => {
  const user = await account.create(ID.unique(), args.email, args.password);
  console.log("user", { user });
  return user;
};

export const testLogin = async (args: { email: string; password: string }) => {
  const session = await account.createEmailPasswordSession(
    args.email,
    args.password
  );
  console.log("session", { session });
  return session;
};
