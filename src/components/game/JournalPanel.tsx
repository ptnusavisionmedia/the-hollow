import { useState } from 'react'
import type { DeductionResult, JournalKind, StoryContent, StoryState } from '@/engine'

const KIND_LABEL: Record<JournalKind, string> = {
  testimony: 'Kesaksian',
  observation: 'Pengamatan',
  vision: 'Mata batin',
  evidence: 'Bukti',
  question: 'Pertanyaan',
}

const FEEDBACK: Record<DeductionResult['kind'], string> = {
  solved: 'Ada yang tidak cocok di sini. Catatan baru ditambahkan.',
  alreadySolved: 'Farez sudah memikirkan ini.',
  wrong: 'Dua hal ini tidak saling menjelaskan.',
  invalid: 'Pilih dua catatan yang berbeda.',
}

type Props = {
  content: StoryContent
  state: StoryState
  lastDeduction: DeductionResult['kind'] | null
  onCombine: (a: string, b: string) => void
  onClose: () => void
}

export function JournalPanel({ content, state, lastDeduction, onCombine, onClose }: Props) {
  const [selected, setSelected] = useState<readonly string[]>([])

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id].slice(-2),
    )

  const combineSelected = () => {
    const [a, b] = selected
    if (a && b) {
      onCombine(a, b)
      setSelected([])
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-title"
      className="bg-night/95 fixed inset-0 z-20 overflow-y-auto"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-8">
        <header className="flex items-baseline justify-between">
          <h2 id="journal-title" className="font-serif text-2xl">
            Jurnal Farez
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-bone/70 hover:text-bone text-sm underline"
          >
            Tutup (J)
          </button>
        </header>

        <p className="text-bone/60 text-sm">
          Pilih dua catatan, lalu gabungkan untuk mencari hubungan atau kontradiksi.
        </p>

        {state.journal.length === 0 && <p className="text-bone/60 italic">Belum ada catatan.</p>}

        <ul className="flex flex-col gap-2">
          {state.journal.map((id) => {
            const entry = content.journal[id]
            if (!entry) return null
            const active = selected.includes(id)
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(id)}
                  className={`w-full rounded-sm border px-4 py-3 text-left transition-colors ${
                    active ? 'border-bone bg-bone/10' : 'border-bone/15 hover:border-bone/40'
                  }`}
                >
                  <span className="text-moss text-xs tracking-widest uppercase">
                    {KIND_LABEL[entry.kind]}
                  </span>
                  <span className="block font-serif text-lg">{entry.title}</span>
                  <span className="text-bone/70 block text-sm">{entry.body}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="bg-night/95 sticky bottom-0 flex flex-col gap-2 py-3">
          <button
            type="button"
            disabled={selected.length !== 2}
            onClick={combineSelected}
            className="border-bone/40 hover:border-bone rounded-sm border px-5 py-3 font-serif disabled:opacity-40"
          >
            Gabungkan ({selected.length}/2)
          </button>
          {lastDeduction && (
            <p aria-live="polite" className="text-bone/80 text-center text-sm">
              {FEEDBACK[lastDeduction]}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
