# THE HOLLOW: Desa yang Terlupakan

Visual novel horor supranatural berbasis web, berlatar desa fiktif Wanasetra di Jawa Timur.

- Konsep naratif & game design: [docs/the-hollow-game-concept.md](docs/the-hollow-game-concept.md)
- Audit konsep & stack: [docs/the-hollow-audit.md](docs/the-hollow-audit.md)

> **Repo ini public.** Story bible rahasia, naskah yang berisi spoiler, dan aset mentah (PSD, WAV, dll.)
> disimpan di folder `private/` atau `assets-raw/` yang tidak di-commit.

## Stack

Vite · React · TypeScript · Tailwind CSS · Vitest · oxlint · Prettier

Build bersifat statis dengan path relatif (`base: './'`), sehingga bisa di-host di Vercel, itch.io,
atau dibungkus Tauri/Capacitor.

## Menjalankan

Butuh Node 24+ (lihat `.nvmrc`) dan npm.

```bash
npm install
npm run dev
```

| Script            | Fungsi                                  |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Dev server                              |
| `npm run build`   | Type-check + build produksi ke `dist/`  |
| `npm run preview` | Menjalankan hasil build                 |
| `npm run test`    | Unit test (Vitest)                      |
| `npm run lint`    | Lint (oxlint)                           |
| `npm run format`  | Format kode (Prettier)                  |
| `npm run check`   | Type-check + lint + format check + test |

## Struktur

```text
src/
├── engine/       # Aturan cerita: TypeScript murni, DILARANG import React/komponen (dijaga oxlint)
├── content/      # Data cerita (scene, karakter, ending)
├── components/
│   ├── game/     # Tampilan game (dialog, pilihan, jurnal)
│   └── ui/       # Komponen UI umum
├── styles/       # CSS global & token Tailwind
├── App.tsx
└── main.tsx
public/           # Aset statis yang sudah dioptimasi (WebP, M4A)
docs/             # Dokumen desain
```

## Lisensi

Belum ditentukan. Sampai ada file `LICENSE`, seluruh kode, cerita, dan aset dilindungi hak cipta
(all rights reserved).
