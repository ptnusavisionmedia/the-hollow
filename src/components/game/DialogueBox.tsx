import type { Line, StoryContent } from '@/engine'

type Props = {
  content: StoryContent
  line: Line
  onAdvance: () => void
  variant?: 'normal' | 'sight'
}

export function DialogueBox({ content, line, onAdvance, variant = 'normal' }: Props) {
  const speaker = line.speaker ? content.characters[line.speaker]?.name : undefined
  const sight = variant === 'sight'

  return (
    <button
      type="button"
      onClick={onAdvance}
      className={`block w-full rounded-sm border p-5 text-left transition-colors sm:p-6 ${
        sight
          ? 'border-sight/40 bg-sight/10 text-sight-text'
          : 'border-bone/15 bg-night/85 hover:border-bone/30'
      }`}
      aria-label="Lanjutkan dialog"
    >
      {speaker && (
        <p className="text-moss mb-2 text-xs font-semibold tracking-[0.2em] uppercase">{speaker}</p>
      )}
      <p
        aria-live="polite"
        className={`font-serif text-lg leading-relaxed sm:text-xl ${speaker ? '' : 'italic'}`}
      >
        {line.text}
      </p>
      <p className="text-bone/40 mt-4 text-right text-xs">Klik atau tekan Spasi ▸</p>
    </button>
  )
}
