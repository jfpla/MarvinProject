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
  const mainViewNode = document.querySelector(".main__view");
  const loginViewNode = document.querySelector(".login__view");
  mainViewNode && mainViewNode.remove();
  loginViewNode && loginViewNode.remove();

  if (!isAuthenticated) {
    const loginView = await Login(auth);
    document.querySelector("#app").appendChild(loginView.emit());
  } else {
    await MainView();
    await OmniboxController();
    await AvatarController();
  }
};
