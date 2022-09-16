/**
 * View Monad:
 * Loads template in the dom when parentSelector is given and returns a monad encapsulating the Element.
 * When parentSelector is not given it simply returns a monad encapsulating the template Element.
 **/

const getHRef = (relativeUrl, baseUrl) => {
  // console.log(relativeUrl + ", " + baseUrl);
  return new URL(relativeUrl, baseUrl).href;
};

/**
 * Loads and links the css in the index.html head
 * @param {String} cssRelativeUrl
 * @param {String} baseUrl
 * @return {Promise<void>}
 */
const loadCSS = async (cssRelativeUrl, baseUrl) => {
  const cssHRef = getHRef(cssRelativeUrl, baseUrl);
  const cssHrefExist = [...document.getElementsByTagName("link")].some((l) =>
    l.href?.includes(cssHRef)
  );
  if (cssHrefExist) return;
  fetch(cssHRef).then(() => {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssHRef;
    document.getElementsByTagName("head")[0].appendChild(cssLink);
  });
};

/**
 * Get template as text
 * @param {string} htmlRelativeUrl
 * @param {string} baseUrl
 * @return {Promise<string>}
 */
const getTemplateText = async (htmlRelativeUrl, baseUrl) => {
  const htmlUrl = getHRef(htmlRelativeUrl, baseUrl);
  const response = await fetch(htmlUrl);
  return await response.text();
};

/**
 *
 * @param templateText
 * @return {Element}
 */
const getTemplateElement = (templateText) => {
  const template = document.createElement("template");
  template.innerHTML = templateText;
  const result = template.content.querySelector("*[data-view]");
  if (result !== template.content.firstChild)
    throw `Template's firstChild must have a 'data-view' attribute:\n ${templateText}`;
  return result;
};

/**
 *
 * @param {Element} templateNode
 * @param {String} parentSelector
 * @return {Element}
 */
const insertTemplateElementToParent = (templateNode, parentSelector) => {
  const parentElement = document.querySelector(parentSelector);
  if (
    ["slot", "container"].some((k) => parentElement.dataset.hasOwnProperty(k))
  )
    return parentElement.appendChild(templateNode) && parentElement;

  throw `${parentSelector} parentElement must have a 'data-slot' or 'data-container' attribute`;
};

/**
 *
 * @param {(Node|Element)} element
 * @return {{isInDOM: boolean, chain: (function(*): *), getClone: (function(): Promise<*>), inspect: (function(): string), emit: (function(): *), map: (function(*): Promise<*>)}}
 * @constructor
 */
const ViewInDOM = (element) => ({
  emit: () => element,
  inspect: () => `${ViewInDOM.name}(\n${element}\n)`,
  isInDOM: true,

  chain: (fn) => fn(element),
  map: async (fn) => await ViewOf(fn(element)),

  getClone: async () => await ViewOf({ element: element.cloneNode(true) }),
});

/**
 *
 * @param {(Node|Element)} element
 * @return {{isInDOM: boolean, chain: (function(*): *), getClone: (function(): Promise<*>), inspect: (function(): string), emit: (function(): *), map: (function(*): Promise<*>)}}
 * @constructor
 */
const ViewFragmentContent = (element) => ({
  emit: () => element,
  inspect: () => `${ViewFragmentContent.name}(\n${element}\n)`,
  isInDOM: false,

  chain: (fn) => fn(element),
  map: async (fn) => await ViewOf(fn(element)),

  getClone: async () => await ViewOf({ element: element.cloneNode(true) }),
});

/**
 * Avalua params i torna un View
 * @param {{element: (Node|Element), baseUrl: string, cssRelativeUrl: string, htmlRelativeUrl: string, parentSelector: string}}
 * @return {Promise<*>}
 * @constructor
 */
const ViewOf = async ({
  element,
  baseUrl,
  cssRelativeUrl,
  htmlRelativeUrl,
  parentSelector,
}) => {
  if (element instanceof Element && element.dataset.hasOwnProperty("view")) {
    if (element.parentNode) {
      return ViewInDOM(element);
    } else {
      return ViewFragmentContent(element);
    }
  }

  if (!(htmlRelativeUrl && baseUrl && cssRelativeUrl)) {
    throw "Missing full template url, css or both";
  }

  const templateElement = getTemplateElement(
    await getTemplateText(htmlRelativeUrl, baseUrl)
  );
  await loadCSS(cssRelativeUrl, baseUrl);

  const parentElement =
    parentSelector &&
    insertTemplateElementToParent(templateElement, parentSelector);

  return await ViewOf({ element: parentElement || templateElement });
};

export default {
  of: ViewOf,
};
