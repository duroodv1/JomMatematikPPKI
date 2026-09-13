import { ModuleInfo, MoneyItem, ShapeItem } from '../types';

export const MODULES_LIST: ModuleInfo[] = [
  {
    id: 'counting',
    number: 1,
    title: '1. Kenal & Bilang Angka',
    subtitle: 'Kira objek 1 hingga 20, ejaan nombor & turutan',
    icon: '🔢',
    badge: 'Asas Penting',
    themeColor: 'from-amber-400 to-orange-500',
    bgGradient: 'bg-amber-50 border-amber-200',
    totalQuestions: 25,
    description: 'Kad belajar interaktif 1–20, pengiraan satu demi satu (TouchCounter), bingkai sepuluh (Ten-Frame), dan turutan nombor menaik serta menurun.'
  },
  {
    id: 'addition',
    number: 2,
    title: '2. Tambah Ceria (+)',
    subtitle: 'Gabung dua kumpulan objek & cari jumlah',
    icon: '➕',
    badge: 'Operasi Tambah',
    themeColor: 'from-blue-400 to-indigo-600',
    bgGradient: 'bg-blue-50 border-blue-200',
    totalQuestions: 25,
    description: 'Eksperimen gabung objek konkrit secara interaktif, latihan kuiz tambah dalam lingkungan 10 dan 20 dengan visual yang jelas.'
  },
  {
    id: 'subtraction',
    number: 3,
    title: '3. Tolak Mudah (-)',
    subtitle: 'Keluarkan objek & cari baki yang tinggal',
    icon: '➖',
    badge: 'Operasi Tolak',
    themeColor: 'from-emerald-400 to-teal-600',
    bgGradient: 'bg-emerald-50 border-emerald-200',
    totalQuestions: 25,
    description: 'Eksperimen letupkan belon interaktif (❌), latihan soalan "tinggal berapa" dengan visual konkrit dan kiraan baki objek.'
  },
  {
    id: 'money',
    number: 4,
    title: '4. Wang Saku Ceria',
    subtitle: 'Duit syiling & wang kertas Malaysia serta Kedai Runcit',
    icon: '💵',
    badge: 'Kemahiran Hidup',
    themeColor: 'from-purple-400 to-pink-600',
    bgGradient: 'bg-purple-50 border-purple-200',
    totalQuestions: 25,
    description: 'Kenal pasti syiling 5¢ hingga 50¢, wang kertas RM1 hingga RM50, dan simulasi berbelanja barang sekolah di Kedai Runcit PPKI.'
  },
  {
    id: 'time',
    number: 5,
    title: '5. Jam & Waktu Kita',
    subtitle: 'Jam analog, digital & waktu aktiviti harian',
    icon: '⏰',
    badge: 'Urus Masa',
    themeColor: 'from-cyan-400 to-blue-600',
    bgGradient: 'bg-cyan-50 border-cyan-200',
    totalQuestions: 25,
    description: 'Jam interaktif jarum pendek merah dan jarum panjang biru, waktu tepat (:00) dan setengah jam (:30), serta pengenalan Pagi, Tengah Hari, Petang dan Malam.'
  },
  {
    id: 'shapes',
    number: 6,
    title: '6. Bentuk & Corak',
    subtitle: 'Bentuk 2D, objek sekeliling & corak berulang',
    icon: '🔺',
    badge: 'Geometri Asas',
    themeColor: 'from-rose-400 to-red-600',
    bgGradient: 'bg-rose-50 border-rose-200',
    totalQuestions: 25,
    description: 'Kenali bulatan, segi tiga, segi empat sama, segi empat tepat, bintang, dan bujur beserta padanan objek sebenar dan sambungan corak berselang-seli.'
  },
  {
    id: 'adventure',
    number: 7,
    title: '7. Pulau Pengembaraan',
    subtitle: 'Jelajah 5 pulau rahsia & buka Peti Harta Karun!',
    icon: '🏝️',
    badge: 'Piala Juara',
    themeColor: 'from-yellow-400 to-amber-600',
    bgGradient: 'bg-amber-50 border-yellow-300',
    totalQuestions: 25,
    description: 'Cabaran gabungan merangkumi 5 pulau bertema (Pulau Bilang, Gua Tambah, Sungai Tolak, Pasar Wang, Puncak Jam) untuk membuka Peti Emas PPKI.'
  }
];

