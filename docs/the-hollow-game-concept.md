# THE HOLLOW: Desa yang Terlupakan

## Dokumen Konsep Naratif & Game Design --- Draft 0.1

> **Genre:** Occult Military Horror / Psychological Horror / Narrative
> Mystery\
> **Format:** Visual novel / slide-novel interaktif\
> **Platform target:** Web\
> **Stack rencana:** Next.js, TypeScript, Tailwind CSS, Vercel\
> **Status:** Konsep awal --- nama, kronologi, dan detail dunia masih
> dapat diubah

------------------------------------------------------------------------

## 1. Ringkasan Proyek

**THE HOLLOW: Desa yang Terlupakan** adalah game naratif horor
supranatural berlatar desa fiktif di Jawa Timur. Pemain mengikuti Farez
Aditya Pranata, seorang operator militer yang pulang ke kampung
halamannya setelah menerima kabar bahwa keluarganya dan sejumlah warga
berada dalam situasi yang tidak biasa.

Farez memiliki kemampuan yang disebut *mata batin*: ia dapat menangkap
keberadaan atau jejak fenomena yang tidak selalu terlihat oleh orang
lain. Kemampuan tersebut bukan kekuatan super yang bisa menyelesaikan
masalah. Ia hanya memberinya informasi tambahan---yang bisa tidak
lengkap, menyesatkan, atau memiliki konsekuensi psikologis.

Latar belakang militer Farez memengaruhi cara ia mengamati, mencatat,
dan mengambil keputusan. Namun, game ini tidak menjadikan senjata atau
keahlian tempur sebagai solusi universal. Ketegangan berasal dari
keterbatasan informasi, risiko salah menafsirkan kejadian, hubungan
antarmanusia, dan kenyataan bahwa sebagian misteri tidak bisa dipaksa
tunduk pada logika operasional.

**Pilar pengalaman pemain:**

1.  **Horror yang grounded:** desa terasa seperti tempat nyata yang
    memiliki rutinitas, infrastruktur, kebiasaan, dan masalah sosial.
2.  **Sudut pandang terbatas:** pemain hanya mengetahui apa yang Farez
    ketahui, lihat, dengar, atau simpulkan.
3.  **Pilihan bermakna:** keputusan mengubah kepercayaan karakter,
    informasi yang ditemukan, kondisi desa, dan ending.
4.  **Kontras dua dunia:** prosedur dan pola pikir militer berhadapan
    dengan fenomena yang tidak sepenuhnya dapat dijelaskan.
5.  **Horor lokal tanpa eksploitasi:** folklor Jawa menjadi inspirasi
    atmosfer dan sejarah fiktif, bukan klaim bahwa tradisi atau kelompok
    nyata adalah sumber kejahatan.

------------------------------------------------------------------------

## 2. Tema dan Pesan

### 2.1 Tema utama

**Tidak semua hal dapat dikendalikan, bahkan oleh seseorang yang
terlatih untuk menghadapi bahaya.**

Farez terbiasa mengandalkan disiplin, latihan, dan informasi.
Kepulangannya memaksanya menghadapi sesuatu yang tidak bisa ia
klasifikasikan dengan mudah. Perjalanan karakter bukan tentang menjadi
lebih kuat, melainkan belajar kapan harus bertindak, kapan harus
mendengarkan, dan kapan harus menerima keterbatasan.

### 2.2 Tema pendukung

-   **Rumah dan rasa memiliki:** apakah rumah tetap menjadi rumah ketika
    orang yang kita tinggalkan telah berubah?
-   **Ingatan kolektif:** bagaimana sebuah komunitas menyimpan,
    menyembunyikan, atau mengubah kisah masa lalunya?
-   **Kepercayaan dan bukti:** bagaimana manusia mengambil keputusan
    ketika bukti tidak lengkap?
-   **Trauma dan tanggung jawab:** seseorang bisa tampak tenang
    sekaligus sedang kewalahan.
-   **Tradisi dan modernitas:** pengetahuan lokal dan metode modern
    dapat berdampingan, saling mengoreksi, dan sama-sama memiliki
    keterbatasan.
-   **Keberanian:** keberanian bukan berarti tidak takut atau selalu
    maju; kadang berarti meminta bantuan dan mengakui kesalahan.

### 2.3 Hal yang bukan pesan cerita

-   Cerita tidak menyatakan bahwa semua fenomena supranatural terbukti
    secara ilmiah.
-   Cerita tidak menggambarkan doa atau tradisi sebagai tombol ajaib
    untuk mengalahkan makhluk.
-   Cerita tidak menyatakan bahwa kekerasan adalah jawaban terbaik.
-   Cerita tidak menjadikan masyarakat desa, agama, atau budaya tertentu
    sebagai karikatur.

------------------------------------------------------------------------

## 3. Identitas Genre dan Referensi Nada

**Genre utama:** supernatural horror dan psychological mystery.\
**Genre pendamping:** military thriller dan drama keluarga.

Karya seperti *S.T.A.L.K.E.R.*, *SCP Foundation*, dan *The Medium* dapat
menjadi referensi umum untuk rasa misteri, lingkungan yang mengganggu,
serta ketidakpastian persepsi. THE HOLLOW tetap perlu memiliki identitas
sendiri melalui latar pedesaan Jawa Timur, hubungan keluarga, dan detail
keseharian Indonesia.

### Nada cerita

-   Tegang, sunyi, dan observasional.
-   Dialog natural; humor tipis muncul dari hubungan karakter, bukan
    untuk merusak setiap momen horor.
-   Kekerasan tidak perlu eksplisit. Dampak kejadian lebih penting
    daripada detail grafis.
-   Fenomena aneh sebaiknya jarang dan spesifik. Terlalu banyak
    penampakan akan mengurangi dampaknya.
