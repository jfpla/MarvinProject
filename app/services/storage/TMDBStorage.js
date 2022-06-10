import DB, { promiseRequest } from "./DB.js";

/**
 *
 * @param {String} title
 * @return {Promise<IDBDatabase>}
 */
export async function getMultiSearchResultsByTitle(title) {
  const store = DB.transaction("tmdb_search_results").objectStore(
    "tmdb_search_results"
  );
  const indexRequest = store.index("title").get(IDBKeyRange.only(title));
  return promiseRequest(indexRequest);
  // console.log("getMultiSearchResultsByTitle: ", result);
  // return result;
}

/**
 * @param {String} title
 * @param {MultiSearchType} result
 */
export function saveMultiSearchResult(title, result) {
  const data = { title: title, results: result.results };

  const tx = DB.transaction(["tmdb_search_results"], "readwrite");
  const store = tx.objectStore("tmdb_search_results");

  const addRequest = store.add(data);
  addRequest.onsuccess = () => console.log("Search Stored!");

  tx.oncomplete = () =>
    console.log("Transaction Completed. DB modification finished!");
  tx.onerror = () => console.log("Transaction not opened du to error");
}
