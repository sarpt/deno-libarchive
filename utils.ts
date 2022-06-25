export function makeCString(str: string): Uint8Array {
  return new Uint8Array([
    ...new TextEncoder().encode(str),
    0,
  ]);
}
