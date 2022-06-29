import { loadCSS, loadHTML } from "../View.js";

const SearchResultView = async () => {
  const previousResults = document.querySelector("#search-results-container");
  // console.log("previousResults", previousResults);
  if (previousResults) previousResults.remove();

  const baseUrl = import.meta.url;
  const searchResultNode = await loadHTML(
    "./SearchResult.html",
    baseUrl,
    "#search-result__template",
    "main"
  );
  await loadCSS("./SearchResult.css", baseUrl);
  return searchResultNode;
};

export default SearchResultView;
