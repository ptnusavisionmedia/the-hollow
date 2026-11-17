import type { Comparison, Condition, StoryState } from './types'

function compare(left: number, op: Comparison, right: number): boolean {
  switch (op) {
    case '>=':
      return left >= right
    case '<=':
      return left <= right
    case '>':
      return left > right
    case '<':
      return left < right
    case '==':
      return left === right
  }
}

/** Kondisi kosong (undefined) selalu terpenuhi. */
export function evaluate(condition: Condition | undefined, state: StoryState): boolean {
  if (condition === undefined) return true
  if ('all' in condition) return condition.all.every((c) => evaluate(c, state))
  if ('any' in condition) return condition.any.some((c) => evaluate(c, state))
  if ('not' in condition) return !evaluate(condition.not, state)
  if ('stat' in condition)
    return compare(state.stats[condition.stat], condition.op, condition.value)
  if ('flag' in condition) return state.flags.includes(condition.flag)
  if ('fragment' in condition) return state.fragments.includes(condition.fragment)
  if ('journal' in condition) return state.journal.includes(condition.journal)
  if ('promiseKept' in condition) return state.promisesKept.includes(condition.promiseKept)
  if ('promiseBroken' in condition) return state.promisesBroken.includes(condition.promiseBroken)
  if ('visited' in condition) return state.visitsDone.includes(condition.visited)
  return state.time.day >= condition.dayAtLeast
}
