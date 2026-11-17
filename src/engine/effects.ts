import { addUnique } from './state'
import { clampStat } from './stats'
import type { Effect, StoryState } from './types'

export function applyEffect(state: StoryState, effect: Effect): StoryState {
  switch (effect.op) {
    case 'add':
      return {
        ...state,
        stats: {
          ...state.stats,
          [effect.stat]: clampStat(state.stats[effect.stat] + effect.value),
        },
      }
    case 'set':
      return { ...state, stats: { ...state.stats, [effect.stat]: clampStat(effect.value) } }
    case 'setFlag':
      return { ...state, flags: addUnique(state.flags, effect.flag) }
    case 'clearFlag':
      return { ...state, flags: state.flags.filter((f) => f !== effect.flag) }
    case 'addFragment':
      return { ...state, fragments: addUnique(state.fragments, effect.id) }
    case 'addJournal':
      return { ...state, journal: addUnique(state.journal, effect.entryId) }
    case 'keepPromise':
      return {
        ...state,
        promisesKept: addUnique(state.promisesKept, effect.id),
        promisesBroken: state.promisesBroken.filter((p) => p !== effect.id),
      }
    case 'breakPromise':
      return {
        ...state,
        promisesBroken: addUnique(state.promisesBroken, effect.id),
        promisesKept: state.promisesKept.filter((p) => p !== effect.id),
      }
  }
}

export function applyEffects(state: StoryState, effects: readonly Effect[] = []): StoryState {
  return effects.reduce(applyEffect, state)
}
