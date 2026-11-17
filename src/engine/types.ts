// Tipe data engine cerita. Spesifikasi: docs/mechanics-spec.md

// ── Variabel naratif ──────────────────────────────────────────────

export const STAT_KEYS = [
  'nayaTrust',
  'argaTrust',
  'sastroTrust',
  'villageTrust',
  'evidence',
  'strain',
] as const

export type StatKey = (typeof STAT_KEYS)[number]
export type Stats = Record<StatKey, number>

// ── Waktu & hub ───────────────────────────────────────────────────

export const TIME_SLOTS = ['pagi', 'siang', 'sore', 'malam', 'larut'] as const
export type TimeSlot = (typeof TIME_SLOTS)[number]

export type GameTime = {
  day: number
  slot: TimeSlot
}

/** Satu pilihan lokasi di hub: lokasi × slot. */
export type Visit = {
  id: string
  locationId: string
  slot: TimeSlot
  sceneId: string
  requires?: Condition
}

export type DayDefinition = {
  day: number
  /** Slot yang aktif hari itu, berurutan. */
  slots: readonly TimeSlot[]
  visits: readonly Visit[]
  /** Scene yang dijalankan saat slot habis atau pemain mengakhiri hari. */
  closingSceneId: string
}

// ── Jurnal ────────────────────────────────────────────────────────

export type JournalKind = 'testimony' | 'observation' | 'vision' | 'evidence' | 'question'

export type JournalEntry = {
  id: string
  kind: JournalKind
  title: string
  body: string
  /** Tidak ditampilkan di UI. Dipakai untuk penglihatan terdistorsi. */
  unreliable?: boolean
}

export type Deduction = {
  id: string
  /** Pasangan entri; urutan tidak berpengaruh. */
  entries: readonly [string, string]
  effects: readonly Effect[]
  requires?: Condition
}

// ── Kondisi ───────────────────────────────────────────────────────

export type Comparison = '>=' | '<=' | '>' | '<' | '=='

export type Condition =
  | { stat: StatKey; op: Comparison; value: number }
  | { flag: string }
  | { fragment: string }
  | { journal: string }
  | { promiseKept: string }
  | { promiseBroken: string }
  | { visited: string }
  | { dayAtLeast: number }
  | { all: readonly Condition[] }
  | { any: readonly Condition[] }
  | { not: Condition }

// ── Efek ──────────────────────────────────────────────────────────

export type Effect =
  | { op: 'add'; stat: StatKey; value: number }
  | { op: 'set'; stat: StatKey; value: number }
  | { op: 'setFlag'; flag: string }
  | { op: 'clearFlag'; flag: string }
  | { op: 'addFragment'; id: string }
  | { op: 'addJournal'; entryId: string }
  | { op: 'keepPromise'; id: string }
  | { op: 'breakPromise'; id: string }

// ── Scene ─────────────────────────────────────────────────────────

export type Line = {
  kind: 'line'
  /** ID karakter; kosong = narasi. */
  speaker?: string
  expression?: string
  text: string
  requires?: Condition
}

export type ChoiceOption = {
  id: string
  text: string
  effects?: readonly Effect[]
  next: SceneExit
  requires?: Condition
  /** true = tampil abu-abu saat syarat tidak terpenuhi; false = disembunyikan. */
  showWhenLocked?: boolean
}

export type ChoiceBeat = { kind: 'choice'; options: readonly ChoiceOption[] }

export type Beat = Line | ChoiceBeat | { kind: 'effects'; effects: readonly Effect[] }

/**
 * Ke mana pemain pergi setelah scene selesai.
 * - `hub`: kembali ke hub (atau ke scene penutup kalau slot hari ini habis)
 * - `endDay`: akhiri hari sekarang, lanjut ke scene penutup hari
 * - `nextDay`: dipakai scene penutup; mulai hari berikutnya, atau ke ending kalau tidak ada
 * - `ending`: evaluasi ending sekarang
 */
export type SceneExit =
  | { to: 'scene'; sceneId: string }
  | { to: 'hub' }
  | { to: 'endDay' }
  | { to: 'nextDay' }
  | { to: 'ending' }

export type InnerSightLayer = {
  /** Penglihatan hanya berisi baris, tanpa pilihan. */
  beats: readonly Line[]
  effects?: readonly Effect[]
}

export type InnerSight = {
  /** Tambahan strain saat dipakai. Default: INNER_SIGHT_COST. */
  cost?: number
  clear: InnerSightLayer
  /** Dipakai saat strain di zona distorsi. Kalau kosong, lapisan jernih yang tampil. */
  distorted?: InnerSightLayer
}

export type Presentation = {
  background?: string
  bgm?: string
  ambience?: string
  transition?: 'cut' | 'fade' | 'slow-fade'
}

export type Scene = {
  id: string
  chapter: string
  locationId: string
  presentation?: Presentation
  beats: readonly Beat[]
  innerSight?: InnerSight
  /** Dipakai kalau scene tidak berakhir dengan pilihan. */
  exit: SceneExit
}

// ── Ending ────────────────────────────────────────────────────────

export type EndingRule = {
  endingId: string
  /** Kosong = ending cadangan; harus jadi elemen terakhir daftar. */
  requires?: Condition
}

export type EndingDefinition = {
  id: string
  title: string
  text: string
}

// ── Paket konten ──────────────────────────────────────────────────

export type Character = {
  id: string
  name: string
}

export type Location = {
  id: string
  name: string
}

/** Seluruh konten satu episode. Divalidasi oleh `validateContent`. */
export type StoryContent = {
  startSceneId: string
  characters: Readonly<Record<string, Character>>
  locations: Readonly<Record<string, Location>>
  scenes: Readonly<Record<string, Scene>>
  /** Kunci = nomor hari. */
  days: Readonly<Record<number, DayDefinition>>
  journal: Readonly<Record<string, JournalEntry>>
  deductions: readonly Deduction[]
  /** Urutan prioritas; elemen terakhir wajib tanpa syarat. */
  endingRules: readonly EndingRule[]
  endings: Readonly<Record<string, EndingDefinition>>
}

// ── State ─────────────────────────────────────────────────────────

export type StoryState = {
  schemaVersion: number
  stats: Stats
  flags: readonly string[]
  fragments: readonly string[]
  journal: readonly string[]
  promisesKept: readonly string[]
  promisesBroken: readonly string[]
  time: GameTime
  visitsDone: readonly string[]
  /** Kunjungan hub yang scene-nya sedang berjalan; waktu maju saat kembali ke hub. */
  activeVisit: string | null
  innerSightUsed: readonly string[]
  deductionsSolved: readonly string[]
  deductionsFailed: readonly string[]
  position: { sceneId: string; beatIndex: number }
}
