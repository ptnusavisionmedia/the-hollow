import { describe, expect, it } from 'vitest'
import {
  activateInnerSight,
  applyEffects,
  chooseVisit,
  combineEntries,
  createInitialState,
  dayOverFlag,
  endDay,
  evaluate,
  innerSightStatus,
  resolveEnding,
  returnToHub,
  skipSlot,
  startDay,
  visitOptions,
  type DayDefinition,
  type Deduction,
  type Scene,
  type StoryState,
} from './index'

const base = () => createInitialState('prologue_01')

const withStrain = (state: StoryState, strain: number): StoryState => ({
  ...state,
  stats: { ...state.stats, strain },
})

describe('conditions', () => {
  it('membandingkan stat', () => {
    expect(evaluate({ stat: 'nayaTrust', op: '>=', value: 50 }, base())).toBe(true)
    expect(evaluate({ stat: 'nayaTrust', op: '>', value: 50 }, base())).toBe(false)
  })

  it('menggabungkan all, any, dan not', () => {
    const state = applyEffects(base(), [{ op: 'setFlag', flag: 'naya_protected' }])
    expect(
      evaluate(
        {
          all: [
            { flag: 'naya_protected' },
            { not: { flag: 'naya_lied' } },
            { any: [{ fragment: 'x' }, { dayAtLeast: 1 }] },
          ],
        },
        state,
      ),
    ).toBe(true)
  })

  it('kondisi kosong selalu terpenuhi', () => {
    expect(evaluate(undefined, base())).toBe(true)
  })
})

describe('effects', () => {
  it('meng-clamp stat ke 0–100', () => {
    const state = applyEffects(base(), [
      { op: 'add', stat: 'nayaTrust', value: 80 },
      { op: 'add', stat: 'strain', value: -10 },
    ])
    expect(state.stats.nayaTrust).toBe(100)
    expect(state.stats.strain).toBe(0)
  })

  it('tidak menduplikasi flag', () => {
    const state = applyEffects(base(), [
      { op: 'setFlag', flag: 'a' },
      { op: 'setFlag', flag: 'a' },
    ])
    expect(state.flags).toEqual(['a'])
  })

  it('janji yang dilanggar menghapus status ditepati', () => {
    const state = applyEffects(base(), [
      { op: 'keepPromise', id: 'p1' },
      { op: 'breakPromise', id: 'p1' },
    ])
    expect(state.promisesKept).toEqual([])
    expect(state.promisesBroken).toEqual(['p1'])
  })

  it('tidak mengubah state asal', () => {
    const original = base()
    applyEffects(original, [{ op: 'add', stat: 'strain', value: 10 }])
    expect(original.stats.strain).toBe(0)
  })
})

describe('mata batin', () => {
  const scene: Scene = {
    id: 'backyard_night',
    chapter: 'prologue',
    locationId: 'house',
    beats: [],
    exit: { to: 'hub' },
    innerSight: {
      clear: {
        beats: [{ kind: 'line', text: 'Jejak kaki berhenti di sumur.' }],
        effects: [{ op: 'addJournal', entryId: 'vision_well' }],
      },
      distorted: {
        beats: [{ kind: 'line', text: 'Ibu berdiri di dekat sumur.' }],
        effects: [{ op: 'addJournal', entryId: 'vision_mother' }],
      },
    },
  }

  it('tidak tersedia di scene tanpa lapisan penglihatan', () => {
    expect(innerSightStatus({ ...scene, innerSight: undefined }, base())).toBe('unavailable')
  })

  it('lapisan jernih di bawah ambang distorsi, dan menambah strain', () => {
    const result = activateInnerSight(scene, base())
    expect(result?.distorted).toBe(false)
    expect(result?.state.stats.strain).toBe(8)
    expect(result?.state.journal).toEqual(['vision_well'])
  })

  it('lapisan terdistorsi mulai strain 70', () => {
    const result = activateInnerSight(scene, withStrain(base(), 70))
    expect(result?.distorted).toBe(true)
    expect(result?.state.journal).toEqual(['vision_mother'])
  })

  it('jatuh ke lapisan jernih kalau scene tidak punya versi terdistorsi', () => {
    const result = activateInnerSight(
      { ...scene, innerSight: { clear: scene.innerSight!.clear } },
      withStrain(base(), 75),
    )
    expect(result?.distorted).toBe(false)
  })

  it('terkunci mulai strain 90', () => {
    const state = withStrain(base(), 90)
    expect(innerSightStatus(scene, state)).toBe('locked')
    expect(activateInnerSight(scene, state)).toBeNull()
  })

  it('hanya bisa dipakai sekali per scene', () => {
    const first = activateInnerSight(scene, base())!
    expect(innerSightStatus(scene, first.state)).toBe('used')
    expect(activateInnerSight(scene, first.state)).toBeNull()
  })
})

