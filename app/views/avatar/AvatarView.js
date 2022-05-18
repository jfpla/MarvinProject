import { loadCSS, loadHTML } from "../View.js";

const LoadAvatarView = async () => {
  const baseUrl = import.meta.url;
  await loadHTML(
    "./Avatar.html",
    baseUrl,
    "#avatar__container",
    ".main__header .avatar"
  );
  await loadCSS("./Avatar.css", baseUrl);
};

export default LoadAvatarView;
