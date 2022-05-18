import { loadCSS, loadHTML } from "../View.js";

const LoadAvatarView = async () => {
  const baseUrl = import.meta.url;
  const avatarNode = await loadHTML(
    "./Avatar.html",
    baseUrl,
    "#avatar__container",
    ".main__header .avatar"
  );
  await loadCSS("./Avatar.css", baseUrl);
  return avatarNode;
};

export default LoadAvatarView;
