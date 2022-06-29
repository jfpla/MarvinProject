import MainView from "./views/main/MainView.js";
import AvatarController from "./controllers/AvatarController.js";
// import NavigatorController from "./controllers/NavigatorController.js";
import OmniboxController from "./controllers/OmniboxController.js";
import DB from "./services/storage/DB.js";

console.log("DB", DB);

await MainView();
await OmniboxController();
// await NavigatorController();
await AvatarController();
