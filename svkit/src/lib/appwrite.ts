import { PUBLIC_APPWRITE_PROJECT as appWriteProject } from '$env/static/public';
import { Account, Client, ID } from "appwrite";

export { Account, Client, ID };

export const client = new Client();
client.setProject(appWriteProject);

export const account = new Account(client);