-   Siang hari tetap memiliki kehidupan normal. Kontras dengan malam
    membuat perubahan suasana terasa lebih kuat.

------------------------------------------------------------------------

## 4. Latar Dunia

### 4.1 Desa Wanasetra

Wanasetra adalah desa fiktif di sebuah kabupaten fiktif di pedalaman
Jawa Timur. Desa ini berada di kawasan peralihan antara persawahan,
kebun, hutan jati, dan perbukitan rendah. Lokasinya cukup jauh dari
pusat kabupaten, tetapi bukan wilayah yang sepenuhnya terisolasi.

Desa memiliki kira-kira 600 penduduk sebelum rangkaian kejadian utama.
Angka ini merupakan keputusan worldbuilding, bukan data desa nyata.

**Karakter geografis:**

-   Jalan kabupaten menghubungkan desa dengan pasar dan pusat kecamatan.
-   Jalan desa lebih sempit dan memiliki beberapa bagian yang rusak atau
    berlubang.
-   Rumah-rumah berkumpul di sekitar jalan utama; beberapa keluarga
    tinggal lebih jauh dekat kebun.
-   Bagian utara berbatasan dengan kawasan hutan dan lahan perkebunan.
-   Aliran sungai kecil atau saluran irigasi melewati sebagian lahan
    pertanian.
-   Hujan musiman dapat membuat jalan tanah licin dan beberapa jalur
    sulit dilalui.

**Fasilitas yang masuk akal:**

-   Balai desa dan kantor kepala desa.
-   Sekolah dasar.
-   Masjid dan musala.
-   Puskesmas pembantu atau praktik bidan.
-   Warung kelontong, bengkel kecil, dan pasar mingguan.
-   Pos ronda.
-   Jaringan listrik yang tersedia, dengan kemungkinan gangguan lokal.
-   Sinyal seluler yang tidak merata, terutama di area lembah atau
    hutan.

Jangan membuat seluruh desa gelap total tanpa alasan. Lampu rumah, lampu
jalan, genset, dan ponsel tetap ada. Ketidakteraturan kecil---lampu yang
mati hanya di satu ruas, sinyal yang hilang di lokasi tertentu, atau
listrik yang kembali normal ketika warga berkumpul---lebih meyakinkan
daripada pemadaman total yang terus-menerus.

### 4.2 Area penting

  -----------------------------------------------------------------------
  Lokasi                  Fungsi naratif          Kesan
  ----------------------- ----------------------- -----------------------
  Rumah keluarga Farez    Basis emosional dan     Akrab, kemudian terasa
                          tempat pemain kembali   asing

  Rumah Mbah Sastro       Sumber sejarah lisan    Hangat tetapi menyimpan
                                                  rahasia

  Balai desa              Informasi resmi dan     Formal, defensif
                          konflik warga           

  Warung Bu Lastri        Rumor, kabar, dan       Ramai pada siang hari
                          kehidupan sehari-hari   

  Pos ronda               Ruang komunal dan saksi Akrab, sunyi setelah
                          malam                   larut

  Puskesmas pembantu      Dampak kejadian pada    Praktis dan manusiawi
                          warga                   

  Sekolah dasar           Memori masa kecil Farez Nostalgia yang
                                                  terganggu

  Jalan kebun utara       Peralihan menuju area   Sepi, terbuka, sulit
                          misteri                 dibaca

  Alas Gendhruwo          Area fenomena utama     Padat, lembap,
                                                  membingungkan

  Bangunan peninggalan    Petunjuk sejarah        Lapuk, bukan otomatis
  lama                                            angker
  -----------------------------------------------------------------------

### 4.3 Detail keseharian untuk membangun realisme

Gunakan detail kecil secara selektif:

-   Suara motor lewat sebelum subuh.
-   Pengumuman masjid atau suara pengeras yang terdengar dari kejauhan.
-   Warga menyapu halaman, menjemur pakaian, memberi makan ternak, atau
    menyiapkan dagangan.
-   Warung yang tutup lebih awal karena pemiliknya takut pulang
    sendirian.
-   Percakapan warga yang berhenti ketika orang luar datang.
-   Jalan yang tetap ramai pada jam berangkat sekolah dan pulang kerja.
-   Warga yang lebih percaya kabar dari tetangga daripada pengumuman
    resmi.
-   Perbedaan pendapat antargenerasi tentang penyebab kejadian.
-   Baterai ponsel yang menipis, charger yang dipinjam, dan pesan yang
    terlambat terkirim.
-   Hujan, lumpur, kelembapan, nyamuk, suara serangga, serta bau tanah
    basah.

Hindari menjadikan setiap warga langsung percaya pada hantu. Sebagian
akan menganggap kejadian sebagai kriminalitas, konflik keluarga, hewan
liar, masalah listrik, atau rumor. Reaksi yang beragam membuat dunia
terasa hidup.

------------------------------------------------------------------------

## 5. Setting Waktu dan Kronologi

### 5.1 Waktu cerita

Cerita utama berlangsung selama sekitar tujuh hari pada akhir musim
hujan, ketika hujan sore dan malam masih sering turun. Tahun dapat
ditetapkan saat produksi; untuk draft ini, gunakan masa kontemporer
tanpa menyebut teknologi atau peristiwa aktual tertentu.

Pilih tanggal final setelah riset cuaca dan kalender lokal dilakukan.
Hindari menyebut kejadian nyata atau institusi aktual secara keliru.

