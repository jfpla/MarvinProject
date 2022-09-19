import View from "../View.js";

/**
 *
 * @return {Promise<*>}
 * @constructor
 */
const LoadCardView = async () => {
  const view = await View.of({
    baseUrl: import.meta.url,
    cssRelativeUrl: "./Card.css",
    htmlRelativeUrl: "./Card.html",
  });
  console.log("LoadCardView", view);
  return view;
};

export default LoadCardView;
