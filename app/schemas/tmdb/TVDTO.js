const show = {
  // backdrop_path: "/npD65vPa4vvn1ZHpp3o05A5vdKT.jpg",
  first_air_date: "2022-02-17",
  // genre_ids: [18, 10765, 9648],
  // id: 95396,
  // media_type: "tv",
  name: "Severance",
  origin_country: ["US"],
  // original_language: "en",
  original_name: "Severance",
  // overview: "Mark leads a team of office workers whose memories...",
  // popularity: 77.42,
  // poster_path: "/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
  // vote_average: 8.2,
  // vote_count: 144,
};

/**
 *
 * @param obj
 * @returns {{
 *    backdrop_path: string,
 *    first_air_date: string,
 *    genre_ids: number[],
 *    id: number,
 *    media_type: string,
 *    name: string,
 *    origin_country: string[],
 *    original_language: string,
 *    original_name: string,
 *    overview: string,
 *    popularity: number,
 *    poster_path: string,
 *    vote_average: number,
 *    vote_count: number
 * }} TVDTO
 * @constructor
 */
export default function TVDTO(obj) {
  const clone = JSON.parse(JSON.stringify(obj));
  return {
    backdrop_path: clone.backdrop_path,
    first_air_date: clone.first_air_date,
    genre_ids: clone.genre_ids, // array
    id: clone.id,
    media_type: clone.media_type,
    name: clone.name,
    origin_country: clone.origin_country, // array
    original_language: clone.original_language,
    original_name: clone.original_name,
    overview: clone.overview,
    popularity: clone.popularity,
    poster_path: clone.poster_path,
    vote_average: clone.vote_average,
    vote_count: clone.vote_count,
  };
}
