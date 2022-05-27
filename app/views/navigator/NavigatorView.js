import { loadHTML, loadCSS } from "../View.js";

const LoadNavigatorView = async () => {
  const baseUrl = import.meta.url;
  const navigatorNode = await loadHTML(
    "./Navigator.html",
    baseUrl,
    "#navigator__template",
    "#navigator"
  );
  await loadCSS("./Navigator.css", baseUrl);
  return navigatorNode;
};

export default LoadNavigatorView;
