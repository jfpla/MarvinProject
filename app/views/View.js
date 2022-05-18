/**
 * Load Methods
 **/

const getHRef = (relativeUrl, baseUrl) => {
  console.log(relativeUrl + ", " + baseUrl);
  return new URL(relativeUrl, baseUrl).href;
};

const loadHTML = async (
  htmlRelativeUrl,
  baseUrl,
  templateSelector,
  parentSelector
) => {
  const htmlUrl = getHRef(htmlRelativeUrl, baseUrl);

  const response = await fetch(htmlUrl);
  const template = document.createElement("template");
  template.innerHTML = await response.text();
  const mainContainer = template.content.querySelector(templateSelector);
  const parentNode = document.querySelector(parentSelector);
  parentNode.append(...mainContainer.childNodes); // appendChild(mainContainer);
  return parentNode;
};

const loadCSS = async (cssRelativeUrl, baseUrl) => {
  const cssHRef = getHRef(cssRelativeUrl, baseUrl);
  return fetch(cssHRef).then(() => {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssHRef;
    document.getElementsByTagName("head")[0].appendChild(cssLink);
  });
};

export { loadCSS, loadHTML };
