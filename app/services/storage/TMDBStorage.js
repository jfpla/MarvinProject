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
  console.log("DATA:", data);
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
