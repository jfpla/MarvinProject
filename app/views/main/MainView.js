/** TODO: Use async keyword instead of then */

const getUrl = (relativeUrl, baseUrl) => {
  console.log(relativeUrl + ", " + baseUrl);
  return new URL(relativeUrl, baseUrl).href;
};

const loadHTML = (htmlRelativeUrl, baseUrl) => {
  const htmlUrl = getUrl(htmlRelativeUrl, baseUrl);
  return fetch(htmlUrl).then((response) => response.text());
};

const loadCSS = (cssRelativeUrl, baseUrl) => {
  const cssURL = getUrl(cssRelativeUrl, baseUrl);
  return fetch(cssURL).then((response) => {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssURL;
    document.getElementsByTagName("head")[0].appendChild(cssLink);
  });
};