export const MALAYSIA_CURRENCY: MoneyItem[] = [
  {
    id: 'coin-5sen',
    type: 'coin',
    value: 5,
    label: '5 Sen',
    color: 'bg-stone-300 border-stone-400 text-stone-800',
    features: 'Warna Perak • Saiz Paling Kecil • Sulur Kacang & Bunga Raya',
    frontVisual: '5¢',
    motif: 'Sulur Kacang'
  },
  {
    id: 'coin-10sen',
    type: 'coin',
    value: 10,
    label: '10 Sen',
    color: 'bg-stone-300 border-stone-400 text-stone-800',
    features: 'Warna Perak • Corak Tradisional Orang Asli & Bunga Raya',
    frontVisual: '10¢',
    motif: 'Anyaman Mah Meri'
  },
  {
    id: 'coin-20sen',
    type: 'coin',
    value: 20,
    label: '20 Sen',
    color: 'bg-amber-300 border-amber-500 text-amber-950',
    features: 'Warna Kuning Keemasan • Motif Bunga Melur',
    frontVisual: '20¢',
    motif: 'Bunga Melur'
  },
  {
    id: 'coin-50sen',
    type: 'coin',
    value: 50,
    label: '50 Sen',
    color: 'bg-amber-300 border-amber-500 text-amber-950',
    features: 'Warna Kuning Keemasan • Saiz Terbesar Antara Syiling • Motif Sulur Kacang',
    frontVisual: '50¢',
    motif: 'Sulur Kacang Emas'
  },
  {
    id: 'note-rm1',
    type: 'note',
    value: 1,
    label: 'RM 1',
    color: 'bg-blue-600 border-blue-700 text-white',
    features: 'Warna Biru • Gambar Wau Bulan Tradisional',
    frontVisual: 'RM 1',
    motif: 'Wau Bulan 🪁'
  },
  {
    id: 'note-rm5',
    type: 'note',
    value: 5,
    label: 'RM 5',
    color: 'bg-emerald-600 border-emerald-700 text-white',
    features: 'Warna Hijau • Gambar Burung Enggang Badak Sarawak',
    frontVisual: 'RM 5',
    motif: 'Burung Enggang 🦜'
  },
  {
    id: 'note-rm10',
    type: 'note',
    value: 10,
    label: 'RM 10',
    color: 'bg-red-600 border-red-700 text-white',
    features: 'Warna Merah • Gambar Bunga Rafflesia Terbesar di Dunia',
    frontVisual: 'RM 10',
    motif: 'Bunga Rafflesia 🌺'
  },
  {
    id: 'note-rm20',
    type: 'note',
    value: 20,
    label: 'RM 20',
    color: 'bg-orange-500 border-orange-600 text-white',
    features: 'Warna Jingga Oren • Gambar Penyu Karah & Penyu Belimbing',
    frontVisual: 'RM 20',
    motif: 'Penyu Karah 🐢'
  },
  {
    id: 'note-rm50',
    type: 'note',
    value: 50,
    label: 'RM 50',
    color: 'bg-teal-700 border-teal-800 text-white',
    features: 'Warna Biru Kehijauan • Kelapa Sawit & Gambar Tunku Abdul Rahman',
    frontVisual: 'RM 50',
    motif: 'Kelapa Sawit 🌴'
  }
];

export const NUMBERS_1_TO_20 = [
  { num: 1, word: 'Satu', emoji: '🍎', name: 'Epal', finger: '☝️' },
  { num: 2, word: 'Dua', emoji: '🚗', name: 'Kereta', finger: '✌️' },
  { num: 3, word: 'Tiga', emoji: '⭐', name: 'Bintang', finger: '🤟' },
  { num: 4, word: 'Empat', emoji: '🎈', name: 'Belon', finger: '🖖' },
  { num: 5, word: 'Lima', emoji: '🐱', name: 'Kucing', finger: '🖐️' },
  { num: 6, word: 'Enam', emoji: '🍌', name: 'Pisang', finger: '🖐️☝️' },
  { num: 7, word: 'Tujuh', emoji: '⚽', name: 'Bola', finger: '🖐️✌️' },
  { num: 8, word: 'Lapan', emoji: '🧁', name: 'Kek Cawan', finger: '🖐️🤟' },
  { num: 9, word: 'Sembilan', emoji: '🐟', name: 'Ikan', finger: '🖐️🖖' },
  { num: 10, word: 'Sepuluh', emoji: '🍓', name: 'Strawberi', finger: '🖐️🖐️' },
  { num: 11, word: 'Sebelas', emoji: '🚀', name: 'Roket', finger: '10 + 1' },
  { num: 12, word: 'Dua Belas', emoji: '🍬', name: 'Gula-gula', finger: '10 + 2' },
  { num: 13, word: 'Tiga Belas', emoji: '🥕', name: 'Lobak Merah', finger: '10 + 3' },
  { num: 14, word: 'Empat Belas', emoji: '🦋', name: 'Rama-Rama', finger: '10 + 4' },
  { num: 15, word: 'Lima Belas', emoji: '🌸', name: 'Bunga', finger: '10 + 5' },
  { num: 16, word: 'Enam Belas', emoji: '🍔', name: 'Burger', finger: '10 + 6' },
  { num: 17, word: 'Tujuh Belas', emoji: '🍦', name: 'Aiskrim', finger: '10 + 7' },
  { num: 18, word: 'Lapan Belas', emoji: '🍉', name: 'Tembikai', finger: '10 + 8' },
  { num: 19, word: 'Sembilan Belas', emoji: '🐤', name: 'Anak Ayam', finger: '10 + 9' },
  { num: 20, word: 'Dua Puluh', emoji: '🪙', name: 'Syiling Emas', finger: '10 + 10' }
];

