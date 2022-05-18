export default function HashifyDTO(obj) {
  const clone = Object.assign({}, obj);
  return {
    Digest: clone.Digest,
    DigestEnc: clone.DigestEnc,
    Type: clone.Type,
    Key: clone.Key,
  };
}
