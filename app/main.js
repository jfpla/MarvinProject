import MainView from "./views/main/MainView.js";
import AvatarController from "./controllers/AvatarController.js";
// import NavigatorController from "./controllers/NavigatorController.js";
import OmniboxController from "./controllers/OmniboxController.js";
import DB from "./services/storage/DB.js";
import Auth from "./auth/Auth.js";

console.log("DB", DB);
console.log("Auth", Auth);

await MainView();
await OmniboxController();
// await NavigatorController();
await AvatarController();
