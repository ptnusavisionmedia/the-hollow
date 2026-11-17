// Content linter: menangkap ID salah ketik, scene yatim, dan ending yang tidak lengkap
// sebelum pemain menemukannya. Dijalankan lewat test (`src/content/*.test.ts`).

import type { Condition, Effect, SceneExit, StoryContent } from './types'

export type ContentIssue = { where: string; message: string }

export function validateContent(content: StoryContent): ContentIssue[] {
  const issues: ContentIssue[] = []
  const report = (where: string, message: string) => issues.push({ where, message })

  const sceneExists = (id: string) => id in content.scenes
  const checkScene = (where: string, id: string) => {
    if (!sceneExists(id)) report(where, `scene "${id}" tidak ada`)
  }
  const checkExit = (where: string, exit: SceneExit) => {
    if (exit.to === 'scene') checkScene(where, exit.sceneId)
  }
  const checkEffects = (where: string, effects: readonly Effect[] = []) => {
    for (const effect of effects) {
      if (effect.op === 'addJournal' && !(effect.entryId in content.journal)) {
        report(where, `entri jurnal "${effect.entryId}" tidak ada`)
      }
    }
  }
  const checkCondition = (where: string, condition: Condition | undefined) => {
    if (!condition) return
    if ('all' in condition) condition.all.forEach((c) => checkCondition(where, c))
    else if ('any' in condition) condition.any.forEach((c) => checkCondition(where, c))
    else if ('not' in condition) checkCondition(where, condition.not)
    else if ('journal' in condition && !(condition.journal in content.journal)) {
      report(where, `entri jurnal "${condition.journal}" tidak ada`)
    }
  }

  checkScene('startSceneId', content.startSceneId)
  if (!content.days[1]) report('days', 'hari 1 belum didefinisikan')

  // ── Scene ──
  for (const [key, scene] of Object.entries(content.scenes)) {
    const where = `scene ${key}`
    if (scene.id !== key) report(where, `id "${scene.id}" tidak sama dengan kuncinya`)
    if (!(scene.locationId in content.locations)) {
      report(where, `lokasi "${scene.locationId}" tidak ada`)
    }
    checkExit(where, scene.exit)

    scene.beats.forEach((beat, i) => {
      const at = `${where} beat ${i}`
      if (beat.kind === 'line') {
        if (beat.speaker && !(beat.speaker in content.characters)) {
          report(at, `karakter "${beat.speaker}" tidak ada`)
        }
        checkCondition(at, beat.requires)
      } else if (beat.kind === 'effects') {
        checkEffects(at, beat.effects)
      } else {
        const ids = new Set<string>()
        for (const option of beat.options) {
          const o = `${at} pilihan ${option.id}`
          if (ids.has(option.id)) report(o, 'id pilihan duplikat')
          ids.add(option.id)
          checkExit(o, option.next)
          checkEffects(o, option.effects)
          checkCondition(o, option.requires)
        }
      }
    })

    if (scene.innerSight) {
      checkEffects(`${where} mata batin`, scene.innerSight.clear.effects)
      checkEffects(`${where} mata batin terdistorsi`, scene.innerSight.distorted?.effects)
    }
  }

  // ── Hari & hub ──
  for (const [key, day] of Object.entries(content.days)) {
    const where = `hari ${key}`
    if (String(day.day) !== key) report(where, `day ${day.day} tidak sama dengan kuncinya`)
    if (day.slots.length === 0) report(where, 'tidak punya slot')
    checkScene(`${where} penutup`, day.closingSceneId)
    const ids = new Set<string>()
    for (const v of day.visits) {
      const at = `${where} kunjungan ${v.id}`
      if (ids.has(v.id)) report(at, 'id kunjungan duplikat')
      ids.add(v.id)
      if (!day.slots.includes(v.slot)) report(at, `slot "${v.slot}" tidak aktif di hari ini`)
      if (!(v.locationId in content.locations)) report(at, `lokasi "${v.locationId}" tidak ada`)
      checkScene(at, v.sceneId)
      checkCondition(at, v.requires)
    }
  }

  // ── Jurnal ──
  for (const d of content.deductions) {
    for (const entry of d.entries) {
      if (!(entry in content.journal)) report(`deduksi ${d.id}`, `entri "${entry}" tidak ada`)
    }
    if (d.entries[0] === d.entries[1]) report(`deduksi ${d.id}`, 'pasangan entri sama')
    checkEffects(`deduksi ${d.id}`, d.effects)
  }

  // ── Ending ──
  const last = content.endingRules.at(-1)
  if (!last || last.requires) report('endingRules', 'harus diakhiri ending cadangan tanpa syarat')
  for (const rule of content.endingRules) {
    if (!(rule.endingId in content.endings)) {
      report('endingRules', `ending "${rule.endingId}" tidak punya definisi`)
    }
    checkCondition(`ending ${rule.endingId}`, rule.requires)
  }

  // ── Scene yatim ──
  for (const id of findUnreachableScenes(content)) report(`scene ${id}`, 'tidak bisa dicapai')

  return issues
}

/** Scene yang tidak bisa dicapai dari scene awal, kunjungan hub, atau scene penutup hari. */
export function findUnreachableScenes(content: StoryContent): string[] {
  const reached = new Set<string>()
  const queue: string[] = [content.startSceneId]
  for (const day of Object.values(content.days)) {
    queue.push(day.closingSceneId, ...day.visits.map((v) => v.sceneId))
  }

  while (queue.length > 0) {
    const id = queue.pop()!
    const scene = content.scenes[id]
    if (reached.has(id) || !scene) continue
    reached.add(id)
    const exits = [scene.exit]
    for (const beat of scene.beats) {
      if (beat.kind === 'choice') exits.push(...beat.options.map((o) => o.next))
    }
    for (const exit of exits) if (exit.to === 'scene') queue.push(exit.sceneId)
  }

  return Object.keys(content.scenes).filter((id) => !reached.has(id))
}
