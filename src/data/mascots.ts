import { MascotInfo, StickerItem } from '../types';

export const MASCOTS: MascotInfo[] = [
  {
    id: 'owl',
    name: 'Cikgu Hantu Bijak',
    title: 'Maskot Utama Jom Matematik PPKI',
    avatar: '🦉',
    image: './icon-app.png',
    description: 'Burung hantu comel berkaca mata yang suka membaca buku ajaib dan mengajar nombor!',
    color: 'bg-sky-100 border-sky-400 text-sky-950',
    accentColor: 'from-sky-400 to-blue-600'
  },
  {
    id: 'kancil',
    name: 'Sang Kancil Pintar',
    title: 'Kawan Bijak & Tangkas',
    avatar: '🦌',
    description: 'Kancil cerdik yang suka membantu murid mengira dengan tangkas dan ceria.',
    color: 'bg-amber-100 border-amber-400 text-amber-900',
    accentColor: 'from-amber-400 to-orange-500'
  },
  {
    id: 'oyen',
    name: 'Oyen Si Kucing Riang',
    title: 'Sahabat Belajar Ceria',
    avatar: '🐱',
    description: 'Kucing oren yang penyayang dan sentiasa memberi kata-kata semangat.',
    color: 'bg-orange-100 border-orange-400 text-orange-900',
    accentColor: 'from-orange-400 to-amber-500'
  },
  {
    id: 'panda',
    name: 'Panda Penyabar',
    title: 'Kawan Tenang & Sabar',
    avatar: '🐼',
    description: 'Panda yang sabar dan suka membimbing murid mengira satu demi satu.',
    color: 'bg-emerald-100 border-emerald-400 text-emerald-900',
    accentColor: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'bobo',
    name: 'Bobo Si Beruang Gagah',
    title: 'Sahabat Bersemangat',
    avatar: '🐻',
    description: 'Beruang gagah yang memberi keyakinan kepada murid untuk terus mencuba.',
    color: 'bg-indigo-100 border-indigo-400 text-indigo-900',
    accentColor: 'from-blue-400 to-indigo-600'
  }
];

export const MASCOT_PRAISES = [
  'Hebatnya adik! Jawapan sangat tepat! ⭐',
  'Wah, bijaknya adik mengira! Teruskan usaha! 🌟',
  'Bagus sekali! Adik makin pandai matematik! 👏',
  'Tepat sekali! Maskot bangga dengan kejayaan adik! 🎉',
  'Luar biasa! Seratus markah untuk adik! 💖',
  'Tahniah! Terus bersemangat meneroka dunia angka! 🚀'
];

export const MASCOT_ENCOURAGEMENTS = [
  'Tidak mengapa, mari kita cuba lagi bersama-sama! 😊',
  'Lihat betul-betul ya, mari kita kira perlahan-lahan. 🧐',
  'Adik pasti boleh buat! Tekan butang suara untuk dengar soalan. 🔊',
  'Sikit lagi tu! Jangan berputus asa, adik seorang yang hebat! 🌈',
  'Kira objek satu demi satu tanpa gopoh ya! 💪'
];

export const STICKERS_STORE: StickerItem[] = [
  // Kategori: Haiwan
  { id: 'stk-owl', name: 'Burung Hantu Bijak', emoji: '🦉', category: 'haiwan', cost: 10, description: 'Simbol kepintaran dan ketekunan belajar!' },
  { id: 'stk-cat', name: 'Kucing Riang', emoji: '🐱', category: 'haiwan', cost: 12, description: 'Meow! Kawan belajar yang setia.' },
  { id: 'stk-rabbit', name: 'Arnab Pantas', emoji: '🐰', category: 'haiwan', cost: 12, description: 'Lompat tinggi mengumpul markah!' },
  { id: 'stk-lion', name: 'Singa Berani', emoji: '🦁', category: 'haiwan', cost: 15, description: 'Yakin dan tidak mudah mengalah.' },
  { id: 'stk-elephant', name: 'Gajah Ingatan Kuat', emoji: '🐘', category: 'haiwan', cost: 18, description: 'Daya ingatan hebat dalam mengira.' },
  { id: 'stk-butterfly', name: 'Rama-Rama Warna-Warni', emoji: '🦋', category: 'haiwan', cost: 15, description: 'Corak kepak yang indah dan ceria.' },

  // Kategori: Kenderaan
  { id: 'stk-rocket', name: 'Roket Angkasa', emoji: '🚀', category: 'kenderaan', cost: 20, description: 'Meluncur laju ke mercu kejayaan!' },
  { id: 'stk-train', name: 'Keretapi Angka', emoji: '🚂', category: 'kenderaan', cost: 15, description: 'Choo choo! Membawa gerabak nombor.' },
  { id: 'stk-car', name: 'Kereta Lumba', emoji: '🏎️', category: 'kenderaan', cost: 18, description: 'Cepat dan tepat mengira.' },
  { id: 'stk-plane', name: 'Kapal Terbang Awan', emoji: '✈️', category: 'kenderaan', cost: 20, description: 'Terbang tinggi di langit ceria.' },

  // Kategori: Makanan
  { id: 'stk-apple', name: 'Epal Manis', emoji: '🍎', category: 'makanan', cost: 8, description: 'Buah sihat untuk minda yang cergas.' },
  { id: 'stk-icecream', name: 'Aiskrim Pelangi', emoji: '🍦', category: 'makanan', cost: 12, description: 'Hadiah lazat selepas selesai mengira.' },
  { id: 'stk-pizza', name: 'Piza Segi Tiga', emoji: '🍕', category: 'makanan', cost: 15, description: 'Bentuk segi tiga yang enak dimakan!' },
  { id: 'stk-cake', name: 'Kek Kejayaan', emoji: '🎂', category: 'makanan', cost: 20, description: 'Kek perayaan untuk murid cemerlang PPKI.' },

  // Kategori: Piala & Lencana Emas
  { id: 'stk-trophy', name: 'Piala Emas Juara', emoji: '🏆', category: 'piala', cost: 25, description: 'Murid Teladan Matematik PPKI!' },
  { id: 'stk-crown', name: 'Mahkota Raja Angka', emoji: '👑', category: 'piala', cost: 30, description: 'Pemimpin cemerlang Pulau Pengembaraan.' },
  { id: 'stk-medal', name: 'Pingat Bintang Emas', emoji: '🥇', category: 'piala', cost: 22, description: 'Dianugerahkan atas ketekunan belajar.' },
  { id: 'stk-gem', name: 'Permata Ajaib', emoji: '💎', category: 'piala', cost: 35, description: 'Bernilai tinggi seperti usaha gigih adik.' }
];
