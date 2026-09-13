import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MALAYSIA_CURRENCY, KEDAI_RUNCIT_ITEMS } from '../data/modulesData';
import { MONEY_QUIZZES } from '../data/moduleQuizzes';
import { MalaysianMoney } from '../components/MalaysianMoney';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  ShoppingBag, 
  Store, 
  BookOpen, 
  Gamepad2, 
  RotateCcw, 
  HelpCircle,
  Volume2
} from 'lucide-react';

export const MoneyModule: React.FC = () => {
  const { 
    setActiveView, 
    completeQuestion, 
    addCoins, 
    triggerTap, 
    triggerCorrect, 
    triggerWrong, 
    triggerFanfare,
    triggerCoin,
    speakText,
    speakOption 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'study' | 'shop' | 'quiz'>('study');
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<number>(0);

  // Status Kedai Runcit
  const [shopItemIndex, setShopItemIndex] = useState<number>(0);
  const [tenderedNotes, setTenderedNotes] = useState<number[]>([]);
  const [shopSuccess, setShopSuccess] = useState<boolean>(false);

  // Status kuiz 25 soalan
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const activeMoney = MALAYSIA_CURRENCY[selectedCurrencyIndex];
  const currentShopItem = KEDAI_RUNCIT_ITEMS[shopItemIndex];
  const currentQ = MONEY_QUIZZES[questionIndex];

  // Jumlah bayaran di kaunter kedai runcit
  const totalTendered = tenderedNotes.reduce((acc, curr) => acc + curr, 0);

  const handleAddMoneyToCounter = (amount: number) => {
    triggerCoin();
    setTenderedNotes(prev => [...prev, amount]);
    const updated = totalTendered + amount;
    speakText(`Tambah ${amount} ringgit. Jumlah bayaran di kaunter sekarang ${updated} ringgit.`);
  };

  const handleResetShopPayment = () => {
    triggerTap();
    setTenderedNotes([]);
    setShopSuccess(false);
  };

  const handlePayShopkeeper = () => {
    triggerTap();
    if (totalTendered === currentShopItem.price) {
      setShopSuccess(true);
      triggerCorrect();
      triggerCoin();
      addCoins(10);
      speakText(`Kaching! Bayaran ${totalTendered} ringgit tepat! Terima kasih adik! Ini ${currentShopItem.name} adik.`);
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {
        // Abaikan
      }
    } else if (totalTendered < currentShopItem.price) {
      triggerWrong();
      speakText(`Duit adik belum cukup. Harga ${currentShopItem.name} ialah ${currentShopItem.price} ringgit. Sila tambah lagi wang.`);
    } else {
      triggerWrong();
      speakText(`Duit adik terlebih. Harga barang ialah ${currentShopItem.price} ringgit. Cuba bayar dengan nilai yang tepat.`);
    }
  };

  const handleNextShopItem = () => {
    triggerTap();
    setTenderedNotes([]);
    setShopSuccess(false);
    if (shopItemIndex < KEDAI_RUNCIT_ITEMS.length - 1) {
      setShopItemIndex(prev => prev + 1);
    } else {
      setShopItemIndex(0);
    }
  };

  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C', correct: boolean) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
    setIsAnswered(true);

    if (correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      triggerCorrect();
      speakText('Tepat sekali! Adik sangat pandai mengenali duit Malaysia!');
      completeQuestion('money', questionIndex, 1, 2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Cuba perhatikan warna dan angka pada duit.');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < MONEY_QUIZZES.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedChoice(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setQuizFinished(true);
      triggerFanfare();
      try {
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
      } catch {
        // Abaikan
      }
    }
  };

  const handleRestartQuiz = () => {
    triggerTap();
    setQuestionIndex(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setQuizFinished(false);
    setScore(0);
  };

  const handleSpeakOption = (e: React.MouseEvent, label: 'A' | 'B' | 'C', text: string) => {
    e.stopPropagation();
    triggerTap();
    setSpeakingChoice(label);
    speakOption(label, text, () => setSpeakingChoice(null));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Pengepala Atas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 bg-white p-4 rounded-3xl border border-[#E2EDED] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { triggerTap(); setActiveView('home'); }}
            className="p-2.5 rounded-2xl bg-[#F1F8F7] hover:bg-[#E1F3F0] text-[#168F83] border border-[#B9E2DC] font-black active:scale-95 transition-transform"
            title="Kembali ke Menu Utama"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#18364D] flex items-center gap-2">
              <span>💵 Modul 4: Wang Saku Ceria</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Kuiz, Kenal Duit Malaysia &amp; Kedai Runcit PPKI
            </p>
          </div>
        </div>

        {/* Tab Penukar Mod */}
        <div className="flex items-center gap-1.5 bg-[#F1F8F7] p-1.5 rounded-2xl border border-[#D5EBE7]">
          <button
            onClick={() => { triggerTap(); setActiveTab('study'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'study'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white/80'
            }`}
          >
            <BookOpen size={16} />
            <span>Kenal Duit</span>
          </button>

          <button
            onClick={() => { triggerTap(); setActiveTab('shop'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'shop'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white/80'
            }`}
          >
            <Store size={16} />
            <span>Kedai Runcit</span>
          </button>

          <button
            onClick={() => { triggerTap(); setActiveTab('quiz'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white/80'
            }`}
          >
            <Gamepad2 size={16} />
            <span>25 Soalan Wang</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KAD BELAJAR KENAL DUIT */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider bg-[#E7F8F4] text-[#168F83] px-3 py-1 rounded-full border border-[#B9E2DC]">
                {activeMoney.type === 'coin' ? 'Duit Syiling' : 'Wang Kertas'} Malaysia
              </span>

              <AudioButton
                text={`Ini ialah wang ${activeMoney.label}. Ciri utamanya: ${activeMoney.features}.`}
                label="Dengar Ciri Duit"
                size="md"
              />
            </div>

            <div className="my-5 flex justify-center items-center py-2">
              <MalaysianMoney
                id={activeMoney.id}
                type={activeMoney.type}
                value={activeMoney.value}
                label={activeMoney.label}
                size="lg"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#18364D] uppercase mb-1">
              {activeMoney.label}
            </h2>

            <div className="p-3.5 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] max-w-md mx-auto my-3 text-xs sm:text-sm font-extrabold text-[#476571]">
              <p>🔍 {activeMoney.features}</p>
            </div>

            <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 max-w-md mx-auto">
              <button
                onClick={() => {
                  triggerTap();
                  if (selectedCurrencyIndex > 0) setSelectedCurrencyIndex(prev => prev - 1);
                }}
                disabled={selectedCurrencyIndex === 0}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold disabled:opacity-40 shadow-sm transition-all cursor-pointer"
              >
                Sebelum
              </button>

              <button
                onClick={() => {
                  triggerTap();
                  if (selectedCurrencyIndex < MALAYSIA_CURRENCY.length - 1) setSelectedCurrencyIndex(prev => prev + 1);
                }}
                disabled={selectedCurrencyIndex === MALAYSIA_CURRENCY.length - 1}
                className="px-5 py-2.5 rounded-2xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black disabled:opacity-40 shadow-sm transition-all cursor-pointer"
              >
                Seterusnya
              </button>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E2EDED] shadow-sm overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {MALAYSIA_CURRENCY.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => { triggerTap(); setSelectedCurrencyIndex(idx); }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                    selectedCurrencyIndex === idx
                      ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                      : 'bg-[#F1F8F7] text-[#18364D] hover:bg-[#E1F3F0]'
                  }`}
                >
                  <span>{item.type === 'coin' ? '🪙' : '💵'}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KEDAI RUNCIT PPKI */}
      {activeTab === 'shop' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🏪</span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#18364D]">
                  Kedai Runcit Ceria PPKI
                </h2>
                <p className="text-xs font-bold text-[#8CA5A8]">
                  Pilih barang keperluan sekolah &amp; bayar dengan wang yang tepat!
                </p>
              </div>
            </div>

            <AudioButton
              text={`Selamat datang ke Kedai Runcit Ceria! Barang yang ingin dibeli ialah ${currentShopItem.name} berharga ${currentShopItem.price} ringgit. Ketuk wang kertas di bawah untuk bayar.`}
              label="Dengar Pekedai"
              size="sm"
            />
          </div>

          {/* Rak Barang Kedai */}
          <div className="p-4 bg-gradient-to-r from-[#FFF5D7] to-[#FFEBE4] rounded-3xl border border-[#F8C84E] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-sm border border-slate-200">
                {currentShopItem.emoji}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#9A6B0F] bg-white px-2 py-0.5 rounded-full border border-[#F2DA91]">
                  Barang Pilihan
                </span>
                <h3 className="text-xl font-black text-[#18364D] mt-1">
                  {currentShopItem.name}
                </h3>
                <span className="text-sm font-black text-[#168F83]">
                  Harga: RM {currentShopItem.price}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-[#8CA5A8] block">Perlu dibayar:</span>
              <span className="text-2xl font-black text-[#18364D] bg-white px-3 py-1 rounded-xl shadow-inner border border-slate-200 inline-block">
                RM {currentShopItem.price}
              </span>
            </div>
          </div>

          {/* Kaunter Bayaran */}
          <div className="p-4 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] max-w-xl mx-auto text-center">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-xs font-black text-[#476571]">Duit di kaunter:</span>
              <span className="text-base font-black text-[#168F83] bg-white px-3 py-1 rounded-xl border border-slate-200">
                Jumlah: RM {totalTendered}
              </span>
            </div>

            <div className="min-h-[60px] p-2.5 bg-white rounded-xl border border-dashed border-[#D5E1E1] flex flex-wrap items-center justify-center gap-2">
              {tenderedNotes.length === 0 ? (
                <span className="text-xs font-bold text-[#8CA5A8]">
                  (Kaunter kosong. Ketuk wang kertas di bawah untuk bayar)
                </span>
              ) : (
                tenderedNotes.map((val, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#E7F8F4] text-[#168F83] font-black px-2.5 py-1 rounded-xl border border-[#B9E2DC] text-xs"
                  >
                    <span>💵</span>
                    <span>RM {val}</span>
                  </span>
                ))
              )}
            </div>

            {shopSuccess && (
              <div className="p-3 bg-[#E7F8F4] border border-[#B9E2DC] text-[#168F83] rounded-2xl my-3 flex items-center justify-center gap-2">
                <CheckCircle size={20} className="text-[#1BAE9D]" />
                <span className="font-black text-xs sm:text-sm">
                  Kaching! Bayaran Berjaya! Dapat +10 Syiling Emas! 🪙
                </span>
              </div>
            )}
          </div>

          {/* Dompet Murid */}
          <div className="space-y-2 text-center">
            <span className="text-[11px] font-black uppercase text-[#8CA5A8] tracking-wider">
              Dompet Adik (Ketuk wang untuk bayar):
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAddMoneyToCounter(1)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-sm border border-blue-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <span>💵</span>
                <span>+ RM 1 (Biru)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddMoneyToCounter(5)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-sm border border-emerald-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <span>💵</span>
                <span>+ RM 5 (Hijau)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddMoneyToCounter(10)}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-sm border border-red-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <span>💵</span>
                <span>+ RM 10 (Merah)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetShopPayment}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl shadow-sm cursor-pointer active:scale-95 text-xs"
            >
              <RotateCcw size={15} />
              <span>Kosongkan Kaunter</span>
            </button>

            {!shopSuccess ? (
              <button
                onClick={handlePayShopkeeper}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black rounded-xl shadow-sm cursor-pointer active:scale-95 text-xs sm:text-sm"
              >
                <ShoppingBag size={17} />
                <span>Bayar Pekedai</span>
              </button>
            ) : (
              <button
                onClick={handleNextShopItem}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black rounded-xl shadow-sm cursor-pointer active:scale-95 text-xs sm:text-sm"
              >
                <span>Beli Barang Lain</span>
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: 25 SOALAN KUIZ WANG */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E2EDED] shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#168F83]">
                Soalan {questionIndex + 1} daripada {MONEY_QUIZZES.length}
              </span>
              <p className="text-[11px] font-bold text-[#8CA5A8]">
                Markah: {score} betul
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {MONEY_QUIZZES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    triggerTap();
                    setQuestionIndex(i);
                    setSelectedChoice(null);
                    setIsAnswered(false);
                    setIsCorrect(false);
                    setShowHint(false);
                  }}
                  className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center transition-all cursor-pointer ${
                    i === questionIndex
                      ? 'bg-[#1BAE9D] text-white ring-2 ring-[#9FD7D0]'
                      : i < questionIndex
                      ? 'bg-[#E7F8F4] text-[#168F83]'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                  title={`Pergi ke soalan ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {quizFinished ? (
            <div className="bg-white rounded-3xl p-8 border border-[#E2EDED] shadow-sm text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FFF5D7] border-2 border-[#F8C84E] mx-auto flex items-center justify-center text-4xl shadow-sm">
                🏆
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#18364D]">
                Tahniah! 25 Soalan Wang Selesai!
              </h2>
              <p className="text-sm sm:text-base font-bold text-[#476571]">
                Adik telah menjawab {score} daripada 25 soalan dengan cemerlang!
              </p>
              <div className="flex items-center justify-center gap-2 text-3xl my-2">
                ⭐⭐⭐
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleRestartQuiz}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold cursor-pointer active:scale-95"
                >
                  <RotateCcw size={16} />
                  <span>Main Semula</span>
                </button>

                <button
                  onClick={() => { triggerTap(); setActiveView('module-time'); }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Modul 5: Jam &amp; Waktu Kita</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2EDED] shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-black bg-[#E7F8F4] text-[#168F83] px-3 py-1 rounded-full border border-[#B9E2DC]">
                  Soalan {questionIndex + 1} / 25
                </span>

                <AudioButton
                  text={currentQ.audioText}
                  autoPlay={true}
                  label="Dengar Soalan"
                  size="sm"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#18364D] text-center leading-snug">
                {currentQ.prompt}
              </h3>

              {/* Visual Wang jika ada */}
              {currentQ.visualType === 'money-display' && currentQ.visualData && (
                <div className="flex justify-center my-3 py-1">
                  <MalaysianMoney id={currentQ.visualData.item} size="md" />
                </div>
              )}

              {/* Pilihan A, B, C dengan Suara Bahasa Melayu Standard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                {currentQ.choices.map((choice) => {
                  const isSelected = selectedChoice === choice.id;
                  const isAudioActive = speakingChoice === choice.id;

                  let btnStyle = 'bg-white hover:bg-[#F8FCFC] border-[#E0EBEB] text-[#18364D]';

                  if (isAnswered) {
                    if (choice.isCorrect) {
                      btnStyle = 'bg-[#E7F8F4] border-[#1BAE9D] text-[#168F83] ring-4 ring-[#9FD7D0]';
                    } else if (isSelected && !choice.isCorrect) {
                      btnStyle = 'bg-[#FFF0ED] border-[#F47E69] text-[#D86552] opacity-75';
                    }
                  }

                  return (
                    <div key={choice.id} className="relative">
                      <button
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectChoice(choice.id, choice.isCorrect)}
                        className={`min-h-[110px] w-full p-4 rounded-2xl font-black border-2 flex flex-col items-center justify-center gap-1 transition-all select-none shadow-sm cursor-pointer ${btnStyle} active:scale-95`}
                      >
                        <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-[#18364D] text-white text-xs font-black flex items-center justify-center shadow-sm">
                          {choice.id}
                        </span>

                        <span className="text-xl sm:text-2xl font-black mt-2">
                          {choice.text}
                        </span>

                        {choice.subText && (
                          <span className="text-xs font-bold opacity-75">
                            {choice.subText}
                          </span>
                        )}

                        <span className="text-[10px] font-black uppercase text-[#8CA5A8]">
                          {choice.label}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleSpeakOption(e, choice.id, choice.text)}
                        aria-label={`Dengar ${choice.label} dalam Bahasa Melayu Standard`}
                        title={`Dengar ${choice.label}`}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full border shadow-sm flex items-center justify-center cursor-pointer transition active:scale-90 ${
                          isAudioActive
                            ? 'bg-[#1BAE9D] text-white border-[#1BAE9D] speaking'
                            : 'bg-white text-[#1BAE9D] border-[#DCE9E9] hover:bg-[#E7F8F4]'
                        }`}
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] font-semibold text-center text-[#8CA5A8]">
                💡 Tekan ikon bunyi pada kad untuk dengar <strong className="text-[#168F83]">Pilihan A</strong>, Pilihan B atau Pilihan C.
              </p>

              {isAnswered && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isCorrect
                    ? 'bg-[#E7F8F4] border-[#B9E2DC] text-[#168F83]'
                    : 'bg-[#FFF8E9] border-[#F8C84E] text-[#9A6B0F]'
                }`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? <CheckCircle size={22} className="text-[#1BAE9D]" /> : <span>💡</span>}
                    <p className="text-xs sm:text-sm font-extrabold">
                      {isCorrect ? 'Tahniah! Jawapan nilai wang tepat!' : currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                  >
                    <span>{questionIndex === MONEY_QUIZZES.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {!isAnswered && currentQ.hint && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { triggerTap(); setShowHint(!showHint); }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8CA5A8] hover:text-[#168F83] bg-slate-50 hover:bg-[#F1F8F7] px-3 py-1 rounded-full cursor-pointer"
                  >
                    <HelpCircle size={14} />
                    <span>{showHint ? 'Tutup Petunjuk' : 'Perlukan Petunjuk?'}</span>
                  </button>

                  {showHint && (
                    <p className="text-xs font-bold text-[#18364D] bg-[#FFF8E9] p-3 rounded-2xl border border-[#F8C84E] mt-2 max-w-md mx-auto">
                      💡 {currentQ.hint}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pembantu Maskot */}
      <MascotHelper
        message={isAnswered && isCorrect ? 'Bagus adik! Rajin menabung dan bijak menggunakan wang ringgit!' : 'Ingat warna duit ya: Biru RM1, Hijau RM5, Merah RM10!'}
      />
    </div>
  );
};
