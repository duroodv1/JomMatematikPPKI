import { QuizQuestion, QuestionChoice } from '../types';

// Pembantu mencipta soalan pilihan berganda standard
const buatPilihan = (
  pilihanA: { text: string; subText?: string; emoji?: string },
  pilihanB: { text: string; subText?: string; emoji?: string },
  pilihanC: { text: string; subText?: string; emoji?: string },
  jawapanBetul: 'A' | 'B' | 'C'
): QuestionChoice[] => {
  return [
    {
      id: 'A',
      label: 'Pilihan A',
      text: pilihanA.text,
      subText: pilihanA.subText,
      emoji: pilihanA.emoji,
      isCorrect: jawapanBetul === 'A',
      audioText: `Pilihan A: ${pilihanA.subText || pilihanA.text}.`
    },
    {
      id: 'B',
      label: 'Pilihan B',
      text: pilihanB.text,
      subText: pilihanB.subText,
      emoji: pilihanB.emoji,
      isCorrect: jawapanBetul === 'B',
      audioText: `Pilihan B: ${pilihanB.subText || pilihanB.text}.`
    },
    {
      id: 'C',
      label: 'Pilihan C',
      text: pilihanC.text,
      subText: pilihanC.subText,
      emoji: pilihanC.emoji,
      isCorrect: jawapanBetul === 'C',
      audioText: `Pilihan C: ${pilihanC.subText || pilihanC.text}.`
    }
  ];
};