export const SHAPES_DATA: ShapeItem[] = [
  {
    id: 'bulatan',
    name: 'Bulatan',
    english: 'Circle',
    color: 'bg-rose-500',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-400',
    sides: 'Tiada bucu (Sisi melengkung bulat)',
    examples: ['Bola Sepak ⚽', 'Roda Kereta 🛞', 'Donat Manis 🍩', 'Duit Syiling 🪙']
  },
  {
    id: 'segi-tiga',
    name: 'Segi Tiga',
    english: 'Triangle',
    color: 'bg-amber-500',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-400',
    sides: '3 bucu tajam & 3 sisi lurus',
    examples: ['Bumbung Rumah 🏠', 'Potongan Piza 🍕', 'Piramid Pasir 🔺', 'Tembikai 🍉']
  },
  {
    id: 'segi-empat-sama',
    name: 'Segi Empat Sama',
    english: 'Square',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-400',
    sides: '4 bucu & 4 sisi sama panjang',
    examples: ['Dadu Permainan 🎲', 'Biskut Empat Segi 🍪', 'Kotak Hadiah 🎁', 'Tingkap 🪟']
  },
  {
    id: 'segi-empat-tepat',
    name: 'Segi Empat Tepat',
    english: 'Rectangle',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-400',
    sides: '4 bucu & 2 sisi panjang, 2 sisi pendek',
    examples: ['Pintu Bilik Darjah 🚪', 'Buku Latihan 📖', 'Telefon Pintar 📱', 'Papan Putih 📋']
  },
  {
    id: 'bintang',
    name: 'Bintang',
    english: 'Star',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-400',
    sides: '5 puncak bucu bersinar',
    examples: ['Bintang di Langit ⭐', 'Tapak Sulaiman 🌟', 'Lencana Polis 🎖️']
  },
  {
    id: 'bujur',
    name: 'Bujur',
    english: 'Oval',
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-400',
    sides: 'Sisi melengkung lonjong seperti telur',
    examples: ['Telur Ayam 🥚', 'Cermin Muka 🪞', 'Bola Ragbi 🏉']
  }
];

export const KEDAI_RUNCIT_ITEMS = [
  { id: 'kr-1', name: 'Pensel Warna', price: 2, emoji: '✏️', noteLabel: 'RM 2', targetNotes: ['RM 1', 'RM 1'] },
  { id: 'kr-2', name: 'Pemadam Comel', price: 1, emoji: '🧼', noteLabel: 'RM 1', targetNotes: ['RM 1'] },
  { id: 'kr-3', name: 'Buku Latihan', price: 3, emoji: '📓', noteLabel: 'RM 3', targetNotes: ['RM 1', 'RM 1', 'RM 1'] },
  { id: 'kr-4', name: 'Roti Coklat', price: 2, emoji: '🍞', noteLabel: 'RM 2', targetNotes: ['RM 1', 'RM 1'] },
  { id: 'kr-5', name: 'Susu Kotak', price: 4, emoji: '🧃', noteLabel: 'RM 4', targetNotes: ['RM 1', 'RM 1', 'RM 1', 'RM 1'] },
  { id: 'kr-6', name: 'Kotak Pensel', price: 5, emoji: '👝', noteLabel: 'RM 5', targetNotes: ['RM 5'] },
  { id: 'kr-7', name: 'Pembaris Panjang', price: 1, emoji: '📏', noteLabel: 'RM 1', targetNotes: ['RM 1'] },
  { id: 'kr-8', name: 'Botol Air Ceria', price: 10, emoji: '🧴', noteLabel: 'RM 10', targetNotes: ['RM 10'] }
];

export const DAILY_ROUTINES = [
  {
    time: 'Pagi (7:00 Pagi)',
    icon: '🌅',
    title: 'Sarapan & Pergi ke Sekolah 🏫',
    description: 'Matahari baru terbit di ufuk timur. Kita bersiap, bersarapan pagi yang berkhasiat, dan pergi belajar di sekolah.'
  },
  {
    time: 'Tengah Hari (1:00 Tengah Hari)',
    icon: '☀️',
    title: 'Makan Tengah Hari & Rehat 🍲',
    description: 'Matahari tegak dan panas di atas kepala. Kita pulang ke rumah, makan tengah hari bersama keluarga, dan berehat.'
  },
  {
    time: 'Petang (5:00 Petang)',
    icon: '🌇',
    title: 'Riadah & Bermain di Padang ⚽',
    description: 'Cuaca mula redup dan nyaman. Kita beriadah, bersenam, atau bermain bola bersama rakan-rakan di padang.'
  },
  {
    time: 'Malam (9:00 Malam)',
    icon: '🌙',
    title: 'Ulang Kaji & Tidur Awal 🛌',
    description: 'Langit gelap dihiasi bulan dan bintang. Kita mengulang kaji pelajaran sebentar, menggosok gigi, dan tidur awal.'
  }
];
