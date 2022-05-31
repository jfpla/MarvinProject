import OmniboxView from "../views/omnibox/OmniboxView.js";
import { multiSearch } from "../services/api/TMDBApi.js";
import { throttle } from "../services/RateLimiterService.js";

async function querySearch(e) {
  console.log(e.type);
  const query = e.target.value;
  if (query.length < 4) return;

  console.log(query);
  e.preventDefault();
  await multiSearch(query);
}

const LoadOmniboxController = async () => {
  const omniboxNode = await OmniboxView();
  console.log(omniboxNode);
  const form = omniboxNode.querySelector("form");
  const input = omniboxNode.querySelector("input");

  form.addEventListener("submit", (e) => {
    console.log("Enter");
    e.preventDefault();
  });
  input.addEventListener("change", throttle(querySearch, 300));
  input.addEventListener("input", throttle(querySearch, 300));
};

export default LoadOmniboxController;