### 5.2 Kronologi latar

  -----------------------------------------------------------------------
  Waktu relatif                       Peristiwa
  ----------------------------------- -----------------------------------
  30 tahun sebelum cerita             Serangkaian orang hilang di sekitar
                                      kawasan hutan; catatan desa tidak
                                      lengkap

  15 tahun sebelum cerita             Sebagian keluarga pindah; kisah
                                      lama berubah menjadi pantangan

  Masa kecil Farez                    Farez mengalami pengalaman yang
                                      oleh keluarganya disebut mata batin

  Beberapa tahun sebelum cerita       Farez meninggalkan desa untuk
                                      menjalani karier militer

  6 bulan sebelum cerita              Warga mulai melaporkan suara dan
                                      penampakan

  2 minggu sebelum cerita             Beberapa warga sulit dihubungi;
                                      aktivitas malam berkurang

  Hari 1                              Farez pulang ke Wanasetra

  Hari 2--3                           Ia mengumpulkan kesaksian dan
                                      menemukan kontradiksi

  Hari 4--5                           Hubungan keluarga dan kepercayaan
                                      warga diuji

  Hari 6                              Sejarah desa mulai terungkap

  Hari 7                              Keputusan akhir dan konsekuensi
  -----------------------------------------------------------------------

### 5.3 Ritme harian

Jam bukan hanya dekorasi. Waktu memengaruhi siapa yang ditemui, lokasi
yang ramai, dan suasana.

-   **05.00--08.00:** aktivitas rumah tangga, sekolah, pasar, dan
    pekerjaan.
-   **08.00--15.00:** desa tampak normal; kesempatan untuk berbicara
    dengan warga.
-   **15.00--18.00:** hujan sore, warga pulang, cahaya mulai berubah.
-   **18.00--21.00:** aktivitas komunal berkurang; rumah mulai tertutup.
-   **21.00--00.00:** desa semakin sunyi, tetapi tidak sepenuhnya tanpa
    suara.
-   **00.00--04.00:** waktu paling tidak nyaman bagi Farez; fenomena
    lebih sering muncul.

Jangan membuat semua kejadian terjadi tepat tengah malam. Peristiwa
kecil pada siang bolong dapat terasa lebih mengganggu karena melanggar
ekspektasi pemain.

------------------------------------------------------------------------

## 6. Fenomena Supranatural

### 6.1 Mata batin Farez

Mata batin bukan kemampuan untuk mengetahui kebenaran secara otomatis.
Ia adalah cara Farez menangkap lapisan informasi yang tidak tersedia
bagi orang lain.

**Batasan:**

1.  Penglihatan tidak selalu jelas.
2.  Farez tidak dapat memilih seluruh hal yang akan terlihat.
3.  Fenomena dapat meniru atau mengaburkan informasi.
4.  Penggunaan berulang membuat Farez kelelahan dan sulit
    berkonsentrasi.
5.  Penglihatan tidak memberikan jawaban tentang niat atau asal-usul
    entitas.
6.  Pemain tetap harus membandingkan penglihatan dengan kesaksian dan
    bukti lain.

### 6.2 Hukum fenomena

  -----------------------------------------------------------------------
  Hukum                               Aturan cerita
  ----------------------------------- -----------------------------------
  Persepsi                            Dua orang dapat menyaksikan
                                      kejadian yang sama secara berbeda

  Identitas                           Suara atau ingatan seseorang dapat
                                      ditiru

  Batas                               Beberapa fenomena terikat pada
                                      tempat atau kondisi tertentu

  Kesaksian                           Melihat sesuatu tidak berarti
                                      memahami penyebabnya

  Konsekuensi                         Kontak berulang dapat memengaruhi
                                      kondisi Farez dan hubungan
                                      sosialnya
  -----------------------------------------------------------------------

### 6.3 Entitas

**Sang Kosong --- The Hollow One**

Entitas utama yang tidak memiliki bentuk tetap. Ia tidak perlu dipahami
sebagai hantu manusia atau makhluk dari sistem kepercayaan tertentu.
Dalam dunia cerita, penduduk memiliki berbagai istilah dan tafsir untuk
menjelaskan keberadaannya.

Kemampuan naratif:

-   Meniru suara orang yang dikenal.
-   Membuat jarak dan orientasi terasa tidak konsisten.
-   Memunculkan fragmen ingatan.
-   Terlihat berbeda bagi saksi yang berbeda.
-   Meninggalkan bukti yang saling bertentangan.

**The Mimic**

Fenomena peniruan suara. Tidak selalu berarti ada makhluk fisik yang
berdiri di dekat sumber suara.

**The Watcher**

Sosok yang hanya terlihat sekilas di batas pandangan. Tidak jelas apakah
ia bagian dari Sang Kosong atau fenomena berbeda.

**The Stalker**

Kesan bahwa seseorang sedang diikuti. Kehadirannya lebih sering
ditunjukkan melalui perubahan lingkungan daripada penampakan langsung.

Catatan: klasifikasi tersebut adalah istilah kerja yang digunakan Farez
dan karakter lain. Jangan langsung menjadikannya taksonomi objektif yang
pasti benar.

------------------------------------------------------------------------

## 7. Tokoh dan Penokohan

### 7.1 Farez Aditya Pranata

-   **Usia:** 27 tahun.
-   **Peran:** protagonis.
-   **Pekerjaan:** operator pada unit khusus militer fiktif.
-   **Asal:** Wanasetra.
-   **Kemampuan:** mata batin.

**Kepribadian:** observatif, hemat bicara, pragmatis, memiliki humor
kering, dan cenderung menahan emosi.

**Kekuatan:** disiplin, mampu mengamati detail, terbiasa bekerja dalam
tekanan, dan peduli pada keluarga.

**Kelemahan:** sulit meminta bantuan, terlalu ingin mengendalikan
situasi, dan dapat mengabaikan kebutuhan emosional orang lain.

**Keinginan luar:** memastikan keluarganya aman dan mengetahui apa yang
terjadi di desa.

**Kebutuhan batin:** menerima bahwa ia tidak dapat mengendalikan
semuanya dan bahwa kepercayaan perlu dibangun bersama orang lain.

