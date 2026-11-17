import type { StoryState } from './types'

export const SCHEMA_VERSION = 1

export function createInitialState(startSceneId: string): StoryState {
  return {
    schemaVersion: SCHEMA_VERSION,
    stats: {
      nayaTrust: 50,
      argaTrust: 50,
      sastroTrust: 30,
      villageTrust: 30,
      evidence: 0,
      strain: 0,
    },
    flags: [],
    fragments: [],
    journal: [],
    promisesKept: [],
    promisesBroken: [],
    time: { day: 1, slot: 'pagi' },
    visitsDone: [],
    innerSightUsed: [],
    deductionsSolved: [],
    deductionsFailed: [],
    position: { sceneId: startSceneId, beatIndex: 0 },
  }
}

/** Tambah item ke daftar tanpa duplikat. */
export function addUnique(list: readonly string[], item: string): readonly string[] {
  return list.includes(item) ? list : [...list, item]
}
