import { describe, expect, it } from 'vitest'
import { clampStat } from './stats'

describe('clampStat', () => {
  it('membiarkan nilai di dalam rentang', () => {
    expect(clampStat(42)).toBe(42)
  })

  it('memotong nilai di luar rentang', () => {
    expect(clampStat(-5)).toBe(0)
    expect(clampStat(130)).toBe(100)
  })
})
