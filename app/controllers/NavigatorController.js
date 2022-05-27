import NavigatorEnum from "../enums/NavigatorEnum.js";
import NavigatorView from "../views/navigator/NavigatorView.js";

function pushSectionOptions(SectionNode) {
  const fragment = new DocumentFragment();
  for (const sectionKey in NavigatorEnum) {
    console.log(sectionKey, NavigatorEnum[sectionKey]);
    const option = document.createElement("option");
    option.value = NavigatorEnum[sectionKey];
    option.text = sectionKey;
    fragment.appendChild(option);
  }
  SectionNode.appendChild(fragment);
  return SectionNode;
}

const LoadNavigatorController = async () => {
  const navigatorNode = await NavigatorView();
  pushSectionOptions(navigatorNode.querySelector("#navigator-select"));
};

export default LoadNavigatorController;
