import SearchResultView from "../views/search-result/SearchResultView.js";
import CardController from "./CardController.js";

/**
 *
 * @param {MultiSearchType} data
 * @return {Promise<void>}
 */
const LoadSearchResultController = async (data) => {
  const searchResultNode = await SearchResultView();
  console.log(searchResultNode);
  const fragment = document.createDocumentFragment();
  for (const item of data.results) {
    const card = await CardController(item);
    fragment.appendChild(card);
  }
  searchResultNode.appendChild(fragment);
  document.querySelector("main").appendChild(searchResultNode);
};

export function searchResultsBuilder(callback) {
  return async function (...args) {
    /**
     * @type {MultiSearchType}|*}
     */
    const result = await callback.apply(this, args);
    console.log("searchResultsBuilder", callback, result);
    await LoadSearchResultController(result);
  };
}
