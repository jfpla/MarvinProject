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

export { loadCSS, loadHTML };

/**
 *
 * @param htmlRelativeUrl
 * @param baseUrl
 * @param templateSelector
 * @param parentSelector
 * @return {Promise<{templateText: string, parentNode: Element}|{templateText: string, templateNode: Element}>}
 * @private
 */
const _loadHTML = async (
  htmlRelativeUrl,
  baseUrl,
  templateSelector,
  parentSelector = null
) => {
  const templateText = await getTemplateText(htmlRelativeUrl, baseUrl);
  const templateNode = getTemplateElement(templateText, templateSelector);

  if (parentSelector) {
    const parentNode = insertTemplateElementToParent(
      templateNode,
      parentSelector
    );
    return { templateText, parentNode };
  }
  return { templateText, templateNode };
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
 * @param {string} templateText
 * @param {string} templateSelector
 * @return {Element}
 */
const getTemplateElement = (templateText, templateSelector) => {
  const template = document.createElement("template");
  template.innerHTML = templateText;
  return template.content.querySelector(templateSelector);
};

/**
 *
 * @param {Element} templateNode
 * @param {String} parentSelector
 * @return {Element}
 */
const insertTemplateElementToParent = (templateNode, parentSelector) => {
  const parentElement = document.querySelector(parentSelector);
  parentElement.append(...templateNode.childNodes); // appendChild(templateNode);
  return parentElement;
};

const View = async (
  htmlRelativeUrl,
  baseUrl,
  templateSelector,
  parentSelector = null,
  cssRelativeUrl = null
) => {
  if (cssRelativeUrl) await loadCSS(cssRelativeUrl, baseUrl);

  const templateText = await getTemplateText(htmlRelativeUrl, baseUrl);
  const templateElement = getTemplateElement(templateText, templateSelector);
  const parentElement =
    parentSelector &&
    insertTemplateElementToParent(templateElement, parentSelector);

  return () => {
    const text = templateText;
    const element = parentElement || templateElement;
    return {
      getElement: () => element,
      getParentElement: () => parentElement,
      getTemplateText: () => text,

      destroyElementFromDOM: () => {
        while (parentElement?.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
        }
        templateElement?.parentNode?.removeChild(templateElement);
      },
      getTemplateElement: () =>
        templateElement?.cloneNode(true) ||
        getTemplateElement(text, templateSelector),
      updateTemplateElement: (fn) => fn(templateElement?.cloneNode(true)),
      // insertTemplateElement: (selector = null) => selector ? insertTemplateElementToParent(templateElement)
    };
  };
};

/**
 * Avalua params i torna un View
 * @param {Element} element
 * @param {string} htmlRelativeUrl
 * @param {string} baseUrl
 * @param {string} templateSelector
 * @param {string} parentSelector
 * @param {string} cssRelativeUrl
 * @return {Promise<*>}
 * @constructor
 */
const ViewOf = async ({
  element,
  htmlRelativeUrl,
  baseUrl,
  templateSelector,
  parentSelector,
  cssRelativeUrl,
}) => {
  if (element instanceof Element) return _View(element);

  if (!(htmlRelativeUrl && baseUrl && templateSelector && cssRelativeUrl)) {
    return;
  }

  await loadCSS(cssRelativeUrl, baseUrl);
  const templateText = await getTemplateText(htmlRelativeUrl, baseUrl);
  const templateElement = getTemplateElement(templateText, templateSelector);
  const parentElement =
    parentSelector &&
    insertTemplateElementToParent(templateElement, parentSelector);
  return parentElement ? _View(parentElement) : _View(templateElement);
};

/**
 * un sol paràmetre de tipus Element i torna objecte View amb mètodes
 * @param {Element} element
 * @param element
 * @return {{chain: (function(*): *), inspect: (function(): string), getElementAsText: (function(): *), emit: (function(): *), map: (function(*): Promise<*>), getElementClone: (function(): ActiveX.IXMLDOMNode | Node)}}
 * @private
 */
const _View = (element) => ({
  emit: () => element,
  inspect: () => `View(\n${element.innerHTML}\n)`,

  chain: (fn) => fn(element),
  map: async (fn) => await ViewOf(fn(element)),

  getElementAsText: () => element.innerHTML,
  getElementClone: () => element.cloneNode(true),
  destroyElementFromDom: () => {
    while (element.parentNode?.firstChild) {
      element.parentNode.removeChild(element.parentNode.firstChild);
    }
  },
});

export default {
  of: ViewOf,
};
