import { loadCSS, loadHTML } from "../View.js";

/**
 *
 * @return {Promise<Element>}
 * @constructor
 */
const LoadCardView = async () => {
  const cardTemplate = await loadHTML(
    "./Card.html",
    import.meta.url,
    "#card__template"
  );
  await loadCSS("./Card.css", import.meta.url);
  return cardTemplate;
};

export default LoadCardView;
