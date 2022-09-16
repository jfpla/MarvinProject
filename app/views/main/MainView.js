import View from "../View.js";

export default async () => {
  const view = await View.of({
    baseUrl: import.meta.url,
    cssRelativeUrl: "./MainPage.css",
    htmlRelativeUrl: "./MainPage.html",
    parentSelector: "#app",
  });
  console.log("MainView", view);
};