// ============================================================================
// MODUL 1: KENAL & BILANG ANGKA (1 HINGGA 20) — 25 SOALAN LENGKAP
// ============================================================================
export const COUNTING_QUIZZES: QuizQuestion[] = [
  {
    id: 'cnt-1',
    number: 1,
    prompt: 'Berapakah bilangan epal merah ini? Ketuk setiap epal untuk membilang.',
    clue: 'Kira satu demi satu: satu, dua, tiga, empat!',
    audioText: 'Soalan 1. Berapakah bilangan epal merah ini? Ketuk setiap epal untuk membilang.',
    visualType: 'emoji-grid',
    visualData: { emoji: '🍎', count: 4, name: 'epal' },
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Ada 4 biji epal merah yang ranum.',
    explanation: 'Jawapannya ialah 4 (Empat). Tahniah adik bijak mengira!'
  },
  {
    id: 'cnt-2',
    number: 2,
    prompt: 'Kira berapakah bilangan anak kucing comel ini?',
    clue: 'Kira anak kucing perlahan-lahan.',
    audioText: 'Soalan 2. Kira berapakah bilangan anak kucing comel ini?',
    visualType: 'emoji-grid',
    visualData: { emoji: '🐱', count: 3, name: 'anak kucing' },
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '2', subText: 'Dua' },
      { text: '4', subText: 'Empat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Satu, dua, tiga anak kucing.',
    explanation: 'Tepat sekali! Terdapat 3 ekor anak kucing.'
  },
  {
    id: 'cnt-3',
    number: 3,
    prompt: 'Berapakah jumlah kereta laju ini?',
    clue: 'Gunakan jari tangan untuk mengira.',
    audioText: 'Soalan 3. Berapakah jumlah kereta laju ini?',
    visualType: 'emoji-grid',
    visualData: { emoji: '🚗', count: 5, name: 'kereta' },
    choices: buatPilihan(
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima' },
      { text: '6', subText: 'Enam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Satu tangan penuh mempunyai 5 jari.',
    explanation: 'Jawapan betul ialah 5 (Lima) buah kereta laju.'
  },
  {
    id: 'cnt-4',
    number: 4,
    prompt: 'Kira berapa biji belon warna-warni yang sedang terbang?',
    clue: 'Sentuh setiap belon untuk mengira.',
    audioText: 'Soalan 4. Kira berapa biji belon warna-warni yang sedang terbang?',
    visualType: 'emoji-grid',
    visualData: { emoji: '🎈', count: 6, name: 'belon' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      { text: '6', subText: 'Enam' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Kira: 1, 2, 3, 4, 5, 6.',
    explanation: 'Tepat sekali! Ada 6 biji belon terbang di udara.'
  },
  {
    id: 'cnt-5',
    number: 5,
    prompt: 'Berapakah bintang berkilau yang ada di langit?',
    clue: 'Kira bintang satu persatu.',
    audioText: 'Soalan 5. Berapakah bintang berkilau yang ada di langit?',
    visualType: 'emoji-grid',
    visualData: { emoji: '⭐', count: 7, name: 'bintang' },
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '6', subText: 'Enam' },
      { text: '8', subText: 'Lapan' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Tujuh bintang bersinar terang.',
    explanation: 'Hebat! Ada 7 butir bintang berkilauan.'
  },
  {
    id: 'cnt-6',
    number: 6,
    prompt: 'Kira kek cawan yang lazat ini:',
    clue: 'Ada lapan biji kek cawan.',
    audioText: 'Soalan 6. Kira kek cawan yang lazat ini.',
    visualType: 'emoji-grid',
    visualData: { emoji: '🧁', count: 8, name: 'kek cawan' },
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '8', subText: 'Lapan' },
      { text: '9', subText: 'Sembilan' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Kira: 1, 2, 3, 4, 5, 6, 7, 8.',
    explanation: 'Tepat! Terdapat 8 biji kek cawan.'
  },
  {
    id: 'cnt-7',
    number: 7,
    prompt: 'Berapakah ekor ikan yang berenang di dalam kolam?',
    clue: 'Hampir cukup 10 ekor ikan.',
    audioText: 'Soalan 7. Berapakah ekor ikan yang berenang di dalam kolam?',
    visualType: 'emoji-grid',
    visualData: { emoji: '🐟', count: 9, name: 'ikan' },
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Kurang satu daripada sepuluh.',
    explanation: 'Tepat sekali! Ada 9 ekor ikan berenang.'
  },
  {
    id: 'cnt-8',
    number: 8,
    prompt: 'Kira buah strawberi merah yang manis ini:',
    clue: 'Kedua-dua belah tangan penuh jari.',
    audioText: 'Soalan 8. Kira buah strawberi merah yang manis ini.',
    visualType: 'emoji-grid',
    visualData: { emoji: '🍓', count: 10, name: 'strawberi' },
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      { text: '11', subText: 'Sebelas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Jumlahnya adalah 10.',
    explanation: 'Bagus! Ada 10 biji strawberi segar.'
  },
  {
    id: 'cnt-9',
    number: 9,
    prompt: 'Lihat Bingkai Sepuluh ini. Berapakah bulatan biru yang ada?',
    clue: 'Tiga petak pertama terisi.',
    audioText: 'Soalan 9. Lihat Bingkai Sepuluh ini. Berapakah bulatan biru yang ada?',
    visualType: 'ten-frame',
    visualData: { count: 3, color: 'blue' },
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Ada 3 petak bertanda bulat.',
    explanation: 'Tepat! Ada 3 bulatan dalam bingkai sepuluh.'
  },
  {
    id: 'cnt-10',
    number: 10,
    prompt: 'Baris atas Bingkai Sepuluh ini penuh. Berapakah bilangannya?',
    clue: 'Satu baris penuh ada 5 petak.',
    audioText: 'Soalan 10. Baris atas Bingkai Sepuluh ini penuh. Berapakah bilangannya?',
    visualType: 'ten-frame',
    visualData: { count: 5, color: 'amber' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '6', subText: 'Enam' },
      { text: '4', subText: 'Empat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Baris atas lengkap bermaksud 5.',
    explanation: 'Tepat sekali! 5 petak penuh pada baris atas.'
  },
  {
    id: 'cnt-11',
    number: 11,
    prompt: 'Kira bulatan dalam Bingkai Sepuluh ini (baris atas penuh + 2 di bawah):',
    clue: '5 tambah 2 bersamaan berapa?',
    audioText: 'Soalan 11. Kira bulatan dalam Bingkai Sepuluh ini.',
    visualType: 'ten-frame',
    visualData: { count: 7, color: 'emerald' },
    choices: buatPilihan(
      { text: '6', subText: 'Enam' },
      { text: '7', subText: 'Tujuh' },
      { text: '8', subText: 'Lapan' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Lima di atas dan dua di bawah menjadi tujuh.',
    explanation: 'Bagus! Ada 7 bulatan kesemuanya.'
  },
  {
    id: 'cnt-12',
    number: 12,
    prompt: 'Berapakah bulatan dalam Bingkai Sepuluh ini? Hanya 1 petak kosong.',
    clue: 'Sepuluh tolak satu petak kosong.',
    audioText: 'Soalan 12. Berapakah bulatan dalam Bingkai Sepuluh ini?',
    visualType: 'ten-frame',
    visualData: { count: 9, color: 'blue' },
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Satu petak sahaja tinggal untuk cukupkan 10.',
    explanation: 'Hebat! Ada 9 bulatan di dalam bingkai.'
  },
  {
    id: 'cnt-13',
    number: 13,
    prompt: 'Semua petak dalam Bingkai Sepuluh ini penuh! Berapakah jumlahnya?',
    clue: 'Bingkai sepuluh penuh lengkap.',
    audioText: 'Soalan 13. Semua petak dalam Bingkai Sepuluh ini penuh. Berapakah jumlahnya?',
    visualType: 'ten-frame',
    visualData: { count: 10, color: 'rose' },
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      { text: '12', subText: 'Dua Belas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Sepuluh petak penuh bermaksud 10.',
    explanation: 'Tepat! Bingkai sepuluh yang penuh bersamaan 10.'
  },
  {
    id: 'cnt-14',
    number: 14,
    prompt: 'Pilih ejaan perkataan yang betul bagi nombor 1:',
    clue: 'S - A - T - U',
    audioText: 'Soalan 14. Pilih ejaan perkataan yang betul bagi nombor satu.',
    choices: buatPilihan(
      { text: 'Dua', subText: 'Nombor 2' },
      { text: 'Satu', subText: 'Nombor 1' },
      { text: 'Tiga', subText: 'Nombor 3' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '1 dieja Satu.',
    explanation: 'Tepat sekali! Nombor 1 dieja S-A-T-U (Satu).'
  },
  {
    id: 'cnt-15',
    number: 15,
    prompt: 'Nombor 5 dieja sebagai apa dalam Bahasa Melayu?',
    clue: 'L - I - M - A',
    audioText: 'Soalan 15. Nombor lima dieja sebagai apa dalam Bahasa Melayu?',
    choices: buatPilihan(
      { text: 'Lima', subText: 'Nombor 5' },
      { text: 'Empat', subText: 'Nombor 4' },
      { text: 'Enam', subText: 'Nombor 6' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '5 jari tangan = Lima.',
    explanation: 'Bagus! Nombor 5 dieja L-I-M-A.'
  },
  {
    id: 'cnt-16',
    number: 16,
    prompt: 'Pilih nombor angka yang sepadan dengan perkataan "LAPAN":',
    clue: 'Cari angka 8.',
    audioText: 'Soalan 16. Pilih nombor angka yang sepadan dengan perkataan lapan.',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '8', subText: 'Lapan' },
      { text: '9', subText: 'Sembilan' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Lapan ialah angka 8.',
    explanation: 'Tepat! Perkataan Lapan ialah angka 8.'
  },
  {
    id: 'cnt-17',
    number: 17,
    prompt: 'Nombor 10 disebut dan dieja sebagai:',
    clue: 'S - E - P - U - L - U - H',
    audioText: 'Soalan 17. Nombor sepuluh disebut dan dieja sebagai apa?',
    choices: buatPilihan(
      { text: 'Sembilan', subText: 'Nombor 9' },
      { text: 'Sebelas', subText: 'Nombor 11' },
      { text: 'Sepuluh', subText: 'Nombor 10' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '10 ialah Sepuluh.',
    explanation: 'Hebat! Angka 10 dieja Sepuluh.'
  },
  {
    id: 'cnt-18',
    number: 18,
    prompt: 'Pilih ejaan yang betul bagi nombor 12:',
    clue: 'Sepuluh campur dua = Dua Belas.',
    audioText: 'Soalan 18. Pilih ejaan yang betul bagi nombor dua belas.',
    choices: buatPilihan(
      { text: 'Dua Belas', subText: 'Nombor 12' },
      { text: 'Sebelas', subText: 'Nombor 11' },
      { text: 'Tiga Belas', subText: 'Nombor 13' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '12 disebut Dua Belas.',
    explanation: 'Tepat sekali! 12 ialah Dua Belas.'
  },
  {
    id: 'cnt-19',
    number: 19,
    prompt: 'Nombor 15 disebut sebagai apa?',
    clue: 'Sepuluh dan lima.',
    audioText: 'Soalan 19. Nombor lima belas disebut sebagai apa?',
    choices: buatPilihan(
      { text: 'Empat Belas', subText: 'Nombor 14' },
      { text: 'Lima Belas', subText: 'Nombor 15' },
      { text: 'Enam Belas', subText: 'Nombor 16' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '15 ialah Lima Belas.',
    explanation: 'Bagus! 15 ialah Lima Belas.'
  },
  {
    id: 'cnt-20',
    number: 20,
    prompt: 'Angka 20 dieja sebagai apa dalam Bahasa Melayu?',
    clue: 'Dua kumpulan sepuluh.',
    audioText: 'Soalan 20. Angka dua puluh dieja sebagai apa dalam Bahasa Melayu?',
    choices: buatPilihan(
      { text: 'Sembilan Belas', subText: 'Nombor 19' },
      { text: 'Sepuluh', subText: 'Nombor 10' },
      { text: 'Dua Puluh', subText: 'Nombor 20' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '20 ialah Dua Puluh.',
    explanation: 'Tepat! Angka 20 dieja Dua Puluh.'
  },
  {
    id: 'cnt-21',
    number: 21,
    prompt: 'Turutan menaik: 1, 2, [ ? ], 4, 5. Apakah nombor yang hilang?',
    clue: 'Nombor selepas dua ialah apa?',
    audioText: 'Soalan 21. Turutan menaik: satu, dua, tempat kosong, empat, lima. Apakah nombor yang hilang?',
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '6', subText: 'Enam' },
      { text: '0', subText: 'Sifar' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Selepas nombor 2 ialah 3.',
    explanation: 'Tepat! Turutan menaik yang lengkap ialah 1, 2, 3, 4, 5.'
  },
  {
    id: 'cnt-22',
    number: 22,
    prompt: 'Turutan menaik: 6, 7, 8, [ ? ], 10. Apakah nombor dalam petak?',
    clue: 'Nombor sebelum sepuluh.',
    audioText: 'Soalan 22. Turutan menaik: enam, tujuh, lapan, tempat kosong, sepuluh. Apakah nombor dalam petak?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '9', subText: 'Sembilan' },
      { text: '11', subText: 'Sebelas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Selepas lapan ialah sembilan.',
    explanation: 'Hebat! Turutan ialah 6, 7, 8, 9, 10.'
  },
  {
    id: 'cnt-23',
    number: 23,
    prompt: 'Lengkapkan turutan menaik belas: 11, 12, 13, [ ? ], 15',
    clue: 'Selepas tiga belas.',
    audioText: 'Soalan 23. Lengkapkan turutan menaik belas: sebelas, dua belas, tiga belas, tempat kosong, lima belas.',
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '16', subText: 'Enam Belas' },
      { text: '14', subText: 'Empat Belas' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Nombor selepas 13 ialah 14.',
    explanation: 'Tepat sekali! 11, 12, 13, 14, 15.'
  },
  {
    id: 'cnt-24',
    number: 24,
    prompt: 'Kira undur / Turutan menurun: 5, 4, 3, [ ? ], 1',
    clue: 'Kira ke belakang dari lima.',
    audioText: 'Soalan 24. Kira undur turutan menurun: lima, empat, tiga, tempat kosong, satu. Apakah nombornya?',
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '6', subText: 'Enam' },
      { text: '0', subText: 'Sifar' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Sebelum nombor 3 ialah nombor 2.',
    explanation: 'Hebat! Kiraan undur: 5, 4, 3, 2, 1!'
  },
  {
    id: 'cnt-25',
    number: 25,
    prompt: 'Kira undur dari sepuluh: 10, 9, 8, [ ? ], 6',
    clue: 'Sebelum nombor lapan.',
    audioText: 'Soalan 25. Kira undur dari sepuluh: sepuluh, sembilan, lapan, tempat kosong, enam.',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      { text: '11', subText: 'Sebelas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Sebelum nombor 8 ialah 7.',
    explanation: 'Tahniah! Adik berjaya menyelesaikan 25 soalan Kenal & Bilang Angka!'
  }
];

// ============================================================================
// MODUL 2: TAMBAH CERIA (+) — 25 SOALAN LENGKAP
// ============================================================================
export const ADDITION_QUIZZES: QuizQuestion[] = [
  {
    id: 'add-1',
    number: 1,
    prompt: 'Kira jumlah epal: 2 epal + 1 epal = ?',
    clue: 'Gabungkan dua epal dan satu epal.',
    audioText: 'Soalan 1. Kira jumlah epal: dua epal tambah satu epal sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 2, rightCount: 1, emoji: '🍎', leftText: '2 Epal', rightText: '1 Epal' },
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      { text: '2', subText: 'Dua' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Kira semua epal: 1, 2, 3!',
    explanation: 'Tepat! 2 + 1 = 3 epal.'
  },
  {
    id: 'add-2',
    number: 2,
    prompt: 'Kira jumlah bola: 3 bola + 2 bola = ?',
    clue: 'Kira semua bola bersama-sama.',
    audioText: 'Soalan 2. Kira jumlah bola: tiga bola tambah dua bola sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 3, rightCount: 2, emoji: '⚽', leftText: '3 Bola', rightText: '2 Bola' },
    choices: buatPilihan(
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima' },
      { text: '6', subText: 'Enam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Tiga campur dua jadi lima.',
    explanation: 'Bagus! 3 + 2 = 5 bola.'
  },
  {
    id: 'add-3',
    number: 3,
    prompt: 'Kira bintang: 4 bintang + 1 bintang = ?',
    clue: 'Empat bintang tambah satu bintang lagi.',
    audioText: 'Soalan 3. Empat bintang tambah satu bintang sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 4, rightCount: 1, emoji: '⭐', leftText: '4 Bintang', rightText: '1 Bintang' },
    choices: buatPilihan(
      { text: '6', subText: 'Enam' },
      { text: '3', subText: 'Tiga' },
      { text: '5', subText: 'Lima' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Selepas nombor empat ialah lima.',
    explanation: 'Tepat! 4 + 1 = 5 bintang.'
  },
  {
    id: 'add-4',
    number: 4,
    prompt: 'Kira belon: 2 belon + 2 belon = ?',
    clue: 'Dua campur dua.',
    audioText: 'Soalan 4. Dua belon tambah dua belon sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 2, rightCount: 2, emoji: '🎈', leftText: '2 Belon', rightText: '2 Belon' },
    choices: buatPilihan(
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima' },
      { text: '3', subText: 'Tiga' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Dua tambah dua bersamaan empat.',
    explanation: 'Hebat! 2 + 2 = 4 belon.'
  },
  {
    id: 'add-5',
    number: 5,
    prompt: 'Kira: 3 + 3 = ?',
    clue: 'Tiga kek cawan tambah tiga kek cawan.',
    audioText: 'Soalan 5. Tiga tambah tiga sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 3, rightCount: 3, emoji: '🧁', leftText: '3 Kek', rightText: '3 Kek' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '6', subText: 'Enam' },
      { text: '7', subText: 'Tujuh' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '3, 4, 5, 6!',
    explanation: 'Tepat! 3 + 3 = 6.'
  },
  {
    id: 'add-6',
    number: 6,
    prompt: 'Kira: 4 + 2 = ?',
    clue: 'Empat kereta tambah dua kereta.',
    audioText: 'Soalan 6. Empat tambah dua sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 4, rightCount: 2, emoji: '🚗', leftText: '4 Kereta', rightText: '2 Kereta' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      { text: '6', subText: 'Enam' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Mula dari 4, bilang dua lagi: 5, 6!',
    explanation: 'Bagus! 4 + 2 = 6.'
  },
  {
    id: 'add-7',
    number: 7,
    prompt: 'Kira: 5 + 1 = ?',
    clue: 'Lima jari tambah satu jari.',
    audioText: 'Soalan 7. Lima tambah satu sama dengan berapa?',
    choices: buatPilihan(
      { text: '6', subText: 'Enam' },
      { text: '7', subText: 'Tujuh' },
      { text: '5', subText: 'Lima' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Selepas lima ialah nombor enam.',
    explanation: 'Tepat! 5 + 1 = 6.'
  },
  {
    id: 'add-8',
    number: 8,
    prompt: 'Kira: 4 + 3 = ?',
    clue: 'Empat pisang tambah tiga pisang.',
    audioText: 'Soalan 8. Empat tambah tiga sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 4, rightCount: 3, emoji: '🍌', leftText: '4 Pisang', rightText: '3 Pisang' },
    choices: buatPilihan(
      { text: '6', subText: 'Enam' },
      { text: '7', subText: 'Tujuh' },
      { text: '8', subText: 'Lapan' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Empat campur tiga menjadi tujuh.',
    explanation: 'Tepat sekali! 4 + 3 = 7.'
  },
  {
    id: 'add-9',
    number: 9,
    prompt: 'Kira: 5 + 2 = ?',
    clue: 'Lima strawberi tambah dua strawberi.',
    audioText: 'Soalan 9. Lima tambah dua sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 5, rightCount: 2, emoji: '🍓', leftText: '5 Strawberi', rightText: '2 Strawberi' },
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '6', subText: 'Enam' },
      { text: '7', subText: 'Tujuh' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Kira selepas 5: 6, 7.',
    explanation: 'Bagus! 5 + 2 = 7.'
  },
  {
    id: 'add-10',
    number: 10,
    prompt: 'Kira: 6 + 2 = ?',
    clue: 'Enam ikan tambah dua ikan.',
    audioText: 'Soalan 10. Enam tambah dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '7', subText: 'Tujuh' },
      { text: '9', subText: 'Sembilan' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Enam campur dua jadi lapan.',
    explanation: 'Tepat! 6 + 2 = 8.'
  },
  {
    id: 'add-11',
    number: 11,
    prompt: 'Kira: 4 + 4 = ?',
    clue: 'Empat tambah empat.',
    audioText: 'Soalan 11. Empat tambah empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '8', subText: 'Lapan' },
      { text: '9', subText: 'Sembilan' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Dua kali ganda nombor 4.',
    explanation: 'Hebat! 4 + 4 = 8.'
  },
  {
    id: 'add-12',
    number: 12,
    prompt: 'Kira: 5 + 3 = ?',
    clue: 'Lima tambah tiga.',
    audioText: 'Soalan 12. Lima tambah tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '9', subText: 'Sembilan' },
      { text: '8', subText: 'Lapan' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Kira dari 5: 6, 7, 8.',
    explanation: 'Tepat sekali! 5 + 3 = 8.'
  },
  {
    id: 'add-13',
    number: 13,
    prompt: 'Kira: 5 + 4 = ?',
    clue: 'Lima campur empat.',
    audioText: 'Soalan 13. Lima tambah empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '9', subText: 'Sembilan' },
      { text: '8', subText: 'Lapan' },
      { text: '10', subText: 'Sepuluh' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Kurang satu dari sepuluh.',
    explanation: 'Tepat! 5 + 4 = 9.'
  },
  {
    id: 'add-14',
    number: 14,
    prompt: 'Kira: 6 + 3 = ?',
    clue: 'Enam tambah tiga.',
    audioText: 'Soalan 14. Enam tambah tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '9', subText: 'Sembilan' },
      { text: '10', subText: 'Sepuluh' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Selepas 6 ialah 7, 8, 9.',
    explanation: 'Bagus! 6 + 3 = 9.'
  },
  {
    id: 'add-15',
    number: 15,
    prompt: 'Kira: 7 + 2 = ?',
    clue: 'Tujuh campur dua.',
    audioText: 'Soalan 15. Tujuh tambah dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Tujuh, lapan, sembilan!',
    explanation: 'Tepat! 7 + 2 = 9.'
  },
  {
    id: 'add-16',
    number: 16,
    prompt: 'Kira jumlah jari kedua-dua belah tangan: 5 + 5 = ?',
    clue: 'Lima jari kiri tambah lima jari kanan.',
    audioText: 'Soalan 16. Lima tambah lima sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 5, rightCount: 5, emoji: '🖐️', leftText: '5 Jari', rightText: '5 Jari' },
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      { text: '11', subText: 'Sebelas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Dua tangan lengkap mempunyai sepuluh jari.',
    explanation: 'Tepat sekali! 5 + 5 = 10 jari.'
  },
  {
    id: 'add-17',
    number: 17,
    prompt: 'Kira: 8 + 2 = ?',
    clue: 'Lapan tambah dua.',
    audioText: 'Soalan 17. Lapan tambah dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '9', subText: 'Sembilan' },
      { text: '10', subText: 'Sepuluh' },
      { text: '11', subText: 'Sebelas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Lapan, sembilan, sepuluh!',
    explanation: 'Hebat! 8 + 2 = 10.'
  },
  {
    id: 'add-18',
    number: 18,
    prompt: 'Kira: 7 + 3 = ?',
    clue: 'Tujuh tambah tiga.',
    audioText: 'Soalan 18. Tujuh tambah tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '9', subText: 'Sembilan' },
      { text: '11', subText: 'Sebelas' },
      { text: '10', subText: 'Sepuluh' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Cukup sepuluh.',
    explanation: 'Tepat! 7 + 3 = 10.'
  },
  {
    id: 'add-19',
    number: 19,
    prompt: 'Kira: 9 + 1 = ?',
    clue: 'Sembilan tambah satu lagi.',
    audioText: 'Soalan 19. Sembilan tambah satu sama dengan berapa?',
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '8', subText: 'Lapan' },
      { text: '11', subText: 'Sebelas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Selepas sembilan ialah sepuluh.',
    explanation: 'Bagus! 9 + 1 = 10.'
  },
  {
    id: 'add-20',
    number: 20,
    prompt: 'Kira: 10 + 2 = ?',
    clue: 'Sepuluh tambah dua.',
    audioText: 'Soalan 20. Sepuluh tambah dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '11', subText: 'Sebelas' },
      { text: '12', subText: 'Dua Belas' },
      { text: '13', subText: 'Tiga Belas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Sepuluh campur dua = dua belas.',
    explanation: 'Tepat! 10 + 2 = 12.'
  },
  {
    id: 'add-21',
    number: 21,
    prompt: 'Kira: 10 + 3 = ?',
    clue: 'Sepuluh tambah tiga gula-gula.',
    audioText: 'Soalan 21. Sepuluh tambah tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '12', subText: 'Dua Belas' },
      { text: '14', subText: 'Empat Belas' },
      { text: '13', subText: 'Tiga Belas' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Sepuluh dan tiga ialah tiga belas.',
    explanation: 'Hebat! 10 + 3 = 13.'
  },
  {
    id: 'add-22',
    number: 22,
    prompt: 'Kira: 10 + 5 = ?',
    clue: 'Sepuluh tambah lima.',
    audioText: 'Soalan 22. Sepuluh tambah lima sama dengan berapa?',
    choices: buatPilihan(
      { text: '15', subText: 'Lima Belas' },
      { text: '14', subText: 'Empat Belas' },
      { text: '16', subText: 'Enam Belas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Sepuluh campur lima jadi lima belas.',
    explanation: 'Tepat sekali! 10 + 5 = 15.'
  },
  {
    id: 'add-23',
    number: 23,
    prompt: 'Kira: 10 + 7 = ?',
    clue: 'Sepuluh tambah tujuh belon.',
    audioText: 'Soalan 23. Sepuluh tambah tujuh sama dengan berapa?',
    choices: buatPilihan(
      { text: '16', subText: 'Enam Belas' },
      { text: '17', subText: 'Tujuh Belas' },
      { text: '18', subText: 'Lapan Belas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Tujuh belas.',
    explanation: 'Bagus! 10 + 7 = 17.'
  },
  {
    id: 'add-24',
    number: 24,
    prompt: 'Kira: 10 + 10 = ?',
    clue: 'Dua kumpulan sepuluh.',
    audioText: 'Soalan 24. Sepuluh tambah sepuluh sama dengan berapa?',
    choices: buatPilihan(
      { text: '19', subText: 'Sembilan Belas' },
      { text: '15', subText: 'Lima Belas' },
      { text: '20', subText: 'Dua Puluh' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Sepuluh campur sepuluh jadi dua puluh.',
    explanation: 'Tepat! 10 + 10 = 20.'
  },
  {
    id: 'add-25',
    number: 25,
    prompt: 'Ali ada 3 biji bola. Cikgu beri 4 biji bola lagi. Berapakah jumlah bola Ali sekarang?',
    clue: 'Kira 3 tambah 4.',
    audioText: 'Soalan 25. Ali ada 3 biji bola. Cikgu beri 4 biji bola lagi. Berapakah jumlah bola Ali?',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh Bola' },
      { text: '6', subText: 'Enam Bola' },
      { text: '8', subText: 'Lapan Bola' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '3 + 4 = 7 bola.',
    explanation: 'Tahniah! 3 + 4 = 7 biji bola. Adik telah melengkapkan 25 soalan Tambah Ceria!'
  }
];

// ============================================================================
// MODUL 3: TOLAK MUDAH (-) — 25 SOALAN LENGKAP
// ============================================================================
export const SUBTRACTION_QUIZZES: QuizQuestion[] = [
  {
    id: 'sub-1',
    number: 1,
    prompt: 'Ada 3 biji belon. 1 biji belon telah meletup (❌). Berapakah yang tinggal?',
    clue: 'Kira belon yang tidak berpalang ❌.',
    audioText: 'Soalan 1. Ada 3 biji belon. Satu belon telah meletup. Tinggal berapa belon?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 3, removeCount: 1, emoji: '🎈', name: 'belon' },
    choices: buatPilihan(
      { text: '1', subText: 'Satu' },
      { text: '2', subText: 'Dua' },
      { text: '3', subText: 'Tiga' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Tiga tolak satu tinggal dua.',
    explanation: 'Tepat! 3 - 1 = 2 belon masih elok.'
  },
  {
    id: 'sub-2',
    number: 2,
    prompt: 'Ada 4 biji kek cawan. 1 telah dimakan (❌). Tinggal berapa kek?',
    clue: 'Empat buang satu.',
    audioText: 'Soalan 2. Ada empat kek cawan. Satu telah dimakan. Tinggal berapa kek?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 4, removeCount: 1, emoji: '🧁', name: 'kek cawan' },
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '4', subText: 'Empat' },
      { text: '3', subText: 'Tiga' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '4 tolak 1 = 3.',
    explanation: 'Bagus! 4 - 1 = 3 kek cawan.'
  },
  {
    id: 'sub-3',
    number: 3,
    prompt: 'Ada 5 biji epal. 2 telah busuk (❌). Tinggal berapa epal yang elok?',
    clue: 'Kira epal tanpa tanda pangkah.',
    audioText: 'Soalan 3. Ada lima biji epal. Dua telah rosak. Tinggal berapa epal?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 5, removeCount: 2, emoji: '🍎', name: 'epal' },
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '2', subText: 'Dua' },
      { text: '4', subText: 'Empat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Lima tolak dua tinggal tiga.',
    explanation: 'Tepat sekali! 5 - 2 = 3 epal.'
  },
  {
    id: 'sub-4',
    number: 4,
    prompt: 'Kira: 4 - 2 = ?',
    clue: 'Empat kereta tolak dua kereta.',
    audioText: 'Soalan 4. Empat tolak dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '1', subText: 'Satu' },
      { text: '2', subText: 'Dua' },
      { text: '3', subText: 'Tiga' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Separuh daripada empat ialah dua.',
    explanation: 'Hebat! 4 - 2 = 2.'
  },
  {
    id: 'sub-5',
    number: 5,
    prompt: 'Ada 5 biji belon. 3 biji meletup (❌). Berapakah baki belon?',
    clue: 'Lima tolak tiga.',
    audioText: 'Soalan 5. Ada lima biji belon. Tiga meletup. Berapakah baki belon?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 5, removeCount: 3, emoji: '🎈', name: 'belon' },
    choices: buatPilihan(
      { text: '1', subText: 'Satu' },
      { text: '3', subText: 'Tiga' },
      { text: '2', subText: 'Dua' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Tinggal dua biji belon.',
    explanation: 'Tepat! 5 - 3 = 2 belon.'
  },
  {
    id: 'sub-6',
    number: 6,
    prompt: 'Kira: 6 - 1 = ?',
    clue: 'Enam buang satu.',
    audioText: 'Soalan 6. Enam tolak satu sama dengan berapa?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '4', subText: 'Empat' },
      { text: '6', subText: 'Enam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Nombor sebelum enam ialah lima.',
    explanation: 'Bagus! 6 - 1 = 5.'
  },
  {
    id: 'sub-7',
    number: 7,
    prompt: 'Ada 6 biji strawberi. 3 telah dimakan (❌). Tinggal berapa?',
    clue: 'Enam tolak tiga.',
    audioText: 'Soalan 7. Ada enam biji strawberi. Tiga telah dimakan. Tinggal berapa strawberi?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 6, removeCount: 3, emoji: '🍓', name: 'strawberi' },
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Separuh daripada 6 ialah 3.',
    explanation: 'Tepat! 6 - 3 = 3 strawberi.'
  },
  {
    id: 'sub-8',
    number: 8,
    prompt: 'Kira: 6 - 4 = ?',
    clue: 'Enam tolak empat.',
    audioText: 'Soalan 8. Enam tolak empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '1', subText: 'Satu' },
      { text: '2', subText: 'Dua' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Enam buang empat tinggal dua.',
    explanation: 'Hebat! 6 - 4 = 2.'
  },
  {
    id: 'sub-9',
    number: 9,
    prompt: 'Kira: 7 - 2 = ?',
    clue: 'Tujuh tolak dua.',
    audioText: 'Soalan 9. Tujuh tolak dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '4', subText: 'Empat' },
      { text: '6', subText: 'Enam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Undur 2 langkah dari 7: 6, 5!',
    explanation: 'Tepat sekali! 7 - 2 = 5.'
  },
  {
    id: 'sub-10',
    number: 10,
    prompt: 'Kira: 7 - 3 = ?',
    clue: 'Tujuh tolak tiga.',
    audioText: 'Soalan 10. Tujuh tolak tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Tujuh buang tiga tinggal empat.',
    explanation: 'Bagus! 7 - 3 = 4.'
  },
  {
    id: 'sub-11',
    number: 11,
    prompt: 'Ada 8 biji pisang. 4 telah dimakan monyet (❌). Berapakah baki?',
    clue: 'Lapan tolak empat.',
    audioText: 'Soalan 11. Ada lapan pisang. Empat dimakan monyet. Tinggal berapa pisang?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 8, removeCount: 4, emoji: '🍌', name: 'pisang' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Separuh daripada lapan ialah empat.',
    explanation: 'Tepat! 8 - 4 = 4 pisang.'
  },
  {
    id: 'sub-12',
    number: 12,
    prompt: 'Kira: 8 - 2 = ?',
    clue: 'Lapan tolak dua.',
    audioText: 'Soalan 12. Lapan tolak dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '6', subText: 'Enam' },
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Undur 2 dari 8: 7, 6.',
    explanation: 'Hebat! 8 - 2 = 6.'
  },
  {
    id: 'sub-13',
    number: 13,
    prompt: 'Kira: 8 - 5 = ?',
    clue: 'Lapan tolak lima.',
    audioText: 'Soalan 13. Lapan tolak lima sama dengan berapa?',
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Lapan buang lima tinggal tiga.',
    explanation: 'Tepat! 8 - 5 = 3.'
  },
  {
    id: 'sub-14',
    number: 14,
    prompt: 'Kira: 9 - 3 = ?',
    clue: 'Sembilan tolak tiga.',
    audioText: 'Soalan 14. Sembilan tolak tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      { text: '6', subText: 'Enam' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Sembilan buang tiga tinggal enam.',
    explanation: 'Bagus! 9 - 3 = 6.'
  },
  {
    id: 'sub-15',
    number: 15,
    prompt: 'Kira: 9 - 4 = ?',
    clue: 'Sembilan tolak empat.',
    audioText: 'Soalan 15. Sembilan tolak empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '4', subText: 'Empat' },
      { text: '6', subText: 'Enam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Sembilan buang empat tinggal lima.',
    explanation: 'Tepat sekali! 9 - 4 = 5.'
  },
  {
    id: 'sub-16',
    number: 16,
    prompt: 'Ada 10 jari. 5 jari digenggam (❌). Berapakah jari yang masih terbuka?',
    clue: 'Sepuluh tolak lima.',
    audioText: 'Soalan 16. Sepuluh tolak lima sama dengan berapa?',
    choices: buatPilihan(
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima' },
      { text: '6', subText: 'Enam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Sebelah tangan lagi terbuka = 5.',
    explanation: 'Tepat! 10 - 5 = 5.'
  },
  {
    id: 'sub-17',
    number: 17,
    prompt: 'Kira: 10 - 2 = ?',
    clue: 'Sepuluh tolak dua.',
    audioText: 'Soalan 17. Sepuluh tolak dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '9', subText: 'Sembilan' },
      { text: '8', subText: 'Lapan' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Sepuluh buang dua tinggal lapan.',
    explanation: 'Hebat! 10 - 2 = 8.'
  },
  {
    id: 'sub-18',
    number: 18,
    prompt: 'Kira: 10 - 4 = ?',
    clue: 'Sepuluh tolak empat.',
    audioText: 'Soalan 18. Sepuluh tolak empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '6', subText: 'Enam' },
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Sepuluh buang empat tinggal enam.',
    explanation: 'Tepat! 10 - 4 = 6.'
  },
  {
    id: 'sub-19',
    number: 19,
    prompt: 'Kira: 10 - 7 = ?',
    clue: 'Sepuluh tolak tujuh.',
    audioText: 'Soalan 19. Sepuluh tolak tujuh sama dengan berapa?',
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '3', subText: 'Tiga' },
      { text: '4', subText: 'Empat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Sepuluh buang tujuh tinggal tiga.',
    explanation: 'Bagus! 10 - 7 = 3.'
  },
  {
    id: 'sub-20',
    number: 20,
    prompt: 'Kira: 10 - 9 = ?',
    clue: 'Sepuluh tolak sembilan.',
    audioText: 'Soalan 20. Sepuluh tolak sembilan sama dengan berapa?',
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '0', subText: 'Sifar' },
      { text: '1', subText: 'Satu' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Hanya tinggal satu baki.',
    explanation: 'Tepat! 10 - 9 = 1.'
  },
  {
    id: 'sub-21',
    number: 21,
    prompt: 'Kira: 12 - 2 = ?',
    clue: 'Dua belas buang dua.',
    audioText: 'Soalan 21. Dua belas tolak dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      { text: '11', subText: 'Sebelas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Dua belas tolak nombor sa dua tinggal sepuluh.',
    explanation: 'Hebat! 12 - 2 = 10.'
  },
  {
    id: 'sub-22',
    number: 22,
    prompt: 'Kira: 15 - 5 = ?',
    clue: 'Lima belas tolak lima.',
    audioText: 'Soalan 22. Lima belas tolak lima sama dengan berapa?',
    choices: buatPilihan(
      { text: '9', subText: 'Sembilan' },
      { text: '10', subText: 'Sepuluh' },
      { text: '11', subText: 'Sebelas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Lima belas buang lima tinggal sepuluh.',
    explanation: 'Tepat! 15 - 5 = 10.'
  },
  {
    id: 'sub-23',
    number: 23,
    prompt: 'Kira: 18 - 8 = ?',
    clue: 'Lapan belas tolak lapan.',
    audioText: 'Soalan 23. Lapan belas tolak lapan sama dengan berapa?',
    choices: buatPilihan(
      { text: '8', subText: 'Lapan' },
      { text: '12', subText: 'Dua Belas' },
      { text: '10', subText: 'Sepuluh' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Tinggal nilai puluh iaitu 10.',
    explanation: 'Bagus! 18 - 8 = 10.'
  },
  {
    id: 'sub-24',
    number: 24,
    prompt: 'Kira: 20 - 10 = ?',
    clue: 'Dua puluh tolak sepuluh.',
    audioText: 'Soalan 24. Dua puluh tolak sepuluh sama dengan berapa?',
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '15', subText: 'Lima Belas' },
      { text: '5', subText: 'Lima' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Separuh daripada 20 ialah 10.',
    explanation: 'Tepat sekali! 20 - 10 = 10.'
  },
  {
    id: 'sub-25',
    number: 25,
    prompt: 'Siti ada 6 batang pensel warna. Dia beri 2 batang kepada adiknya. Berapakah baki pensel Siti?',
    clue: 'Kira 6 tolak 2.',
    audioText: 'Soalan 25. Siti ada enam batang pensel. Dia beri dua batang kepada adiknya. Tinggal berapa pensel Siti?',
    choices: buatPilihan(
      { text: '3', subText: 'Tiga Pensel' },
      { text: '4', subText: 'Empat Pensel' },
      { text: '5', subText: 'Lima Pensel' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '6 - 2 = 4 pensel.',
    explanation: 'Tahniah! 6 - 2 = 4 pensel. Adik berjaya selesaikan 25 soalan Tolak Mudah!'
  }
];

// ============================================================================
// MODUL 4: WANG SAKU CERIA (RM & SEN) — 25 SOALAN LENGKAP
// ============================================================================
export const MONEY_QUIZZES: QuizQuestion[] = [
  {
    id: 'mny-1',
    number: 1,
    prompt: 'Apakah nilai duit syiling perak paling kecil dengan angka 5 ini?',
    clue: 'Syiling 5 sen.',
    audioText: 'Soalan 1. Apakah nilai duit syiling perak paling kecil dengan angka 5 ini?',
    visualType: 'money-display',
    visualData: { item: 'coin-5sen' },
    choices: buatPilihan(
      { text: '5 Sen', subText: 'Lima Sen', emoji: '🪙 5¢' },
      { text: '50 Sen', subText: 'Lima Puluh Sen', emoji: '🪙 50¢' },
      { text: 'RM 5', subText: 'Lima Ringgit', emoji: '💵 RM5' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Perhatikan angka 5 pada duit syiling perak.',
    explanation: 'Tepat! Ini adalah duit syiling 5 Sen.'
  },
  {
    id: 'mny-2',
    number: 2,
    prompt: 'Apakah nilai duit syiling perak dengan corak Orang Asli dan angka 10 ini?',
    clue: 'Syiling 10 sen.',
    audioText: 'Soalan 2. Apakah nilai duit syiling perak dengan corak Orang Asli dan angka 10 ini?',
    visualType: 'money-display',
    visualData: { item: 'coin-10sen' },
    choices: buatPilihan(
      { text: '5 Sen', subText: 'Lima Sen', emoji: '🪙 5¢' },
      { text: '10 Sen', subText: 'Sepuluh Sen', emoji: '🪙 10¢' },
      { text: '20 Sen', subText: 'Dua Puluh Sen', emoji: '🪙 20¢' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Angka 10 pada duit perak = 10 Sen.',
    explanation: 'Bagus! Syiling ini bernilai 10 Sen.'
  },
  {
    id: 'mny-3',
    number: 3,
    prompt: 'Duit syiling berwarna KUNING KEEMASAN dengan angka 20 ini bernilai berapa?',
    clue: 'Syiling warna emas.',
    audioText: 'Soalan 3. Duit syiling berwarna kuning keemasan dengan angka 20 ini bernilai berapa?',
    visualType: 'money-display',
    visualData: { item: 'coin-20sen' },
    choices: buatPilihan(
      { text: '10 Sen', subText: 'Sepuluh Sen', emoji: '🪙 10¢' },
      { text: '50 Sen', subText: 'Lima Puluh Sen', emoji: '🪙 50¢' },
      { text: '20 Sen', subText: 'Dua Puluh Sen', emoji: '🪙 20¢' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Warna emas kuning dan ada nombor 20.',
    explanation: 'Tepat! Syiling kuning emas ini bernilai 20 Sen.'
  },
  {
    id: 'mny-4',
    number: 4,
    prompt: 'Apakah nilai duit syiling kuning emas yang paling besar ini?',
    clue: 'Syiling 50 sen.',
    audioText: 'Soalan 4. Apakah nilai duit syiling kuning emas yang paling besar ini?',
    visualType: 'money-display',
    visualData: { item: 'coin-50sen' },
    choices: buatPilihan(
      { text: '50 Sen', subText: 'Lima Puluh Sen', emoji: '🪙 50¢' },
      { text: '5 Sen', subText: 'Lima Sen', emoji: '🪙 5¢' },
      { text: 'RM 5', subText: 'Lima Ringgit', emoji: '💵 RM5' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Saiz terbesar antara syiling Malaysia = 50 Sen.',
    explanation: 'Tepat sekali! Syiling ini bernilai 50 Sen.'
  },
  {
    id: 'mny-5',
    number: 5,
    prompt: 'Duit syiling 20 Sen dan 50 Sen Malaysia berwarna apakah?',
    clue: 'Bukan warna perak kelabu.',
    audioText: 'Soalan 5. Duit syiling dua puluh sen dan lima puluh sen Malaysia berwarna apakah?',
    choices: buatPilihan(
      { text: 'Perak Kelabu', subText: 'Macam 5 sen & 10 sen' },
      { text: 'Kuning Keemasan', subText: 'Warna Emas Bersinar' },
      { text: 'Merah Terang', subText: 'Warna Merah' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Syiling 20 sen dan 50 sen berwarna kuning emas.',
    explanation: 'Bagus! Syiling 20 sen dan 50 sen berwarna kuning keemasan.'
  },
  {
    id: 'mny-6',
    number: 6,
    prompt: 'Duit syiling 5 Sen dan 10 Sen Malaysia berwarna apakah?',
    clue: 'Warna perak kelabu.',
    audioText: 'Soalan 6. Duit syiling lima sen dan sepuluh sen Malaysia berwarna apakah?',
    choices: buatPilihan(
      { text: 'Kuning Emas', subText: 'Emas' },
      { text: 'Hijau', subText: 'Warna Hijau' },
      { text: 'Perak (Kelabu)', subText: 'Warna Perak' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Warna perak seperti besi putih.',
    explanation: 'Tepat! Syiling 5 sen dan 10 sen berwarna perak.'
  },
  {
    id: 'mny-7',
    number: 7,
    prompt: 'Motif bunga apakah yang terdapat pada duit syiling 20 Sen Malaysia?',
    clue: 'Bunga putih berbau harum.',
    audioText: 'Soalan 7. Motif bunga apakah yang terdapat pada duit syiling dua puluh sen Malaysia?',
    choices: buatPilihan(
      { text: 'Bunga Melur', subText: 'Bunga Melur Harum' },
      { text: 'Bunga Matahari', subText: 'Matahari' },
      { text: 'Bunga Mawar', subText: 'Ros' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Bunga Melur pada syiling 20 sen.',
    explanation: 'Hebat! Syiling 20 sen memaparkan motif Bunga Melur.'
  },
  {
    id: 'mny-8',
    number: 8,
    prompt: 'Wang kertas berwarna BIRU dengan angka 1 ini bernilai berapa ringgit?',
    clue: 'Not biru Malaysia.',
    audioText: 'Soalan 8. Wang kertas berwarna biru dengan angka 1 ini bernilai berapa ringgit?',
    visualType: 'money-display',
    visualData: { item: 'note-rm1' },
    choices: buatPilihan(
      { text: 'RM 5', subText: 'Lima Ringgit', emoji: '💵' },
      { text: 'RM 1', subText: 'Satu Ringgit', emoji: '💵' },
      { text: 'RM 10', subText: 'Sepuluh Ringgit', emoji: '💵' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Warna biru = RM 1.',
    explanation: 'Tepat! Wang kertas warna biru bernilai RM 1 (Satu Ringgit).'
  },
  {
    id: 'mny-9',
    number: 9,
    prompt: 'Wang kertas berwarna HIJAU ini bernilai berapa ringgit?',
    clue: 'Not hijau Malaysia.',
    audioText: 'Soalan 9. Wang kertas berwarna hijau ini bernilai berapa ringgit?',
    visualType: 'money-display',
    visualData: { item: 'note-rm5' },
    choices: buatPilihan(
      { text: 'RM 1', subText: 'Satu Ringgit' },
      { text: 'RM 20', subText: 'Dua Puluh Ringgit' },
      { text: 'RM 5', subText: 'Lima Ringgit' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Warna hijau = RM 5.',
    explanation: 'Bagus! Not hijau bernilai RM 5.'
  },
  {
    id: 'mny-10',
    number: 10,
    prompt: 'Wang kertas berwarna MERAH ini bernilai berapa ringgit?',
    clue: 'Not merah dengan bunga Rafflesia.',
    audioText: 'Soalan 10. Wang kertas berwarna merah ini bernilai berapa ringgit?',
    visualType: 'money-display',
    visualData: { item: 'note-rm10' },
    choices: buatPilihan(
      { text: 'RM 10', subText: 'Sepuluh Ringgit' },
      { text: 'RM 5', subText: 'Lima Ringgit' },
      { text: 'RM 50', subText: 'Lima Puluh Ringgit' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Warna merah = RM 10.',
    explanation: 'Tepat sekali! Wang kertas merah bernilai RM 10.'
  },
  {
    id: 'mny-11',
    number: 11,
    prompt: 'Wang kertas berwarna JINGGA (Oren) dengan gambar Penyu Karah bernilai:',
    clue: 'Not jingga RM 20.',
    audioText: 'Soalan 11. Wang kertas berwarna jingga oren bernilai berapa?',
    visualType: 'money-display',
    visualData: { item: 'note-rm20' },
    choices: buatPilihan(
      { text: 'RM 10', subText: 'Sepuluh Ringgit' },
      { text: 'RM 20', subText: 'Dua Puluh Ringgit' },
      { text: 'RM 50', subText: 'Lima Puluh Ringgit' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Warna oren jingga = RM 20.',
    explanation: 'Hebat! Wang kertas warna jingga bernilai RM 20.'
  },
  {
    id: 'mny-12',
    number: 12,
    prompt: 'Wang kertas berwarna BIRU KEHIJAUAN dengan gambar Kelapa Sawit ini bernilai:',
    clue: 'Not RM 50.',
    audioText: 'Soalan 12. Wang kertas berwarna biru kehijauan bernilai berapa?',
    visualType: 'money-display',
    visualData: { item: 'note-rm50' },
    choices: buatPilihan(
      { text: 'RM 20', subText: 'Dua Puluh Ringgit' },
      { text: 'RM 10', subText: 'Sepuluh Ringgit' },
      { text: 'RM 50', subText: 'Lima Puluh Ringgit' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Angka 50 pada wang kertas = RM 50.',
    explanation: 'Tepat! Ini adalah wang kertas bernilai RM 50.'
  },
  {
    id: 'mny-13',
    number: 13,
    prompt: 'Gambar tradisional apakah yang terdapat pada wang kertas RM 1 warna biru?',
    clue: 'Layang-layang tradisional Kelantan.',
    audioText: 'Soalan 13. Gambar tradisional apakah yang terdapat pada wang kertas satu ringgit?',
    choices: buatPilihan(
      { text: 'Wau Bulan 🪁', subText: 'Wau Bulan Tradisional' },
      { text: 'Gasing Uri 🌀', subText: 'Gasing' },
      { text: 'Congkak Kayu 🪵', subText: 'Congkak' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Wau Bulan terbang tinggi.',
    explanation: 'Tepat! Wang kertas RM 1 memaparkan Wau Bulan.'
  },
  {
    id: 'mny-14',
    number: 14,
    prompt: 'Burung apakah yang terdapat pada wang kertas RM 5 warna hijau?',
    clue: 'Burung lambang negeri Sarawak.',
    audioText: 'Soalan 14. Burung apakah yang terdapat pada wang kertas lima ringgit?',
    choices: buatPilihan(
      { text: 'Burung Helang 🦅', subText: 'Helang' },
      { text: 'Burung Enggang 🦜', subText: 'Burung Enggang Badak' },
      { text: 'Burung Merpati 🕊️', subText: 'Merpati' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Burung Enggang paruh besar.',
    explanation: 'Bagus! Not RM 5 memaparkan Burung Enggang.'
  },
  {
    id: 'mny-15',
    number: 15,
    prompt: 'Bunga apakah yang terbesar di dunia terdapat pada wang kertas RM 10 warna merah?',
    clue: 'Bunga gergasi di Sabah.',
    audioText: 'Soalan 15. Bunga apakah yang terdapat pada wang kertas sepuluh ringgit?',
    choices: buatPilihan(
      { text: 'Bunga Raya 🌺', subText: 'Bunga Kebangsaan' },
      { text: 'Bunga Melur 🌼', subText: 'Bunga Melur' },
      { text: 'Bunga Rafflesia 🌺', subText: 'Bunga Rafflesia Gergasi' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Bunga Rafflesia warna merah.',
    explanation: 'Tepat! Not RM 10 memaparkan Bunga Rafflesia.'
  },
  {
    id: 'mny-16',
    number: 16,
    prompt: 'Haiwan laut apakah yang terdapat pada wang kertas RM 20 warna jingga?',
    clue: 'Penyu yang mendarat di Terengganu.',
    audioText: 'Soalan 16. Haiwan apakah yang terdapat pada wang kertas dua puluh ringgit?',
    choices: buatPilihan(
      { text: 'Penyu Karah 🐢', subText: 'Penyu Karah & Belimbing' },
      { text: 'Ikan Lumba-Lumba 🐬', subText: 'Ikan Lumba-lumba' },
      { text: 'Ketam Pantai 🦀', subText: 'Ketam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Penyu berenang di lautan.',
    explanation: 'Tepat! Not RM 20 memaparkan Penyu Karah.'
  },
  {
    id: 'mny-17',
    number: 17,
    prompt: 'Pokok apakah yang terdapat pada wang kertas RM 50?',
    clue: 'Pokok menghasilkan minyak masak.',
    audioText: 'Soalan 17. Pokok apakah yang terdapat pada wang kertas lima puluh ringgit?',
    choices: buatPilihan(
      { text: 'Pokok Kelapa Biasa 🥥', subText: 'Pokok Kelapa' },
      { text: 'Kelapa Sawit 🌴', subText: 'Pokok Kelapa Sawit' },
      { text: 'Pokok Getah 🌳', subText: 'Pokok Getah' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Ladang kelapa sawit Malaysia.',
    explanation: 'Hebat! Not RM 50 memaparkan pokok Kelapa Sawit.'
  },
  {
    id: 'mny-18',
    number: 18,
    prompt: 'Sebatang pensel berharga RM 1. Wang kertas manakah yang patut diberi?',
    clue: 'Pensel RM 1.',
    audioText: 'Soalan 18. Sebatang pensel berharga satu ringgit. Wang manakah yang patut diberi?',
    choices: buatPilihan(
      { text: 'RM 10 (Merah)', subText: 'Sepuluh Ringgit' },
      { text: '50 Sen', subText: 'Duit Syiling' },
      { text: 'RM 1 (Biru)', subText: 'Satu Ringgit Biru' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Bayar dengan not biru RM 1.',
    explanation: 'Tepat! Berikan sekeping not biru bernilai RM 1.'
  },
  {
    id: 'mny-19',
    number: 19,
    prompt: 'Sebiji pemadam berharga RM 2. Berapakah keping not RM 1 yang diperlukan?',
    clue: '1 ringgit tambah 1 ringgit.',
    audioText: 'Soalan 19. Pemadam berharga dua ringgit. Berapakah keping not satu ringgit diperlukan?',
    choices: buatPilihan(
      { text: '2 Keping RM 1', subText: 'RM 1 + RM 1 = RM 2' },
      { text: '1 Keping RM 1', subText: 'Belum cukup' },
      { text: '5 Keping RM 1', subText: 'Terlebih' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'RM 1 + RM 1 = RM 2.',
    explanation: 'Bagus! Dua keping not RM 1 bersamaan RM 2.'
  },
  {
    id: 'mny-20',
    number: 20,
    prompt: 'Roti coklat di Kedai Runcit berharga RM 2. Wang manakah yang cukup untuk membayar?',
    clue: 'Perlu bayar RM 2.',
    audioText: 'Soalan 20. Roti berharga dua ringgit. Wang manakah yang mencukupi?',
    choices: buatPilihan(
      { text: 'Sekeping 20 Sen', subText: 'Syiling Sen' },
      { text: 'Dua Keping RM 1', subText: 'Jumlah RM 2' },
      { text: 'Sekeping RM 1 sahaja', subText: 'Kurang RM 1' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Dua keping RM 1 mencukupi untuk bayar RM 2.',
    explanation: 'Tepat sekali! Dua keping RM 1 bersamaan RM 2.'
  },
  {
    id: 'mny-21',
    number: 21,
    prompt: 'Buku latihan sekolah berharga RM 3. Berapakah keping wang RM 1 diperlukan?',
    clue: '1 + 1 + 1 = 3.',
    audioText: 'Soalan 21. Buku latihan berharga tiga ringgit. Berapakah keping wang satu ringgit diperlukan?',
    choices: buatPilihan(
      { text: '2 Keping RM 1', subText: 'Hanya RM 2' },
      { text: '4 Keping RM 1', subText: 'Terlebih RM 4' },
      { text: '3 Keping RM 1', subText: 'Tepat RM 3' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Tiga keping not RM 1.',
    explanation: 'Tepat! 3 keping not RM 1 bernilai RM 3.'
  },
  {
    id: 'mny-22',
    number: 22,
    prompt: 'Sekotak susu berkhasiat berharga RM 5. Wang kertas apakah yang patut dibayar kepada pekedai?',
    clue: 'Not warna hijau.',
    audioText: 'Soalan 22. Susu berharga lima ringgit. Wang kertas apa yang patut dibayar?',
    choices: buatPilihan(
      { text: 'Not RM 5 (Hijau)', subText: 'Tepat RM 5' },
      { text: 'Not RM 1 (Biru)', subText: 'Kurang RM 4' },
      { text: 'Syiling 50 Sen', subText: 'Hanya 50 sen' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Gunakan sekeping not hijau RM 5.',
    explanation: 'Bagus! Bayar menggunakan not RM 5 warna hijau.'
  },
  {
    id: 'mny-23',
    number: 23,
    prompt: 'Kotak pensel berharga RM 10. Wang kertas manakah yang bernilai RM 10?',
    clue: 'Warna merah.',
    audioText: 'Soalan 23. Kotak pensel berharga sepuluh ringgit. Wang kertas manakah bernilai RM 10?',
    choices: buatPilihan(
      { text: 'Not RM 1 (Biru)', subText: 'Satu Ringgit' },
      { text: 'Not RM 10 (Merah)', subText: 'Sepuluh Ringgit' },
      { text: 'Not RM 50 (Biru Hijau)', subText: 'Lima Puluh Ringgit' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Not warna merah bernilai RM 10.',
    explanation: 'Tepat! Not merah bernilai RM 10.'
  },
  {
    id: 'mny-24',
    number: 24,
    prompt: 'Dua keping not hijau RM 5 (RM 5 + RM 5) bersamaan dengan sekeping not apa?',
    clue: '5 tambah 5 jadi 10 ringgit.',
    audioText: 'Soalan 24. Dua keping not lima ringgit bersamaan dengan not apa?',
    choices: buatPilihan(
      { text: 'Not RM 1 (Biru)', subText: 'Satu Ringgit' },
      { text: 'Not RM 20 (Jingga)', subText: 'Dua Puluh Ringgit' },
      { text: 'Not RM 10 (Merah)', subText: 'Sepuluh Ringgit' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'RM 5 + RM 5 = RM 10.',
    explanation: 'Hebat! RM 5 + RM 5 bersamaan sekeping not RM 10 warna merah.'
  },
  {
    id: 'mny-25',
    number: 25,
    prompt: 'Berapakah jumlah wang jika kita ada 2 keping duit syiling 50 Sen (50¢ + 50¢)?',
    clue: 'Lima puluh sen campur lima puluh sen.',
    audioText: 'Soalan 25. Dua keping syiling lima puluh sen bersamaan dengan berapa ringgit?',
    choices: buatPilihan(
      { text: 'RM 1 (Satu Ringgit)', subText: '100 sen = RM 1' },
      { text: 'RM 5 (Lima Ringgit)', subText: 'Lima Ringgit' },
      { text: '20 Sen', subText: 'Dua Puluh Sen' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '50 sen + 50 sen = 100 sen = RM 1.',
    explanation: 'Tahniah! 50 sen + 50 sen = RM 1. Adik berjaya selesaikan 25 soalan Wang Saku Ceria!'
  }
];

// ============================================================================
// MODUL 5: JAM & WAKTU KITA — 25 SOALAN LENGKAP
// ============================================================================
export const TIME_QUIZZES: QuizQuestion[] = [
  {
    id: 'tim-1',
    number: 1,
    prompt: 'Jarum pendek menunjukkan angka 3, jarum panjang menunjukkan angka 12. Pukul berapakah ini?',
    clue: 'Tengok jarum pendek merah.',
    audioText: 'Soalan 1. Jarum pendek di angka tiga, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 3, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 2:00', subText: 'Dua Tepat' },
      { text: 'Pukul 3:00', subText: 'Tiga Tepat' },
      { text: 'Pukul 4:00', subText: 'Empat Tepat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Jarum pendek berada di nombor 3.',
    explanation: 'Tepat! Ini menunjukkan pukul 3:00 (Tiga tepat).'
  },
  {
    id: 'tim-2',
    number: 2,
    prompt: 'Jarum pendek menunjuk nombor 7, jarum panjang di nombor 12. Pukul berapakah waktu sarapan ini?',
    clue: 'Jarum pendek merah di angka 7.',
    audioText: 'Soalan 2. Jarum pendek di angka tujuh, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 7, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 6:00', subText: 'Enam Tepat' },
      { text: 'Pukul 8:00', subText: 'Lapan Tepat' },
      { text: 'Pukul 7:00', subText: 'Tujuh Tepat' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Jarum pendek merah di nombor 7.',
    explanation: 'Bagus! Ini adalah pukul 7:00 pagi.'
  },
  {
    id: 'tim-3',
    number: 3,
    prompt: 'Jam ini menunjukkan waktu rehat murid di sekolah (jarum pendek di 10, jarum panjang di 12):',
    clue: 'Jarum pendek di angka 10.',
    audioText: 'Soalan 3. Jarum pendek di angka sepuluh, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 10, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 10:00', subText: 'Sepuluh Tepat' },
      { text: 'Pukul 9:00', subText: 'Sembilan Tepat' },
      { text: 'Pukul 11:00', subText: 'Sebelas Tepat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Jarum pendek di nombor 10 = Pukul 10:00.',
    explanation: 'Tepat sekali! Pukul 10:00 pagi waktu rehat di sekolah.'
  },
  {
    id: 'tim-4',
    number: 4,
    prompt: 'Kedua-dua jarum pendek dan jarum panjang menunjuk tepat ke angka 12. Pukul berapakah ini?',
    clue: 'Tengah hari atau tengah malam.',
    audioText: 'Soalan 4. Kedua-dua jarum menunjuk ke nombor dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 12, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 6:00', subText: 'Enam Tepat' },
      { text: 'Pukul 12:00', subText: 'Dua Belas Tepat' },
      { text: 'Pukul 1:00', subText: 'Satu Tepat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Kedua-dua jarum bertemu di angka 12.',
    explanation: 'Hebat! Ini ialah pukul 12:00.'
  },
  {
    id: 'tim-5',
    number: 5,
    prompt: 'Jarum pendek di antara nombor 1 dan 2, jarum panjang di angka 6. Pukul berapakah ini?',
    clue: 'Pukul satu setengah.',
    audioText: 'Soalan 5. Jarum pendek di antara satu dan dua, jarum panjang di angka enam. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 1, minute: 30 },
    choices: buatPilihan(
      { text: 'Pukul 1:00', subText: 'Satu Tepat' },
      { text: 'Pukul 2:00', subText: 'Dua Tepat' },
      { text: 'Pukul 1:30', subText: 'Satu Setengah' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Jarum panjang di angka 6 = 30 minit (setengah jam).',
    explanation: 'Tepat! Pukul 1:30 (Satu setengah).'
  },
  {
    id: 'tim-6',
    number: 6,
    prompt: 'Jarum pendek di antara nombor 4 dan 5, jarum panjang di angka 6. Pukul berapa waktu bermain petang?',
    clue: 'Empat setengah.',
    audioText: 'Soalan 6. Jarum pendek di antara empat dan lima, jarum panjang di angka enam. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 4, minute: 30 },
    choices: buatPilihan(
      { text: 'Pukul 4:30', subText: 'Empat Setengah' },
      { text: 'Pukul 5:00', subText: 'Lima Tepat' },
      { text: 'Pukul 4:00', subText: 'Empat Tepat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Pukul 4:30 petang.',
    explanation: 'Bagus! Ini menunjukkan pukul 4:30.'
  },
  {
    id: 'tim-7',
    number: 7,
    prompt: 'Jarum pendek pada jam dinding berfungsi untuk menunjukkan apa?',
    clue: 'Jarum yang lebih pendek dan tebal.',
    audioText: 'Soalan 7. Jarum pendek pada jam dinding berfungsi untuk menunjukkan apa?',
    choices: buatPilihan(
      { text: 'Saat', subText: 'Jarum saat laju' },
      { text: 'JAM', subText: 'Waktu Jam' },
      { text: 'Minit', subText: 'Waktu Minit' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Jarum pendek warna merah menunjukkan JAM.',
    explanation: 'Tepat! Jarum pendek menunjukkan nilai JAM.'
  },
  {
    id: 'tim-8',
    number: 8,
    prompt: 'Jarum panjang pada jam dinding berfungsi untuk menunjukkan apa?',
    clue: 'Jarum yang lebih panjang.',
    audioText: 'Soalan 8. Jarum panjang pada jam dinding berfungsi untuk menunjukkan apa?',
    choices: buatPilihan(
      { text: 'Hari', subText: 'Hari' },
      { text: 'Jam', subText: 'Waktu Jam' },
      { text: 'MINIT', subText: 'Waktu Minit' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Jarum panjang warna biru menunjukkan MINIT.',
    explanation: 'Hebat! Jarum panjang menunjukkan MINIT.'
  },
  {
    id: 'tim-9',
    number: 9,
    prompt: 'Apabila jarum panjang menunjuk tepat ke angka 12, ini bermaksud waktu:',
    clue: 'Contohnya pukul 3:00 tepat.',
    audioText: 'Soalan 9. Apabila jarum panjang menunjuk tepat ke angka dua belas, ini bermaksud apa?',
    choices: buatPilihan(
      { text: 'Pukul Tepat (:00)', subText: 'Sifar Minit' },
      { text: 'Setengah Jam (:30)', subText: 'Tiga Puluh Minit' },
      { text: 'Suku Jam (:15)', subText: 'Lima Belas Minit' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Angka 12 bermaksud pukul tepat.',
    explanation: 'Tepat sekali! Jarum panjang di angka 12 bermaksud pukul tepat (:00).'
  },
  {
    id: 'tim-10',
    number: 10,
    prompt: 'Apabila jarum panjang menunjuk ke angka 6, ini bermaksud berapa minit?',
    clue: 'Setengah jam.',
    audioText: 'Soalan 10. Apabila jarum panjang menunjuk ke angka enam, ini bermaksud berapa minit?',
    choices: buatPilihan(
      { text: '10 Minit', subText: 'Sepuluh Minit' },
      { text: '30 Minit (Setengah Jam)', subText: 'Tiga Puluh Minit' },
      { text: '60 Minit', subText: 'Satu Jam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Angka 6 = 30 minit (setengah jam).',
    explanation: 'Bagus! Jarum panjang di angka 6 bermaksud 30 minit.'
  },
  {
    id: 'tim-11',
    number: 11,
    prompt: 'Pada waktu bilakah matahari baru terbit di ufuk timur dan kita bangun tidur?',
    clue: 'Pagi hari yang ceria.',
    audioText: 'Soalan 11. Pada waktu bilakah matahari baru terbit dan kita bangun tidur?',
    choices: buatPilihan(
      { text: 'Malam', subText: 'Waktu Gelap' },
      { text: 'Petang', subText: 'Matahari Terbenam' },
      { text: 'PAGI 🌅', subText: 'Waktu Pagi Ceria' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Matahari terbit waktu PAGI.',
    explanation: 'Tepat! Matahari terbit pada waktu PAGI.'
  },
  {
    id: 'tim-12',
    number: 12,
    prompt: 'Pada waktu bilakah matahari berada tepat di atas kepala dan cuaca sangat panas?',
    clue: 'Waktu makan tengah hari.',
    audioText: 'Soalan 12. Pada waktu bilakah matahari berada tegak di atas kepala?',
    choices: buatPilihan(
      { text: 'TENGAH HARI ☀️', subText: 'Pukul 12:00 - 2:00' },
      { text: 'Pagi', subText: 'Awal Pagi' },
      { text: 'Tengah Malam', subText: 'Waktu Tidur' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Waktu tengah hari matahari tegak di atas.',
    explanation: 'Tepat! Itu ialah waktu TENGAH HARI.'
  },
  {
    id: 'tim-13',
    number: 13,
    prompt: 'Pada waktu bilakah cuaca mula redup dan kita boleh bermain bola di padang?',
    clue: 'Selepas asar sebelum maghrib.',
    audioText: 'Soalan 13. Pada waktu bilakah cuaca redup dan sesuai untuk bermain bola di padang?',
    choices: buatPilihan(
      { text: 'Tengah Hari', subText: 'Cuaca Panas' },
      { text: 'PETANG 🌇', subText: 'Waktu Riadah di Padang' },
      { text: 'Tengah Malam', subText: 'Waktu Gelap' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Waktu petang untuk bermain di luar.',
    explanation: 'Bagus! Waktu PETANG sesuai untuk beriadah.'
  },
  {
    id: 'tim-14',
    number: 14,
    prompt: 'Pada waktu bilakah langit menjadi gelap, ada bulan dan bintang serta kita tidur?',
    clue: 'Waktu malam.',
    audioText: 'Soalan 14. Pada waktu bilakah langit gelap dengan bulan dan bintang?',
    choices: buatPilihan(
      { text: 'Pagi', subText: 'Matahari Terbit' },
      { text: 'Tengah Hari', subText: 'Cahaya Terang' },
      { text: 'MALAM 🌙', subText: 'Waktu Bulan & Bintang' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Bulan dan bintang muncul waktu MALAM.',
    explanation: 'Tepat! Waktu MALAM langit gelap dan ada bulan serta bintang.'
  },
  {
    id: 'tim-15',
    number: 15,
    prompt: 'Kita makan SARAPAN roti dan susu pada waktu apa sebelum pergi ke sekolah?',
    clue: 'Sarapan pagi.',
    audioText: 'Soalan 15. Kita makan sarapan pada waktu apa sebelum pergi ke sekolah?',
    choices: buatPilihan(
      { text: 'Pagi 🌅', subText: 'Sarapan Pagi' },
      { text: 'Malam', subText: 'Makan Malam' },
      { text: 'Petang', subText: 'Minum Petang' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Sarapan dimakan pada waktu PAGI.',
    explanation: 'Tepat sekali! Sarapan dimakan pada waktu PAGI.'
  },
  {
    id: 'tim-16',
    number: 16,
    prompt: 'Kita pulang dari sekolah dan makan nasi bersama lauk pada waktu apa?',
    clue: 'Makan tengah hari.',
    audioText: 'Soalan 16. Kita makan tengah hari pada waktu apa?',
    choices: buatPilihan(
      { text: 'Tengah Malam', subText: 'Waktu Tidur' },
      { text: 'Tengah Hari ☀️', subText: 'Makan Tengah Hari' },
      { text: 'Subuh', subText: 'Awal Pagi' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Waktu TENGAH HARI kita makan tengah hari.',
    explanation: 'Bagus! Waktu TENGAH HARI untuk makan bersama keluarga.'
  },
  {
    id: 'tim-17',
    number: 17,
    prompt: 'Pukul 5:00 petang biasanya murid PPKI melakukan aktiviti apa?',
    clue: 'Aktiviti riadah dan senaman.',
    audioText: 'Soalan 17. Pukul lima petang biasanya kita buat apa?',
    choices: buatPilihan(
      { text: 'Tidur lena di katil', subText: 'Bukan waktu tidur' },
      { text: 'Perhimpunan pagi sekolah', subText: 'Waktu pagi' },
      { text: 'Bermain bola di taman ⚽', subText: 'Riadah Petang' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Petang hari ialah masa bermain dan bersenam.',
    explanation: 'Hebat! Waktu petang sesuai untuk beriadah dan mengayuh basikal.'
  },
  {
    id: 'tim-18',
    number: 18,
    prompt: 'Pukul 9:00 malam adalah waktu yang paling sesuai untuk murid melakukan apa?',
    clue: 'Tidur awal untuk bangun pagi cergas.',
    audioText: 'Soalan 18. Pukul sembilan malam waktu sesuai untuk apa?',
    choices: buatPilihan(
      { text: 'Masuk tidur awal 🛌', subText: 'Rehat Minda & Tubuh' },
      { text: 'Bermain layang-layang di padang', subText: 'Gelap di luar' },
      { text: 'Matahari baru hendak terbit', subText: 'Itu pagi' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Tidur awal pada waktu malam.',
    explanation: 'Tepat! Waktu malam kita tidur awal supaya sihat dan cergas.'
  },
  {
    id: 'tim-19',
    number: 19,
    prompt: 'Bunyi kokokan ayam jantan biasanya kedengaran pada waktu apa?',
    clue: 'Kukuruyuk di waktu subuh/pagi.',
    audioText: 'Soalan 19. Bunyi kokokan ayam jantan kedengaran pada waktu apa?',
    choices: buatPilihan(
      { text: 'Tengah Malam', subText: 'Waktu Gelap' },
      { text: 'Pagi Hari 🐓', subText: 'Menyambut Matahari Terbit' },
      { text: 'Petang', subText: 'Menjelang Malam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Ayam berkokok pada waktu pagi.',
    explanation: 'Bagus! Ayam jantan berkokok pada waktu PAGI.'
  },
  {
    id: 'tim-20',
    number: 20,
    prompt: 'Berapakah jumlah jam dalam satu hari semalam?',
    clue: 'Dua kali putaran jam 12.',
    audioText: 'Soalan 20. Berapakah jumlah jam dalam satu hari semalam?',
    choices: buatPilihan(
      { text: '12 Jam', subText: 'Separuh Hari' },
      { text: '10 Jam', subText: 'Sepuluh Jam' },
      { text: '24 Jam', subText: 'Dua Puluh Empat Jam' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Satu hari ada 24 jam.',
    explanation: 'Tepat! Sehari semalam mempunyai 24 jam.'
  },
  {
    id: 'tim-21',
    number: 21,
    prompt: 'Jam menunjukkan pukul 8:00 pagi. Pada waktu ini kita berada di mana?',
    clue: 'Waktu belajar dengan guru.',
    audioText: 'Soalan 21. Jam pukul lapan pagi. Kita berada di mana?',
    choices: buatPilihan(
      { text: 'Di sekolah belajar bersama kawan 🏫', subText: 'Sesi Pembelajaran' },
      { text: 'Tidur lena di katil', subText: 'Sudah lewat' },
      { text: 'Melihat bintang di langit', subText: 'Waktu malam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Pukul 8:00 pagi kita berada di sekolah.',
    explanation: 'Tepat! Waktu pagi kita belajar di dalam bilik darjah.'
  },
  {
    id: 'tim-22',
    number: 22,
    prompt: 'Jarum pendek berada di angka 6, jarum panjang di angka 12. Pukul berapakah ini?',
    clue: 'Enam tepat.',
    audioText: 'Soalan 22. Jarum pendek di angka enam, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 6, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 12:00', subText: 'Dua Belas' },
      { text: 'Pukul 6:00', subText: 'Enam Tepat' },
      { text: 'Pukul 5:00', subText: 'Lima Tepat' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Jarum pendek di angka 6 = pukul 6:00.',
    explanation: 'Bagus! Ini adalah pukul 6:00.'
  },
  {
    id: 'tim-23',
    number: 23,
    prompt: 'Jarum pendek di angka 9, jarum panjang di angka 12. Jam menunjukkan:',
    clue: 'Sembilan tepat.',
    audioText: 'Soalan 23. Jarum pendek di angka sembilan, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 9, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 8:00', subText: 'Lapan Tepat' },
      { text: 'Pukul 10:00', subText: 'Sepuluh Tepat' },
      { text: 'Pukul 9:00', subText: 'Sembilan Tepat' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Jarum pendek di angka 9.',
    explanation: 'Tepat! Ini ialah pukul 9:00.'
  },
  {
    id: 'tim-24',
    number: 24,
    prompt: 'Jarum pendek berada di angka 11, jarum panjang di angka 12. Pukul berapa?',
    clue: 'Sebelas tepat.',
    audioText: 'Soalan 24. Jarum pendek di angka sebelas, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 11, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 11:00', subText: 'Sebelas Tepat' },
      { text: 'Pukul 12:00', subText: 'Dua Belas' },
      { text: 'Pukul 1:00', subText: 'Satu Tepat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Jarum pendek di nombor 11 = Pukul 11:00.',
    explanation: 'Hebat! Ini menunjukkan pukul 11:00.'
  },
  {
    id: 'tim-25',
    number: 25,
    prompt: 'Mengapakah kita perlu mengurus masa dengan bijak setiap hari?',
    clue: 'Disiplin masa membawa kejayaan.',
    audioText: 'Soalan 25. Mengapakah kita perlu mengurus masa dengan bijak?',
    choices: buatPilihan(
      { text: 'Supaya boleh tidur sepanjang hari', subText: 'Tidak sihat' },
      { text: 'Supaya hidup kita teratur, sihat dan cemerlang 🌟', subText: 'Murid Berdisiplin' },
      { text: 'Supaya sentiasa terlambat ke sekolah', subText: 'Tidak berdisiplin' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Masa itu emas, urus dengan bijak.',
    explanation: 'Tahniah! Pengurusan masa yang baik menjadikan kita murid PPKI yang cemerlang!'
  }
];

// ============================================================================
// MODUL 6: BENTUK & CORAK — 25 SOALAN LENGKAP
// ============================================================================
export const SHAPES_QUIZZES: QuizQuestion[] = [
  {
    id: 'shp-1',
    number: 1,
    prompt: 'Apakah nama bentuk berwarna merah yang bulat dan tiada sebarang bucu ini?',
    clue: 'Bentuk bulat seperti bola.',
    audioText: 'Soalan 1. Apakah nama bentuk yang bulat dan tiada bucu ini?',
    visualType: 'shape-display',
    visualData: { shape: 'bulatan' },
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: 'Ada 3 bucu', emoji: '🔺' },
      { text: 'Bulatan', subText: 'Tiada Bucu', emoji: '⭕' },
      { text: 'Segi Empat', subText: 'Ada 4 bucu', emoji: '🟦' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Bentuk seperti bola atau donat = Bulatan.',
    explanation: 'Tepat! Bentuk ini dinamakan Bulatan.'
  },
  {
    id: 'shp-2',
    number: 2,
    prompt: 'Bentuk ini mempunyai 3 bucu tajam dan 3 sisi lurus. Apakah namanya?',
    clue: 'Kira bucunya: satu, dua, tiga.',
    audioText: 'Soalan 2. Bentuk ini mempunyai tiga bucu dan tiga sisi lurus. Apakah namanya?',
    visualType: 'shape-display',
    visualData: { shape: 'segi-tiga' },
    choices: buatPilihan(
      { text: 'Bulatan', subText: 'Tiada bucu', emoji: '⭕' },
      { text: 'Bujur', subText: 'Seperti telur', emoji: '🥚' },
      { text: 'Segi Tiga', subText: 'Tiga Bucu', emoji: '🔺' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '3 bucu = Segi Tiga.',
    explanation: 'Bagus! Bentuk 3 bucu ialah Segi Tiga.'
  },
  {
    id: 'shp-3',
    number: 3,
    prompt: 'Bentuk ini mempunyai 4 sisi yang SAMA PANJANG seperti dadu permainan:',
    clue: 'Semua empat sisinya sama ukuran.',
    audioText: 'Soalan 3. Bentuk ini mempunyai empat sisi sama panjang seperti dadu permainan. Apakah namanya?',
    visualType: 'shape-display',
    visualData: { shape: 'segi-empat-sama' },
    choices: buatPilihan(
      { text: 'Segi Empat Sama', subText: '4 Sisi Sama Panjang', emoji: '🟦' },
      { text: 'Bulatan', subText: 'Sisi melengkung', emoji: '⭕' },
      { text: 'Bintang', subText: '5 puncak', emoji: '⭐' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Empat sisi sama panjang = Segi Empat Sama.',
    explanation: 'Tepat sekali! Ini adalah Segi Empat Sama.'
  },
  {
    id: 'shp-4',
    number: 4,
    prompt: 'Bentuk ini mempunyai 4 bucu dengan 2 sisi panjang dan 2 sisi pendek seperti pintu bilik:',
    clue: 'Bentuk pintu atau papan putih.',
    audioText: 'Soalan 4. Bentuk ini mempunyai dua sisi panjang dan dua sisi pendek seperti pintu. Apakah namanya?',
    visualType: 'shape-display',
    visualData: { shape: 'segi-empat-tepat' },
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: '3 bucu' },
      { text: 'Segi Empat Tepat', subText: 'Panjang & Pendek' },
      { text: 'Bulatan', subText: 'Tiada bucu' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Pintu dan buku latihan berbentuk Segi Empat Tepat.',
    explanation: 'Hebat! Ini ialah Segi Empat Tepat.'
  },
  {
    id: 'shp-5',
    number: 5,
    prompt: 'Bentuk bersinar dengan 5 puncak bucu yang kita lihat di langit malam dinamakan:',
    clue: 'Bintang berkelip-kelip.',
    audioText: 'Soalan 5. Bentuk bersinar dengan lima puncak bucu dinamakan apa?',
    visualType: 'shape-display',
    visualData: { shape: 'bintang' },
    choices: buatPilihan(
      { text: 'Bujur', subText: 'Seperti telur' },
      { text: 'Bulatan', subText: 'Bulat' },
      { text: 'Bintang ⭐', subText: 'Lima Puncak' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Bintang di langit mempunyai 5 puncak.',
    explanation: 'Tepat! Bentuk ini dinamakan Bintang.'
  },
  {
    id: 'shp-6',
    number: 6,
    prompt: 'Bentuk bulat lonjong melengkung seperti sebiji telur ayam dinamakan:',
    clue: 'Telur ayam atau bola ragbi.',
    audioText: 'Soalan 6. Bentuk bulat lonjong seperti telur ayam dinamakan apa?',
    visualType: 'shape-display',
    visualData: { shape: 'bujur' },
    choices: buatPilihan(
      { text: 'Bujur (Oval) 🥚', subText: 'Lonjong Melengkung' },
      { text: 'Segi Tiga', subText: 'Tiga bucu' },
      { text: 'Segi Empat', subText: 'Empat bucu' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Bentuk telur dinamakan Bujur.',
    explanation: 'Bagus! Bentuk ini ialah Bujur (Oval).'
  },
  {
    id: 'shp-7',
    number: 7,
    prompt: 'Sebiji bola sepak yang ditendang di padang mempunyai bentuk apa?',
    clue: 'Boleh bergolek dengan laju.',
    audioText: 'Soalan 7. Sebiji bola sepak mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Empat', subText: 'Ada bucu' },
      { text: 'Bulatan ⚽', subText: 'Bulat Sempurna' },
      { text: 'Segi Tiga', subText: 'Tajam bucu' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Bola sepak berbentuk Bulatan.',
    explanation: 'Tepat! Bola sepak berbentuk Bulatan.'
  },
  {
    id: 'shp-8',
    number: 8,
    prompt: 'Sebiji donat manis berlubang di tengah mempunyai bentuk apa?',
    clue: 'Bulat berputar.',
    audioText: 'Soalan 8. Sebiji donat manis berlubang di tengah mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: 'Tiga sisi' },
      { text: 'Bintang', subText: 'Bucu tajam' },
      { text: 'Bulatan 🍩', subText: 'Bentuk Bulat' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Donat berbentuk Bulatan.',
    explanation: 'Tepat sekali! Donat mempunyai bentuk Bulatan.'
  },
  {
    id: 'shp-9',
    number: 9,
    prompt: 'Sekeping potongan piza yang dipotong mempunyai bentuk apa?',
    clue: 'Ada 3 bucu tajam.',
    audioText: 'Soalan 9. Sekeping potongan piza mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Tiga 🍕', subText: 'Tiga Bucu' },
      { text: 'Bulatan', subText: 'Tiada bucu' },
      { text: 'Segi Empat', subText: 'Empat bucu' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Potongan piza menyerupai Segi Tiga.',
    explanation: 'Bagus! Potongan piza berbentuk Segi Tiga.'
  },
  {
    id: 'shp-10',
    number: 10,
    prompt: 'Bumbung rumah tradisional kampung menyerupai bentuk apa?',
    clue: 'Puncak di atas condong ke bawah.',
    audioText: 'Soalan 10. Bumbung rumah tradisional kampung menyerupai bentuk apa?',
    choices: buatPilihan(
      { text: 'Bulatan', subText: 'Bulat' },
      { text: 'Segi Tiga 🏠', subText: 'Bentuk Bumbung' },
      { text: 'Bujur', subText: 'Lonjong' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Bumbung rumah berbentuk Segi Tiga.',
    explanation: 'Tepat! Bumbung rumah berbentuk Segi Tiga.'
  },
  {
    id: 'shp-11',
    number: 11,
    prompt: 'Sebiji dadu permainan dam ular mempunyai bentuk apa pada setiap mukanya?',
    clue: 'Semua sisinya sama panjang.',
    audioText: 'Soalan 11. Sebiji dadu permainan mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: 'Tiga bucu' },
      { text: 'Bulatan', subText: 'Tiada bucu' },
      { text: 'Segi Empat Sama 🎲', subText: 'Empat Sisi Sama' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Dadu mempunyai muka Segi Empat Sama.',
    explanation: 'Hebat! Dadu berbentuk Segi Empat Sama.'
  },
  {
    id: 'shp-12',
    number: 12,
    prompt: 'Kotak hadiah hari lahir berbentuk kiub mempunyai muka berbentuk:',
    clue: 'Sisi sama rata.',
    audioText: 'Soalan 12. Kotak hadiah hari lahir mempunyai muka berbentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Empat Sama 🎁', subText: 'Semua Sisi Sama' },
      { text: 'Bulatan', subText: 'Bulat' },
      { text: 'Bujur', subText: 'Lonjong' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Kotak hadiah berbentuk Segi Empat Sama.',
    explanation: 'Tepat! Kotak hadiah mempunyai muka Segi Empat Sama.'
  },
  {
    id: 'shp-13',
    number: 13,
    prompt: 'Pintu bilik darjah kita mempunyai bentuk apa?',
    clue: 'Tinggi tegak dengan 2 sisi panjang dan 2 sisi pendek.',
    audioText: 'Soalan 13. Pintu bilik darjah kita mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Bulatan', subText: 'Bulat' },
      { text: 'Segi Empat Tepat 🚪', subText: 'Panjang & Tegak' },
      { text: 'Segi Tiga', subText: 'Tiga bucu' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Pintu bilik darjah berbentuk Segi Empat Tepat.',
    explanation: 'Bagus! Pintu bilik darjah berbentuk Segi Empat Tepat.'
  },
  {
    id: 'shp-14',
    number: 14,
    prompt: 'Papan putih di hadapan kelas tempat guru menulis berbentuk:',
    clue: 'Lebar mendatar dengan sisi panjang dan pendek.',
    audioText: 'Soalan 14. Papan putih di hadapan kelas berbentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: 'Tiga sisi' },
      { text: 'Bulatan', subText: 'Tiada bucu' },
      { text: 'Segi Empat Tepat 📋', subText: 'Panjang Mendatar' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Papan putih berbentuk Segi Empat Tepat.',
    explanation: 'Tepat sekali! Papan putih berbentuk Segi Empat Tepat.'
  },
  {
    id: 'shp-15',
    number: 15,
    prompt: 'Buku latihan matematik kita berbentuk apa?',
    clue: 'Ada sisi panjang dan sisi pendek.',
    audioText: 'Soalan 15. Buku latihan matematik kita berbentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Empat Tepat 📖', subText: 'Buku Latihan' },
      { text: 'Bulatan', subText: 'Bulat' },
      { text: 'Bintang', subText: 'Puncak bucu' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Buku latihan berbentuk Segi Empat Tepat.',
    explanation: 'Tepat! Buku latihan berbentuk Segi Empat Tepat.'
  },
  {
    id: 'shp-16',
    number: 16,
    prompt: 'Sebiji telur ayam sarapan pagi mempunyai bentuk apa?',
    clue: 'Bulat lonjong melengkung.',
    audioText: 'Soalan 16. Sebiji telur ayam sarapan pagi mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: 'Tajam bucu' },
      { text: 'Bujur (Oval) 🥚', subText: 'Lonjong Melengkung' },
      { text: 'Segi Empat', subText: 'Empat bucu' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Telur berbentuk Bujur.',
    explanation: 'Hebat! Telur ayam berbentuk Bujur.'
  },
  {
    id: 'shp-17',
    number: 17,
    prompt: 'Cermin muka di rumah selalunya mempunyai bentuk apa?',
    clue: 'Bentuk bujur melengkung.',
    audioText: 'Soalan 17. Cermin muka selalunya mempunyai bentuk apa?',
    choices: buatPilihan(
      { text: 'Segi Tiga', subText: 'Tiga bucu' },
      { text: 'Bintang', subText: 'Bintang' },
      { text: 'Bujur (Oval) 🪞', subText: 'Bujur Melengkung' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Cermin muka berbentuk Bujur.',
    explanation: 'Tepat! Cermin muka biasanya berbentuk Bujur.'
  },
  {
    id: 'shp-18',
    number: 18,
    prompt: 'Berapakah bilangan bucu tajam pada sebuah SEGI TIGA?',
    clue: 'Kira bucunya.',
    audioText: 'Soalan 18. Berapakah bilangan bucu pada sebuah segi tiga?',
    choices: buatPilihan(
      { text: '3 Bucu', subText: 'Tiga Bucu' },
      { text: '4 Bucu', subText: 'Empat Bucu' },
      { text: '0 Bucu', subText: 'Tiada Bucu' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Segi Tiga = 3 bucu.',
    explanation: 'Bagus! Segi tiga mempunyai 3 bucu.'
  },
  {
    id: 'shp-19',
    number: 19,
    prompt: 'Berapakah bilangan bucu pada sebuah SEGI EMPAT SAMA?',
    clue: 'Kira semua penjuru bucu.',
    audioText: 'Soalan 19. Berapakah bilangan bucu pada sebuah segi empat sama?',
    choices: buatPilihan(
      { text: '3 Bucu', subText: 'Tiga' },
      { text: '4 Bucu', subText: 'Empat Bucu' },
      { text: '5 Bucu', subText: 'Lima' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Segi Empat mempunyai 4 bucu.',
    explanation: 'Tepat! Segi empat sama mempunyai 4 bucu.'
  },
  {
    id: 'shp-20',
    number: 20,
    prompt: 'Berapakah bilangan bucu pada sebuah BULATAN?',
    clue: 'Sisinya melengkung licin.',
    audioText: 'Soalan 20. Berapakah bilangan bucu pada sebuah bulatan?',
    choices: buatPilihan(
      { text: '4 Bucu', subText: 'Empat' },
      { text: '1 Bucu', subText: 'Satu' },
      { text: 'Tiada Bucu (0 Bucu)', subText: 'Sifar Bucu' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Bulatan tiada bucu kerana melengkung.',
    explanation: 'Hebat! Bulatan tidak mempunyai bucu.'
  },
  {
    id: 'shp-21',
    number: 21,
    prompt: 'Lengkapkan corak berselang ini: 🔴 🔷 🔴 🔷 [ ? ]',
    clue: 'Merah, Biru, Merah, Biru, selepas itu apa?',
    audioText: 'Soalan 21. Lengkapkan corak berselang: Merah, Biru, Merah, Biru, seterusnya apa?',
    choices: buatPilihan(
      { text: '🔴 Bulatan Merah', subText: 'Merah Seterusnya' },
      { text: '🔷 Berlian Biru', subText: 'Biru' },
      { text: '⭐ Bintang Kuning', subText: 'Kuning' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Corak berselang kembali kepada warna Merah.',
    explanation: 'Tepat! Corak seterusnya ialah Bulatan Merah 🔴.'
  },
  {
    id: 'shp-22',
    number: 22,
    prompt: 'Lengkapkan corak warna ini: 🟡 🟢 🟡 🟢 [ ? ]',
    clue: 'Kuning, Hijau, Kuning, Hijau.',
    audioText: 'Soalan 22. Lengkapkan corak: Kuning, Hijau, Kuning, Hijau, seterusnya apa?',
    choices: buatPilihan(
      { text: '🟢 Hijau', subText: 'Hijau' },
      { text: '🟡 Kuning', subText: 'Kuning Seterusnya' },
      { text: '🔵 Biru', subText: 'Biru' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Selepas hijau ialah kuning.',
    explanation: 'Bagus! Corak seterusnya ialah Kuning 🟡.'
  },
  {
    id: 'shp-23',
    number: 23,
    prompt: 'Lengkapkan corak buah ini: 🍎 🍌 🍎 🍌 [ ? ]',
    clue: 'Epal, Pisang, Epal, Pisang.',
    audioText: 'Soalan 23. Lengkapkan corak buah: Epal, Pisang, Epal, Pisang, seterusnya buah apa?',
    choices: buatPilihan(
      { text: '🍇 Anggur', subText: 'Anggur' },
      { text: '🍌 Pisang', subText: 'Pisang' },
      { text: '🍎 Epal Merah', subText: 'Epal Seterusnya' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Selepas pisang ialah epal.',
    explanation: 'Tepat sekali! Corak seterusnya ialah Epal Merah 🍎.'
  },
  {
    id: 'shp-24',
    number: 24,
    prompt: 'Lengkapkan corak bentuk ini: ⭐ 🔺 ⭐ 🔺 [ ? ]',
    clue: 'Bintang, Segi Tiga, Bintang, Segi Tiga.',
    audioText: 'Soalan 24. Lengkapkan corak: Bintang, Segi Tiga, Bintang, Segi Tiga, seterusnya apa?',
    choices: buatPilihan(
      { text: '⭐ Bintang', subText: 'Bintang Seterusnya' },
      { text: '🔺 Segi Tiga', subText: 'Segi Tiga' },
      { text: '⭕ Bulatan', subText: 'Bulatan' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Corak kembali kepada Bintang.',
    explanation: 'Hebat! Corak seterusnya ialah Bintang ⭐.'
  },
  {
    id: 'shp-25',
    number: 25,
    prompt: 'Lengkapkan corak saiz ini: 🔴 Besar, ⭕ Kecil, 🔴 Besar, ⭕ Kecil, [ ? ]',
    clue: 'Besar, Kecil, Besar, Kecil.',
    audioText: 'Soalan 25. Lengkapkan corak saiz: Besar, Kecil, Besar, Kecil, seterusnya apa?',
    choices: buatPilihan(
      { text: '⭕ Kecil', subText: 'Kecil' },
      { text: '🔴 Besar', subText: 'Besar Seterusnya' },
      { text: '⚪ Sederhana', subText: 'Sederhana' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Selepas kecil ialah bulatan besar.',
    explanation: 'Tahniah! Corak seterusnya ialah Besar 🔴. Adik selesai 25 soalan Bentuk & Corak!'
  }
];

// ============================================================================
// MODUL 7: PULAU PENGEMBARAAN (CABARAN GABUNGAN) — 25 SOALAN LENGKAP
// (5 Pulau x 5 Cabaran = 25 Soalan)
// ============================================================================
export const ADVENTURE_QUIZZES: QuizQuestion[] = [
  // PULAU 1: PULAU BILANG PANTAI
  {
    id: 'adv-1',
    number: 1,
    prompt: 'Pulau 1: Bantu Sang Kancil membilang 5 biji buah kelapa di tepi pantai.',
    clue: 'Kira buah kelapa: 1, 2, 3, 4, 5.',
    audioText: 'Soalan 1 Pulau Pengembaraan. Kira berapakah buah kelapa di tepi pantai?',
    visualType: 'emoji-grid',
    visualData: { emoji: '🥥', count: 5, name: 'buah kelapa' },
    choices: buatPilihan(
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima Kelapa' },
      { text: '6', subText: 'Enam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Ada 5 biji kelapa.',
    explanation: 'Tepat! Ada 5 biji buah kelapa di tepi pantai.'
  },
  {
    id: 'adv-2',
    number: 2,
    prompt: 'Pulau 1: Berapakah ekor ketam comel yang merangkak di atas pasir pantai?',
    clue: 'Kira ketam: 1, 2, 3, 4, 5, 6.',
    audioText: 'Soalan 2. Berapakah ekor ketam comel yang merangkak di pasir pantai?',
    visualType: 'emoji-grid',
    visualData: { emoji: '🦀', count: 6, name: 'ketam pantai' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '7', subText: 'Tujuh' },
      { text: '6', subText: 'Enam Ketam' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Ada 6 ekor ketam.',
    explanation: 'Bagus! Ada 6 ekor ketam pantai.'
  },
  {
    id: 'adv-3',
    number: 3,
    prompt: 'Pulau 1: Terdapat tulisan angka 7 pada batu bersurat. Apakah ejaan nombor itu?',
    clue: 'T - U - J - U - H',
    audioText: 'Soalan 3. Apakah ejaan perkataan bagi nombor tujuh?',
    choices: buatPilihan(
      { text: 'Tujuh', subText: 'Nombor 7' },
      { text: 'Lapan', subText: 'Nombor 8' },
      { text: 'Enam', subText: 'Nombor 6' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '7 dieja Tujuh.',
    explanation: 'Tepat! Angka 7 dieja Tujuh.'
  },
  {
    id: 'adv-4',
    number: 4,
    prompt: 'Pulau 1: Papan tanda menunjukkan nombor 8. Apakah nombor seterusnya dalam turutan menaik?',
    clue: 'Nombor selepas lapan.',
    audioText: 'Soalan 4. Apakah nombor seterusnya selepas lapan?',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '9', subText: 'Sembilan' },
      { text: '10', subText: 'Sepuluh' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Selepas lapan ialah sembilan.',
    explanation: 'Hebat! Nombor seterusnya ialah 9 (Sembilan).'
  },
  {
    id: 'adv-5',
    number: 5,
    prompt: 'Pulau 1: Peti mutiara pantai mempunyai 8 butir mutiara dalam bingkai sepuluh. Berapakah jumlahnya?',
    clue: '8 petak terisi mutiara.',
    audioText: 'Soalan 5. Berapakah bilangan mutiara pantai ini?',
    visualType: 'ten-frame',
    visualData: { count: 8, color: 'blue' },
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '9', subText: 'Sembilan' },
      { text: '8', subText: 'Lapan Mutiara' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Ada 8 butir mutiara.',
    explanation: 'Tepat! Pulau 1 berjaya diselesaikan!'
  },

  // PULAU 2: GUA TAMBAH BERKILAU
  {
    id: 'adv-6',
    number: 6,
    prompt: 'Pulau 2 (Gua Tambah): Gabungkan 3 permata merah + 2 permata biru = ?',
    clue: 'Tiga campur dua.',
    audioText: 'Soalan 6. Tiga permata merah tambah dua permata biru sama dengan berapa?',
    visualType: 'addition-visual',
    visualData: { leftCount: 3, rightCount: 2, emoji: '💎', leftText: '3 Merah', rightText: '2 Biru' },
    choices: buatPilihan(
      { text: '5', subText: 'Lima Permata' },
      { text: '4', subText: 'Empat' },
      { text: '6', subText: 'Enam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '3 + 2 = 5.',
    explanation: 'Bagus! 3 + 2 = 5 permata.'
  },
  {
    id: 'adv-7',
    number: 7,
    prompt: 'Pulau 2: Nyalakan obor gua: 4 obor + 2 obor = ?',
    clue: 'Empat tambah dua.',
    audioText: 'Soalan 7. Empat obor tambah dua obor sama dengan berapa?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima' },
      { text: '6', subText: 'Enam Obor' },
      { text: '7', subText: 'Tujuh' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '4 + 2 = 6.',
    explanation: 'Tepat! 4 + 2 = 6 obor menyala.'
  },
  {
    id: 'adv-8',
    number: 8,
    prompt: 'Pulau 2: Kira jumlah kelawar gua: 5 ekor di kiri + 3 ekor di kanan = ?',
    clue: 'Lima campur tiga.',
    audioText: 'Soalan 8. Lima kelawar tambah tiga kelawar sama dengan berapa?',
    choices: buatPilihan(
      { text: '7', subText: 'Tujuh' },
      { text: '9', subText: 'Sembilan' },
      { text: '8', subText: 'Lapan Kelawar' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '5 + 3 = 8.',
    explanation: 'Hebat! 5 + 3 = 8 ekor kelawar.'
  },
  {
    id: 'adv-9',
    number: 9,
    prompt: 'Pulau 2: Buka pintu batu dengan mengira: 6 + 4 = ?',
    clue: 'Enam tambah empat.',
    audioText: 'Soalan 9. Enam tambah empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '10', subText: 'Sepuluh' },
      { text: '9', subText: 'Sembilan' },
      { text: '11', subText: 'Sebelas' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '6 campur 4 genap sepuluh.',
    explanation: 'Tepat sekali! 6 + 4 = 10. Pintu batu terbuka!'
  },
  {
    id: 'adv-10',
    number: 10,
    prompt: 'Pulau 2: Di dalam gua ada 10 ketul emas + 3 ketul emas lagi. Berapakah jumlahnya?',
    clue: 'Sepuluh tambah tiga.',
    audioText: 'Soalan 10. Sepuluh tambah tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '12', subText: 'Dua Belas' },
      { text: '13', subText: 'Tiga Belas Emas' },
      { text: '14', subText: 'Empat Belas' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '10 + 3 = 13.',
    explanation: 'Bagus! 10 + 3 = 13. Pulau 2 Gua Tambah selesai!'
  },

  // PULAU 3: SUNGAI TOLAK JERAM
  {
    id: 'adv-11',
    number: 11,
    prompt: 'Pulau 3 (Sungai Tolak): Ada 5 ekor ikan di jeram. 2 ekor sudah berenang pergi (❌). Tinggal berapa?',
    clue: 'Lima tolak dua.',
    audioText: 'Soalan 11. Ada lima ikan, dua berenang pergi. Tinggal berapa ikan?',
    visualType: 'subtraction-visual',
    visualData: { totalCount: 5, removeCount: 2, emoji: '🐟', name: 'ikan' },
    choices: buatPilihan(
      { text: '2', subText: 'Dua' },
      { text: '4', subText: 'Empat' },
      { text: '3', subText: 'Tiga Ikan' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '5 - 2 = 3.',
    explanation: 'Tepat! 5 - 2 = 3 ekor ikan masih ada.'
  },
  {
    id: 'adv-12',
    number: 12,
    prompt: 'Pulau 3: Ada 6 biji buah terapung di sungai. Kancil ambil 3 biji (❌). Berapakah bakinya?',
    clue: 'Enam tolak tiga.',
    audioText: 'Soalan 12. Enam tolak tiga sama dengan berapa?',
    choices: buatPilihan(
      { text: '3', subText: 'Tiga Buah' },
      { text: '2', subText: 'Dua' },
      { text: '4', subText: 'Empat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Separuh daripada 6 ialah 3.',
    explanation: 'Bagus! 6 - 3 = 3 biji buah.'
  },
  {
    id: 'adv-13',
    number: 13,
    prompt: 'Pulau 3: Ada 7 batang buluh rakit. 2 batang patah (❌). Tinggal berapa batang buluh elok?',
    clue: 'Tujuh tolak dua.',
    audioText: 'Soalan 13. Tujuh tolak dua sama dengan berapa?',
    choices: buatPilihan(
      { text: '4', subText: 'Empat' },
      { text: '5', subText: 'Lima Buluh' },
      { text: '6', subText: 'Enam' },
      'B'
    ),
    correctAnswer: 'B',
    hint: '7 - 2 = 5.',
    explanation: 'Tepat! 7 - 2 = 5 batang buluh rakit.'
  },
  {
    id: 'adv-14',
    number: 14,
    prompt: 'Pulau 3: Ada 8 batu loncatan di seberang sungai. 4 batu tenggelam air (❌). Tinggal berapa batu timbul?',
    clue: 'Lapan tolak empat.',
    audioText: 'Soalan 14. Lapan tolak empat sama dengan berapa?',
    choices: buatPilihan(
      { text: '3', subText: 'Tiga' },
      { text: '5', subText: 'Lima' },
      { text: '4', subText: 'Empat Batu' },
      'C'
    ),
    correctAnswer: 'C',
    hint: '8 - 4 = 4.',
    explanation: 'Hebat! 8 - 4 = 4 batu loncatan timbul.'
  },
  {
    id: 'adv-15',
    number: 15,
    prompt: 'Pulau 3: Ada 10 biji bekalan epal di dalam beg. Kancil makan 5 biji (❌). Tinggal berapa epal?',
    clue: 'Sepuluh tolak lima.',
    audioText: 'Soalan 15. Sepuluh tolak lima sama dengan berapa?',
    choices: buatPilihan(
      { text: '5', subText: 'Lima Epal' },
      { text: '4', subText: 'Empat' },
      { text: '6', subText: 'Enam' },
      'A'
    ),
    correctAnswer: 'A',
    hint: '10 - 5 = 5.',
    explanation: 'Bagus! 10 - 5 = 5 biji epal. Pulau 3 selesai menyeberang sungai!'
  },

  // PULAU 4: PASAR WANG NELAYAN
  {
    id: 'adv-16',
    number: 16,
    prompt: 'Pulau 4 (Pasar Wang): Kancil beli ikan segar berharga RM 2. Berapakah keping not RM 1 perlu dibayar?',
    clue: 'RM 1 + RM 1 = RM 2.',
    audioText: 'Soalan 16. Ikan harga dua ringgit. Berapakah keping not satu ringgit perlu dibayar?',
    choices: buatPilihan(
      { text: '1 Keping RM 1', subText: 'Belum Cukup' },
      { text: '2 Keping RM 1', subText: 'Tepat RM 2' },
      { text: '5 Keping RM 1', subText: 'Terlebih' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Dua keping RM 1 bernilai RM 2.',
    explanation: 'Tepat! Dua keping wang RM 1 bernilai RM 2.'
  },
  {
    id: 'adv-17',
    number: 17,
    prompt: 'Pulau 4: Kancil beli kuih tradisional berharga 50 Sen. Duit syiling 50 sen berwarna apakah?',
    clue: 'Warna kuning berkilau.',
    audioText: 'Soalan 17. Duit syiling lima puluh sen berwarna apa?',
    choices: buatPilihan(
      { text: 'Perak Kelabu', subText: 'Macam 10 sen' },
      { text: 'Merah', subText: 'Merah' },
      { text: 'Kuning Keemasan', subText: 'Warna Emas' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Syiling 50 sen berwarna kuning emas.',
    explanation: 'Bagus! Duit syiling 50 sen berwarna kuning keemasan.'
  },
  {
    id: 'adv-18',
    number: 18,
    prompt: 'Pulau 4: Wang kertas warna HIJAU dengan gambar Burung Enggang bernilai berapa ringgit?',
    clue: 'Not warna hijau.',
    audioText: 'Soalan 18. Wang kertas warna hijau bernilai berapa ringgit?',
    choices: buatPilihan(
      { text: 'RM 5', subText: 'Lima Ringgit' },
      { text: 'RM 1', subText: 'Satu Ringgit' },
      { text: 'RM 10', subText: 'Sepuluh Ringgit' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Not hijau = RM 5.',
    explanation: 'Tepat sekali! Wang kertas hijau bernilai RM 5.'
  },
  {
    id: 'adv-19',
    number: 19,
    prompt: 'Pulau 4: Kancil beli bekal air kotak berharga RM 3. Dia bayar dengan not RM 5. Berapakah baki wangnya?',
    clue: '5 tolak 3 ringgit.',
    audioText: 'Soalan 19. Beli barang harga RM 3, bayar RM 5. Berapa ringgit baki wang?',
    choices: buatPilihan(
      { text: 'RM 1', subText: 'Satu Ringgit' },
      { text: 'RM 2', subText: 'Dua Ringgit' },
      { text: 'RM 3', subText: 'Tiga Ringgit' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'RM 5 - RM 3 = RM 2.',
    explanation: 'Hebat! Pekedai memulangkan baki sebanyak RM 2.'
  },
  {
    id: 'adv-20',
    number: 20,
    prompt: 'Pulau 4: Duit syiling emas 20 Sen memaparkan motif bunga apakah?',
    clue: 'Bunga Melur yang harum.',
    audioText: 'Soalan 20. Duit syiling dua puluh sen memaparkan bunga apa?',
    choices: buatPilihan(
      { text: 'Bunga Mawar', subText: 'Ros' },
      { text: 'Bunga Raya', subText: 'Raya' },
      { text: 'Bunga Melur 🌼', subText: 'Bunga Melur' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Bunga Melur pada syiling 20 sen.',
    explanation: 'Tepat! Pulau 4 Pasar Wang selesai diteroka!'
  },

  // PULAU 5: PUNCAK JAM & PETI HARTA KARUN EMAS
  {
    id: 'adv-21',
    number: 21,
    prompt: 'Pulau 5 (Puncak Peti): Jam di gerbang emas menunjuk jarum pendek di 9, jarum panjang di 12. Pukul berapa gerbang dibuka?',
    clue: 'Sembilan tepat.',
    audioText: 'Soalan 21. Jarum pendek di angka sembilan, jarum panjang di angka dua belas. Pukul berapa?',
    visualType: 'clock-display',
    visualData: { hour: 9, minute: 0 },
    choices: buatPilihan(
      { text: 'Pukul 9:00', subText: 'Sembilan Tepat' },
      { text: 'Pukul 8:00', subText: 'Lapan Tepat' },
      { text: 'Pukul 10:00', subText: 'Sepuluh Tepat' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Pukul 9:00 tepat.',
    explanation: 'Bagus! Gerbang dibuka tepat pada pukul 9:00!'
  },
  {
    id: 'adv-22',
    number: 22,
    prompt: 'Pulau 5: Pada waktu bilakah matahari baru menyinari puncak pulau ini dan udara segar berhembus?',
    clue: 'Waktu pagi.',
    audioText: 'Soalan 22. Pada waktu bilakah matahari baru menyinari puncak pulau?',
    choices: buatPilihan(
      { text: 'Tengah Malam', subText: 'Waktu Gelap' },
      { text: 'Pagi 🌅', subText: 'Waktu Pagi Segar' },
      { text: 'Petang', subText: 'Petang Hari' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Matahari terbit waktu pagi.',
    explanation: 'Tepat! Waktu pagi yang indah di puncak pulau.'
  },
  {
    id: 'adv-23',
    number: 23,
    prompt: 'Pulau 5: Peti Harta Karun akan terbuka pada pukul 12:00 tengah hari. Pada waktu itu kedua-dua jarum jam menunjuk ke angka apa?',
    clue: 'Kedua-dua jarum bertemu.',
    audioText: 'Soalan 23. Pada pukul dua belas tengah hari, kedua-dua jarum menunjuk ke angka apa?',
    choices: buatPilihan(
      { text: 'Angka 6', subText: 'Enam' },
      { text: 'Angka 3', subText: 'Tiga' },
      { text: 'Angka 12 🕛', subText: 'Nombor Dua Belas' },
      'C'
    ),
    correctAnswer: 'C',
    hint: 'Kedua-dua jarum jam bertemu di nombor 12.',
    explanation: 'Tepat sekali! Pukul 12:00 kedua-dua jarum berada di angka 12.'
  },
  {
    id: 'adv-24',
    number: 24,
    prompt: 'Pulau 5: Lubang kunci Peti Emas berbentuk SEGI TIGA. Berapakah bucu yang ada pada bentuk segi tiga?',
    clue: 'Kira bucu segi tiga.',
    audioText: 'Soalan 24. Berapakah bilangan bucu pada bentuk segi tiga?',
    choices: buatPilihan(
      { text: '3 Bucu 🔺', subText: 'Tiga Bucu' },
      { text: '4 Bucu', subText: 'Empat' },
      { text: '0 Bucu', subText: 'Tiada bucu' },
      'A'
    ),
    correctAnswer: 'A',
    hint: 'Segi tiga mempunyai 3 bucu.',
    explanation: 'Bagus! Kunci segi tiga mempunyai 3 bucu.'
  },
  {
    id: 'adv-25',
    number: 25,
    prompt: 'Kunci emas diputar! Pilih jawapan untuk membuka Peti Harta Karun Emas PPKI dan menerima Piala Juara!',
    clue: 'Selesaikan pengembaraan!',
    audioText: 'Soalan 25. Pilih jawapan untuk membuka Peti Harta Karun Emas PPKI!',
    choices: buatPilihan(
      { text: 'Belum Siap', subText: 'Belum' },
      { text: 'Buka Peti Emas Juara! 👑🏆', subText: 'Tahniah Juara PPKI!' },
      { text: 'Tutup Peti', subText: 'Tutup' },
      'B'
    ),
    correctAnswer: 'B',
    hint: 'Pilih Buka Peti Emas Juara!',
    explanation: 'Tahniah! Peti Harta Karun Emas berjaya dibuka! Adik ialah Juara Dunia Angka PPKI!'
  }
];
