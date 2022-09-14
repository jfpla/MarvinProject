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
  const appHeaderNode = appNode.querySelector("header");
  const appMainNode = appNode.querySelector("main");
  appHeaderNode && appNode.removeChild(appHeaderNode);
  appMainNode && appNode.removeChild(appMainNode);

  const bodyNode = document.querySelector("body");
  const mainNode = document.querySelector("main");
  const loginNode = document.querySelector(".login__container");
  mainNode && bodyNode.removeChild(mainNode);
  loginNode && appNode.removeChild(loginNode);

  if (!isAuthenticated) {
    const loginTemplate = await Login(auth);
    // document.querySelector("main").append(...loginTemplate.childNodes);
    document.querySelector("#app").append(...loginTemplate.childNodes);
  } else {
    await MainView();
    await OmniboxController();
    await AvatarController();
  }
};
