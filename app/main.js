import MainView from "./views/main/MainView.js";
import AvatarController from "./controllers/AvatarController.js";
// import NavigatorController from "./controllers/NavigatorController.js";
import OmniboxController from "./controllers/OmniboxController.js";
import DB from "./services/storage/DB.js";
import Auth, { login, logout } from "./auth/Auth.js";

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logout;

console.log("DB", DB);
console.log("Auth", Auth);
const isAuthenticated = await Auth.isAuthenticated();
console.log("isAuthenticated", isAuthenticated);

if (isAuthenticated) {
  await MainView();
  await OmniboxController();
  // await NavigatorController();
  await AvatarController();
}
