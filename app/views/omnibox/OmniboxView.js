import View from "../View.js";

/**
 *
 * @return {Promise<ViewType|*>}
 */
export default async () => {
  const view = await View.of({
    baseUrl: import.meta.url,
    cssRelativeUrl: "./Omnibox.css",
    htmlRelativeUrl: "./Omnibox.html",
    parentSelector: ".omnibox__slot",
  });
  console.log("OmniboxView", view);
  return view;
};
