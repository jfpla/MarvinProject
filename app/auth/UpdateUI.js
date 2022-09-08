import MainView from "../views/main/MainView.js";
import OmniboxController from "../controllers/OmniboxController.js";
import AvatarController from "../controllers/AvatarController.js";

export default async (auth) => {
  const isAuthenticated = await auth.isAuthenticated();
  console.log("updateUI", isAuthenticated);
  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;

  if (isAuthenticated) {
    await MainView();
    await OmniboxController();
    await AvatarController();
  }
};