**Arc karakter:** dari kontrol menuju penerimaan; dari menyelesaikan
semuanya sendiri menuju keputusan yang mempertimbangkan orang lain.

### 7.2 Naya Pranata

-   **Usia:** 22 tahun.
-   **Peran:** adik Farez.
-   **Pekerjaan:** mahasiswi keperawatan.

**Kepribadian:** ekspresif, spontan, peduli, dan lebih terbuka terhadap
pengalaman yang tidak biasa.

**Kekuatan:** mudah membangun hubungan, memahami kebutuhan warga, dan
berani mempertanyakan sikap kakaknya.

**Kelemahan:** menyimpan kekecewaan, kadang bertindak sebelum memperoleh
informasi lengkap.

**Konflik:** merasa Farez meninggalkan keluarga terlalu lama. Ia ingin
dilibatkan dalam keputusan yang menyangkut keselamatannya.

**Arc:** dari merasa ditinggalkan menjadi mampu menyampaikan
kebutuhannya dan mengambil keputusan sendiri.

### 7.3 Sastro Wiryono (Mbah Sastro)

-   **Usia:** 72 tahun.
-   **Peran:** tetua desa dan penjaga ingatan lisan.
-   **Latar:** mengenal sejarah keluarga dan pantangan setempat.

**Kepribadian:** sabar, hemat kata, penuh perumpamaan, dan tidak suka
menghakimi.

**Kekuatan:** mengenal sejarah lokal dan hubungan antarkeluarga.

**Kelemahan:** terlalu lama menyimpan rahasia dan menganggap diam
sebagai bentuk perlindungan.

**Konflik:** rasa bersalah atas keputusan masa lalu.

**Arc:** dari menjaga rahasia seorang diri menjadi berani mengungkapkan
kebenaran, termasuk bagian yang membuat dirinya terlihat bersalah.

### 7.4 Arga Mahendra

-   **Usia:** 28 tahun.
-   **Peran:** rekan Farez.
-   **Pekerjaan:** perwira pada unit fiktif yang sama.

**Kepribadian:** komunikatif, rasional, loyal, dan memiliki humor
spontan.

**Kekuatan:** mampu menjadi penyeimbang, terbuka pada bukti, dan tidak
malu mengakui ketidaktahuan.

**Kelemahan:** pada awalnya terlalu mengandalkan penjelasan yang sudah
dikenalnya.

**Konflik:** ia ingin membantu Farez, tetapi tidak selalu memahami apa
yang dialami temannya.

**Arc:** dari skeptisisme menuju keterbukaan yang tetap kritis. Ia tidak
harus berubah menjadi orang yang langsung percaya semua cerita mistis.

### 7.5 Wiratno (Pak Wirat)

-   **Usia:** 54 tahun.
-   **Peran:** kepala desa.
-   **Kepribadian:** diplomatis, berhati-hati, menjaga citra desa, dan
    sulit dibaca.

**Kekuatan:** memahami administrasi dan jaringan sosial desa.

**Kelemahan:** menyembunyikan informasi demi menjaga ketertiban.

**Konflik:** ia percaya bahwa pengungkapan seluruh masa lalu dapat
memecah masyarakat.

### 7.6 Tokoh warga tambahan

**Bu Lastri, pemilik warung (sekitar 46 tahun):** sumber rumor dan
pengamat kehidupan warga. Tidak mengetahui seluruh misteri, tetapi
mengingat siapa yang datang dan pergi.

**Pak Darto, penjaga sekolah (sekitar 59 tahun):** mengenal masa kecil
Farez dan menyimpan catatan lama sekolah.

**Bidan Rukmini (sekitar 39 tahun):** berusaha menangani dampak kejadian
pada warga dengan sumber daya terbatas. Menjadi suara praktis dan
manusiawi.

Tokoh tambahan harus memiliki tujuan dan kehidupan sendiri. Mereka bukan
hanya mesin pemberi petunjuk.

------------------------------------------------------------------------

## 8. Antagonis dan Misteri Inti

Sang Kosong telah dikaitkan dengan kawasan hutan jauh sebelum desa
modern terbentuk. Tidak ada satu pun sumber yang memberikan penjelasan
lengkap. Cerita warga, catatan lama, dan pengalaman Farez saling
bertentangan.

### Kebenaran yang direncanakan

Tiga puluh tahun lalu, sekelompok warga melakukan keputusan yang mereka
anggap perlu untuk melindungi desa. Peristiwa itu melibatkan
penghilangan informasi, pemindahan batas lahan, dan sebuah kesepakatan
yang kemudian ditafsirkan berbeda oleh generasi berikutnya.

Mbah Sastro mengetahui sebagian peristiwa tersebut. Pak Wirat mewarisi
versi resmi yang sudah disederhanakan. Sang Kosong seolah-olah mengulang
fragmen kejadian lama, tetapi tidak jelas apakah ia sedang
memperingatkan, meniru, atau sekadar mengulang.

**Twist utama yang disarankan:** Sang Kosong mungkin bukan sedang
memburu warga. Fenomena yang tampak seperti serangan bisa jadi merupakan
efek dari sesuatu yang selama ini ditutupi. Namun, jangan memastikan
twist ini terlalu dini. Berikan bukti yang mendukung dan menyangkalnya.

------------------------------------------------------------------------

## 9. Struktur Alur Utama

### Prolog --- Perjalanan Pulang

Farez menerima kabar dari Naya. Ia pulang ke Wanasetra setelah lama
tidak mengunjungi rumah. Perjalanan memperkenalkan lanskap, rutinitas,
dan perubahan desa.

**Tujuan pemain:** mengenal Farez, Naya, dan rumah keluarga.

