import MainView from "./views/main/MainView.js";
import OmniboxView from "./views/omnibox/OmniboxView.js";
import AvatarController from "./controllers/AvatarController.js";

await MainView();
await OmniboxView();
await AvatarController();
