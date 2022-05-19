export default function HashifyDTO(obj) {
  // const clone = Object.assign({}, obj); // shallow copy
  const clone = JSON.parse(JSON.stringify(obj)); // deep copy
  return {
    Digest: clone.Digest,
    DigestEnc: clone.DigestEnc,
    Type: clone.Type,
    Key: clone.Key,
  };
}
