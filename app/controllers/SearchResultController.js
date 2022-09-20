import SearchResultView from "../views/search-result/SearchResultView.js";
import { HydrateCardTemplateGenerator } from "./CardController.js";

/**
 *
 * @param {MultiSearchType} data
 * @return {Promise<void>}
 */
const LoadSearchResultController = async (data) => {
  if (!data) return;
  const view = await SearchResultView();
  // console.log(view);
  const fragment = document.createDocumentFragment();
  for await (const card of HydrateCardTemplateGenerator(data.results)) {
    fragment.appendChild(card.emit());
  }
  // for (const item of data.results) {
  //   const card = await HydrateCardTemplate(item);
  //   fragment.append(...card);
  // }
  await view.map(
    (e) =>
      e.querySelector(".search-result__container").appendChild(fragment) && e
  );
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