**Hook akhir:** suara seseorang memanggil Farez dari luar rumah, padahal
orang yang menggunakan suara itu sedang berada di dalam.

### Bab 1 --- Desa yang Berubah

Farez mengunjungi beberapa lokasi dan berbicara dengan warga. Setiap
orang memberikan versi berbeda tentang kejadian.

**Tujuan pemain:** mengumpulkan kesaksian awal.

**Pilihan penting:** mempercayai penjelasan resmi, mendengarkan warga,
atau menyelidiki pengalaman sendiri.

### Bab 2 --- Catatan yang Hilang

Farez menemukan ketidaksesuaian dalam catatan desa dan ingatan Mbah
Sastro. Naya mulai mengungkapkan bahwa ia juga mengalami kejadian aneh.

**Tujuan pemain:** menghubungkan petunjuk tanpa terburu-buru
menyimpulkan.

**Hook akhir:** bukti yang ditemukan Farez tampak menunjukkan bahwa
salah satu ingatannya sendiri tidak akurat.

### Bab 3 --- Kontak

Arga datang atau berhasil dihubungi, bergantung pada keputusan pemain.
Ia menjadi saksi tambahan, tetapi tidak otomatis melihat apa yang Farez
lihat.

**Tujuan pemain:** membandingkan sudut pandang dan menjaga kepercayaan.

**Konflik:** Farez harus memutuskan seberapa banyak informasi yang akan
ia bagikan kepada Arga dan Naya.

### Bab 4 --- Ingatan Wanasetra

Masa lalu desa mulai terungkap. Hubungan keluarga, keputusan warga, dan
sejarah kawasan hutan saling berkaitan.

**Tujuan pemain:** menentukan versi kejadian yang paling masuk akal,
sambil menerima bahwa sebagian fakta mungkin tidak akan diketahui.

### Bab 5 --- Yang Tidak Bisa Dibawa Pulang

Farez mencapai lokasi yang menjadi pusat misteri. Pemain harus memilih
prioritas: keluarga, keselamatan warga, kebenaran, atau mempertahankan
rahasia yang mungkin mencegah kepanikan.

**Tujuan pemain:** membuat keputusan akhir berdasarkan hubungan dan
informasi yang telah dibangun.

### Epilog

Ending ditentukan oleh kombinasi keputusan, bukan satu pilihan terakhir
saja.

------------------------------------------------------------------------

## 10. Sistem Pilihan dan Ending Bercabang

### 10.1 Prinsip desain

Pilihan sebaiknya tidak selalu diberi label "baik" atau "jahat". Setiap
pilihan memiliki alasan yang dapat dipahami, keuntungan, dan
konsekuensi.

Contoh: - Memberi tahu Naya seluruh informasi dapat membangun
kepercayaan, tetapi membuatnya ikut menanggung beban. - Menyembunyikan
informasi dapat menghindari kepanikan sementara, tetapi merusak hubungan
ketika kebenaran terungkap. - Memercayai kesaksian warga membuka akses
sosial, tetapi bisa membuat pemain mengikuti informasi yang tidak
lengkap. - Menggunakan mata batin untuk mencari petunjuk dapat memberi
informasi baru, tetapi meningkatkan tekanan pada Farez.

### 10.2 Variabel naratif

Variabel disimpan sebagai state cerita, bukan sekadar skor yang
ditampilkan kepada pemain.

  ------------------------------------------------------------------------
  Variabel                                   Rentang Pengaruh
  --------------------- ---------------------------- ---------------------
  `naya_trust`                                0--100 Kepercayaan dan
                                                     keterbukaan Naya

  `arga_trust`                                0--100 Kesediaan Arga
                                                     membantu

  `sastro_trust`                              0--100 Seberapa banyak
                                                     sejarah yang
                                                     dibagikan Mbah Sastro

  `village_trust`                             0--100 Respons warga
                                                     terhadap Farez

  `evidence_score`                            0--100 Kelengkapan bukti
                                                     yang dikumpulkan

  `strain`                                    0--100 Tekanan dan kelelahan
                                                     Farez

  `truth_fragments`                        daftar ID Petunjuk penting yang
                                                     telah ditemukan

  `promises_kept`                          daftar ID Janji yang dipenuhi
                                                     pemain

  `critical_flags`                         daftar ID Keputusan khusus yang
                                                     membuka atau menutup
                                                     cabang
  ------------------------------------------------------------------------

Nilai dan ambang di atas adalah rancangan awal. Uji melalui playtest;
jangan biarkan angka terlihat sebagai gamifikasi yang mengurangi
suasana.

### 10.3 Contoh pilihan

**Adegan: Naya mendengar suara ibu mereka dari halaman belakang.**

-   A. Farez langsung menemani Naya dan mengajaknya masuk.
    -   `naya_trust +10`
    -   `strain +5`
    -   `critical_flags: naya_protected`
-   B. Farez meminta Naya menjelaskan persis apa yang didengarnya
    sebelum mengambil keputusan.
    -   `evidence_score +5`
    -   `naya_trust -5`
    -   Membuka dialog investigasi.
-   C. Farez menyembunyikan kekhawatirannya dan mengatakan bahwa itu
    hanya suara warga.
    -   `naya_trust -10`
    -   `strain +3`
    -   Menunda pembicaraan sampai adegan berikutnya.

Pilihan harus tetap terasa seperti dialog dan tindakan manusia, bukan
sekadar mengubah angka.

### 10.4 Rancangan ending

**Ending A --- The Sentinel**

Farez berhasil menjaga hubungan keluarga dan memperoleh kepercayaan
sebagian warga. Ia memilih tinggal untuk membantu Wanasetra menghadapi
konsekuensi yang belum sepenuhnya selesai.

