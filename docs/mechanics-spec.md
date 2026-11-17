# Spesifikasi Mekanik Inti — THE HOLLOW

> **Status:** v0.1, dikunci 17 November 2026\
> **Dasar:** [the-hollow-game-concept.md](the-hollow-game-concept.md) dan [the-hollow-audit.md](the-hollow-audit.md) §3\
> **Implementasi:** `src/engine/`

Tiga keputusan yang dikunci:

| Mekanik    | Keputusan                                        |
| ---------- | ------------------------------------------------ |
| Mata batin | **Tombol**: pemain memilih kapan memakainya      |
| Struktur   | **Hub harian**: pemain memilih lokasi per slot   |
| Jurnal     | **Aktif**: pemain menggabungkan dua catatan      |

Semua angka di bawah adalah nilai awal untuk playtest, bukan angka final.

------------------------------------------------------------------------

## 1. Mata batin (tombol)

Tombol "Mata Batin" muncul **hanya di scene yang punya lapisan penglihatan**. Di scene lain tombolnya tidak tampil, jadi kemunculannya sendiri sudah menjadi petunjuk kecil.

**Aturan:**

1. Satu kali pakai per scene.
2. Setiap pemakaian menambah `strain` (default **+8**, bisa diatur per scene).
3. Hasil penglihatan bergantung pada `strain` **sebelum** tombol ditekan:

   | Strain   | Hasil                                                                 |
   | -------- | --------------------------------------------------------------------- |
   | 0–69     | Lapisan **jernih**: informasi benar                                   |
   | 70–89    | Lapisan **terdistorsi** (kalau scene menyediakannya): bisa menyesatkan |
   | ≥ 90     | Tombol **terkunci**: Farez terlalu lelah                              |

4. Hasilnya deterministik (tanpa acak), supaya save/load dan test konsisten.
5. Penglihatan bisa menambah entri jurnal bertipe `vision`. Entri dari lapisan terdistorsi ditandai `unreliable` di data, tetapi **tidak** diberi label di UI. Pemain harus menyadarinya lewat kontradiksi.

**Alasan:** sesuai §6.1 konsep, mata batin memberi informasi tambahan yang bisa tidak lengkap atau menyesatkan, dan pemakaian berulang membuat Farez kelelahan.

------------------------------------------------------------------------

## 2. Hub harian

Setiap hari dibagi menjadi slot waktu. Di hub, pemain memilih lokasi; setiap kunjungan memakan satu slot.

**Slot:** `pagi` → `siang` → `sore` → `malam` → `larut`

**Aturan:**

1. Hari didefinisikan di konten: slot mana yang aktif, dan kunjungan mana yang tersedia per slot.
2. Sebuah kunjungan (lokasi × slot) bisa punya syarat (`requires`), misalnya butuh flag atau trust tertentu.
3. Setiap kunjungan hanya bisa dilakukan sekali.
4. Scene kunjungan berlangsung di slot kunjungannya. Waktu baru maju ke slot berikutnya saat pemain kembali ke hub.
5. Kalau slot habis, atau pemain memilih "akhiri hari", engine masuk ke scene penutup hari tersebut.
6. Scene penting cerita (misalnya hook Prolog) tetap bisa dipaksa lewat scene biasa, di luar hub.

**Alasan:** lokasi yang tidak dikunjungi berarti informasi yang terlewat. Ini mewujudkan pilar "sudut pandang terbatas" dan "pilihan bermakna" tanpa simulasi waktu penuh.

------------------------------------------------------------------------

## 3. Jurnal aktif

Jurnal menyimpan entri, dan pemain bisa **menggabungkan dua entri** untuk menemukan hubungan atau kontradiksi.

**Jenis entri:** `testimony` (kesaksian), `observation` (pengamatan), `vision` (mata batin), `evidence` (bukti), `question` (pertanyaan terbuka).

**Aturan deduksi:**

1. Konten mendefinisikan pasangan entri yang valid (`Deduction`). Urutan pasangan tidak berpengaruh.
2. Pasangan benar → efek dijalankan (misalnya tambah truth fragment, buka entri `question` baru, set flag yang membuka dialog).
3. Pasangan salah → `strain` **+2**, hanya sekali per pasangan yang sama (mencoba ulang pasangan yang sama tidak menambah strain lagi).
4. Deduksi yang sudah terpecahkan tidak bisa dipecahkan ulang.
5. Deduksi bisa punya syarat tambahan (`requires`).

**Alasan:** dokumen konsep menyebut "menemukan kontradiksi". Tanpa mekanik aktif, kontradiksi hanya dibaca, bukan ditemukan.

------------------------------------------------------------------------

## 4. Model state

Disimpan di `StoryState` (`src/engine/types.ts`):

- `stats`: `nayaTrust`, `argaTrust`, `sastroTrust`, `villageTrust`, `evidence`, `strain` (semua 0–100, otomatis di-clamp).
- `flags`, `fragments` (truth fragment), `journal`, `promisesKept`, `promisesBroken`.
- `time`: hari dan slot saat ini.
- `visitsDone`, `innerSightUsed`, `deductionsSolved`, `deductionsFailed`.
- `position`: scene dan beat saat ini.

Penamaan memakai camelCase. Nama snake_case di §10.2 dokumen konsep dianggap usang.

------------------------------------------------------------------------

## 5. Ending

Ending dievaluasi dengan **daftar berurutan**: ending pertama yang syaratnya terpenuhi yang dipakai, dan daftar wajib diakhiri ending cadangan tanpa syarat. Ini menyelesaikan masalah tumpang-tindih Ending A dan E (audit §2).

------------------------------------------------------------------------

## 6. Belum diputuskan

- Format penulisan konten: Ink vs data TypeScript (spike di vertical slice).
- Desain UI tombol mata batin dan layar jurnal.
- Angka final strain dan ambang trust (setelah bot random-walk dan playtest).
