# Audit Konsep & Stack: THE HOLLOW

> **Dokumen yang diaudit:** [the-hollow-game-concept.md](the-hollow-game-concept.md) (Draft 0.1)\
> **Tanggal audit:** 17 November 2026\
> **Cakupan:** naratif, game design, model data & engine, stack teknis, kebutuhan produksi

------------------------------------------------------------------------

## Ringkasan

Dari sisi tone dan etika, konsep ini sudah matang. Untuk draft 0.1, batas penggambaran militer dan folklor sudah dipikirkan dengan baik. Namun ada **tiga celah besar** yang perlu ditutup sebelum mulai menulis kode:

1. **Kebenaran misteri belum dikunci.** Apa yang terjadi 30 tahun lalu belum diputuskan, padahal petunjuk tidak bisa ditanam secara konsisten kalau penulisnya sendiri belum tahu jawabannya.
2. **Mekanik inti (mata batin, jurnal, waktu) belum didefinisikan sebagai gameplay.** Semuanya masih berupa konsep naratif.
3. **Model data di §14.3 tidak akan kuat** untuk 7 hari cerita bercabang.

**Stack: aman, dengan syarat.** Next.js dipakai sebagai situs statis (`output: 'export'`), fitur server tidak dipakai, dan aset berat tidak disajikan dari Vercel Hobby. Risiko jangka panjang terbesar justru **tidak ada di Next.js**, melainkan di save data (localStorage di Safari), audio di perangkat mobile, bandwidth aset, dan pipeline penulisan konten.

------------------------------------------------------------------------

## 1. Yang sudah kuat (pertahankan)

- Horor yang grounded, penampakan yang ditahan, siang hari tetap normal.
- Mata batin dibatasi: memberi informasi, bukan kekuatan.
- Pilihan tidak dilabeli baik/jahat, dan variabelnya tersembunyi dari pemain.
- Batas penggambaran militer dan folklor sudah jelas.
- Engine dipisah dari UI (§14.4). Ini keputusan arsitektur paling penting, dan sudah benar.

------------------------------------------------------------------------

## 2. Celah naratif

### 🔴 Kritis

- **Kebenaran penuh belum ada.** §8 baru menyebut "penghilangan informasi, pemindahan batas lahan, dan sebuah kesepakatan". Itu baru jenis kejadian, belum kejadiannya. Buat *story bible* rahasia yang menjawab:
  - siapa saja "sekelompok warga" itu;
  - apa persisnya isi kesepakatannya;
  - siapa yang hilang dan mengapa;
  - Sang Kosong sebenarnya apa (versi penulis).

  Setelah itu, tentukan bagian mana yang terungkap di tiap ending. Ambiguitas harus dipilih dengan sengaja, bukan muncul karena belum diputuskan. Twist "Sang Kosong bukan sedang memburu" hanya terasa adil kalau petunjuk yang mendukung dan menyangkalnya sudah ditanam sejak Prolog.
- **Status orang tua Farez dan Naya tidak disebut.** Padahal contoh pilihan di §10.3 memakai "suara ibu mereka". Apakah ibunya sudah meninggal, hilang, atau ada di rumah? Ini menentukan seluruh beban emosional cerita.
- **"Situasi yang tidak biasa" di awal cerita masih terlalu kabur.** Kabar apa persisnya yang dikirim Naya? Itu yang membuat pemain penasaran di menit pertama.

### 🟡 Penting

- **Syarat ending tumpang-tindih.** Ending A (The Sentinel) dan E (A Village Still Breathing) sama-sama butuh trust tinggi, sehingga pemain bisa memenuhi keduanya sekaligus. Dibutuhkan:
  - urutan prioritas saat ending dievaluasi;
  - satu pilihan final di Bab 5 sebagai kunci;
  - matriks ending (syarat × ending).
- **Ending C butuh Arga hadir secara fisik.** Masalahnya, §9 Bab 3 menyebut Arga bisa "datang *atau* berhasil dihubungi". Kalau Arga hanya berkomunikasi dari jauh, Ending C tidak masuk akal, sehingga perlu versi alternatif.
- **`strain` tidak berpengaruh ke gameplay** selain menjadi syarat Ending C. Kalau hanya angka tersembunyi, pemain tidak akan merasakannya. Beri efek yang terasa, misalnya:
  - narasi makin terdistorsi;
  - opsi dialog tertentu terkunci;
  - mata batin mulai memberi penglihatan palsu;
  - catatan jurnal Farez menjadi tidak akurat.
