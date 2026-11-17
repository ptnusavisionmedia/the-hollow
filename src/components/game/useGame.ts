import { useReducer } from 'react'
import {
  advance,
  choose,
  combine,
  getDay,
  goHome,
  openInnerSight,
  skipCurrentSlot,
  startGame,
  visit,
  visitOptions,
  type DeductionResult,
  type Line,
  type Session,
  type StoryContent,
} from '@/engine'

export type SightView = { lines: readonly Line[]; index: number; distorted: boolean }

export type GameUiState = {
  session: Session | null
  sight: SightView | null
  journalOpen: boolean
  lastDeduction: DeductionResult['kind'] | null
}

export type GameAction =
  | { type: 'start' }
  | { type: 'load'; session: Session }
  | { type: 'advance' }
  | { type: 'choose'; optionId: string }
  | { type: 'pick'; index: number }
  | { type: 'visit'; visitId: string }
  | { type: 'skipSlot' }
  | { type: 'goHome' }
  | { type: 'openSight' }
  | { type: 'advanceSight' }
  | { type: 'toggleJournal' }
  | { type: 'combine'; a: string; b: string }
  | { type: 'backToTitle' }

const initial: GameUiState = { session: null, sight: null, journalOpen: false, lastDeduction: null }

function reducer(content: StoryContent, ui: GameUiState, action: GameAction): GameUiState {
  if (action.type === 'start') return { ...initial, session: startGame(content) }
  if (action.type === 'load') return { ...initial, session: action.session }
  if (action.type === 'backToTitle') return initial
  if (action.type === 'toggleJournal') {
    return { ...ui, journalOpen: !ui.journalOpen, lastDeduction: null }
  }

  const { session } = ui
  if (!session) return ui

  switch (action.type) {
    case 'advance':
      return ui.sight ? ui : { ...ui, session: advance(content, session) }
    case 'choose':
      return { ...ui, session: choose(content, session, action.optionId) }
    case 'pick': {
      // Pilihan via angka 1–9; opsi yang terkunci diabaikan oleh engine.
      if (session.phase.kind === 'choice') {
        const choice = session.phase.choices[action.index]
        return choice ? { ...ui, session: choose(content, session, choice.option.id) } : ui
      }
      if (session.phase.kind === 'hub') {
        const option = visitOptions(getDay(content, session.state), session.state)[action.index]
        return option ? { ...ui, session: visit(content, session, option.visit.id) } : ui
      }
      return ui
    }
    case 'visit':
      return { ...ui, session: visit(content, session, action.visitId) }
    case 'skipSlot':
      return { ...ui, session: skipCurrentSlot(content, session) }
    case 'goHome':
      return { ...ui, session: goHome(content, session) }
    case 'openSight': {
      const opened = openInnerSight(content, session)
      if (!opened) return ui
      return {
        ...ui,
        session: opened.session,
        sight: { lines: opened.result.layer.beats, index: 0, distorted: opened.result.distorted },
      }
    }
    case 'advanceSight': {
      if (!ui.sight) return ui
      const index = ui.sight.index + 1
      return { ...ui, sight: index < ui.sight.lines.length ? { ...ui.sight, index } : null }
    }
    case 'combine': {
      const { session: next, result } = combine(content, session, action.a, action.b)
      return { ...ui, session: next, lastDeduction: result.kind }
    }
  }
}

export function useGame(content: StoryContent) {
  return useReducer((ui: GameUiState, action: GameAction) => reducer(content, ui, action), initial)
}
