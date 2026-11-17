import { evaluate } from './conditions'
import { addUnique } from './state'
import type { DayDefinition, StoryState, TimeSlot, Visit } from './types'

export const dayOverFlag = (day: number) => `day${day}_over`

export type VisitOption = { visit: Visit; locked: boolean }

export type HubStep =
  | { kind: 'scene'; sceneId: string; state: StoryState }
  | { kind: 'hub'; state: StoryState }
  | { kind: 'dayOver'; sceneId: string; state: StoryState }

/** Kunjungan di slot saat ini yang belum dilakukan. `locked` berarti syarat belum terpenuhi. */
export function visitOptions(day: DayDefinition, state: StoryState): VisitOption[] {
  return day.visits
    .filter((v) => v.slot === state.time.slot && !state.visitsDone.includes(v.id))
    .map((visit) => ({ visit, locked: !evaluate(visit.requires, state) }))
}

function nextSlot(day: DayDefinition, slot: TimeSlot): TimeSlot | null {
  const index = day.slots.indexOf(slot)
  return index === -1 ? null : (day.slots[index + 1] ?? null)
}

/** Majukan satu slot. Kalau slot terakhir sudah lewat, hari ditandai selesai. */
function advanceSlot(day: DayDefinition, state: StoryState): StoryState {
  const slot = nextSlot(day, state.time.slot)
  return slot
    ? { ...state, time: { ...state.time, slot } }
    : { ...state, flags: addUnique(state.flags, dayOverFlag(day.day)) }
}

/** Pilih kunjungan: tandai selesai, majukan waktu, lalu masuk ke scene lokasi. */
export function chooseVisit(
  day: DayDefinition,
  state: StoryState,
  visitId: string,
): HubStep | null {
  const option = visitOptions(day, state).find((o) => o.visit.id === visitId)
  if (!option || option.locked) return null

  const visited = { ...state, visitsDone: addUnique(state.visitsDone, visitId) }
  return { kind: 'scene', sceneId: option.visit.sceneId, state: advanceSlot(day, visited) }
}

/** Dipanggil saat scene lokasi selesai. */
export function returnToHub(day: DayDefinition, state: StoryState): HubStep {
  return state.flags.includes(dayOverFlag(day.day)) ? endDay(day, state) : { kind: 'hub', state }
}

/** Lewati slot saat ini tanpa mengunjungi lokasi (misalnya Farez beristirahat). */
export function skipSlot(day: DayDefinition, state: StoryState): HubStep {
  return returnToHub(day, advanceSlot(day, state))
}

/** Akhiri hari, entah karena slot habis atau pemain memilih pulang lebih awal. */
export function endDay(day: DayDefinition, state: StoryState): HubStep {
  return {
    kind: 'dayOver',
    sceneId: day.closingSceneId,
    state: { ...state, flags: addUnique(state.flags, dayOverFlag(day.day)) },
  }
}

/** Mulai hari berikutnya di slot pertamanya. */
export function startDay(next: DayDefinition, state: StoryState): StoryState {
  const slot = next.slots[0]
  if (!slot) throw new Error(`Hari ${next.day} tidak punya slot`)
  return { ...state, time: { day: next.day, slot } }
}
