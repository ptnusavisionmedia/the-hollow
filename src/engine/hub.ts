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

/**
 * Pilih kunjungan: tandai selesai, lalu masuk ke scene lokasi.
 * Waktu baru maju saat pemain kembali ke hub, supaya scene berlangsung di slot kunjungannya.
 */
export function chooseVisit(
  day: DayDefinition,
  state: StoryState,
  visitId: string,
): HubStep | null {
  const option = visitOptions(day, state).find((o) => o.visit.id === visitId)
  if (!option || option.locked) return null

  return {
    kind: 'scene',
    sceneId: option.visit.sceneId,
    state: { ...state, visitsDone: addUnique(state.visitsDone, visitId), activeVisit: visitId },
  }
}

/**
 * Dipanggil saat scene keluar ke hub. Kalau scene itu bagian dari kunjungan, waktu maju satu slot;
 * kalau slot sudah habis, hari berakhir.
 */
export function returnToHub(day: DayDefinition, state: StoryState): HubStep {
  const settled = state.activeVisit ? advanceSlot(day, { ...state, activeVisit: null }) : state
  return settled.flags.includes(dayOverFlag(day.day))
    ? endDay(day, settled)
    : { kind: 'hub', state: settled }
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
    state: { ...state, activeVisit: null, flags: addUnique(state.flags, dayOverFlag(day.day)) },
  }
}

/** Mulai hari berikutnya di slot pertamanya. */
export function startDay(next: DayDefinition, state: StoryState): StoryState {
  const slot = next.slots[0]
  if (!slot) throw new Error(`Hari ${next.day} tidak punya slot`)
  return { ...state, time: { day: next.day, slot } }
}
