import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADVENTURE_QUIZZES } from '../data/moduleQuizzes';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import { TouchCounter } from '../components/TouchCounter';
import { AnalogClock } from '../components/AnalogClock';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Trophy, 
  RotateCcw,
  Compass,
  Award,
  Volume2
} from 'lucide-react';

export const AdventureModule: React.FC = () => {
  const { 
    setActiveView, 
    completeQuestion, 
    addCoins, 
    triggerTap, 
    triggerCorrect, 
    triggerWrong, 
    triggerFanfare,
    setActiveModal,
    speakText,
    speakOption 
  } = useApp();

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questCompleted, setQuestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const currentQ = ADVENTURE_QUIZZES[questionIndex];

  // Hitung pulau semasa (1 hingga 5)
  const currentIsland = Math.floor(questionIndex / 5) + 1;
  const islandNames = [
    'Pulau 1: Pantai Bilang 🥥',
    'Pulau 2: Gua Tambah Ceria 💎',
    'Pulau 3: Sungai Tolak Jeram 🌊',
    'Pulau 4: Pasar Wang Nelayan 🏪',
    'Pulau 5: Puncak Peti Emas 👑'
  ];

  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C', correct: boolean) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
    setIsAnswered(true);

    if (correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      triggerCorrect();
      addCoins(3);
      speakText('Tepat sekali! Cabaran pulau berjaya diselesaikan!');
      completeQuestion('adventure', questionIndex, 1, 3);
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Mari kita cuba lagi!');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < ADVENTURE_QUIZZES.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedChoice(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setQuestCompleted(true);
      triggerFanfare();
      addCoins(50);
      try {
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.5 } });
      } catch {
        // Abaikan
      }
    }
  };

  const handleRestartQuest = () => {
    triggerTap();
    setQuestionIndex(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuestCompleted(false);
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
              <span>🏝️ Modul 7: Pulau Pengembaraan</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Cabaran 5 Pulau &amp; Buka Peti Harta Karun Emas PPKI!
            </p>
          </div>
        </div>

        <AudioButton
          text="Selamat datang ke Pulau Pengembaraan Angka! Selesaikan dua puluh lima soalan merentasi lima pulau untuk membuka Peti Harta Karun Emas PPKI!"
          label="Dengar Pengenalan"
          size="sm"
        />
      </div>

      {/* SKRIN PETI HARTA KARUN TERBUKA APABILA 25 SOALAN SELESAI */}
      {questCompleted ? (
        <div className="bg-gradient-to-b from-[#FFF5D7] via-white to-[#E7F8F4] rounded-3xl p-8 border-4 border-[#F8C84E] shadow-sm text-center space-y-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FFF0BD] to-[#F8C84E] border-4 border-white mx-auto flex items-center justify-center text-6xl shadow-md">
            👑
          </div>

          <div className="inline-flex items-center gap-2 bg-[#F8C84E] text-[#18364D] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider">
            <Sparkles size={16} />
            <span>Peti Harta Karun Emas Terbuka!</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#18364D]">
            Adik Juara Dunia Angka PPKI! 🎉
          </h2>

          <p className="text-sm sm:text-base font-bold text-[#476571] max-w-lg mx-auto">
            Tahniah! Semua 25 cabaran merentasi 5 pulau telah adik selesaikan dengan markah {score} / 25. Adik layak menerima Sijil Penghargaan Khas PPKI!
          </p>

          <div className="p-4 bg-white rounded-2xl border border-[#F8C84E] max-w-sm mx-auto flex items-center justify-center gap-3 shadow-sm">
            <Trophy size={32} className="text-[#D78E15]" />
            <div className="text-left">
              <span className="text-[10px] font-black uppercase text-[#8CA5A8]">Ganjaran Khas:</span>
              <p className="text-base font-black text-[#18364D]">+50 Syiling Emas &amp; Piala Juara</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => { triggerTap(); setActiveModal('certificate'); }}
              className="px-6 py-3 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-sm sm:text-base rounded-2xl shadow-sm cursor-pointer active:scale-95 transition-all flex items-center gap-2"
            >
              <Award size={18} />
              <span>Lihat / Cetak Sijil Murid PPKI</span>
            </button>

            <button
              onClick={handleRestartQuest}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm rounded-2xl shadow-sm cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={16} />
              <span>Mula Semula Pengembaraan</span>
            </button>
          </div>
        </div>
      ) : (
        /* KAD SOALAN PENGEMBARAAN AKTIF */
        <div className="space-y-4">
          {/* Peta 5 Pulau - Penunjuk Semasa */}
          <div className="bg-white p-4 rounded-3xl border border-[#E2EDED] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="text-[#1BAE9D]" size={18} />
                <span className="text-xs font-black uppercase text-[#168F83]">
                  {islandNames[currentIsland - 1]}
                </span>
              </div>
              <span className="text-xs font-black bg-[#E7F8F4] text-[#168F83] px-3 py-1 rounded-full border border-[#B9E2DC]">
                Soalan {questionIndex + 1} / 25
              </span>
            </div>

            {/* Stepper 25 Soalan Pengembaraan */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {ADVENTURE_QUIZZES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    triggerTap();
                    setQuestionIndex(i);
                    setSelectedChoice(null);
                    setIsAnswered(false);
                    setIsCorrect(false);
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

          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2EDED] shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-black text-[#8CA5A8]">
                Cabaran {((questionIndex) % 5) + 1} daripada 5 di {islandNames[currentIsland - 1]}
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

            {/* Visual Bantuan */}
            <div className="my-3">
              {currentQ.visualType === 'emoji-grid' && currentQ.visualData && (
                <TouchCounter
                  emoji={currentQ.visualData.emoji}
                  totalCount={currentQ.visualData.count}
                  itemName={currentQ.visualData.name}
                />
              )}

              {currentQ.visualType === 'addition-visual' && currentQ.visualData && (
                <div className="flex items-center justify-center gap-2 p-3 bg-[#F1FBF9] rounded-2xl border border-[#B9E2DC] max-w-md mx-auto">
                  <div className="flex gap-1 p-2 bg-white rounded-xl shadow-inner">
                    {Array.from({ length: currentQ.visualData.leftCount }).map((_, i) => (
                      <span key={i} className="text-2xl">{currentQ.visualData.emoji}</span>
                    ))}
                  </div>
                  <span className="text-xl font-black text-[#168F83]">+</span>
                  <div className="flex gap-1 p-2 bg-white rounded-xl shadow-inner">
                    {Array.from({ length: currentQ.visualData.rightCount }).map((_, i) => (
                      <span key={i} className="text-2xl">{currentQ.visualData.emoji}</span>
                    ))}
                  </div>
                  <span className="text-xl font-black text-[#168F83]">= ?</span>
                </div>
              )}

              {currentQ.visualType === 'subtraction-visual' && currentQ.visualData && (
                <div className="p-3 bg-[#FFF0ED] rounded-2xl border border-[#F9C3B8] max-w-md mx-auto">
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: currentQ.visualData.totalCount }).map((_, i) => {
                      const isRemoved = i >= (currentQ.visualData.totalCount - currentQ.visualData.removeCount);
                      return (
                        <div
                          key={i}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                            isRemoved ? 'bg-rose-50 border-rose-300 opacity-60' : 'bg-white border-[#F47E69]'
                          }`}
                        >
                          <span className="text-2xl">{currentQ.visualData.emoji}</span>
                          {isRemoved && <span className="absolute text-xl font-black text-rose-600">❌</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentQ.visualType === 'clock-display' && currentQ.visualData && (
                <div className="flex justify-center my-2">
                  <AnalogClock
                    hour={currentQ.visualData.hour}
                    minute={currentQ.visualData.minute}
                    size={180}
                    showDigital={false}
                  />
                </div>
              )}
            </div>

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
                      className={`min-h-[110px] w-full p-4 rounded-2xl font-black border-2 flex flex-col items-center justify-center gap-1 transition-all select-none shadow-sm cursor-pointer ${btnStyle} active:scale-95 text-center`}
                    >
                      <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-[#18364D] text-white text-xs font-black flex items-center justify-center shadow-sm">
                        {choice.id}
                      </span>

                      <span className="text-base sm:text-xl font-black mt-2">
                        {choice.text}
                      </span>

                      {choice.subText && (
                        <span className="text-[11px] font-bold opacity-75">
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
                    {isCorrect ? 'Tahniah! Cabaran pulau berjaya!' : currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                >
                  <span>
                    {questionIndex === ADVENTURE_QUIZZES.length - 1
                      ? 'Buka Peti Emas Juara! 👑'
                      : 'Cabaran Seterusnya'}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pembantu Maskot */}
      <MascotHelper
        message="Teruskan pengembaraan adik! Peti Harta Karun Emas semakin hampir!"
      />
    </div>
  );
};
