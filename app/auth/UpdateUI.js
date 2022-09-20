import MainView from "../views/main/MainView.js";
import OmniboxController from "../controllers/OmniboxController.js";
import AvatarController from "../controllers/AvatarController.js";
import Login from "../views/login/Login.js";

export const resetApp = () => {
  const appNode = document.querySelector("#app");
  while (appNode.firstChild) {
    appNode.removeChild(appNode.firstChild);
  }
};

export default async (auth) => {
  const isAuthenticated = await auth.isAuthenticated();
  console.log("updateUI", isAuthenticated);

  /*Reset home*/
  resetApp();

  if (!isAuthenticated) {
    const loginView = await Login(auth);
    document.querySelector("#app").appendChild(loginView.emit());
  } else {
    await MainView();
    await OmniboxController();
    await AvatarController(auth);
  }
};
