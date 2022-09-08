export const login = async () => {
  console.log("customLogin");
  await Auth.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
};

export const logout = async () => {
  Auth.logout({ returnTo: window.location.origin });
};

const updateUI = async (auth) => {
  const isAuthenticated = await auth.isAuthenticated();
  console.log("updateUI", isAuthenticated);
  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
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
    window.onload = async () => {
      const auth0 = await configAuthClient();
      console.log("auth0 Object", auth0);

      /** UI **/
      await updateUI(auth0);
      console.log("after updateUI");
      resolve(auth0);
      // if (auth0.isAuthenticated()) {
      //   console.log("AUTHENTICATED");
      //   return;
      // }

      const query = window.location.search;
      console.log("query", query);
      if (query.includes("code=") && query.includes("state=")) {
        const res = await auth0.handleRedirectCallback();
        console.log("RedirectCallback", res);

        await updateUI(auth0);

        window.history.replaceState({}, document.title, "/");
        /** **/
      }
    };
  });
};

const Auth = await Auth0();

export default Auth;
