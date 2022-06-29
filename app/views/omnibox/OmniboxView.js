import { loadCSS, loadHTML } from "../View.js";

const LoadOmniboxView = async () => {
  const baseUrl = import.meta.url;
  const omniboxNode = await loadHTML(
    "./Omnibox.html",
    baseUrl,
    "#omnibox__template",
    ".main__header .omnibox"
  );
  await loadCSS("./Omnibox.css", baseUrl);
  return omniboxNode;
};

export default LoadOmniboxView;
