import OmniboxView from "../views/omnibox/OmniboxView.js";
import { multiSearch } from "../services/api/TMDBApi.js";
import { throttle } from "../services/RateLimiterService.js";
import {
  getMultiSearchResultsByTitle,
  saveMultiSearchResult,
} from "../services/storage/TMDBRepository.js";
import { searchResultsBuilder } from "./SearchResultController.js";

function view(callback) {
  return async function (...args) {
    const result = await callback.apply(this, args);
    console.log("viewCallback", callback, result);
  };
}

/**
 * TODO: split this function in two:
 *  - querySearch with the trigger logic
 *  - searchProxy to query DB or API
 * @param e
 * @return {Promise<MultiSearchType|*>}
 */
async function querySearchProxy(e) {
  console.log(e.type);
  const query = e.target.value;
  if (query.length < 4) return;

  console.log(query);
  e.preventDefault();

  let result = await getMultiSearchResultsByTitle(query);
  if (result) {
    console.log("CACHED_RESULTS", result);
  } else {
    result = await multiSearch(query);
    console.log("API_RESULTS", result);
    saveMultiSearchResult(query, result);
  }

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
  input.addEventListener(
    "change",
    throttle(searchResultsBuilder(querySearchProxy), 300)
  );
  input.addEventListener(
    "input",
    throttle(searchResultsBuilder(querySearchProxy), 300)
  );
};

export default LoadOmniboxController;
