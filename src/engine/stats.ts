// Engine cerita: TypeScript murni, tanpa React. Lihat docs/the-hollow-audit.md §4.
// Tipe Scene/Effect/Condition ditulis setelah mekanik inti diputuskan.

export const STAT_MIN = 0
export const STAT_MAX = 100

/** Jaga nilai variabel naratif (trust, strain, dst.) tetap di rentang 0–100. */
export function clampStat(value: number): number {
  return Math.min(STAT_MAX, Math.max(STAT_MIN, value))
}
