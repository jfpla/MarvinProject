import environment from "../../../environment.js";
import MultiSearchDTO from "../../schemas/tmdb/MultiSearchDTO.js";

export const multiSearch = async (words) => {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${environment.tmdbApiKey}&query=`;
  const response = await fetch(url + words);
  const data = await response.json();
  const result = MultiSearchDTO(data);
  //console.log(result);
  return result;
};
