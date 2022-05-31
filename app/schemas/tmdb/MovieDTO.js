import Show from "./Show.js";

// const movie = {
//   adult: false,
//   // backdrop_path: "/5xeC9mN6Aq2PmbbglqxiJxSPgvl.jpg",
//   // genre_ids: [27, 35, 53],
//   // id: 5072,
//   // media_type: "movie",
//   // original_language: "en",
//   original_title: "Severance",
//   // overview: "Members of the Palisades Defense Corp. sales group arrive in Europe...",
//   // popularity: 13.552,
//   // poster_path: "/yg1XRTyH5knwh3Tnij2sUV0ZZ5w.jpg",
//   release_date: "2006-05-19",
//   title: "Severance",
//   video: false,
//   // vote_average: 6.3,
//   // vote_count: 431,
// };

/**
 *
 * @param obj
 * @returns {{
 *    adult: boolean,
 *    backdrop_path: string,
 *    genre_ids: number[],
 *    id: number,
 *    media_type: string,
 *    original_language: string,
 *    original_title: string,
 *    overview: string,
 *    popularity: number,
 *    poster_path: string,
 *    release_date: string,
 *    title: string,
 *    video: boolean,
 *    vote_average: number,
 *    vote_count: number
 * }} MovieDTO
 * @constructor
 */
export default function (obj) {
  const show = Show(obj);
  return Object.assign(show, {
    adult: obj.adult,
    original_title: obj.original_title,
    release_date: obj.release_date,
    title: obj.title,
    video: obj.video,
  });
}