Syarat rancangan: - Kepercayaan Naya tinggi. - Mbah Sastro telah
mengungkapkan sejarah penting. - Pemain menemukan cukup fragmen
kebenaran. - Pemain tidak mengabaikan kebutuhan warga.

**Ending B --- The Empty Return**

Farez dan Naya meninggalkan desa. Secara fisik mereka selamat, tetapi
beberapa pertanyaan tidak terjawab. Di perjalanan pulang, sebuah detail
kecil menunjukkan bahwa fenomena mungkin belum berakhir.

Syarat rancangan: - Naya selamat. - Pemain memilih keselamatan keluarga
di atas pengungkapan penuh. - Bukti utama tidak lengkap.

**Ending C --- No Contact**

Farez dan Arga tidak kembali dari lokasi terakhir. Cerita berakhir
melalui rekaman dan kesaksian yang saling bertentangan. Tidak dijelaskan
secara pasti apa yang terjadi.

Syarat rancangan: - `strain` sangat tinggi atau beberapa keputusan
kritis gagal. - Pemain mengabaikan beberapa peringatan. - Hubungan
dengan rekan dan keluarga memburuk.

**Ending D --- The Witness**

Farez berhasil mengungkap sebagian besar sejarah, tetapi memilih tidak
mengumumkan semua temuannya. Ia menjadi saksi atas sesuatu yang tidak
dapat ia buktikan kepada orang lain.

Syarat rancangan: - `evidence_score` tinggi. - `truth_fragments` lengkap
untuk cabang tertentu. - Pemain mempertahankan hubungan dengan
setidaknya satu sumber informasi utama.

**Ending E --- A Village Still Breathing**

Ending yang relatif optimistis. Warga bekerja sama, keluarga Farez
bertahan, dan desa mulai memulihkan kehidupan. Misteri utama belum
sepenuhnya selesai, tetapi masyarakat tidak lagi menghadapinya
sendirian.

Syarat rancangan: - `village_trust` tinggi. - `naya_trust` dan
`arga_trust` cukup tinggi. - Pemain memilih membagikan informasi yang
relevan dan menjaga janji.

------------------------------------------------------------------------

## 11. Desain Game: Visual Novel / Slide Novel

### 11.1 Format presentasi

Game menggunakan layar penuh dengan komposisi seperti visual novel:

-   Background ilustrasi atau foto bergaya sinematik.
-   Character portrait atau sprite dengan ekspresi.
-   Kotak dialog.
-   Nama pembicara.
-   Indikator bab dan waktu.
-   Pilihan dialog atau tindakan.
-   Panel jurnal untuk petunjuk dan catatan.

### 11.2 Jenis scene

  Tipe scene     Fungsi
  -------------- -----------------------------------
  `dialogue`     Percakapan karakter
  `narration`    Narasi tanpa pembicara
  `choice`       Pilihan pemain
  `evidence`     Menemukan atau memeriksa petunjuk
  `transition`   Perpindahan lokasi atau waktu
  `memory`       Fragmen ingatan atau penglihatan
  `ending`       Penutup cabang cerita

### 11.3 Sistem jurnal

Jurnal Farez dapat menyimpan:

-   Kesaksian warga.
-   Catatan pribadi.
-   Foto atau bukti.
-   Lokasi yang pernah dikunjungi.
-   Pertanyaan yang belum terjawab.
-   Perbedaan antara pengamatan normal dan penglihatan mata batin.

Jurnal tidak selalu menyimpulkan kebenaran. Beberapa catatan dapat
saling bertentangan.

### 11.4 Audio

Audio merupakan bagian penting dari horor:

-   Ambience siang dan malam.
-   Hujan di atap rumah.
-   Serangga malam.
-   Suara kendaraan dari kejauhan.
-   Radio dengan gangguan ringan.
-   Musik latar minimalis.
-   Keheningan yang disengaja.

Sediakan kontrol volume terpisah untuk musik, ambience, dan efek suara.
Jangan mengandalkan jumpscare keras sebagai satu-satunya sumber
ketegangan.

------------------------------------------------------------------------

## 12. Arah Visual dan Art Direction

### Palet suasana

  -----------------------------------------------------------------------
  Konteks                             Arah warna
  ----------------------------------- -----------------------------------
  Desa siang                          Hijau kusam, tanah, warna rumah
                                      yang pudar

  Interior rumah                      Cokelat kayu, kuning lampu,
                                      bayangan lembut

  Malam desa                          Biru gelap, abu-abu, tungsten

  Mata batin                          Distorsi halus, kontras tidak
                                      stabil, bukan filter berlebihan

  Area hutan                          Hijau pekat, hitam, kabut tipis
  -----------------------------------------------------------------------

### Prinsip visual

-   Hindari membuat semua lokasi tampak seperti set film apokaliptik.
-   Rumah warga harus memiliki barang sehari-hari dan tanda kehidupan.
-   Kerusakan bangunan harus punya penyebab yang masuk akal.
-   Gunakan ruang kosong, framing terhalang, dan objek di latar
    belakang.
-   Penampakan sebaiknya jarang, singkat, dan tidak selalu berada di
    tengah layar.
-   UI harus membantu membaca, bukan mendominasi ilustrasi.

### Arah fotografi

Gunakan framing yang membuat pemain merasa sedang mengamati tempat,
bukan selalu menjadi pusat aksi. Perspektif terbatas cocok untuk
membangun rasa tidak aman.

------------------------------------------------------------------------

## 13. Realisme dan Riset

Karena latarnya Indonesia kontemporer dan tokohnya personel militer,
konsistensi detail sangat penting.

### Hal yang perlu diverifikasi sebelum produksi

1.  **Geografi:** buat peta desa fiktif yang konsisten, termasuk jarak
    antarlokasi dan waktu perjalanan.
2.  **Cuaca:** pilih musim dan pola hujan yang sesuai dengan wilayah
    inspirasi.
