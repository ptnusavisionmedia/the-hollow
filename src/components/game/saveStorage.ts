// Lapisan browser untuk save: localStorage, unduh file, dan baca file impor.
// Semua akses storage dibungkus try/catch: storage bisa diblokir (mode privat, iframe itch.io)
// atau dihapus browser (Safari). Itulah alasan export/import file tersedia.

import { serializeSave, type Session } from '@/engine'

/** Diberi awalan karena game HTML5 di itch.io biasanya berbagi satu domain. */
const AUTOSAVE_KEY = 'the-hollow:save:auto'

export function readAutosave(): string | null {
  try {
    return localStorage.getItem(AUTOSAVE_KEY)
  } catch {
    return null
  }
}

export function writeAutosave(session: Session): boolean {
  try {
    localStorage.setItem(AUTOSAVE_KEY, serializeSave(session))
    return true
  } catch {
    return false
  }
}

export function clearAutosave(): void {
  try {
    localStorage.removeItem(AUTOSAVE_KEY)
  } catch {
    // Storage tidak tersedia; tidak ada yang perlu dihapus.
  }
}

/** Minta browser tidak menghapus storage situs ini otomatis. Browser boleh menolak. */
export async function requestPersistentStorage(): Promise<void> {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) {
      await navigator.storage.persist()
    }
  } catch {
    // Tidak didukung; export/import tetap jadi cadangan.
  }
}

export function downloadSave(session: Session, now: Date = new Date()): void {
  const blob = new Blob([serializeSave(session, now)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const stamp = now.toISOString().slice(0, 16).replace(/[:T]/g, '-')
  const link = document.createElement('a')
  link.href = url
  link.download = `the-hollow-hari${session.state.time.day}-${stamp}.json`
  link.click()
  URL.revokeObjectURL(url)
}

/** Batas ukuran file impor; save normal hanya beberapa KB. */
const MAX_IMPORT_BYTES = 256 * 1024

export async function readSaveFile(file: File): Promise<string> {
  if (file.size > MAX_IMPORT_BYTES) throw new Error('File terlalu besar untuk file save.')
  return file.text()
}
