import { describe, expect, it } from 'vitest'
import {
  advance,
  choose,
  loadSave,
  serializeSave,
  startGame,
  visit,
  type Session,
  type StoryContent,
} from '@/engine'
import { demoContent } from './demo'

function skipLines(content: StoryContent, session: Session): Session {
  let current = session
  for (let i = 0; i < 100 && current.phase.kind === 'line'; i++) current = advance(content, current)
  return current
}

const roundTrip = (session: Session) => loadSave(demoContent, serializeSave(session))

describe('save / load', () => {
  it('memulihkan posisi di tengah dialog', () => {
    const session = advance(demoContent, startGame(demoContent))
    const loaded = roundTrip(session)
    expect(loaded.ok && loaded.session).toEqual(session)
  })

  it('memulihkan layar pilihan dengan efek yang sudah terjadi', () => {
    let s = skipLines(demoContent, startGame(demoContent))
    s = skipLines(demoContent, visit(demoContent, s, 'warung_sore'))
    s = skipLines(demoContent, visit(demoContent, s, 'rumah_malam'))
    expect(s.phase.kind).toBe('choice')

    const loaded = roundTrip(s)
    if (!loaded.ok) throw new Error(loaded.reason)
    expect(loaded.session).toEqual(s)
    // Efek tidak dijalankan dua kali saat dimuat.
    expect(loaded.session.state.stats.villageTrust).toBe(s.state.stats.villageTrust)

    const after = skipLines(demoContent, choose(demoContent, loaded.session, 'stay_with_naya'))
    expect(after.phase).toEqual({ kind: 'ending', endingId: 'demo_close' })
  })

  it('memulihkan hub dan ending', () => {
    const hub = skipLines(demoContent, startGame(demoContent))
    expect(roundTrip(hub)).toMatchObject({ ok: true, session: { phase: { kind: 'hub' } } })

    const ending: Session = { state: hub.state, phase: { kind: 'ending', endingId: 'x' } }
    expect(roundTrip(ending)).toMatchObject({
      ok: true,
      session: { phase: { kind: 'ending', endingId: 'demo_unanswered' } },
    })
  })

  it('jatuh ke hub kalau scene di save sudah tidak ada', () => {
    const s = startGame(demoContent)
    const broken: Session = {
      ...s,
      state: { ...s.state, position: { sceneId: 'scene_yang_dihapus', beatIndex: 0 } },
    }
    expect(roundTrip(broken)).toMatchObject({ ok: true, session: { phase: { kind: 'hub' } } })
  })

  it('menolak file yang bukan save atau rusak', () => {
    expect(loadSave(demoContent, 'bukan json').ok).toBe(false)
    expect(loadSave(demoContent, '{"format":"lain"}').ok).toBe(false)

    const save = JSON.parse(serializeSave(startGame(demoContent)))
    save.state.stats.strain = 500
    expect(loadSave(demoContent, JSON.stringify(save)).ok).toBe(false)

    const future = JSON.parse(serializeSave(startGame(demoContent)))
    future.schemaVersion = 99
    expect(loadSave(demoContent, JSON.stringify(future))).toMatchObject({
      ok: false,
      reason: 'Save ini dari versi game yang lebih baru.',
    })
  })
})
