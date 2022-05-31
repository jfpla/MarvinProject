import environment from "../../../environment.js";

export const multiSearch = async (words) => {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${environment.tmdbApiKey}&query=`;
  const response = await fetch(url + words);
  const data = await response.json();
  console.log(data);
  return data.results;
};