- **Hook Bab 2 ("ingatan Farez tidak akurat")** harus jelas merujuk ke ingatan yang mana, dan ingatan itu harus ditanam di Prolog atau Bab 1. Kalau tidak, twist-nya terasa curang.
- **Scope terlalu besar.** 7 hari, 5 bab, dan 5 ending bercabang kira-kira setara 80–150 ribu kata. Untuk satu orang, apalagi dalam rentang waktu magang, ini tidak realistis untuk rilis pertama. Saran: **Episode 1 cukup Prolog + Hari 1–2 dengan 2–3 ending.**

### 🟢 Minor

- **Judul "The Hollow" pasaran** (misalnya ada serial animasi Netflix dengan judul yang sama), sehingga sulit dicari. Cek itch.io dan Steam sebelum membuat logo. Subjudul atau nama "Wanasetra" justru lebih unik.
- **"Alas Gendhruwo" memakai nama makhluk folklor yang benar-benar ada**, padahal §6.3 menyebut Sang Kosong bukan berasal dari sistem kepercayaan tertentu. Ini bisa dimanfaatkan dengan sengaja: nama dari warga berbeda dengan kenyataannya.
- **Penamaan variabel tidak konsisten.** §10.2 memakai `naya_trust`, `promises_kept`, `critical_flags`, sedangkan §14.3 memakai camelCase dan tidak punya `promisesKept`. Pilih satu konvensi.
- **Bahasa Jawa:** tingkat ngoko/krama harus tepat, misalnya Farez kepada Mbah Sastro wajib memakai krama. Butuh penutur Jawa Timuran untuk review.
- **Peringatan konten** di awal game, dan hindari efek kedip yang berbahaya bagi pemain yang fotosensitif.

------------------------------------------------------------------------

## 3. Celah game design

Keputusan terbesar ada di pertanyaan #5 §17: **eksplorasi atau linear?** §5.3 ("waktu memengaruhi siapa yang ditemui") mengarah ke sistem waktu dan lokasi, sedangkan §11.2 hanya berisi scene linear. Jawabannya mengubah arsitektur engine secara total.

**Rekomendasi: hub harian.** Setiap hari ada 1–2 momen di peta desa. Pemain memilih 2–3 dari sekitar 5 lokasi, dan setiap pilihan memakan satu slot waktu. Lokasi yang tidak dikunjungi berarti informasinya terlewat. Dengan begitu, dua pilar (sudut pandang terbatas dan pilihan bermakna) terwujud tanpa perlu membuat simulasi waktu penuh.

| Mekanik | Status sekarang | Yang harus diputuskan |
|---|---|---|
| Mata batin | Masih konsep | Tombol yang dipakai pemain (menambah strain) atau otomatis? Apa yang berubah di layar? Bisa salah? |
| Jurnal | Daftar isi saja | Hanya catatan, atau aktif: menggabungkan 2 catatan untuk membuka pertanyaan baru? Tanpa mekanik ini, kontradiksi hanya *dibaca*, bukan *ditemukan* |
| Waktu/hari | Ritme harian | Maju per scene, per lokasi, atau dijadwal tetap? |
| Janji | Variabel saja | Kapan janji dibuat? Bagaimana pemain tahu janji itu bisa dilanggar? |
| Pilihan terkunci | Field `requires` | Disembunyikan, atau tampil abu-abu? Tampilan abu-abu mendorong pemain bermain ulang |

------------------------------------------------------------------------

## 4. Audit model data dan engine (§14.3)

1. **Satu `Scene` hanya punya satu `text`.** Artinya setiap baris dialog menjadi satu scene: ribuan objek dengan `nextSceneId` yang diisi manual. Struktur harus bertingkat (`Chapter → Scene → Line[]`), dan choice hanya muncul di titik cabang.
2. **`effects` hanya bisa mengubah angka.** Tidak bisa menyetel flag, menambah petunjuk, menambah entri jurnal, atau mencatat janji. Ganti menjadi daftar operasi:

   ``` ts
   type Effect =
     | { op: "add"; stat: StatKey; value: number } // clamp 0–100
     | { op: "setFlag"; flag: string }
     | { op: "addFragment"; id: string }
     | { op: "addJournal"; entryId: string }
     | { op: "keepPromise" | "breakPromise"; id: string };
   ```

