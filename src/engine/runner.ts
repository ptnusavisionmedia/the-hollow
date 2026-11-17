// Scene runner: menjalankan konten beat demi beat dan memindahkan pemain antar scene, hub, dan ending.
// UI cukup memanggil fungsi-fungsi di sini dan merender `session.phase`.

import { evaluate } from './conditions'
import { applyEffects } from './effects'
import { resolveEnding } from './endings'
import { chooseVisit, endDay, returnToHub, skipSlot, startDay } from './hub'
import { activateInnerSight, type InnerSightResult } from './inner-sight'
import { combineEntries, type DeductionResult } from './journal'
import { createInitialState } from './state'
import type {
  ChoiceOption,
  DayDefinition,
  Line,
  Scene,
  SceneExit,
  StoryContent,
  StoryState,
} from './types'

export type ChoiceView = { option: ChoiceOption; locked: boolean }

export type Phase =
  | { kind: 'line'; line: Line }
  | { kind: 'choice'; choices: readonly ChoiceView[] }
  | { kind: 'hub' }
  | { kind: 'ending'; endingId: string }

export type Session = { state: StoryState; phase: Phase }

// ── Lookup ────────────────────────────────────────────────────────

export function getScene(content: StoryContent, sceneId: string): Scene {
  const scene = content.scenes[sceneId]
  if (!scene) throw new Error(`Scene tidak ditemukan: ${sceneId}`)
  return scene
}

export function getDay(content: StoryContent, state: StoryState): DayDefinition {
  const day = content.days[state.time.day]
  if (!day) throw new Error(`Hari tidak ditemukan: ${state.time.day}`)
  return day
}

export function currentScene(content: StoryContent, session: Session): Scene {
  return getScene(content, session.state.position.sceneId)
}

// ── Alur scene ────────────────────────────────────────────────────

export function startGame(content: StoryContent): Session {
  const initial = createInitialState(content.startSceneId)
  const firstDay = content.days[1]
  const slot = firstDay?.slots[0]
  const state = slot ? { ...initial, time: { day: 1, slot } } : initial
  return enterScene(content, state, content.startSceneId)
}

function enterScene(content: StoryContent, state: StoryState, sceneId: string): Session {
  getScene(content, sceneId)
  return settle(content, { ...state, position: { sceneId, beatIndex: 0 } })
}

/**
 * Maju dari posisi sekarang sampai ketemu beat yang perlu ditampilkan.
 * Beat efek dijalankan otomatis; baris yang syaratnya gagal dilewati.
 */
function settle(content: StoryContent, state: StoryState): Session {
  const scene = getScene(content, state.position.sceneId)
  let current = state

  for (let index = current.position.beatIndex; ; index++) {
    current = { ...current, position: { ...current.position, beatIndex: index } }
    const beat = scene.beats[index]
    if (!beat) return followExit(content, current, scene.exit)

    if (beat.kind === 'effects') {
      current = applyEffects(current, beat.effects)
      continue
    }
    if (beat.kind === 'line') {
      if (evaluate(beat.requires, current))
        return { state: current, phase: { kind: 'line', line: beat } }
      continue
    }

    const choices = beat.options
      .map((option) => ({ option, locked: !evaluate(option.requires, current) }))
      .filter((c) => !c.locked || c.option.showWhenLocked)
    if (choices.some((c) => !c.locked)) {
      return { state: current, phase: { kind: 'choice', choices } }
    }
    // Tidak ada pilihan yang bisa diambil: lewati supaya pemain tidak buntu.
  }
}

/** Lanjut ke beat berikutnya. Hanya berlaku saat fase `line`. */
export function advance(content: StoryContent, session: Session): Session {
  if (session.phase.kind !== 'line') return session
  const { position } = session.state
  return settle(content, {
    ...session.state,
    position: { ...position, beatIndex: position.beatIndex + 1 },
  })
}

/** Ambil pilihan. Pilihan yang terkunci atau tidak ada diabaikan. */
export function choose(content: StoryContent, session: Session, optionId: string): Session {
  if (session.phase.kind !== 'choice') return session
  const choice = session.phase.choices.find((c) => c.option.id === optionId)
  if (!choice || choice.locked) return session
  const state = applyEffects(session.state, choice.option.effects)
  return followExit(content, state, choice.option.next)
}

function followExit(content: StoryContent, state: StoryState, exit: SceneExit): Session {
  switch (exit.to) {
    case 'scene':
      return enterScene(content, state, exit.sceneId)
    case 'hub':
      return fromHubStep(content, returnToHub(getDay(content, state), state))
    case 'endDay':
      return fromHubStep(content, endDay(getDay(content, state), state))
    case 'nextDay': {
      const next = content.days[state.time.day + 1]
      if (!next) return toEnding(content, state)
      return { state: startDay(next, state), phase: { kind: 'hub' } }
    }
    case 'ending':
      return toEnding(content, state)
  }
}

function toEnding(content: StoryContent, state: StoryState): Session {
  return { state, phase: { kind: 'ending', endingId: resolveEnding(content.endingRules, state) } }
}

function fromHubStep(content: StoryContent, step: ReturnType<typeof returnToHub>): Session {
  return step.kind === 'hub'
    ? { state: step.state, phase: { kind: 'hub' } }
    : enterScene(content, step.state, step.sceneId)
}

// ── Aksi hub ──────────────────────────────────────────────────────

export function visit(content: StoryContent, session: Session, visitId: string): Session {
  if (session.phase.kind !== 'hub') return session
  const step = chooseVisit(getDay(content, session.state), session.state, visitId)
  return step ? fromHubStep(content, step) : session
}

export function skipCurrentSlot(content: StoryContent, session: Session): Session {
  if (session.phase.kind !== 'hub') return session
  return fromHubStep(content, skipSlot(getDay(content, session.state), session.state))
}

export function goHome(content: StoryContent, session: Session): Session {
  if (session.phase.kind !== 'hub') return session
  return fromHubStep(content, endDay(getDay(content, session.state), session.state))
}

// ── Mata batin & jurnal ───────────────────────────────────────────

/** Mata batin hanya bisa dipakai saat sedang di dalam scene (bukan hub atau ending). */
export function openInnerSight(
  content: StoryContent,
  session: Session,
): { session: Session; result: InnerSightResult } | null {
  if (session.phase.kind !== 'line' && session.phase.kind !== 'choice') return null
  const result = activateInnerSight(currentScene(content, session), session.state)
  return result ? { session: { ...session, state: result.state }, result } : null
}

export function combine(
  content: StoryContent,
  session: Session,
  a: string,
  b: string,
): { session: Session; result: DeductionResult } {
  const result = combineEntries(content.deductions, session.state, a, b)
  return { session: { ...session, state: result.state }, result }
}
