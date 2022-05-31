import TVDTO from "./TVDTO.js";
import MovieDTO from "./MovieDTO.js";

// Allows new Object();
// *    known_for: Array.<TVDTO|MovieDTO>,
// Does Not Allow new Object();
// *    known_for: (TVDTO|MovieDTO)[],
// The only way autocompletion works well
// *    known_for: ({
//          backdrop_path: string,
//          first_air_date: string,
//          genre_ids: number[],
//          id: number,
//          media_type: string,
//          name: string,
//          origin_country: string[],
//          original_language: string,
//          original_name: string,
//          overview: string,
//          popularity: number,
//          poster_path: string,
//          vote_average: number,
//          vote_count: number
//       }|{
//          adult: boolean,
//          backdrop_path: string,
//          genre_ids: number[],
//          id: number,
//          media_type: string,
//          original_language: string,
//          original_title: string,
//          overview: string,
//          popularity: number,
//          poster_path: string,
//          release_date: string,
//          title: string,
//          video: boolean,
//          vote_average: number,
//          vote_count: number
//       })[],
//

// /**
//  *
//  * @param obj
//  * @returns {{
//  *    adult: boolean,
//  *    gender: number,
//  *    id: number,
//  *    known_for: ({
//  *       backdrop_path: string,
//  *       first_air_date: string,
//  *       genre_ids: number[],
//  *       id: number,
//  *       media_type: string,
//  *       name: string,
//  *       origin_country: string[],
//  *       original_language: string,
//  *       original_name: string,
//  *       overview: string,
//  *       popularity: number,
//  *       poster_path: string,
//  *       vote_average: number,
//  *       vote_count: number
//  *    }|{
//  *       adult: boolean,
//  *       backdrop_path: string,
//  *       genre_ids: number[],
//  *       id: number,
//  *       media_type: string,
//  *       original_language: string,
//  *       original_title: string,
//  *       overview: string,
//  *       popularity: number,
//  *       poster_path: string,
//  *       release_date: string,
//  *       title: string,
//  *       video: boolean,
//  *       vote_average: number,
//  *       vote_count: number
//  *    })[],
//  *    known_for_department: string,
//  *    media_type: string,
//  *    name: string,
//  *    popularity: number,
//  *    profile_path: string,
//  * }}
//  */

/**
 *
 * @param obj
 * @returns {{
 *    adult: boolean,
 *    gender: number,
 *    id: number,
 *    known_for: (TVShowType|MovieShowType)[],
 *    known_for_department: string,
 *    media_type: string,
 *    name: string,
 *    popularity: number,
 *    profile_path: string,
 * }}
 */
export default function (obj) {
  const kf = [];
  for (const show of obj.known_for) {
    if (show.media_type === "tv") {
      kf.push(TVDTO(show));
    } else {
      kf.push(MovieDTO(show));
    }
  }
  return {
    adult: obj.adult,
    gender: obj.gender,
    id: obj.id,
    known_for: kf,
    known_for_department: obj.known_for_department,
    media_type: obj.media_type,
    name: obj.name,
    popularity: obj.popularity,
    profile_path: obj.profile_path,
  };
}
