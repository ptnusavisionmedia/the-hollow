import { useEffect, useState } from 'react'
import { currentScene, innerSightStatus, type StoryContent } from '@/engine'
import { ChoiceList } from './ChoiceList'
import { DialogueBox } from './DialogueBox'
import { HubView } from './HubView'
import { JournalPanel } from './JournalPanel'
import { downloadSave, writeAutosave } from './saveStorage'
import { TitleScreen } from './TitleScreen'
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
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Autosave setiap kali sesi berubah. Save hanya beberapa KB, jadi aman ditulis sering.
  useEffect(() => {
    if (session) writeAutosave(session)
  }, [session])

  if (!session) {
    return (
      <TitleScreen
        content={content}
        onStart={() => dispatch({ type: 'start' })}
        onLoad={(loaded) => dispatch({ type: 'load', session: loaded })}
      />
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
          <div className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="border-bone/30 hover:border-bone rounded-sm border px-3 py-1"
            >
              Menu
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="border-bone/20 bg-night absolute right-0 z-10 mt-2 flex w-56 flex-col rounded-sm border p-1 text-left"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    downloadSave(session)
                    setMenuOpen(false)
                  }}
                  className="hover:bg-bone/10 rounded-sm px-3 py-2 text-left"
                >
                  Simpan ke file
                  <span className="text-bone/50 block text-xs">
                    Cadangan kalau browser menghapus data
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    dispatch({ type: 'backToTitle' })
                  }}
                  className="hover:bg-bone/10 rounded-sm px-3 py-2 text-left"
                >
                  Kembali ke judul
                  <span className="text-bone/50 block text-xs">Progres tersimpan otomatis</span>
                </button>
              </div>
            )}
          </div>
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
