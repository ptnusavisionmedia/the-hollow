import { evaluate } from './conditions'
import { applyEffects } from './effects'
import { addUnique } from './state'
import { clampStat } from './stats'
import type { Deduction, StoryState } from './types'

/** Tambahan strain saat pemain menggabungkan pasangan yang salah (sekali per pasangan). */
export const WRONG_DEDUCTION_STRAIN = 2

export type DeductionResult =
  | { kind: 'solved'; deduction: Deduction; state: StoryState }
  | { kind: 'alreadySolved'; deduction: Deduction; state: StoryState }
  | { kind: 'wrong'; state: StoryState }
  | { kind: 'invalid'; state: StoryState }

/** Kunci pasangan yang tidak bergantung urutan. */
export function pairKey(a: string, b: string): string {
  return [a, b].sort().join('+')
}

/** Pemain menggabungkan dua entri jurnal. */
export function combineEntries(
  deductions: readonly Deduction[],
  state: StoryState,
  a: string,
  b: string,
): DeductionResult {
  if (a === b || !state.journal.includes(a) || !state.journal.includes(b)) {
    return { kind: 'invalid', state }
  }

  const key = pairKey(a, b)
  const deduction = deductions.find(
    (d) => pairKey(d.entries[0], d.entries[1]) === key && evaluate(d.requires, state),
  )

  if (deduction) {
    if (state.deductionsSolved.includes(deduction.id)) {
      return { kind: 'alreadySolved', deduction, state }
    }
    const solved = { ...state, deductionsSolved: addUnique(state.deductionsSolved, deduction.id) }
    return { kind: 'solved', deduction, state: applyEffects(solved, deduction.effects) }
  }

  if (state.deductionsFailed.includes(key)) return { kind: 'wrong', state }
  return {
    kind: 'wrong',
    state: {
      ...state,
      stats: { ...state.stats, strain: clampStat(state.stats.strain + WRONG_DEDUCTION_STRAIN) },
      deductionsFailed: addUnique(state.deductionsFailed, key),
    },
  }
}
