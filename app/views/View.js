/**
 * Load Methods
 **/

const getHRef = (relativeUrl, baseUrl) => {
  // console.log(relativeUrl + ", " + baseUrl);
  return new URL(relativeUrl, baseUrl).href;
};

/**
 * Loads template in the dom when parentSelector is given and returns the Element
 * When parentSelector is not given returns the template Element.
 * @param {String} htmlRelativeUrl
 * @param {String} baseUrl
 * @param {String} templateSelector
 * @param {String|null} parentSelector
 * @return {Promise<Element>}
 */
const loadHTML = async (
  htmlRelativeUrl,
  baseUrl,
  templateSelector,
  parentSelector = null
) => {
  const htmlUrl = getHRef(htmlRelativeUrl, baseUrl);

  const response = await fetch(htmlUrl);
  const template = document.createElement("template");
  template.innerHTML = await response.text();
  const templateNode = template.content.querySelector(templateSelector);
  if (parentSelector) {
    const parentNode = document.querySelector(parentSelector);
    parentNode.append(...templateNode.childNodes); // appendChild(mainContainer);
    // console.log("postAppend parentNode", parentNode);
    return parentNode;
  }
  return templateNode;
};

/**
 * Loads and links the css in the index.html head
 * @param {String} cssRelativeUrl
 * @param {String} baseUrl
 * @return {Promise<Response>}
 */
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