3. **`requires` tidak bisa menyatakan angka atau negasi.** Ending butuh kondisi seperti `nayaTrust >= 60 AND NOT naya_lied`. Buat tipe `Condition` yang mendukung `all`, `any`, `not`, dan perbandingan angka.
4. **Belum ada slot untuk tampilan.** `speaker` masih string biasa; seharusnya ID karakter yang terhubung ke portrait dan ekspresi. Field `bgm`, `ambience`, `sfx`, `transition`, dan efek mata batin juga belum ada.
5. **`StoryState` masih kurang:** jurnal, janji, hari/jam, lokasi, riwayat pilihan, dan **history stack** untuk fitur "ulang dialog terakhir".
6. **Save hanya menyimpan `currentSceneId`.** Begitu ada scene yang diganti namanya saat update konten, save lama langsung rusak. Simpan juga checkpoint, `schemaVersion`, dan fungsi migrasi.
7. **Route `game/[chapter]/page.tsx` tidak cocok untuk game.** Pindah route membuat komponen di-mount ulang: audio terputus, state harus dibongkar-pasang, dan pemain bisa melompati bab hanya lewat URL. Cukup satu route `/play`, dengan state di store.

### Pertimbangkan Ink (inkjs)

Menulis dialog 7 hari sebagai objek TypeScript sangat melelahkan: panjang, ID mudah salah ketik, dan tidak ramah bagi penulis non-programmer. Ink (dipakai di *80 Days* dan *Heaven's Vault*) sudah punya variabel, kondisi, cabang, save state, dan editor Inky. Yang perlu dibuat hanyalah layer tampilan React yang membaca tag seperti `# bg: rumah_malam` atau `# sfx: ketukan`.

Kekurangannya: lokalisasi agak rumit, dan sintaksnya perlu dipelajari. **Uji di vertical slice:** tulis Prolog di Ink dan di TypeScript, lalu bandingkan.

### Wajib ada sejak awal (jangan menunggu Tahap 5)

- **Content linter:** memeriksa semua ID valid, tidak ada scene yang tidak bisa dicapai, tidak ada jalan buntu, dan semua aset yang dipanggil benar-benar ada.
- **Bot random-walk di Vitest:** simulasi ribuan playthrough acak. Ini cara paling murah untuk memastikan semua ending bisa dicapai dan untuk menyetel ambang angka trust.

------------------------------------------------------------------------

## 5. Audit stack: aman untuk jangka panjang?

### Next.js: aman, tetapi berlebihan

VN adalah state machine yang berjalan sepenuhnya di browser. SSR, Server Components, dan Server Actions tidak terpakai. Risiko jangka panjangnya:

- **Sering berganti versi besar:** dari 13 ke 16 dalam sekitar 3 tahun, dengan perilaku caching dan router yang beberapa kali berubah. Versi stabil saat audit ini adalah 16.x.
- **Celah keamanan di sisi server:** kalau dideploy dengan server, proyek ikut terdampak bug sekelas CVE-2025-29927 (bypass middleware) dan CVE-2025-55182 "React2Shell" (RCE di React Server Components). Kalau game-nya statis, risiko ini hilang.
- **Distribusi:** itch.io, Steam (lewat Tauri/Electron), dan Android (lewat Capacitor) membutuhkan build statis. Path absolut `/_next/...` sering bermasalah di itch.io.

**Aturan kalau tetap memakai Next.js:**

1. Pakai `output: 'export'` sejak hari pertama.
2. Folder `/engine` harus TypeScript murni, **tanpa import dari `next` atau `react`**. Jadi kalau nanti pindah framework, hanya pembungkusnya yang diganti.
3. Kalau belum terikat dengan Next.js, **Vite + React + TS** lebih cocok: build lebih ringan dan `base: './'` langsung berjalan di itch.io/Tauri.

### Tailwind: aman

Tailwind cocok untuk UI: dialog box, menu, jurnal. Namun efek mata batin butuh CSS/SVG filter atau canvas, dan **SVG filter animasi satu layar penuh berat di HP kelas bawah**. Sediakan mode "kurangi efek" dan hormati `prefers-reduced-motion`. Kalau butuh shader sungguhan, pakai PixiJS sebagai layer terpisah.

### Vercel: ada dua jebakan

- **Paket Hobby hanya untuk penggunaan non-komersial.** Begitu ada iklan, link donasi (Saweria/Trakteer), atau game dijual, secara aturan harus pindah ke Pro ($20/user/bulan). Putuskan model monetisasi sejak awal.
- **Kuota bandwidth Hobby 100 GB/bulan.** Kalau satu playthrough Episode 1 sekitar 100 MB, kira-kira 1.000 pemain per bulan sudah menghabiskan kuota. Solusinya: taruh aset berat di **Cloudflare R2** (egress gratis) atau di itch.io, dan pakai Vercel cukup untuk landing page.
- **Jangan pakai optimasi runtime `next/image`** untuk background karena ada kuota transformasi. Optimasi gambar saat build dengan script `sharp`, lalu set `unoptimized`.

### localStorage: risiko terbesar yang belum disadari dokumen konsep

- **Safari/iOS bisa menghapus storage** setelah 7 hari pemakaian Safari tanpa interaksi dengan situs. Laporan tentang perilaku pastinya masih simpang siur, tetapi komunitas game web (termasuk yang di itch.io) sudah mengalami save yang hilang. Game 7 hari yang dimainkan bertahap sangat rentan.
- **Mitigasi murah:**
  - tombol export/import save (file `.json` atau kode teks);
  - panggil `navigator.storage.persist()`;
  - dukung instalasi sebagai PWA.
- **Kalau dihosting di itch.io,** game HTML5 di sana biasanya berbagi domain. Beri awalan pada key (`hollow:save:slot1`).

### Audio: banyak jebakan di web

- **Autoplay diblokir** sampai ada interaksi pertama, sehingga wajib ada layar "Klik untuk mulai". Layar ini sekaligus bisa dipakai untuk saran memakai headphone dan peringatan konten.
- **Volume elemen `<audio>` di iOS Safari tidak bisa diubah lewat kode.** Kontrol volume terpisah untuk musik, ambience, dan SFX (§11.4) harus lewat Web Audio API. Pakai **Howler.js**.
- **`<audio loop>` menyisakan jeda klik** di setiap pengulangan. Untuk ambience yang mulus, pakai Web Audio buffer.
- **Web Audio men-decode audio ke RAM:** 1 menit stereo kira-kira 20 MB. Musik panjang bisa membuat HP Android kelas bawah crash. Polanya: SFX memakai Web Audio, musik di-stream (`html5: true` di Howler).
- **Format paling aman AAC atau MP3.** OGG bermasalah di iOS versi lama.
- **Beri caption untuk suara penting** (`[ketukan di jendela]`). Dokumen konsep sendiri menyebut informasi penting jangan hanya lewat audio.

### Konteks pemain Indonesia

Sebagian besar pemain memakai HP, kuota data, dan perangkat kelas menengah ke bawah. Konsekuensinya:

- aset dimuat per bab;
- yang di-preload cukup scene berikutnya;
- unduhan awal di bawah 10 MB;
- tes di HP Android RAM 3–4 GB sungguhan, bukan hanya di DevTools.

------------------------------------------------------------------------

## 6. Rekomendasi stack

| Lapisan | Pilihan |
|---|---|
| Framework | Next.js 16 `output: 'export'`, atau Vite + React |
| Bahasa | TypeScript mode strict |
| Narasi | Ink (inkjs), atau engine sendiri + konten JSON yang divalidasi Zod |
| State | Zustand + save dengan `schemaVersion` |
| UI | Tailwind + Motion untuk transisi |
| Audio | Howler.js |
| Efek visual | CSS/SVG filter; PixiJS kalau butuh shader |
| Test | Vitest (engine + bot random-walk), Playwright (smoke test) |
| Aset | Script build `sharp` + ffmpeg; aset berat di R2 atau itch.io |
| Hosting | Vercel Hobby untuk prototipe; tinjau ulang sebelum monetisasi |
| Repo | Git + GitHub; file sumber (PSD/WAV) di luar repo atau memakai Git LFS |

Folder proyek ini **belum menjadi git repo**. Jalankan `git init` sebelum menulis kode pertama.

------------------------------------------------------------------------

## 7. Kebutuhan di luar kode

### Dokumen

- Story bible rahasia + timeline detail kejadian 30 tahun lalu.
- Peta desa lengkap dengan waktu tempuh antarlokasi.
- Flowchart cabang (Twine atau draw.io) + matriks ending.
- Daftar ekspresi setiap karakter.
- Daftar aset beserta jumlahnya (ini yang menentukan budget).

### Estimasi aset Episode 1

- 25–40 background (sekitar 10 lokasi × varian siang/sore/malam/mata batin).
- 6–8 karakter, masing-masing 4–8 ekspresi.
- 5–10 CG.
- 6–10 loop ambience, 3–6 lagu, 30–60 SFX.

### Catatan aset

- **Foto desa asli yang diolah** (§11.1) murah dan sangat cocok untuk horor grounded. Minta izin terlebih dahulu, dan hindari landmark yang membuat desa aslinya bisa dikenali.
- **Kalau memakai AI art,** Steam mewajibkan disclosure, dan komunitas VN sensitif terhadap hal ini. Putuskan dengan sadar sejak awal.
- **Rekam ambience langsung di desa.** Murah, dan menjadi nilai jual besar.
- **Catat lisensi setiap aset** di `CREDITS.md`.

### Orang

- Penutur bahasa Jawa Timuran.
- Playtester selain penulis.
- Kebijakan privasi kalau mengumpulkan data analytics (UU PDP No. 27/2022).

------------------------------------------------------------------------

## 8. Saran jawaban untuk pertanyaan di §17

| # | Pertanyaan | Saran |
|---|---|---|
| 1 | Status Farez | **Cuti 7 hari.** Langsung menjadi hitung mundur alami untuk struktur 7 hari |
| 2 | Arga datang atau remote | Awalnya remote (telepon dengan sinyal putus-putus sudah horor tersendiri), baru bisa datang fisik di Bab 3. Ending C butuh versi alternatif |
| 3 | Sang Kosong satu entitas? | Di story bible harus pasti; di dalam game dibiarkan ambigu |
| 4 | Pemakaian bahasa Jawa | Pada tokoh tertentu saja (Mbah Sastro, warga tua), dengan konteks yang cukup agar tetap terbaca |
| 5 | Eksplorasi atau slide | Hub harian |
| 6 | Jumlah ending Episode 1 | 2–3 |
| 7 | Satu cerita atau episodik | Episodik |

Keputusan tambahan yang belum ada di §17: model monetisasi, tempat distribusi, dan voice acting.

------------------------------------------------------------------------

## 9. Urutan kerja yang disarankan

1. Kunci story bible, jawab pertanyaan §17, dan putuskan mekanik inti.
2. Tulis Prolog lengkap dalam bentuk teks dulu, tanpa aset, lalu minta 2–3 orang membacanya.
3. Uji teknis 2–3 hari: Ink vs engine sendiri, audio di iPhone dan Android kelas bawah, serta export/import save.
4. Buat vertical slice dengan aset placeholder.
5. Baru masuk produksi aset.

------------------------------------------------------------------------

## Sumber

- [Vercel Hobby plan docs](https://vercel.com/docs/plans/hobby)
- [Vercel limits](https://vercel.com/docs/concepts/limits)
- [Vercel fair use policy](https://vercel.com/docs/v2/platform/fair-use-policy)
- [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js release notes (Releasebot)](https://releasebot.io/updates/vercel/next-js)
- [intfiction.org: localStorage clears on mobile browsers](https://intfiction.org/t/local-storage-clears-on-mobile-browsers-deleting-saved-games/74647)
- [WebKit: Full Third-Party Cookie Blocking and More](https://webkit.org/?p=10218)
- [WebKit Bugzilla #222248](https://bugs.webkit.org/show_bug.cgi?id=222248)

Angka paket Vercel dan perilaku penyimpanan Safari bisa berubah. Cek ulang ke sumber resmi sebelum mengambil keputusan final.
