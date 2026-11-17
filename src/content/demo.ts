// ⚠️ KONTEN DEMO — bukan naskah final.
// Tujuannya menguji engine dan UI: satu hari, tiga lokasi, satu deduksi, mata batin, dan tiga ending.
// Naskah asli ditulis setelah story bible dikunci (simpan draf spoiler di private/, bukan di sini).

import type { StoryContent } from '@/engine'

export const demoContent: StoryContent = {
  startSceneId: 'arrival',

  characters: {
    farez: { id: 'farez', name: 'Farez' },
    naya: { id: 'naya', name: 'Naya' },
    lastri: { id: 'lastri', name: 'Bu Lastri' },
  },

  locations: {
    jalan_desa: { id: 'jalan_desa', name: 'Jalan desa' },
    warung: { id: 'warung', name: 'Warung Bu Lastri' },
    balai: { id: 'balai', name: 'Balai desa' },
    kebun: { id: 'kebun', name: 'Jalan kebun utara' },
    rumah: { id: 'rumah', name: 'Rumah keluarga' },
  },

  scenes: {
    arrival: {
      id: 'arrival',
      chapter: 'demo',
      locationId: 'jalan_desa',
      beats: [
        {
          kind: 'line',
          text: 'Bus terakhir menurunkan Farez di pertigaan. Jalan menuju Wanasetra masih berlubang di tempat yang sama.',
        },
        {
          kind: 'line',
          text: 'Masih sore, tapi warung-warung sudah setengah tutup.',
        },
        { kind: 'line', speaker: 'naya', text: 'Mas! Sini, motornya di sini.' },
        {
          kind: 'line',
          speaker: 'farez',
          text: 'Kamu nunggu dari tadi?',
        },
        {
          kind: 'line',
          speaker: 'naya',
          text: 'Dari jam tiga. Ayo cepet, aku nggak mau kemaleman di jalan.',
        },
        {
          kind: 'line',
          text: 'Ada sisa sore sebelum gelap. Cukup untuk singgah di satu tempat.',
        },
      ],
      exit: { to: 'hub' },
    },

    warung_lastri: {
      id: 'warung_lastri',
      chapter: 'demo',
      locationId: 'warung',
      beats: [
        {
          kind: 'line',
          speaker: 'lastri',
          text: 'Lho, Farez? Ya Allah, sudah gede. Kopi?',
        },
        {
          kind: 'line',
          speaker: 'lastri',
          text: 'Adikmu itu lho. Semalam jam sebelas lewat sini, jalan sendirian ke arah kebun utara.',
        },
        {
          kind: 'line',
          speaker: 'lastri',
          text: 'Tak panggil, nggak noleh. Anak perempuan kok malam-malam ke sana.',
        },
        {
          kind: 'effects',
          effects: [
            { op: 'addJournal', entryId: 'testimony_lastri' },
            { op: 'add', stat: 'villageTrust', value: 5 },
          ],
        },
      ],
      exit: { to: 'hub' },
    },

    balai_wirat: {
      id: 'balai_wirat',
      chapter: 'demo',
      locationId: 'balai',
      beats: [{ kind: 'line', text: 'Pak Wirat menyambut dengan senyum yang terlalu rapi.' }],
      exit: { to: 'hub' },
    },

    kebun_utara: {
      id: 'kebun_utara',
      chapter: 'demo',
      locationId: 'kebun',
      beats: [
        {
          kind: 'line',
          text: 'Jalan tanah ke arah hutan jati. Sinyal ponsel tinggal satu garis, lalu hilang.',
        },
        {
          kind: 'line',
          text: 'Ada jejak sandal di lumpur. Ukurannya kecil. Arahnya hanya satu: masuk, tidak keluar.',
        },
        { kind: 'effects', effects: [{ op: 'addJournal', entryId: 'evidence_footprint' }] },
        { kind: 'line', speaker: 'farez', text: '...Pulang. Sebelum gelap.' },
      ],
      innerSight: {
        clear: {
          beats: [
            {
              kind: 'line',
              text: 'Udara di ujung jalan terasa lebih berat. Bukan sosok, hanya rasa bahwa jarak di sana tidak bisa dipercaya.',
            },
          ],
          effects: [{ op: 'addJournal', entryId: 'vision_kebun' }],
        },
      },
      exit: { to: 'hub' },
    },

    rumah_malam: {
      id: 'rumah_malam',
      chapter: 'demo',
      locationId: 'rumah',
      beats: [
        {
          kind: 'line',
          text: '22.14. Hujan sudah berhenti. Naya duduk di ruang tengah, ponselnya tertelungkup di meja.',
        },
        {
          kind: 'line',
          speaker: 'farez',
          text: 'Semalam kamu ke kebun utara?',
          requires: { journal: 'testimony_lastri' },
        },
        {
          kind: 'line',
          speaker: 'naya',
          text: 'Hah? Nggak. Aku nggak keluar rumah dari kemarin sore, Mas.',
        },
        { kind: 'effects', effects: [{ op: 'addJournal', entryId: 'observation_naya_home' }] },
        {
          kind: 'line',
          text: 'Dari halaman belakang, suara Naya memanggil: "Mas Farez..."',
        },
        { kind: 'line', text: 'Naya ada di depannya. Wajahnya pucat. Ia juga mendengarnya.' },
        { kind: 'line', speaker: 'naya', text: 'Mas... itu suaraku, kan?' },
        {
          kind: 'choice',
          options: [
            {
              id: 'stay_with_naya',
              text: 'Tetap di samping Naya dan tutup pintu belakang.',
              effects: [
                { op: 'add', stat: 'nayaTrust', value: 10 },
                { op: 'add', stat: 'strain', value: 5 },
                { op: 'setFlag', flag: 'naya_protected' },
              ],
              next: { to: 'scene', sceneId: 'rumah_stay' },
            },
            {
              id: 'ask_details',
              text: 'Minta Naya menjelaskan persis apa yang ia dengar.',
              effects: [
                { op: 'add', stat: 'evidence', value: 5 },
                { op: 'add', stat: 'nayaTrust', value: -5 },
              ],
              next: { to: 'scene', sceneId: 'rumah_ask' },
            },
            {
              id: 'dismiss',
              text: 'Bilang itu cuma suara tetangga.',
              effects: [
                { op: 'add', stat: 'nayaTrust', value: -10 },
                { op: 'add', stat: 'strain', value: 3 },
              ],
              next: { to: 'scene', sceneId: 'rumah_dismiss' },
            },
          ],
        },
      ],
      innerSight: {
        clear: {
          beats: [
            {
              kind: 'line',
              text: 'Halaman belakang kosong. Tapi tanah di dekat sumur basah, padahal hujan sudah reda sejak sore.',
            },
          ],
          effects: [{ op: 'addJournal', entryId: 'vision_sumur' }],
        },
        distorted: {
          beats: [
            {
              kind: 'line',
              text: 'Naya berdiri di halaman belakang, melambai. Naya juga duduk di sampingmu.',
            },
          ],
          effects: [{ op: 'addJournal', entryId: 'vision_naya_luar' }],
        },
      },
      exit: { to: 'hub' },
    },

    rumah_stay: {
      id: 'rumah_stay',
      chapter: 'demo',
      locationId: 'rumah',
      beats: [
        {
          kind: 'line',
          text: 'Farez mengunci pintu belakang. Panggilan itu berhenti di tengah kata.',
        },
        { kind: 'line', speaker: 'naya', text: 'Makasih, Mas. Jangan ke belakang malam ini, ya.' },
      ],
      exit: { to: 'hub' },
    },

    rumah_ask: {
      id: 'rumah_ask',
      chapter: 'demo',
      locationId: 'rumah',
      beats: [
        {
          kind: 'line',
          speaker: 'naya',
          text: 'Suaraku. Tapi caranya manggil... kayak waktu aku kecil. Aku udah nggak pernah manggil Mas begitu.',
        },
        { kind: 'line', text: 'Naya menarik tangannya dari genggaman Farez.' },
      ],
      exit: { to: 'hub' },
    },

    rumah_dismiss: {
      id: 'rumah_dismiss',
      chapter: 'demo',
      locationId: 'rumah',
      beats: [
        {
          kind: 'line',
          speaker: 'naya',
          text: 'Tetangga kita yang paling dekat itu dua ratus meter, Mas.',
        },
        { kind: 'line', text: 'Ia masuk kamar tanpa menunggu jawaban.' },
      ],
      exit: { to: 'hub' },
    },

    day1_close: {
      id: 'day1_close',
      chapter: 'demo',
      locationId: 'rumah',
      beats: [
        {
          kind: 'line',
          text: 'Farez tidak tidur. Ia menulis apa yang terjadi hari ini, lalu membaca ulang sampai subuh.',
        },
      ],
      exit: { to: 'nextDay' },
    },
  },

  days: {
    1: {
      day: 1,
      slots: ['sore', 'malam'],
      closingSceneId: 'day1_close',
      visits: [
        { id: 'warung_sore', locationId: 'warung', slot: 'sore', sceneId: 'warung_lastri' },
        {
          id: 'balai_sore',
          locationId: 'balai',
          slot: 'sore',
          sceneId: 'balai_wirat',
          requires: { stat: 'villageTrust', op: '>=', value: 60 },
        },
        { id: 'kebun_sore', locationId: 'kebun', slot: 'sore', sceneId: 'kebun_utara' },
        { id: 'rumah_malam', locationId: 'rumah', slot: 'malam', sceneId: 'rumah_malam' },
      ],
    },
  },

  journal: {
    testimony_lastri: {
      id: 'testimony_lastri',
      kind: 'testimony',
      title: 'Bu Lastri melihat Naya',
      body: 'Semalam sekitar jam sebelas, Naya berjalan sendirian ke arah kebun utara. Tidak menoleh saat dipanggil.',
    },
    observation_naya_home: {
      id: 'observation_naya_home',
      kind: 'observation',
      title: 'Naya tidak keluar rumah',
      body: 'Naya bilang ia tidak keluar rumah sejak kemarin sore.',
    },
    evidence_footprint: {
      id: 'evidence_footprint',
      kind: 'evidence',
      title: 'Jejak sandal di kebun utara',
      body: 'Jejak kecil di lumpur, hanya ke arah hutan. Tidak ada jejak kembali.',
    },
    vision_kebun: {
      id: 'vision_kebun',
      kind: 'vision',
      title: 'Jarak yang tidak bisa dipercaya',
      body: 'Di ujung jalan kebun, jarak terasa salah.',
    },
    vision_sumur: {
      id: 'vision_sumur',
      kind: 'vision',
      title: 'Tanah basah di dekat sumur',
      body: 'Tanah di dekat sumur basah, padahal hujan sudah reda sejak sore.',
    },
    vision_naya_luar: {
      id: 'vision_naya_luar',
      kind: 'vision',
      title: 'Naya di halaman belakang',
      body: 'Naya melambai dari halaman belakang, sementara Naya juga duduk di dalam.',
      unreliable: true,
    },
    question_siapa_di_kebun: {
      id: 'question_siapa_di_kebun',
      kind: 'question',
      title: 'Siapa yang dilihat Bu Lastri?',
      body: 'Kalau Naya tidak keluar rumah, siapa yang berjalan ke kebun utara semalam?',
    },
  },

  deductions: [
    {
      id: 'naya_two_places',
      entries: ['testimony_lastri', 'observation_naya_home'],
      effects: [
        { op: 'addFragment', id: 'someone_wears_naya' },
        { op: 'addJournal', entryId: 'question_siapa_di_kebun' },
        { op: 'add', stat: 'evidence', value: 10 },
      ],
    },
  ],

  endingRules: [
    { endingId: 'demo_witness', requires: { fragment: 'someone_wears_naya' } },
    { endingId: 'demo_close', requires: { flag: 'naya_protected' } },
    { endingId: 'demo_unanswered' },
  ],

  endings: {
    demo_witness: {
      id: 'demo_witness',
      title: 'Dua Naya',
      text: 'Ada yang berjalan dengan wajah adiknya. Farez belum tahu apa, tapi sekarang ia tahu harus mencari apa.',
    },
    demo_close: {
      id: 'demo_close',
      title: 'Pintu yang Terkunci',
      text: 'Malam pertama berlalu dengan Naya aman di dalam. Pertanyaannya tetap di luar, menunggu.',
    },
    demo_unanswered: {
      id: 'demo_unanswered',
      title: 'Belum Ada Jawaban',
      text: 'Subuh datang. Suara itu tidak kembali, dan Farez tidak yakin apakah itu kabar baik.',
    },
  },
}
