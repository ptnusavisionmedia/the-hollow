// Format file save: serialisasi, validasi, dan migrasi.
// Murni (tanpa localStorage/DOM) supaya bisa dites dan dipakai ulang untuk export/import maupun cloud save.

import { resumeSession, savedPhaseOf, type SavedPhase, type Session } from './runner'
import { SCHEMA_VERSION } from './state'
import { STAT_KEYS, TIME_SLOTS, type StoryContent, type StoryState } from './types'

export const SAVE_FORMAT = 'the-hollow-save'

export type SaveFile = {
  format: typeof SAVE_FORMAT
  schemaVersion: number
  /** ISO 8601. */
  savedAt: string
  phase: SavedPhase
  state: StoryState
}

export type LoadResult =
  { ok: true; session: Session; save: SaveFile } | { ok: false; reason: string }

export function toSaveFile(session: Session, now: Date = new Date()): SaveFile {
  return {
    format: SAVE_FORMAT,
    schemaVersion: SCHEMA_VERSION,
    savedAt: now.toISOString(),
    phase: savedPhaseOf(session),
    state: session.state,
  }
}

export function serializeSave(session: Session, now?: Date): string {
  return JSON.stringify(toSaveFile(session, now))
}

/**
 * Migrasi dari versi lama ke versi sekarang. Kunci = versi asal.
 * Tambahkan entri setiap kali `SCHEMA_VERSION` naik, jangan ubah entri lama.
 */
const MIGRATIONS: Record<number, (state: Record<string, unknown>) => Record<string, unknown>> = {}

/** Baca save dari teks JSON (localStorage atau file impor). */
export function loadSave(content: StoryContent, text: string): LoadResult {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return { ok: false, reason: 'File save rusak (bukan JSON).' }
  }
  return loadSaveObject(content, raw)
}

export function loadSaveObject(content: StoryContent, raw: unknown): LoadResult {
  if (!isRecord(raw) || raw.format !== SAVE_FORMAT) {
    return { ok: false, reason: 'Ini bukan file save THE HOLLOW.' }
  }
  if (typeof raw.schemaVersion !== 'number' || !Number.isInteger(raw.schemaVersion)) {
    return { ok: false, reason: 'Versi save tidak dikenali.' }
  }
  if (raw.schemaVersion > SCHEMA_VERSION) {
    return { ok: false, reason: 'Save ini dari versi game yang lebih baru.' }
  }
  if (raw.phase !== 'scene' && raw.phase !== 'hub' && raw.phase !== 'ending') {
    return { ok: false, reason: 'Save tidak lengkap.' }
  }
  if (!isRecord(raw.state)) return { ok: false, reason: 'Save tidak lengkap.' }

  let state: Record<string, unknown> = raw.state
  for (let v = raw.schemaVersion; v < SCHEMA_VERSION; v++) {
    const migrate = MIGRATIONS[v]
    if (!migrate) return { ok: false, reason: `Tidak ada migrasi dari versi ${v}.` }
    state = migrate(state)
  }
  state = { ...state, schemaVersion: SCHEMA_VERSION }

  if (!isStoryState(state)) return { ok: false, reason: 'Isi save tidak valid.' }
  if (!content.days[state.time.day]) {
    return { ok: false, reason: 'Hari di save ini tidak ada di versi game sekarang.' }
  }

  const save: SaveFile = {
    format: SAVE_FORMAT,
    schemaVersion: SCHEMA_VERSION,
    savedAt: typeof raw.savedAt === 'string' ? raw.savedAt : '',
    phase: raw.phase,
    state,
  }
  try {
    return { ok: true, session: resumeSession(content, state, raw.phase), save }
  } catch {
    return { ok: false, reason: 'Save tidak cocok dengan versi game sekarang.' }
  }
}

// ── Validasi bentuk ───────────────────────────────────────────────

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((x) => typeof x === 'string')
}

const LIST_FIELDS = [
  'flags',
  'fragments',
  'journal',
  'promisesKept',
  'promisesBroken',
  'visitsDone',
  'innerSightUsed',
  'deductionsSolved',
  'deductionsFailed',
] as const

function isStoryState(value: Record<string, unknown>): value is StoryState {
  const { stats, time, position, activeVisit } = value
  if (!isRecord(stats)) return false
  if (!STAT_KEYS.every((k) => typeof stats[k] === 'number' && stats[k] >= 0 && stats[k] <= 100)) {
    return false
  }
  if (!LIST_FIELDS.every((k) => isStringList(value[k]))) return false
  if (!isRecord(time) || typeof time.day !== 'number' || time.day < 1) return false
  if (!(TIME_SLOTS as readonly unknown[]).includes(time.slot)) return false
  if (!isRecord(position) || typeof position.sceneId !== 'string') return false
  if (typeof position.beatIndex !== 'number' || position.beatIndex < 0) return false
  return activeVisit === null || typeof activeVisit === 'string'
}
