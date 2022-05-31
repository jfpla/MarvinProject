import Show from "./Show.js";

// const show = {
//   // backdrop_path: "/npD65vPa4vvn1ZHpp3o05A5vdKT.jpg",
//   first_air_date: "2022-02-17",
//   // genre_ids: [18, 10765, 9648],
//   // id: 95396,
//   // media_type: "tv",
//   name: "Severance",
//   origin_country: ["US"],
//   // original_language: "en",
//   original_name: "Severance",
//   // overview: "Mark leads a team of office workers whose memories...",
//   // popularity: 77.42,
//   // poster_path: "/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
//   // vote_average: 8.2,
//   // vote_count: 144,
// };

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
  const show = Show(obj);
  return Object.assign(show, {
    first_air_date: obj.first_air_date,
    name: obj.name,
    origin_country: obj.origin_country,
    original_name: obj.original_name,
  });
}
