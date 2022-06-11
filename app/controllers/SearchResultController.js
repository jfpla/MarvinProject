import SearchResultView from "../views/search-result/SearchResultView.js";

const LoadSearchResultController = async (data) => {
  const searchResultNode = await SearchResultView();
  console.log(searchResultNode);
};

export default LoadSearchResultController;
