import UpdateUI from "./UpdateUI.js";

export const login = (auth) => {
  return async () => {
    console.log("customLogin");
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

const Auth0 = async () => {
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

  return new Promise((resolve, reject) => {
    const _auth0 = async () => {
      const auth0 = await configAuthClient();
      console.log("auth0 Object", auth0);

      /** UI **/
      await UpdateUI(auth0);

      const query = window.location.search;
      console.log("query", query);
      if (query.includes("code=") && query.includes("state=")) {
        const res = await auth0.handleRedirectCallback();
        console.log("RedirectCallback", res);

        await UpdateUI(auth0);

        window.history.replaceState({}, document.title, "/");
        /** **/
      }

      return auth0;
    };

    // https://stackoverflow.com/a/27935772
    if (document.readyState === "complete") {
      return resolve(_auth0());
    }
    document.addEventListener("DOMContentLoaded", resolve);
  });
};

export default Auth0;
