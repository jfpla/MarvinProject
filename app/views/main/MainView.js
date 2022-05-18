import { loadHTML, loadCSS } from "../View.js";

const LoadMainView = async () => {
  const baseUrl = import.meta.url;
  await loadHTML("./MainPage.html", baseUrl, "#main__container", "#app");
  await loadCSS("./MainPage.css", baseUrl);
};

export default LoadMainView;
