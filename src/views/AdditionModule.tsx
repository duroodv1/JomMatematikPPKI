import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADDITION_QUIZZES } from '../data/moduleQuizzes';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  RotateCcw, 
  Plus, 
  Sparkles,
  BookOpen, 
  Gamepad2,
  Volume2
} from 'lucide-react';

export const AdditionModule: React.FC = () => {
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

  // Eksperimen Gabung Objek Konkrit
  const [leftNum, setLeftNum] = useState<number>(3);
  const [rightNum, setRightNum] = useState<number>(2);
  const [isMerged, setIsMerged] = useState<boolean>(false);

  // Status kuiz 25 soalan
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const currentQ = ADDITION_QUIZZES[questionIndex];

  const handleMergeObjects = () => {
    triggerTap();
    setIsMerged(true);
    const total = leftNum + rightNum;
    speakText(`${leftNum} epal ditambah dengan ${rightNum} epal digabungkan menjadi ${total} epal!`);
  };

  const handleResetConcept = () => {
    triggerTap();
    setIsMerged(false);
  };

  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C', correct: boolean) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
    setIsAnswered(true);

    if (correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      triggerCorrect();
      speakText('Betul! Jawapan tambah kamu tepat sekali!');
      completeQuestion('addition', questionIndex, 1, 2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Cuba gabungkan semua objek dan kira semula.');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < ADDITION_QUIZZES.length - 1) {
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
              <span>➕ Modul 2: Tambah Ceria</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Kuiz &amp; Eksperimen Gabung Objek Konkrit
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
            <span>Gabung Objek</span>
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
            <span>25 Soalan Tambah</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EKSPERIMEN GABUNG OBJEK KONKRIT */}
      {activeTab === 'concept' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider bg-[#E7F8F4] text-[#168F83] px-3 py-1 rounded-full border border-[#B9E2DC]">
              Konsep Tambah: Gabungkan Dua Kumpulan Objek
            </span>

            <AudioButton
              text={`Konsep Tambah. Tambah bermaksud menggabungkan dua kumpulan objek menjadi satu jumlah. Contohnya ${leftNum} epal ditambah ${rightNum} epal menjadi ${leftNum + rightNum} epal.`}
              label="Dengar Penerangan"
              size="md"
            />
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#476571] max-w-xl mx-auto">
            Pilih bilangan epal di bakul kiri dan kanan, kemudian tekan butang untuk menggabungkannya!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="p-3.5 bg-[#F1FBF9] rounded-2xl border border-[#B9E2DC] flex flex-col items-center">
              <span className="text-xs font-black text-[#168F83] mb-2">Bakul Kiri: {leftNum} Epal</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => { triggerTap(); setLeftNum(n); setIsMerged(false); }}
                    className={`w-9 h-9 rounded-xl font-black text-sm transition-all cursor-pointer ${
                      leftNum === n
                        ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                        : 'bg-white text-[#18364D] hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-[#FFF8E9] rounded-2xl border border-[#F8C84E]/50 flex flex-col items-center">
              <span className="text-xs font-black text-[#9A6B0F] mb-2">Bakul Kanan: {rightNum} Epal</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => { triggerTap(); setRightNum(n); setIsMerged(false); }}
                    className={`w-9 h-9 rounded-xl font-black text-sm transition-all cursor-pointer ${
                      rightNum === n
                        ? 'bg-[#F8C84E] text-[#18364D] shadow-sm scale-105'
                        : 'bg-white text-[#18364D] hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!isMerged ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
              <div className="p-4 bg-[#F1FBF9] rounded-2xl border border-[#B9E2DC] min-w-[130px]">
                <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                  {Array.from({ length: leftNum }).map((_, i) => (
                    <span key={i} className="text-3xl">🍎</span>
                  ))}
                </div>
                <span className="text-sm font-black text-[#168F83]">{leftNum} Epal</span>
              </div>

              <div className="w-12 h-12 rounded-full bg-[#1BAE9D] text-white flex items-center justify-center font-black shadow-sm shrink-0">
                <Plus size={24} />
              </div>

              <div className="p-4 bg-[#FFF8E9] rounded-2xl border border-[#F8C84E]/50 min-w-[130px]">
                <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                  {Array.from({ length: rightNum }).map((_, i) => (
                    <span key={i} className="text-3xl">🍎</span>
                  ))}
                </div>
                <span className="text-sm font-black text-[#9A6B0F]">{rightNum} Epal</span>
              </div>
            </div>
          ) : (
            <div className="p-5 bg-gradient-to-r from-[#E7F8F4] to-[#FFF8E9] rounded-3xl border-2 border-[#1BAE9D] shadow-sm my-6 max-w-xl mx-auto">
              <span className="text-[10px] font-black uppercase text-[#168F83] bg-white px-3 py-1 rounded-full border border-[#B9E2DC]">
                Semua Epal Digabungkan Bersama! 🎉
              </span>

              <div className="flex flex-wrap items-center justify-center gap-2 my-4">
                {Array.from({ length: leftNum + rightNum }).map((_, i) => (
                  <div key={i} className="relative">
                    <span className="text-3xl sm:text-4xl">🍎</span>
                    <span className="absolute -bottom-1 -right-1 text-[10px] font-black bg-[#18364D] text-white w-4 h-4 rounded-full flex items-center justify-center shadow">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-xl sm:text-2xl font-black text-[#18364D] my-1">
                {leftNum} + {rightNum} = {leftNum + rightNum} Epal
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            {!isMerged ? (
              <button
                onClick={handleMergeObjects}
                className="px-6 py-3 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-sm sm:text-base rounded-2xl shadow-sm cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={18} />
                <span>Gabungkan Epal Sekarang! (+)</span>
              </button>
            ) : (
              <button
                onClick={handleResetConcept}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-2xl shadow-sm cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
              >
                <RotateCcw size={16} />
                <span>Asingkan Semula</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 25 SOALAN KUIZ TAMBAH */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E2EDED] shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#168F83]">
                Soalan {questionIndex + 1} daripada {ADDITION_QUIZZES.length}
              </span>
              <p className="text-[11px] font-bold text-[#8CA5A8]">
                Markah: {score} betul
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {ADDITION_QUIZZES.map((_, i) => (
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
                🎉
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#18364D]">
                Tahniah! 25 Soalan Tambah Selesai!
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
                  onClick={() => { triggerTap(); setActiveView('module-subtraction'); }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Modul 3: Tolak Mudah</span>
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

              {/* Visual Tambah jika ada */}
              {currentQ.visualType === 'addition-visual' && currentQ.visualData && (
                <div className="flex items-center justify-center gap-2.5 p-3.5 bg-[#F1FBF9] rounded-2xl border border-[#B9E2DC] my-3 max-w-md mx-auto">
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

              {/* Pilihan A, B, C dengan butang suara ms-MY */}
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
                      {isCorrect ? 'Tahniah! Jawapan tambah kamu tepat!' : currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                  >
                    <span>{questionIndex === ADDITION_QUIZZES.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}</span>
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
        message={isAnswered && isCorrect ? 'Hebat! Kamu semakin cekap menambah nombor!' : 'Ingat konsep tambah: kita cantumkan semua objek menjadi satu kumpulan!'}
      />
    </div>
  );
};