3.  **Bahasa:** gunakan bahasa Indonesia sehari-hari dan bahasa Jawa
    sesuai usia, hubungan, serta konteks sosial karakter.
4.  **Kehidupan desa:** konsultasikan detail fasilitas, pekerjaan,
    pasar, sekolah, dan administrasi dengan referensi yang relevan.
5.  **Militer:** gunakan gambaran umum yang tidak mengklaim prosedur
    rahasia atau detail organisasi yang tidak diverifikasi. Unit dan
    callsign dalam cerita sebaiknya fiktif.
6.  **Teknologi:** sesuaikan jangkauan sinyal, baterai, jaringan
    listrik, dan ketersediaan perangkat dengan kondisi lokasi.
7.  **Kesehatan:** gambarkan puskesmas dan tenaga kesehatan secara
    realistis; jangan menjadikan mereka sumber informasi serba tahu.
8.  **Folklor:** riset sumber budaya secara hati-hati. Bedakan tradisi
    yang benar-benar ada dengan mitologi orisinal Wanasetra.

### Batas penggambaran militer

Farez boleh memiliki latar belakang operator dan membawa perlengkapan
yang sesuai secara visual. Namun, game tidak perlu memberikan instruksi
operasional nyata tentang penyerangan, penggunaan senjata, pengintaian,
atau taktik unit khusus. Fokuskan pada disiplin, observasi, komunikasi,
keterbatasan informasi, dan tekanan psikologis.

------------------------------------------------------------------------

## 14. Struktur Teknis Game Web

### 14.1 Stack yang direncanakan

-   **Next.js:** framework aplikasi web.
-   **TypeScript:** tipe data untuk scene, pilihan, state, dan ending.
-   **Tailwind CSS:** styling antarmuka.
-   **Vercel:** deployment dan hosting.
-   **Penyimpanan progres:** mulai dengan `localStorage` untuk prototipe
    single-player; evaluasi penyimpanan akun atau cloud save jika memang
    diperlukan.

Untuk versi awal, tidak perlu backend kompleks. Narasi dan definisi
scene dapat disimpan sebagai data statis. Pisahkan engine cerita dari
komponen tampilan agar konten dapat dikembangkan tanpa mengubah UI
setiap kali.

### 14.2 Arsitektur konseptual

``` text
Next.js App
├── app/
│   ├── page.tsx
│   ├── game/
│   │   └── [chapter]/
│   │       └── page.tsx
│   └── settings/
├── components/
│   ├── game/
│   │   ├── SceneView.tsx
│   │   ├── DialogueBox.tsx
│   │   ├── ChoiceList.tsx
│   │   ├── JournalPanel.tsx
│   │   └── SaveMenu.tsx
│   └── ui/
├── content/
│   ├── chapters/
│   ├── characters/
│   └── endings/
├── engine/
│   ├── story-engine.ts
│   ├── conditions.ts
│   ├── effects.ts
│   └── save-manager.ts
├── types/
│   └── story.ts
└── public/
    ├── images/
    ├── audio/
    └── fonts/
```

Struktur ini adalah rancangan awal, bukan aturan yang harus diikuti
secara kaku. Struktur App Router dapat disesuaikan saat implementasi.

### 14.3 Model data scene

Contoh bentuk data sederhana:

``` ts
type StoryState = {
  currentSceneId: string;
  nayaTrust: number;
  argaTrust: number;
  sastroTrust: number;
  villageTrust: number;
  evidenceScore: number;
  strain: number;
  truthFragments: string[];
  flags: string[];
};

type Choice = {
  id: string;
  text: string;
  nextSceneId: string;
  effects?: Partial<{
    nayaTrust: number;
    argaTrust: number;
    sastroTrust: number;
    villageTrust: number;
    evidenceScore: number;
    strain: number;
  }>;
  requires?: {
    flags?: string[];
    truthFragments?: string[];
  };
};

type Scene = {
  id: string;
  chapter: string;
  location: string;
  timeLabel?: string;
  background: string;
  speaker?: string;
  text: string;
  choices?: Choice[];
  effects?: Choice["effects"];
};
```

Contoh scene:

``` ts
const scene = {
  id: "prologue_house_01",
  chapter: "prologue",
  location: "Rumah keluarga",
  timeLabel: "22.14",
  background: "/images/house-night.webp",
  speaker: "Naya",
  text: "Mas, tadi ada yang manggil dari belakang rumah.",
  choices: [
    {
      id: "stay_with_naya",
      text: "Farez tetap menemani Naya.",
      nextSceneId: "prologue_house_02",
      effects: { nayaTrust: 10, strain: 5 }
    },
    {
      id: "ask_details",
      text: "Farez meminta Naya menjelaskan apa yang didengarnya.",
      nextSceneId: "prologue_house_03",
      effects: { evidenceScore: 5, nayaTrust: -5 }
    }
  ]
} satisfies Scene;
```

### 14.4 Prinsip engine

Engine cerita bertanggung jawab untuk:

1.  Memuat scene berdasarkan ID.
2.  Memeriksa syarat pilihan.
3.  Menerapkan efek pilihan ke state.
4.  Memindahkan pemain ke scene berikutnya.
5.  Menyimpan riwayat pilihan penting.
6.  Mengevaluasi kondisi ending.
7.  Menyimpan dan memuat progres.

Jangan menaruh seluruh logika cabang di komponen React. UI menampilkan
scene dan pilihan; engine mengatur aturan cerita.

### 14.5 Save system

Simpan setidaknya:

-   Versi schema save.
-   Scene aktif.
-   State variabel.
-   Pilihan penting yang telah dibuat.
-   Jurnal dan petunjuk.
-   Pengaturan audio dan tampilan.

