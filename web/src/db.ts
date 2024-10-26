import { Databases, ID } from "appwrite";
import { client } from "./appwrite";

export function testDb() {
  const databases = new Databases(client);
  const promise = databases.createDocument("norad", "maps", ID.unique(), {
    name: "Map " + new Date().toISOString(),
  });

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
}
