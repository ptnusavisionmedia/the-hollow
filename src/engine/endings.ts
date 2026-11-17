import { evaluate } from './conditions'
import type { EndingRule, StoryState } from './types'

/** Ending pertama yang syaratnya terpenuhi. Daftar wajib diakhiri ending cadangan tanpa syarat. */
export function resolveEnding(rules: readonly EndingRule[], state: StoryState): string {
  const last = rules.at(-1)
  if (!last || last.requires !== undefined) {
    throw new Error('Daftar ending harus diakhiri ending cadangan tanpa syarat')
  }
  const match = rules.find((rule) => evaluate(rule.requires, state)) ?? last
  return match.endingId
}
