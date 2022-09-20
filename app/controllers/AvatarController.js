import gravatar from "../services/api/Gravatar.js";
import avatarView from "../views/avatar/AvatarView.js";

/**
 *
 * @param auth
 * @return {Promise<ViewType>}
 * @constructor
 */
const LoadAvatarController = async (auth) => {
  /**
   *
   * @param {Element} element
   * @return {Element}
   */
  const populateAvatar = (element) => {
    const avatarBox = element.querySelector(".avatar__content");
    const img = document.createElement("img");
    img.setAttribute("src", avatar);
    img.setAttribute("alt", "Avatar");
    img.setAttribute("referrerpolicy", "no-referrer"); // fix google avatar HTTP403
    avatarBox.appendChild(img);
    return element;
  };

  const view = await avatarView();

  let user;
  let avatar;
  if (await auth.isAuthenticated()) {
    user = await auth.getUser();
    avatar = user.picture;
  } else {
    user = "jfrpla@gmail.com";
    avatar = localStorage.getItem(user) || (await gravatar(user));
    localStorage.setItem(user, avatar);
  }

  return await view.map(populateAvatar);
};

export default LoadAvatarController;
