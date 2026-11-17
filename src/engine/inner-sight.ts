import { applyEffects } from './effects'
import { addUnique } from './state'
import { clampStat } from './stats'
import type { InnerSightLayer, Scene, StoryState } from './types'

export const INNER_SIGHT_COST = 8
/** Mulai dari strain ini, lapisan terdistorsi dipakai (kalau scene menyediakannya). */
export const DISTORTION_THRESHOLD = 70
/** Mulai dari strain ini, tombol terkunci. */
export const LOCKOUT_THRESHOLD = 90

/** `unavailable` berarti tombol tidak ditampilkan sama sekali. */
export type InnerSightStatus = 'unavailable' | 'used' | 'locked' | 'ready'

export function innerSightStatus(scene: Scene, state: StoryState): InnerSightStatus {
  if (!scene.innerSight) return 'unavailable'
  if (state.innerSightUsed.includes(scene.id)) return 'used'
  if (state.stats.strain >= LOCKOUT_THRESHOLD) return 'locked'
  return 'ready'
}

export type InnerSightResult = {
  state: StoryState
  layer: InnerSightLayer
  distorted: boolean
}

/** Pakai mata batin. Mengembalikan null kalau status tombol bukan `ready`. */
export function activateInnerSight(scene: Scene, state: StoryState): InnerSightResult | null {
  const sight = scene.innerSight
  if (!sight || innerSightStatus(scene, state) !== 'ready') return null

  // Zona ditentukan dari strain SEBELUM biaya ditambahkan.
  const distortedLayer = state.stats.strain >= DISTORTION_THRESHOLD ? sight.distorted : undefined
  const layer = distortedLayer ?? sight.clear

  const paid: StoryState = {
    ...state,
    stats: {
      ...state.stats,
      strain: clampStat(state.stats.strain + (sight.cost ?? INNER_SIGHT_COST)),
    },
    innerSightUsed: addUnique(state.innerSightUsed, scene.id),
  }

  return {
    state: applyEffects(paid, layer.effects),
    layer,
    distorted: distortedLayer !== undefined,
  }
}
