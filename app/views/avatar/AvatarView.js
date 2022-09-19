import View from "../View.js";

/**
 *
 * @return {Promise<ViewType|*>}
 */
export default async () => {
  const view = await View.of({
    baseUrl: import.meta.url,
    cssRelativeUrl: "./Avatar.css",
    htmlRelativeUrl: "./Avatar.html",
    parentSelector: ".avatar__slot",
  });
  console.log("AvatarView", view);
  return view;
};
