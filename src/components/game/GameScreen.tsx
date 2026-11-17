import { useEffect } from 'react'
import { currentScene, innerSightStatus, type StoryContent } from '@/engine'
import { ChoiceList } from './ChoiceList'
import { DialogueBox } from './DialogueBox'
import { HubView } from './HubView'
import { JournalPanel } from './JournalPanel'
import { useGame } from './useGame'

const SLOT_LABEL = { pagi: 'Pagi', siang: 'Siang', sore: 'Sore', malam: 'Malam', larut: 'Larut' }

const SIGHT_LABEL = {
  ready: 'Mata batin',
  used: 'Sudah dilihat',
  locked: 'Terlalu lelah',
} as const

export function GameScreen({ content }: { content: StoryContent }) {
  const [ui, dispatch] = useGame(content)
  const { session, sight, journalOpen } = ui

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (event.key === 'j' || event.key === 'J') {
        dispatch({ type: 'toggleJournal' })
        return
      }
      if (journalOpen) return
      // Angka 1–9 memilih opsi di layar pilihan/hub. Tidak ada fokus otomatis di opsi,
      // supaya menekan Spasi berulang kali tidak memilih opsi pertama tanpa sengaja.
      if (/^[1-9]$/.test(event.key) && !sight) {
        dispatch({ type: 'pick', index: Number(event.key) - 1 })
        return
      }
      // Spasi/Enter di tombol yang sedang fokus dibiarkan memicu klik bawaan browser.
      if (event.target instanceof HTMLButtonElement) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        dispatch({ type: sight ? 'advanceSight' : 'advance' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dispatch, journalOpen, sight])

  if (!session) {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl tracking-[0.3em] sm:text-6xl">THE HOLLOW</h1>
          <p className="text-moss text-sm tracking-widest uppercase">Desa yang Terlupakan</p>
        </div>
        <button
          type="button"
          autoFocus
          onClick={() => dispatch({ type: 'start' })}
          className="border-bone/40 hover:border-bone rounded-sm border px-8 py-3 font-serif text-lg"
        >
          Mulai
        </button>
        <p className="text-bone/40 max-w-sm text-xs">
          Build demo. Mengandung tema orang hilang dan tekanan psikologis. Disarankan memakai
          headphone.
        </p>
      </main>
    )
  }

  const { phase, state } = session
  const inScene = phase.kind === 'line' || phase.kind === 'choice'
  const scene = inScene ? currentScene(content, session) : null
  const sightStatus = scene ? innerSightStatus(scene, state) : 'unavailable'
  const sightLine = sight?.lines[sight.index]
  const locationName = scene ? content.locations[scene.locationId]?.name : 'Wanasetra'

  return (
    <main
      className={`flex h-full flex-col transition-[filter] duration-700 ${sight ? 'sight-active' : ''}`}
    >
      <header className="border-bone/10 flex items-center justify-between gap-3 border-b px-4 py-3 text-sm">
        <p className="text-bone/70">
          Hari {state.time.day} · {SLOT_LABEL[state.time.slot]} · {locationName}
        </p>
        <div className="flex gap-2">
          {sightStatus !== 'unavailable' && (
            <button
              type="button"
              disabled={sightStatus !== 'ready' || sight !== null}
              onClick={() => dispatch({ type: 'openSight' })}
              className="border-sight/50 text-sight-text hover:bg-sight/15 rounded-sm border px-3 py-1 disabled:opacity-40"
            >
              {SIGHT_LABEL[sightStatus]}
            </button>
          )}
          <button
            type="button"
            onClick={() => dispatch({ type: 'toggleJournal' })}
            className="border-bone/30 hover:border-bone rounded-sm border px-3 py-1"
          >
            Jurnal ({state.journal.length})
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-end gap-4 px-4 py-6">
        {sightLine ? (
          <DialogueBox
            content={content}
            line={sightLine}
            variant="sight"
            onAdvance={() => dispatch({ type: 'advanceSight' })}
          />
        ) : phase.kind === 'line' ? (
          <DialogueBox
            content={content}
            line={phase.line}
            onAdvance={() => dispatch({ type: 'advance' })}
          />
        ) : phase.kind === 'choice' ? (
          <ChoiceList
            choices={phase.choices}
            onChoose={(optionId) => dispatch({ type: 'choose', optionId })}
          />
        ) : phase.kind === 'hub' ? (
          <HubView
            content={content}
            state={state}
            onVisit={(visitId) => dispatch({ type: 'visit', visitId })}
            onSkip={() => dispatch({ type: 'skipSlot' })}
            onGoHome={() => dispatch({ type: 'goHome' })}
          />
        ) : (
          <EndingView
            title={content.endings[phase.endingId]?.title ?? phase.endingId}
            text={content.endings[phase.endingId]?.text ?? ''}
            onRestart={() => dispatch({ type: 'backToTitle' })}
          />
        )}
      </div>

      {journalOpen && (
        <JournalPanel
          content={content}
          state={state}
          lastDeduction={ui.lastDeduction}
          onCombine={(a, b) => dispatch({ type: 'combine', a, b })}
          onClose={() => dispatch({ type: 'toggleJournal' })}
        />
      )}
    </main>
  )
}

function EndingView({
  title,
  text,
  onRestart,
}: {
  title: string
  text: string
  onRestart: () => void
}) {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-moss text-xs tracking-[0.3em] uppercase">Ending</p>
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="text-bone/80 max-w-md font-serif text-lg">{text}</p>
      <button
        type="button"
        onClick={onRestart}
        className="border-bone/40 hover:border-bone mt-4 rounded-sm border px-6 py-2 font-serif"
      >
        Kembali ke judul
      </button>
    </section>
  )
}
