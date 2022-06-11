import { loadCSS, loadHTML } from "../View.js";

const LoadSearchResultView = async () => {
  const baseUrl = import.meta.url;
  const searchResultNode = await loadHTML(
    "./SearchResult.html",
    baseUrl,
    "#search-result__template"
  );
  await loadCSS("./SearchResult.css", baseUrl);
  return searchResultNode;
};

export default LoadSearchResultView;
