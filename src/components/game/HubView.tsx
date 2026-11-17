import { getDay, visitOptions, type StoryContent, type StoryState } from '@/engine'

type Props = {
  content: StoryContent
  state: StoryState
  onVisit: (visitId: string) => void
  onSkip: () => void
  onGoHome: () => void
}

export function HubView({ content, state, onVisit, onSkip, onGoHome }: Props) {
  const options = visitOptions(getDay(content, state), state)

  return (
    <section className="flex flex-col gap-4" aria-labelledby="hub-title">
      <div>
        <h2 id="hub-title" className="font-serif text-2xl">
          Ke mana?
        </h2>
        <p className="text-bone/60 text-sm">
          Setiap tempat memakan waktu. Tidak semua bisa didatangi.
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {options.map(({ visit, locked }, i) => (
          <li key={visit.id}>
            <button
              type="button"
              disabled={locked}
              onClick={() => onVisit(visit.id)}
              className="border-bone/20 bg-night/85 hover:border-bone/50 focus-visible:border-bone w-full rounded-sm border px-5 py-4 text-left font-serif text-lg transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="text-bone/40 mr-3 font-sans text-sm">{i + 1}</span>
              {content.locations[visit.locationId]?.name ?? visit.locationId}
              {locked && <span className="text-bone/60 ml-2 text-sm">(belum bisa)</span>}
            </button>
          </li>
        ))}
        {options.length === 0 && (
          <li className="text-bone/60 text-sm italic">
            Tidak ada tempat yang bisa didatangi sekarang.
          </li>
        )}
      </ul>

      <div className="flex flex-wrap gap-3 text-sm">
        <button type="button" onClick={onSkip} className="text-bone/70 hover:text-bone underline">
          Biarkan waktu lewat
        </button>
        <button type="button" onClick={onGoHome} className="text-bone/70 hover:text-bone underline">
          Akhiri hari
        </button>
      </div>
    </section>
  )
}
