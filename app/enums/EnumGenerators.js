export function* EnumKeyGenerator() {
  for (let key of Object.keys(this)) yield key;
}

export function* EnumValueGenerator() {
  for (let val of Object.values(this)) yield val;
}
