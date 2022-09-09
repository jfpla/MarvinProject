import UpdateUI from "./UpdateUI.js";

export const login = (auth) => {
  return async () => {
    await auth.loginWithRedirect({
      redirect_uri: window.location.origin,
    });
  };
};

export const logout = (auth) => {
  return async () => {
    auth.logout({ returnTo: window.location.origin });
  };
};

const fetchAuthConfig = () => fetch("/auth_config.json");

const configAuthClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  console.log("auth config: ", config);

  return await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
};

const authFlow = async (auth0) => {
  /** UI **/
  await UpdateUI(auth0);

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();

    await UpdateUI(auth0);

    window.history.replaceState({}, document.title, "/");
  }
  /** **/
};

export default async () => {
  return new Promise(async (resolve, reject) => {
    // https://stackoverflow.com/a/27935772
    if (document.readyState === "complete") {
      const auth0 = await configAuthClient();
      await authFlow(auth0);
      return resolve(auth0);
    }
    document.addEventListener("DOMContentLoaded", resolve);
  });
};
