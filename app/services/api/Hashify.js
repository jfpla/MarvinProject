import proxy from "./Proxy.js";
import HashifyDTO from "../../schemas/HashifyDTO.js";

const md5Endpoint = "https://api.hashify.net/hash/md5/hex?value=";

const getMD5Hash = async (value) => {
  const endpoint = proxy(md5Endpoint + value);
  const response = await fetch(endpoint);
  const data = await response.json();
  const dto = HashifyDTO(data);
  return dto.Digest;
};

export default getMD5Hash;
