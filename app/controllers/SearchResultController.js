import SearchResultView from "../views/search-result/SearchResultView.js";
import CardController from "./CardController.js";

/**
 * TODO: Make sure SearchResultView is executed only once.
 *  Currently the OmniboxController may call this method
 *  twice triggered by two Events (onChange and onInput).
 * @param {MultiSearchType} data
 * @return {Promise<void>}
 */
const LoadSearchResultController = async (data) => {
  if (!data) return;
  const searchResultNode = await SearchResultView();
  // console.log(searchResultNode);
  const fragment = document.createDocumentFragment();
  for (const item of data.results) {
    const card = await CardController(item);
    fragment.appendChild(card);
  }
  searchResultNode.querySelector("#search-result").appendChild(fragment);
};

export function searchResultsBuilder(callback) {
  return async function (...args) {
    /**
     * @type {MultiSearchType}|*}
     */
    const result = await callback.apply(this, args);
    // console.log("searchResultsBuilder", callback, result);
    await LoadSearchResultController(result);
  };
}