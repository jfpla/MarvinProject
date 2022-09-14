import MainView from "../views/main/MainView.js";
import OmniboxController from "../controllers/OmniboxController.js";
import AvatarController from "../controllers/AvatarController.js";
import Login from "../views/login/Login.js";

export default async (auth) => {
  const isAuthenticated = await auth.isAuthenticated();
  console.log("updateUI", isAuthenticated);
  // document.getElementById("btn-logout").disabled = !isAuthenticated;
  // document.getElementById("btn-login").disabled = isAuthenticated;

  /*Reset home*/
  const appNode = document.querySelector("#app");
  const headerNode = appNode.querySelector("header");
  const mainNode = appNode.querySelector("main");
  headerNode && appNode.removeChild(headerNode);
  mainNode && appNode.removeChild(mainNode);

  await MainView();
  if (!isAuthenticated) {
    const loginTemplate = await Login(auth);
    document.querySelector("main").append(...loginTemplate.childNodes);
  } else {
    await OmniboxController();
    await AvatarController();
  }
};
