/**
 * Person Type
 * @typedef   {Object}                        PersonType
 * @property  {boolean}                       adult
 * @property  {number}                        gender
 * @property  {number}                        id
 * @property  {(TVShowType|MovieShowType)[]}  known_for
 * @property  {string}                        known_for_department
 * @property  {string}                        media_type
 * @property  {string}                        name
 * @property  {number}                        popularity
 * @property  {string}                        profile_path
 */

// The following commented JSDoc IS THE ONLY WAY VSCODE AUTOCOMPLETES, but
// it is problematic. The problem rises at `known_for` property. Since the
// union must be explicitly defined we are forced to duplicate those object
// type definitions. You can see what happens with `known_for` in
// MultiSearchDTO.js. Webstorm works fine with @typedef, vscode does not.
// /**
//  * Person DTO Factory
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
// Additional notes:
// Allows new Object();
// *    known_for: Array.<TVDTO|MovieDTO>,
// Does Not Allow new Object();
// *    known_for: (TVDTO|MovieDTO)[],

import TVDTO from "./TVDTO.js";
import MovieDTO from "./MovieDTO.js";

/**
 * Person DTO Factory
 * @param   {Object} obj
 * @returns {PersonType}
 * @type    {(obj: Object) => PersonType}
 */
export default function (obj) {
  return {
    adult: obj.adult,
    gender: obj.gender,
    id: obj.id,
    known_for: obj.known_for.map((show) =>
      show.media_type === "tv" ? TVDTO(show) : MovieDTO(show)
    ),
    known_for_department: obj.known_for_department,
    media_type: obj.media_type,
    name: obj.name,
    popularity: obj.popularity,
    profile_path: obj.profile_path,
  };
}
