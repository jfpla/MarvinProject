const getHRef = (relativeUrl, baseUrl) => {
  console.log(relativeUrl + ", " + baseUrl);
  return new URL(relativeUrl, baseUrl).href;
};

const loadHTML = async (htmlRelativeUrl, baseUrl) => {
  const htmlUrl = getHRef(htmlRelativeUrl, baseUrl);

  const response = await fetch(htmlUrl);
  const template = document.createElement("template");
  template.innerHTML = await response.text();
  const mainContainer = template.content.querySelector("#main__container");

  document.querySelector("#app").append(...mainContainer.childNodes); // appendChild(mainContainer);
};

const loadCSS = async (cssRelativeUrl, baseUrl) => {
  const cssHRef = getHRef(cssRelativeUrl, baseUrl);
  return fetch(cssHRef).then((response) => {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssHRef;
    document.getElementsByTagName("head")[0].appendChild(cssLink);
  });
};

const LoadMainView = async () => {
  await loadHTML("./MainPage.html", import.meta.url);
  await loadCSS("./MainPage.css", import.meta.url);
};

export { LoadMainView };
