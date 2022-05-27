import MainView from "./views/main/MainView.js";
import AvatarController from "./controllers/AvatarController.js";
import NavigatorController from "./controllers/NavigatorController.js";
import OmniboxController from "./controllers/OmniboxController.js";

await MainView();
await OmniboxController();
await NavigatorController();
await AvatarController();
