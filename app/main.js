// import MainView from "./views/main/MainView.js";
// import AvatarController from "./controllers/AvatarController.js";
// // import NavigatorController from "./controllers/NavigatorController.js";
// import OmniboxController from "./controllers/OmniboxController.js";
import DB from "./services/storage/DB.js";
import Auth0, { login, logout } from "./auth/Auth.js";

console.log("DB", DB);
const Auth = await Auth0();

console.log("Auth", Auth);
const isAuthenticated = await Auth.isAuthenticated();
console.log("isAuthenticated", isAuthenticated);

document.getElementById("btn-login").onclick = login(Auth);
document.getElementById("btn-logout").onclick = logout(Auth);
// if (isAuthenticated) {
//   await MainView();
//   await OmniboxController();
//   // await NavigatorController();
//   await AvatarController();
// }
