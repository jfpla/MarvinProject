import hashify from "./Hashify.js";

const endpoint = "https://www.gravatar.com/avatar/";

const getGravatar = async (email) => {
  const hash = await hashify(email.trim().toLocaleLowerCase());
  const response = await fetch(
    endpoint +
      hash + // url
      "?d=404" + // forces a 404 response when avatar do not exists
      "&s=200" // get avatar at 200px size
  );
  if (response.status === 200) {
    return response.url;
  }
  return null;
};

export default getGravatar;
