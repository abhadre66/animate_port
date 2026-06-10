/** Deterministic pseudo-random number in [0, 1), stable across server/client renders. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
