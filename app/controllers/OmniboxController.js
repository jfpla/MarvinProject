import OmniboxView from "../views/omnibox/OmniboxView.js";
import { multiSearch } from "../services/api/TMDBApi.js";
import { throttle } from "../services/RateLimiterService.js";
import {
  getMultiSearchResultsByTitle,
  saveMultiSearchResult,
} from "../services/storage/TMDBRepository.js";
// import { searchResultsBuilder } from "./SearchResultController.js";

/**
 * TODO: split this function in two:
 *  - querySearch with the trigger logic
 *  - searchProxy to query DB or API
 * @param e
 * @return {Promise<MultiSearchType|*>}
 */
async function querySearchProxy(e) {
  const query = e.target.value;
  if (query.length < 4) return;
  console.log(`${e.type} | ${query}`, e);

  e.preventDefault();

  let result = await getMultiSearchResultsByTitle(query);
  if (result) {
    // console.log("CACHED_RESULTS", result);
  } else {
    result = await multiSearch(query);
    // console.log("API_RESULTS", result);
    saveMultiSearchResult(query, result);
  }

  return result;
}

const LoadOmniboxController = async () => {
  const view = await OmniboxView();
  // console.log(view);
  /**
   * Adds event listeners to the view monad
   * @param {Element} element
   * @return {Element}
   */
  const viewEventListeners = (element) => {
    const form = element.querySelector("form");
    const input = element.querySelector("input");

    form.addEventListener("submit", (e) => {
      console.log("Enter");
      e.preventDefault();
    });
    /*having "change" refreshes the view on changing focus*/
    input.addEventListener(
      "change",
      (e) => console.log("changeEvent", e)
      // TODO: refactor searchResultsController
      // throttle(searchResultsBuilder(querySearchProxy), 150)
    );
    input.addEventListener(
      "input",
      (e) => console.log("inputEvent", e)
      // throttle(searchResultsBuilder(querySearchProxy), 150)
    );
    return element;
  };
  const newView = await view.map(viewEventListeners);
  console.log("NEW Omnibox View", newView);
};

export default LoadOmniboxController;
