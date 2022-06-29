/**
 *
 * @param {IDBOpenDBRequest} request
 * @return {Promise<IDBDatabase|*>}
 */
export function promiseRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get DB Instance
 * @return {Promise<IDBDatabase>}
 */
async function getDB() {
  /**
   * Open our database; it is created if it doesn't already exist
   * (see the upgradeneeded handler below.)
   * @type {IDBOpenDBRequest}
   */
  const openRequest = window.indexedDB.open("marvin_db", 1);

  /**
   * error handler signifies that the database didn't open successfully
   */
  openRequest.onerror = () => console.log("Database failed to open!");

  /**
   * Set up the database tables if this has not already been done
   */
  openRequest.onupgradeneeded = (e) => {
    console.log("Upgrade DB Schema");
    // Grab a reference to the opened database. This is equivalent to the line db = openRequest.result;
    // inside the success event handler, but we need to do this separately here because the upgradeneeded
    // event handler (if needed) will run before the success event handler, meaning that the db value
    // wouldn't be available if we didn't do this.
    const db = e.target.result;

    // Create an objectStore to store our "data" in (basically like a single table)
    // including an auto-incrementing key
    const multiSearchStore = db.createObjectStore("tmdb_multi_search", {
      keyPath: "id",
      autoIncrement: true,
    });
    const movieStore = db.createObjectStore("tmdb_movie", {
      keyPath: "id",
      autoIncrement: true,
    });

    const tvStore = db.createObjectStore("tmdb_tv", {
      keyPath: "id",
      autoIncrement: true,
    });
    const personStore = db.createObjectStore("tmdb_person", {
      keyPath: "id",
      autoIncrement: true,
    });

    // Define what data items the objectStore will contain
    multiSearchStore.createIndex("query", "query", { unique: true });
    multiSearchStore.createIndex("response", "response", { unique: false });

    movieStore.createIndex("movie_id", "movie_id", { unique: true });
    tvStore.createIndex("tv_id", "tv_id", { unique: true });
    personStore.createIndex("person_id", "person_id", { unique: true });

    console.log("Database setup complete!!");
  };

  return promiseRequest(openRequest);
}

const DB = await getDB();

export default DB;
