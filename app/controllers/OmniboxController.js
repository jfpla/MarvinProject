import OmniboxView from "../views/omnibox/OmniboxView.js";
import { multiSearch } from "../services/api/TMDBApi.js";
import { throttle } from "../services/RateLimiterService.js";
import { db as DB } from "../main.js";

function view(callback) {
  return async function (...args) {
    const result = await callback.apply(this, args);
    console.log("viewCallback", callback, result);
  };
}

async function querySearch(e) {
  console.log(e.type);
  const query = e.target.value;
  if (query.length < 4) return;

  console.log(query);
  e.preventDefault();

  /* Read */
  async function read(title) {
    const keyRangeValue = IDBKeyRange.only(title);
    console.log("keyRangeValue", keyRangeValue);
    const objectStore = DB.transaction("tmdb_search_results").objectStore(
      "tmdb_search_results"
    );
    const indexRequest = objectStore.index("title").get(keyRangeValue);
    let results;
    indexRequest.onsuccess = (e) => {
      console.log("onSuccess: result", e.target.result);
      results = e.target.result;
    };
    indexRequest.onerror = function (...args) {
      console.log("onError: this", this);
      console.log("onError: args", ...args);
    };
    console.log("ReSuLTs", results);
    return results;
  }

  await read(query);

  /* Write */
  function write(result) {
    const newItem = { title: query, results: result.results };
    const transaction = DB.transaction(["tmdb_search_results"], "readwrite");
    const objectStore = transaction.objectStore("tmdb_search_results");
    const addRequest = objectStore.add(newItem);
    addRequest.addEventListener("success", () => console.log("Search Stored!"));
    transaction.addEventListener("complete", () =>
      console.log("Transaction Completed. DB modification finished.")
    );
    transaction.addEventListener("error", () =>
      console.log("Transaction not opened du to error")
    );
  }
  console.log("__________DB____________:", DB);
  const result = await multiSearch(query);

  return result;
}

const LoadOmniboxController = async () => {
  const omniboxNode = await OmniboxView();
  console.log(omniboxNode);
  const form = omniboxNode.querySelector("form");
  const input = omniboxNode.querySelector("input");

  form.addEventListener("submit", (e) => {
    console.log("Enter");
    e.preventDefault();
  });
  input.addEventListener("change", throttle(view(querySearch), 300));
  input.addEventListener("input", throttle(view(querySearch), 300));
};

export default LoadOmniboxController;
