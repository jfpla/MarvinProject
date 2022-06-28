import DB, { promiseRequest } from "./DB.js";
import MultiSearchDTO from "../../schemas/tmdb/MultiSearchDTO.js";

/**
 *
 * @param {String} words
 * @return {Promise<MultiSearchType|*>}
 */
export async function getMultiSearchResultsByTitle(words) {
  const store =
    DB.transaction("tmdb_multi_search").objectStore("tmdb_multi_search");
  const indexRequest = store.index("query").get(IDBKeyRange.only(words));
  const data = await promiseRequest(indexRequest);
  // console.log("DATA:", data);
  if (data) return MultiSearchDTO(data.response);
}

/**
 * @param {String} title
 * @param {MultiSearchType} result
 */
export function saveMultiSearchResult(title, result) {
  const data = { query: title, response: result };

  const tx = DB.transaction(["tmdb_multi_search"], "readwrite");
  const store = tx.objectStore("tmdb_multi_search");

  const addRequest = store.add(data);
  addRequest.onsuccess = () => console.log("Search Stored!");

  tx.oncomplete = () =>
    console.log("Transaction Completed. DB modification finished!");
  tx.onerror = () => console.log("Transaction not opened du to error");
}

/** Movie **/

export async function getMovieById(id) {
  const store = DB.transaction("tmdb_movie").objectStore("tmdb_movie");
  const indexRequest = store.index("movie_id").get(IDBKeyRange.only(id));
  const data = await promiseRequest(indexRequest);
  // console.log("DATA:", data);
  if (data) return data.response;
}

export async function saveMovie(id, result, callback) {
  const movie = await getMovieById(id);
  console.log("storedMovie", movie);
  if (movie) return;

  const data = { movie_id: id, response: result };

  const tx = DB.transaction(["tmdb_movie"], "readwrite");
  const store = tx.objectStore("tmdb_movie");

  const addRequest = store.add(data);
  addRequest.onsuccess = () => {
    callback();
    console.log("Movie Stored!");
  };

  tx.oncomplete = () =>
    console.log("Transaction Completed. DB modification finished!");
  tx.onerror = () => console.log("Transaction not opened du to error");
}

/** TV **/

export async function getTVById(id) {
  const store = DB.transaction("tmdb_tv").objectStore("tmdb_tv");
  const indexRequest = store.index("tv_id").get(IDBKeyRange.only(id));
  const data = await promiseRequest(indexRequest);
  // console.log("DATA:", data);
  if (data) return data.response;
}

export async function saveTV(id, result, callback) {
  const tv = await getTVById(id);
  console.log("storedTV", tv);
  if (tv) return;

  const data = { tv_id: id, response: result };

  const tx = DB.transaction(["tmdb_tv"], "readwrite");
  const store = tx.objectStore("tmdb_tv");

  const addRequest = store.add(data);
  addRequest.onsuccess = () => {
    callback();
    console.log("TV Stored!");
  };

  tx.oncomplete = () =>
    console.log("Transaction Completed. DB modification finished!");
  tx.onerror = () => console.log("Transaction not opened du to error");
}

/** Person **/

export async function getPersonById(id) {
  const store = DB.transaction("tmdb_person").objectStore("tmdb_person");
  const indexRequest = store.index("person_id").get(IDBKeyRange.only(id));
  const data = await promiseRequest(indexRequest);
  // console.log("DATA:", data);
  if (data) return data.response;
}

export async function savePerson(id, result, callback) {
  const person = await getPersonById(id);
  console.log("storedPerson", person);
  if (person) return;

  const data = { person_id: id, response: result };

  const tx = DB.transaction(["tmdb_person"], "readwrite");
  const store = tx.objectStore("tmdb_person");

  const addRequest = store.add(data);

  addRequest.onsuccess = () => {
    callback();
    console.log("Person Stored!");
  };

  tx.oncomplete = () =>
    console.log("Transaction Completed. DB modification finished!");
  tx.onerror = () => console.log("Transaction not opened du to error");
}
