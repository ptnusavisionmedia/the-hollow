import { useRef, useState } from 'react'
import { loadSave, type Session, type StoryContent } from '@/engine'
import { clearAutosave, readAutosave, readSaveFile, requestPersistentStorage } from './saveStorage'

type Props = {
  content: StoryContent
  onStart: () => void
  onLoad: (session: Session) => void
}

const SLOT_LABEL = { pagi: 'pagi', siang: 'siang', sore: 'sore', malam: 'malam', larut: 'larut' }

export function TitleScreen({ content, onStart, onLoad }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [confirmingNew, setConfirmingNew] = useState(false)

  const raw = readAutosave()
  const autosave = raw ? loadSave(content, raw) : null
  const canContinue = autosave?.ok === true

  const begin = (action: () => void) => {
    void requestPersistentStorage()
    action()
  }

  const startNew = () => {
    if (canContinue && !confirmingNew) {
      setConfirmingNew(true)
      return
    }
    clearAutosave()
    begin(onStart)
  }

  const importFile = async (file: File | undefined) => {
    if (!file) return
    try {
      const result = loadSave(content, await readSaveFile(file))
      if (result.ok) begin(() => onLoad(result.session))
      else setMessage(result.reason)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'File tidak bisa dibaca.')
    } finally {
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const buttonClass =
    'border-bone/40 hover:border-bone w-56 rounded-sm border px-8 py-3 font-serif text-lg'

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl tracking-[0.3em] sm:text-6xl">THE HOLLOW</h1>
        <p className="text-moss text-sm tracking-widest uppercase">Desa yang Terlupakan</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        {autosave?.ok && (
          <button
            type="button"
            autoFocus
            onClick={() => begin(() => onLoad(autosave.session))}
            className={buttonClass}
          >
            Lanjutkan
            <span className="text-bone/50 block font-sans text-xs">
              Hari {autosave.session.state.time.day}, {SLOT_LABEL[autosave.session.state.time.slot]}
            </span>
          </button>
        )}

        {confirmingNew ? (
          <div className="flex flex-col items-center gap-2" role="alertdialog" aria-live="polite">
            <p className="text-bone/80 text-sm">Progres yang tersimpan akan ditimpa. Lanjut?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={startNew}
                className="border-bone/40 rounded-sm border px-4 py-1"
              >
                Ya, mulai baru
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmingNew(false)}
                className="border-bone/20 rounded-sm border px-4 py-1"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <button type="button" autoFocus={!canContinue} onClick={startNew} className={buttonClass}>
            {canContinue ? 'Mulai baru' : 'Mulai'}
          </button>
        )}

        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="text-bone/70 hover:text-bone text-sm underline"
        >
          Muat dari file save
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) => void importFile(event.target.files?.[0])}
        />
      </div>

      {message && (
        <p role="alert" className="text-sm text-red-300">
          {message}
        </p>
      )}
      {autosave && !autosave.ok && (
        <p className="text-bone/50 max-w-sm text-xs">
          Save otomatis tidak bisa dimuat: {autosave.reason}
        </p>
      )}

      <p className="text-bone/40 max-w-sm text-xs">
        Build demo. Mengandung tema orang hilang dan tekanan psikologis. Disarankan memakai
        headphone.
      </p>
    </main>
  )
}
