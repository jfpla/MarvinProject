import MainView from "./views/main/MainView.js";
import AvatarController from "./controllers/AvatarController.js";
import NavigatorController from "./controllers/NavigatorController.js";
import OmniboxController from "./controllers/OmniboxController.js";

await MainView();
await OmniboxController();
await NavigatorController();
await AvatarController();

/**
 * Create an instance of a db object for us to store the open database in
 * @type {IDBDatabase}
 */
let db = null;

/**
 * Open our database; it is created if it doesn't already exist
 * (see the upgradeneeded handler below.)
 * @type {IDBOpenDBRequest}
 */
const openRequest = window.indexedDB.open("marvin_db", 1);

/**
 * error handler signifies that the database didn't open successfully
 */
openRequest.addEventListener("error", () =>
  console.error("Database failed to open!")
);

/**
 * success handler signifies that the database opened successfully
 */
openRequest.addEventListener("success", () => {
  console.log("Database opened Successfully!");
  // Store the opened database object in the db variable.
  // This is used a lot below.
  db = openRequest.result;

  // Run the displayData() function to display the notes already in IDB
  // displayData();
});

/**
 * Set up the database tables if this has not alredy been done
 */
openRequest.addEventListener("upgradeneeded", (e) => {
  console.log("Upgrade DB Schema");

  // Grab a reference to the opened database. This is equivalent to the line db = openRequest.result;
  // inside the success event handler, but we need to do this separately here because the upgradeneeded
  // event handler (if needed) will run before the success event handler, meaning that the db value
  // wouldn't be available if we didn't do this.
  db = e.target.result;

  // Create an objectStore to store our "data" in (basically like a single table)
  // including an auto-incrementing key
  const objectStore = db.createObjectStore("tmdb_search_results", {
    keyPath: "id",
    autoIncrement: true,
  });

  // Define what data items the objectStore will contain
  objectStore.createIndex("title", "title", { unique: true });
  objectStore.createIndex("results", "results", { unique: false });

  console.log("Database setup complete!!");
});

export { db };
