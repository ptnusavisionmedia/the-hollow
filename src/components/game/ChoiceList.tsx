import type { ChoiceView } from '@/engine'

type Props = {
  choices: readonly ChoiceView[]
  onChoose: (optionId: string) => void
}

export function ChoiceList({ choices, onChoose }: Props) {
  return (
    <ul className="flex flex-col gap-2" aria-label="Pilihan">
      {choices.map(({ option, locked }, i) => (
        <li key={option.id}>
          <button
            type="button"
            disabled={locked}
            onClick={() => onChoose(option.id)}
            className="border-bone/20 bg-night/85 hover:border-bone/50 focus-visible:border-bone w-full rounded-sm border px-5 py-4 text-left font-serif text-base transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:text-lg"
          >
            <span className="text-bone/40 mr-3 font-sans text-sm">{i + 1}</span>
            {option.text}
            {locked && <span className="text-bone/60 ml-2 text-sm">(belum bisa)</span>}
          </button>
        </li>
      ))}
    </ul>
  )
}