Gunakan `localStorage` untuk prototipe. Tambahkan validasi saat membaca
save agar perubahan struktur data tidak membuat progres lama rusak.
Sediakan tombol mulai baru dan konfirmasi sebelum menimpa progres.

### 14.6 Aksesibilitas dan UX

-   Pilihan dapat diakses dengan keyboard.
-   Teks memiliki ukuran dan kontras yang nyaman.
-   Sediakan pengaturan kecepatan teks atau mode tampil langsung.
-   Sediakan tombol untuk mengulang dialog terakhir.
-   Jangan membuat informasi penting hanya tersedia melalui audio.
-   Sediakan kontrol audio dan opsi mengurangi efek visual yang
    mengganggu.
-   Pastikan layout nyaman di desktop dan mobile.

------------------------------------------------------------------------

## 15. Rencana Produksi Bertahap

### Tahap 1 --- Narrative prototype

-   Finalisasi premis dan tokoh.
-   Buat peta lokasi.
-   Tulis prolog dan Bab 1.
-   Buat 2--3 pilihan yang memiliki konsekuensi.
-   Tentukan satu ending prototipe.

**Output:** dokumen cerita dan alur yang bisa dibaca dari awal sampai
akhir.

### Tahap 2 --- Vertical slice

-   Implementasi satu bab pendek di Next.js.
-   Buat dialogue box, background, pilihan, dan transisi.
-   Tambahkan state dan save lokal.
-   Tambahkan ambience dan pengaturan audio.

**Output:** potongan game yang sudah dapat dimainkan.

### Tahap 3 --- Branching narrative

-   Implementasikan variabel relasi dan bukti.
-   Buat jurnal.
-   Buat beberapa cabang scene.
-   Implementasikan evaluasi ending.
-   Uji pilihan yang saling bertentangan.

**Output:** satu episode dengan setidaknya dua ending yang dapat
dicapai.

### Tahap 4 --- Content production

-   Produksi background dan portrait karakter.
-   Rekam atau buat aset audio.
-   Tulis seluruh dialog dan narasi.
-   Tambahkan ilustrasi khusus untuk momen penting.

**Output:** konten lengkap untuk rilis pertama.

### Tahap 5 --- Testing dan deployment

-   Uji semua jalur pilihan.
-   Periksa apakah ada scene yang tidak dapat dicapai.
-   Uji save/load.
-   Uji tampilan mobile dan desktop.
-   Uji performa aset.
-   Deploy ke Vercel.

**Output:** versi web yang dapat dimainkan publik.

------------------------------------------------------------------------

## 16. Risiko Desain dan Cara Menghindarinya

  -----------------------------------------------------------------------
  Risiko                              Solusi
  ----------------------------------- -----------------------------------
  Protagonis terlalu kuat sehingga    Batasi informasi, bukan hanya
  horor hilang                        kemampuan fisik

  Terlalu banyak lore di awal         Ungkap sejarah melalui percakapan
                                      dan benda

  Pilihan terasa palsu                Berikan konsekuensi pada dialog,
                                      akses scene, dan ending

  Semua karakter percaya hal yang     Beri tiap karakter penjelasan dan
  sama                                kepentingan berbeda

  Desa terasa seperti set horor       Tampilkan rutinitas, pekerjaan, dan
                                      interaksi warga

  Terlalu banyak jumpscare            Bangun antisipasi dan gunakan
                                      keheningan

  Cabang cerita sulit dikelola        Gunakan ID scene, state
                                      terstruktur, dan peta alur

  Detail militer tidak akurat         Gunakan unit fiktif dan lakukan
                                      pemeriksaan referensi

  Ending hanya berbeda satu paragraf  Buat konsekuensi emosional dan
                                      informasi yang berbeda
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 17. Pertanyaan yang Belum Diputuskan

Keputusan ini sebaiknya ditetapkan sebelum produksi aset besar:

1.  Apakah Farez masih aktif berdinas saat pulang, sedang cuti, atau
    sedang menjalani penugasan administratif?
2.  Apakah Arga datang secara fisik, atau hanya berkomunikasi dari jauh
    pada sebagian besar cerita?
3.  Apakah Sang Kosong benar-benar satu entitas, atau nama yang
    diberikan warga untuk beberapa fenomena?
4.  Apakah cerita akan menggunakan bahasa Jawa secara luas, atau hanya
    pada dialog tertentu?
5.  Apakah pemain dapat memilih beberapa tindakan eksplorasi, atau
    seluruh game berjalan sebagai rangkaian slide dan pilihan?
6.  Apakah ending akan berjumlah tiga sampai lima untuk episode pertama?
7.  Apakah game direncanakan sebagai satu cerita selesai, atau episode
    pertama dari universe yang lebih luas?

------------------------------------------------------------------------

## 18. Ringkasan Visi

THE HOLLOW bukan cerita tentang operator yang datang ke desa lalu
mengalahkan hantu menggunakan senjata modern.

Ini adalah cerita tentang seseorang yang pulang ke tempat asalnya dan
menemukan bahwa ia tidak lagi memahami rumahnya sendiri.

Latar militer memberi Farez disiplin dan cara berpikir yang khas. Mata
batin memberinya akses ke informasi yang tidak dimiliki orang lain.
Keduanya membantu, tetapi tidak menjamin keselamatan atau kebenaran.

Pemain tidak diuji berdasarkan seberapa agresif mereka bertindak. Mereka
diuji berdasarkan apa yang mereka perhatikan, siapa yang mereka percaya,
informasi apa yang mereka bagikan, dan konsekuensi apa yang bersedia
mereka tanggung.

> **"You can train a man to face anything. But you cannot prepare him
> for what was waiting at home."**

**THE HOLLOW: DESA YANG TERLUPAKAN**\
*Draft konsep naratif dan game design --- 0.1*
