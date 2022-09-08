const auth = async () => {
  let auth0 = null;

  const fetchAuthConfig = () => fetch("/auth_config.json");

  const configAuthClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    console.log("auth config: ", config);

    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId,
    });
    console.log("auth0", auth0);
  };

  return new Promise((resolve, reject) => {
    window.onload = async () => {
      await configAuthClient();
      resolve(auth0);
    };
    // return new Promise(resolve =>  btn.onclick = () => resolve());
    // return new Promise(resolve => button.onclick = resolve);
    // (resolve) => window.onload = async () => await configAuthClient() => resolve();
    // return new Promise((resolve) => (window.onload = resolve));
  });
};

const Auth = await auth();
export default Auth;