describe('hub harian', () => {
  const day1: DayDefinition = {
    day: 1,
    slots: ['pagi', 'siang'],
    closingSceneId: 'day1_close',
    visits: [
      { id: 'warung_pagi', locationId: 'warung', slot: 'pagi', sceneId: 'warung_01' },
      {
        id: 'balai_pagi',
        locationId: 'balai',
        slot: 'pagi',
        sceneId: 'balai_01',
        requires: { stat: 'villageTrust', op: '>=', value: 60 },
      },
      { id: 'sastro_siang', locationId: 'sastro', slot: 'siang', sceneId: 'sastro_01' },
    ],
  }

  it('menampilkan kunjungan slot saat ini, termasuk yang terkunci', () => {
    expect(visitOptions(day1, base())).toEqual([
      { visit: day1.visits[0], locked: false },
      { visit: day1.visits[1], locked: true },
    ])
  })

  it('menolak kunjungan yang terkunci', () => {
    expect(chooseVisit(day1, base(), 'balai_pagi')).toBeNull()
  })

  it('kunjungan memajukan slot dan tidak bisa diulang', () => {
    const step = chooseVisit(day1, base(), 'warung_pagi')!
    expect(step).toMatchObject({ kind: 'scene', sceneId: 'warung_01' })
    expect(step.state.time.slot).toBe('siang')
    expect(visitOptions(day1, step.state).map((o) => o.visit.id)).toEqual(['sastro_siang'])
  })

  it('kunjungan di slot terakhir mengakhiri hari setelah scene selesai', () => {
    const morning = chooseVisit(day1, base(), 'warung_pagi')!
    const noon = chooseVisit(day1, returnToHub(day1, morning.state).state, 'sastro_siang')!
    expect(returnToHub(day1, noon.state)).toMatchObject({ kind: 'dayOver', sceneId: 'day1_close' })
  })

  it('melewati slot terakhir juga mengakhiri hari', () => {
    const noon = skipSlot(day1, base())
    expect(noon.kind).toBe('hub')
    expect(skipSlot(day1, noon.state).kind).toBe('dayOver')
  })

  it('bisa mengakhiri hari lebih awal, lalu memulai hari berikutnya', () => {
    const over = endDay(day1, base())
    expect(over.state.flags).toContain(dayOverFlag(1))
    const day2 = startDay({ ...day1, day: 2, slots: ['sore', 'malam'] }, over.state)
    expect(day2.time).toEqual({ day: 2, slot: 'sore' })
  })
})

describe('jurnal aktif', () => {
  const deductions: Deduction[] = [
    {
      id: 'voice_contradiction',
      entries: ['testimony_lastri', 'observation_naya_inside'],
      effects: [
        { op: 'addFragment', id: 'mimic_exists' },
        { op: 'addJournal', entryId: 'question_who_called' },
      ],
    },
  ]
  const withEntries = applyEffects(base(), [
    { op: 'addJournal', entryId: 'testimony_lastri' },
    { op: 'addJournal', entryId: 'observation_naya_inside' },
    { op: 'addJournal', entryId: 'evidence_footprint' },
  ])

  it('pasangan benar memecahkan deduksi, tanpa peduli urutan', () => {
    const result = combineEntries(
      deductions,
      withEntries,
      'observation_naya_inside',
      'testimony_lastri',
    )
    expect(result.kind).toBe('solved')
    expect(result.state.fragments).toEqual(['mimic_exists'])
    expect(result.state.journal).toContain('question_who_called')
  })

  it('deduksi yang sudah terpecahkan tidak dijalankan ulang', () => {
    const once = combineEntries(
      deductions,
      withEntries,
      'testimony_lastri',
      'observation_naya_inside',
    )
    const twice = combineEntries(
      deductions,
      once.state,
      'testimony_lastri',
      'observation_naya_inside',
    )
    expect(twice.kind).toBe('alreadySolved')
    expect(twice.state).toBe(once.state)
  })

  it('pasangan salah menambah strain sekali saja per pasangan', () => {
    const first = combineEntries(deductions, withEntries, 'testimony_lastri', 'evidence_footprint')
    expect(first.kind).toBe('wrong')
    expect(first.state.stats.strain).toBe(2)
    const again = combineEntries(deductions, first.state, 'evidence_footprint', 'testimony_lastri')
    expect(again.state.stats.strain).toBe(2)
  })

  it('menolak entri yang belum dimiliki atau entri yang sama', () => {
    expect(combineEntries(deductions, base(), 'testimony_lastri', 'evidence_footprint').kind).toBe(
      'invalid',
    )
    expect(
      combineEntries(deductions, withEntries, 'testimony_lastri', 'testimony_lastri').kind,
    ).toBe('invalid')
  })
})

describe('ending', () => {
  const rules = [
    { endingId: 'no_contact', requires: { stat: 'strain', op: '>=', value: 90 } },
    { endingId: 'sentinel', requires: { stat: 'nayaTrust', op: '>=', value: 70 } },
    { endingId: 'empty_return' },
  ] as const

  it('memakai ending pertama yang cocok, sesuai urutan prioritas', () => {
    const both = applyEffects(withStrain(base(), 95), [{ op: 'set', stat: 'nayaTrust', value: 80 }])
    expect(resolveEnding(rules, both)).toBe('no_contact')
  })

  it('jatuh ke ending cadangan', () => {
    expect(resolveEnding(rules, base())).toBe('empty_return')
  })

  it('menolak daftar tanpa ending cadangan', () => {
    expect(() => resolveEnding(rules.slice(0, 2), base())).toThrow()
  })
})
