import { describe, expect, it } from 'vitest'
import {
  advance,
  choose,
  combine,
  openInnerSight,
  startGame,
  validateContent,
  visit,
  type Session,
  type StoryContent,
} from '@/engine'
import { demoContent } from './demo'

/** Tekan "lanjut" sampai ada pilihan, hub, atau ending. */
function skipLines(content: StoryContent, session: Session): Session {
  let current = session
  for (let i = 0; i < 100 && current.phase.kind === 'line'; i++) current = advance(content, current)
  return current
}

describe('konten demo', () => {
  it('lolos content linter', () => {
    expect(validateContent(demoContent)).toEqual([])
  })

  it('jalur: warung → rumah → deduksi → ending Dua Naya', () => {
    let s = skipLines(demoContent, startGame(demoContent))
    expect(s.phase.kind).toBe('hub')
    expect(s.state.time.slot).toBe('sore')

    s = skipLines(demoContent, visit(demoContent, s, 'warung_sore'))
    expect(s.state.journal).toContain('testimony_lastri')
    expect(s.state.time.slot).toBe('malam')

    s = skipLines(demoContent, visit(demoContent, s, 'rumah_malam'))
    expect(s.phase.kind).toBe('choice')

    s = combine(demoContent, s, 'testimony_lastri', 'observation_naya_home').session
    expect(s.state.fragments).toContain('someone_wears_naya')

    s = skipLines(demoContent, choose(demoContent, s, 'stay_with_naya'))
    expect(s.phase).toEqual({ kind: 'ending', endingId: 'demo_witness' })
  })

  it('jalur: kebun → rumah tanpa deduksi → ending Pintu yang Terkunci', () => {
    let s = skipLines(demoContent, startGame(demoContent))
    s = skipLines(demoContent, visit(demoContent, s, 'kebun_sore'))
    s = skipLines(demoContent, visit(demoContent, s, 'rumah_malam'))
    s = skipLines(demoContent, choose(demoContent, s, 'stay_with_naya'))
    expect(s.phase).toEqual({ kind: 'ending', endingId: 'demo_close' })
  })

  it('balai desa terkunci di awal', () => {
    const s = skipLines(demoContent, startGame(demoContent))
    expect(visit(demoContent, s, 'balai_sore')).toBe(s)
  })

  it('mata batin di rumah: jernih saat strain rendah, terdistorsi saat tinggi', () => {
    let s = skipLines(demoContent, startGame(demoContent))
    s = skipLines(demoContent, visit(demoContent, s, 'warung_sore'))
    s = visit(demoContent, s, 'rumah_malam')

    expect(openInnerSight(demoContent, s)?.result.distorted).toBe(false)

    const strained = { ...s, state: { ...s.state, stats: { ...s.state.stats, strain: 75 } } }
    const sight = openInnerSight(demoContent, strained)
    expect(sight?.result.distorted).toBe(true)
    expect(sight?.session.state.journal).toContain('vision_naya_luar')
  })

  it('baris bersyarat dilewati kalau syaratnya belum terpenuhi', () => {
    let s = skipLines(demoContent, startGame(demoContent))
    s = skipLines(demoContent, visit(demoContent, s, 'kebun_sore'))
    s = visit(demoContent, s, 'rumah_malam')
    s = advance(demoContent, s)
    expect(s.phase.kind === 'line' && s.phase.line.speaker).toBe('naya')
  })
})
