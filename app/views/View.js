/**
 * View Monad (not really a monad yet):
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
 * @typedef   {Object}  ViewType
 * @property  {function(): Element} emit
 * @property  {function(): string}  inspect
 * @property  {boolean} isInDOM
 * @property  {function(function(Element): Element): Element} chain
 * @property  {function(function(Element): (Element | Promise<Element>)): Promise<ViewType>} map
 * @property  {function(): Promise<Element>}  getClone
 */

/**
 *
 * @param {(Node|Element)} element
 * @return {ViewType}
 * @constructor
 */
const ViewInDOM = (element) => ({
  /**
   *
   * @return {Node|Element}
   */
  emit: () => element,
  /**
   *
   * @return {string}
   */
  inspect: () => `${ViewInDOM.name}(\n${element}\n)`,

  isInDOM: true,

  /**
   *
   * @param {function(Element): Element} fn
   * @return {Element}
   */
  chain: (fn) => fn(element),

  /**
   *
   * @param {(function(Element): (Element | Promise<Element>))} fn
   * @return {ViewType}
   */
  map: async (fn) =>
    await ViewOf({
      element:
        fn.constructor.name === "AsyncFunction"
          ? await fn(element)
          : fn(element),
    }),

  /**
   *
   * @return {Promise<ViewType>}
   */
  getClone: async () => await ViewOf({ element: element.cloneNode(true) }),
});

/**
 *
 * @param {(Node|Element)} element
 * @return {ViewType}
 * @constructor
 */
const ViewFragmentContent = (element) => ({
  emit: () => element,
  inspect: () => `${ViewFragmentContent.name}(\n${element}\n)`,
  isInDOM: false,

  chain: (fn) => fn(element),
  map: async (fn) =>
    await ViewOf({
      element:
        fn.constructor.name === "AsyncFunction"
          ? await fn(element)
          : fn(element),
    }),

  getClone: async () => await ViewOf({ element: element.cloneNode(true) }),
});

/**
 * Avalua params i torna un View
 * @typedef ViewOf
 * @param {{element: (Node|Element), baseUrl: string, cssRelativeUrl: string, htmlRelativeUrl: string, parentSelector: string}}
 * @return {Promise<ViewType>}
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
  } else if (element instanceof Element) {
    throw `Invalid View: Its top element must have a 'data-view' attribute.\n${element.innerHTML}`;
  }

  if (!(htmlRelativeUrl && baseUrl && cssRelativeUrl)) {
    throw !element
      ? "No arguments passed to ViewOf"
      : "Missing full template url, css or both";
  }

  const templateElement = getTemplateElement(
    await getTemplateText(htmlRelativeUrl, baseUrl)
  );
  await loadCSS(cssRelativeUrl, baseUrl);

  parentSelector &&
    insertTemplateElementToParent(templateElement, parentSelector);

  return await ViewOf({ element: templateElement });
};

/**
 * @property {ViewOf} of
 */
export default {
  of: ViewOf,
};
