import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBTRACTION_QUIZZES } from '../data/moduleQuizzes';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  RotateCcw, 
  Minus, 
  BookOpen, 
  Gamepad2,
  Volume2
} from 'lucide-react';

export const SubtractionModule: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState<'concept' | 'quiz'>('concept');

  // Eksperimen Letupkan Belon
  const [totalBalloons, setTotalBalloons] = useState<number>(6);
  const [poppedIndices, setPoppedIndices] = useState<number[]>([]);

  // Status kuiz 25 soalan
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const currentQ = SUBTRACTION_QUIZZES[questionIndex];

  const handlePopBalloon = (idx: number) => {
    triggerTap();
    let updated: number[];
    if (poppedIndices.includes(idx)) {
      updated = poppedIndices.filter(i => i !== idx);
    } else {
      updated = [...poppedIndices, idx];
    }
    setPoppedIndices(updated);

    const remaining = totalBalloons - updated.length;
    speakText(`${totalBalloons} tolak ${updated.length} belon meletup. Baki tinggal ${remaining} belon.`);
  };

  const handleResetConcept = () => {
    triggerTap();
    setPoppedIndices([]);
  };

  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C', correct: boolean) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
    setIsAnswered(true);

    if (correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      triggerCorrect();
      speakText('Betul! Baki tolak kamu sangat tepat!');
      completeQuestion('subtraction', questionIndex, 1, 2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Cuba kira objek yang tidak dipangkah.');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < SUBTRACTION_QUIZZES.length - 1) {
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

  const remainingConcept = totalBalloons - poppedIndices.length;

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
              <span>➖ Modul 3: Tolak Mudah</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Kuiz &amp; Eksperimen Letupkan Belon 🎈💥
            </p>
          </div>
        </div>

        {/* Tab Penukar Mod */}
        <div className="flex items-center gap-1.5 bg-[#F1F8F7] p-1.5 rounded-2xl border border-[#D5EBE7]">
          <button
            onClick={() => { triggerTap(); setActiveTab('concept'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'concept'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white/80'
            }`}
          >
            <BookOpen size={16} />
            <span>Letupkan Belon</span>
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
            <span>25 Soalan Tolak</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EKSPERIMEN LETUPKAN BELON */}
      {activeTab === 'concept' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider bg-[#FFEBE4] text-[#D86552] px-3 py-1 rounded-full border border-[#F9C3B8]">
              Konsep Tolak: Buang Objek &amp; Kira Baki
            </span>

            <AudioButton
              text="Konsep Tolak. Tolak bermaksud membuang atau mengeluarkan sebahagian daripada objek. Sentuh belon untuk meletupkannya dan kira baki belon yang masih elok."
              label="Dengar Arahan"
              size="md"
            />
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#476571] max-w-xl mx-auto">
            Sentuh mana-mana belon untuk menandakannya sebagai meletup (❌). Kira baki belon yang tinggal!
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-black text-[#476571]">Jumlah Asal Belon:</span>
            {[4, 5, 6, 8, 10].map(cnt => (
              <button
                key={cnt}
                onClick={() => { triggerTap(); setTotalBalloons(cnt); setPoppedIndices([]); }}
                className={`px-3 py-1 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  totalBalloons === cnt
                    ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                    : 'bg-white hover:bg-slate-100 text-[#18364D] border border-slate-200'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>

          {/* Tempat Bermain Belon */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-5 bg-[#FFF0ED] rounded-3xl border border-[#F9C3B8] max-w-2xl mx-auto min-h-[140px]">
            {Array.from({ length: totalBalloons }).map((_, idx) => {
              const isPopped = poppedIndices.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handlePopBalloon(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                    isPopped
                      ? 'bg-rose-50 border-2 border-dashed border-rose-300 opacity-60 scale-90'
                      : 'bg-white hover:bg-amber-50 border-2 border-[#F47E69] shadow-sm hover:scale-105 active:scale-95'
                  }`}
                  title={isPopped ? 'Belon meletup (ketuk untuk pulihkan)' : 'Ketuk untuk letupkan belon'}
                >
                  <span className="text-4xl sm:text-5xl">
                    {isPopped ? '💥' : '🎈'}
                  </span>
                  {isPopped && (
                    <span className="absolute top-1 right-1 text-sm font-black text-rose-600">
                      ❌
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Persamaan Tolak Langsung */}
          <div className="p-4 bg-gradient-to-r from-[#FFF5D7] to-[#FFEBE4] rounded-3xl border border-[#F8C84E] shadow-sm max-w-lg mx-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#18364D] flex items-center justify-center gap-3">
              <span>{totalBalloons}</span>
              <Minus size={24} className="text-[#D86552]" />
              <span className="text-[#D86552]">{poppedIndices.length}</span>
              <span>=</span>
              <span className="text-[#168F83] bg-white px-4 py-0.5 rounded-2xl shadow-inner border border-[#B9E2DC]">
                {remainingConcept}
              </span>
            </div>
            <p className="text-xs font-black text-[#476571] mt-2">
              Tinggal <span className="font-black text-sm text-[#168F83]">{remainingConcept}</span> biji belon yang masih elok!
            </p>
          </div>

          <div className="flex items-center justify-center pt-1">
            <button
              onClick={handleResetConcept}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm shadow-sm cursor-pointer active:scale-95"
            >
              <RotateCcw size={15} />
              <span>Tiup Semula Semua Belon</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: 25 SOALAN KUIZ TOLAK */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E2EDED] shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#168F83]">
                Soalan {questionIndex + 1} daripada {SUBTRACTION_QUIZZES.length}
              </span>
              <p className="text-[11px] font-bold text-[#8CA5A8]">
                Markah: {score} betul
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {SUBTRACTION_QUIZZES.map((_, i) => (
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
                Tahniah! 25 Soalan Tolak Selesai!
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
                  onClick={() => { triggerTap(); setActiveView('module-money'); }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Modul 4: Wang Saku Ceria</span>
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

              {/* Visual Tolak dengan tanda ❌ */}
              {currentQ.visualType === 'subtraction-visual' && currentQ.visualData && (
                <div className="p-3.5 bg-[#FFF0ED] rounded-2xl border border-[#F9C3B8] my-3 max-w-md mx-auto">
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: currentQ.visualData.totalCount }).map((_, i) => {
                      const isRemoved = i >= (currentQ.visualData.totalCount - currentQ.visualData.removeCount);
                      return (
                        <div
                          key={i}
                          className={`relative w-12 h-12 rounded-xl flex items-center justify-center border ${
                            isRemoved
                              ? 'bg-rose-50 border-rose-300 opacity-60'
                              : 'bg-white border-[#F47E69] shadow-sm'
                          }`}
                        >
                          <span className="text-2xl">{currentQ.visualData.emoji}</span>
                          {isRemoved && (
                            <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-rose-600">
                              ❌
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] font-bold text-[#8CA5A8] text-center mt-2">
                    Objek bertanda ❌ telah dikeluarkan. Kira baki objek yang elok!
                  </p>
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
                      {isCorrect ? 'Tahniah! Jawapan baki tolak kamu tepat!' : currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                  >
                    <span>{questionIndex === SUBTRACTION_QUIZZES.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}</span>
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
        message={isAnswered && isCorrect ? 'Bagus sekali! Adik semakin mahir menolak nombor!' : 'Tengok objek yang tidak dipangkah, itulah baki jawapan yang betul.'}
      />
    </div>
  );
};
