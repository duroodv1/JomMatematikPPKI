import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NUMBERS_1_TO_20 } from '../data/modulesData';
import { COUNTING_QUIZZES } from '../data/moduleQuizzes';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import { TouchCounter } from '../components/TouchCounter';
import { TenFrame } from '../components/TenFrame';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  RotateCcw,
  BookOpen,
  Gamepad2,
  Volume2
} from 'lucide-react';

export const CountingModule: React.FC = () => {
  const { 
    setActiveView, 
    completeQuestion, 
    triggerTap, 
    triggerCorrect, 
    triggerWrong, 
    triggerFanfare,
    speakText,
    speakOption 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);

  // Status kuiz 25 soalan
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const activeNum = NUMBERS_1_TO_20[currentNumberIndex];
  const currentQ = COUNTING_QUIZZES[questionIndex];

  // Navigasi kad belajar
  const handleNextNumber = () => {
    triggerTap();
    if (currentNumberIndex < NUMBERS_1_TO_20.length - 1) {
      const nextIdx = currentNumberIndex + 1;
      setCurrentNumberIndex(nextIdx);
      speakText(`Nombor ${NUMBERS_1_TO_20[nextIdx].num}. Ejaan: ${NUMBERS_1_TO_20[nextIdx].word}.`);
    }
  };

  const handlePrevNumber = () => {
    triggerTap();
    if (currentNumberIndex > 0) {
      const prevIdx = currentNumberIndex - 1;
      setCurrentNumberIndex(prevIdx);
      speakText(`Nombor ${NUMBERS_1_TO_20[prevIdx].num}. Ejaan: ${NUMBERS_1_TO_20[prevIdx].word}.`);
    }
  };

  const handleSelectNumber = (idx: number) => {
    triggerTap();
    setCurrentNumberIndex(idx);
    speakText(`Nombor ${NUMBERS_1_TO_20[idx].num}. ${NUMBERS_1_TO_20[idx].word}.`);
  };

  // Jawapan kuiz
  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C', correct: boolean) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
    setIsAnswered(true);

    if (correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      triggerCorrect();
      speakText('Betul! Tahniah! Jawapan kamu sangat tepat!');
      completeQuestion('counting', questionIndex, 1, 2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Cuba kira semula satu demi satu.');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < COUNTING_QUIZZES.length - 1) {
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
              <span>🔢 Modul 1: Kenal &amp; Bilang Angka</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Kuiz &amp; Kad Belajar Interaktif 1 hingga 20
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
            <span>Kad Belajar 1–20</span>
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
            <span>25 Soalan Kuiz</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KAD BELAJAR INTERAKTIF */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider bg-[#FFF5D7] text-[#9A6B0F] px-3 py-1 rounded-full border border-[#F2DA91]">
                Kad {activeNum.num} daripada 20
              </span>

              <AudioButton
                text={`Nombor ${activeNum.num}. Ejaan: ${activeNum.word}. Ada ${activeNum.num} biji ${activeNum.name}.`}
                label="Sebut Nombor"
                size="md"
              />
            </div>

            <div className="my-2">
              <span className="text-7xl sm:text-9xl font-black text-[#F8C84E] select-none inline-block">
                {activeNum.num}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#18364D] tracking-wide mt-1 uppercase">
                {activeNum.word}
              </h2>
            </div>

            <div className="my-5 p-4 bg-[#FFF8E9] rounded-2xl border border-[#F8C84E]/40 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-4xl sm:text-5xl select-none">{activeNum.finger}</span>
                <span className="text-xs sm:text-sm font-black text-[#476571]">
                  Jari Tangan: <span className="text-base text-[#18364D]">{activeNum.num}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white rounded-xl shadow-inner min-h-[70px]">
                {Array.from({ length: activeNum.num }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl select-none" title={`${activeNum.name} ${i + 1}`}>
                    {activeNum.emoji}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold text-[#8CA5A8] mt-2">
                Ada {activeNum.num} biji {activeNum.name}
              </p>
            </div>

            <div className="my-3">
              <TenFrame initialCount={Math.min(activeNum.num, 10)} interactive={false} color="amber" />
            </div>

            <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 max-w-md mx-auto">
              <button
                onClick={handlePrevNumber}
                disabled={currentNumberIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold disabled:opacity-40 shadow-sm transition-all cursor-pointer"
              >
                <ArrowLeft size={18} />
                <span>Sebelum</span>
              </button>

              <button
                onClick={handleNextNumber}
                disabled={currentNumberIndex === NUMBERS_1_TO_20.length - 1}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black disabled:opacity-40 shadow-sm transition-all cursor-pointer"
              >
                <span>Seterusnya</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E2EDED] shadow-sm overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {NUMBERS_1_TO_20.map((item, idx) => (
                <button
                  key={item.num}
                  onClick={() => handleSelectNumber(idx)}
                  className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center transition-all cursor-pointer ${
                    currentNumberIndex === idx
                      ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                      : 'bg-[#F1F8F7] text-[#18364D] hover:bg-[#E1F3F0]'
                  }`}
                >
                  {item.num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 25 SOALAN KUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          {/* Bar Kemajuan 25 Soalan */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E2EDED] shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#168F83]">
                Soalan {questionIndex + 1} daripada {COUNTING_QUIZZES.length}
              </span>
              <p className="text-[11px] font-bold text-[#8CA5A8]">
                Markah semasa: {score} betul
              </p>
            </div>

            {/* Stepper bulatan kecil */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {COUNTING_QUIZZES.map((_, i) => (
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
            /* Skrin Tamat 25 Soalan */
            <div className="bg-white rounded-3xl p-8 border border-[#E2EDED] shadow-sm text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FFF5D7] border-2 border-[#F8C84E] mx-auto flex items-center justify-center text-4xl shadow-sm">
                🏆
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#18364D]">
                Tahniah! 25 Soalan Selesai! 🎉
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
                  <span>Mula Semula 25 Soalan</span>
                </button>

                <button
                  onClick={() => { triggerTap(); setActiveView('module-addition'); }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Modul 2: Tambah Ceria</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* Kad Soalan Aktif */
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

              {/* Visual Bantuan */}
              <div className="my-3">
                {currentQ.visualType === 'emoji-grid' && currentQ.visualData && (
                  <TouchCounter
                    emoji={currentQ.visualData.emoji}
                    totalCount={currentQ.visualData.count}
                    itemName={currentQ.visualData.name}
                  />
                )}

                {currentQ.visualType === 'ten-frame' && currentQ.visualData && (
                  <div className="py-2">
                    <TenFrame
                      initialCount={currentQ.visualData.count}
                      interactive={false}
                      color={currentQ.visualData.color}
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
                        className={`min-h-[110px] w-full p-4 rounded-2xl font-black border-2 flex flex-col items-center justify-center gap-1 transition-all select-none shadow-sm cursor-pointer ${btnStyle} active:scale-95`}
                      >
                        {/* Lencana Pilihan A / B / C */}
                        <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-[#18364D] text-white text-xs font-black flex items-center justify-center shadow-sm">
                          {choice.id}
                        </span>

                        <span className="text-3xl font-black mt-2">
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

                      {/* Butang Suara Khusus Pilihan A / B / C */}
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

              {/* Arahan kecil pilihan suara */}
              <p className="text-[11px] font-semibold text-center text-[#8CA5A8]">
                💡 Tekan ikon pembesar suara pada kad untuk dengar <strong className="text-[#168F83]">Pilihan A</strong>, Pilihan B atau Pilihan C.
              </p>

              {/* Maklum Balas Jawapan */}
              {isAnswered && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isCorrect
                    ? 'bg-[#E7F8F4] border-[#B9E2DC] text-[#168F83]'
                    : 'bg-[#FFF8E9] border-[#F8C84E] text-[#9A6B0F]'
                }`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? <CheckCircle size={22} className="text-[#1BAE9D]" /> : <span>💡</span>}
                    <p className="text-xs sm:text-sm font-extrabold">
                      {isCorrect ? 'Tahniah! Jawapan kamu tepat sekali!' : currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                  >
                    <span>{questionIndex === COUNTING_QUIZZES.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* Petunjuk Soalan */}
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
        message={isAnswered && isCorrect ? 'Hebat! Jawapan kamu tepat. Teruskan ke soalan seterusnya!' : 'Kira perlahan-lahan satu demi satu tanpa gopoh ya.'}
      />
    </div>
  );
};
