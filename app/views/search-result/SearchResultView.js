import View from "../View.js";

const SearchResultView = async () => {
  const previousResults = document.querySelector(".search-result__view");
  // console.log("previousResults", previousResults);
  if (previousResults) previousResults.remove();

  const view = await View.of({
    baseUrl: import.meta.url,
    cssRelativeUrl: "./SearchResult.css",
    htmlRelativeUrl: "./SearchResult.html",
    parentSelector: "main",
  });
  console.log("SearchResultView", view);
  return view;
};

export default SearchResultView;
