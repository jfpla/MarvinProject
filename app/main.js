import MainView from "./views/main/MainView.js";
import OmniboxView from "./views/omnibox/OmniboxView.js";
import AvatarController from "./controllers/AvatarController.js";
import NavigatorController from "./controllers/NavigatorController.js";

await MainView();
await OmniboxView();
await NavigatorController();
await AvatarController();
