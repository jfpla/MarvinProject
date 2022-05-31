/**
 * Hashify Type
 * @typedef   {Object}  HashifyType
 * @property  {string}  Digest
 * @property  {string}  DigestEnc
 * @property  {string}  Type
 * @property  {string}  Key
 */

/**
 *
 * @param {Object} obj
 * @returns {HashifyType}
 * @type {(obj: Object) => HashifyType}
 */
export default function HashifyDTO(obj) {
  return {
    Digest: obj.Digest,
    DigestEnc: obj.DigestEnc,
    Type: obj.Type,
    Key: obj.Key,
  };
}
