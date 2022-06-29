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

export const fetchMovie = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbApiKey}&language=en-US`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchTV = async (id) => {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${environment.tmdbApiKey}&language=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchPerson = async (id) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${environment.tmdbApiKey}&language=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};
