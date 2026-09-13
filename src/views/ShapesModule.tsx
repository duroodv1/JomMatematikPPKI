import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SHAPES_DATA } from '../data/modulesData';
import { SHAPES_QUIZZES } from '../data/moduleQuizzes';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Shapes, 
  Gamepad2, 
  RotateCcw, 
  HelpCircle,
  Volume2
} from 'lucide-react';

export const ShapesModule: React.FC = () => {
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
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number>(0);

  // Status kuiz 25 soalan
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const activeShape = SHAPES_DATA[selectedShapeIndex];
  const currentQ = SHAPES_QUIZZES[questionIndex];

  const renderShapeVisual = (id: string) => {
    switch (id) {
      case 'bulatan':
        return (
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500 border-4 border-rose-600 shadow-sm flex items-center justify-center text-white text-4xl">
            ⭕
          </div>
        );
      case 'segi-tiga':
        return (
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-6xl sm:text-7xl select-none filter drop-shadow">
            🔺
          </div>
        );
      case 'segi-empat-sama':
        return (
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-500 border-4 border-blue-600 shadow-sm flex items-center justify-center text-white text-4xl">
            🟦
          </div>
        );
      case 'segi-empat-tepat':
        return (
          <div className="w-36 h-20 sm:w-44 sm:h-24 rounded-2xl bg-emerald-500 border-4 border-emerald-600 shadow-sm flex items-center justify-center text-white text-3xl">
            📋
          </div>
        );
      case 'bintang':
        return (
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-6xl sm:text-7xl select-none filter drop-shadow">
            ⭐
          </div>
        );
      case 'bujur':
        return (
          <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-[50%] bg-purple-500 border-4 border-purple-600 shadow-sm flex items-center justify-center text-white text-4xl">
            🥚
          </div>
        );
      default:
        return <span>🔺</span>;
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
      speakText('Tepat sekali! Adik hebat mengecam bentuk dan corak!');
      completeQuestion('shapes', questionIndex, 1, 2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Perhatikan bucu dan sisi bentuk.');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < SHAPES_QUIZZES.length - 1) {
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
              <span>🔺 Modul 6: Bentuk &amp; Corak</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Kuiz Bentuk 2D &amp; Sambung Corak Berselang
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
            <Shapes size={16} />
            <span>Kad Bentuk 2D</span>
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
            <span>25 Soalan Bentuk</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KAD BENTUK 2D */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider bg-[#FFEBE4] text-[#D86552] px-3 py-1 rounded-full border border-[#F9C3B8]">
                Bentuk {selectedShapeIndex + 1} daripada {SHAPES_DATA.length}
              </span>

              <AudioButton
                text={`Bentuk ini ialah ${activeShape.name}. Ciri-cirinya: ${activeShape.sides}. Contoh objek sebenar ialah ${activeShape.examples.join(', ')}.`}
                label="Dengar Sebutan Bentuk"
                size="md"
              />
            </div>

            <div className="my-5 flex justify-center items-center py-2">
              {renderShapeVisual(activeShape.id)}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#18364D] uppercase">
              {activeShape.name}
            </h2>
            <span className="text-xs font-bold text-[#8CA5A8] block -mt-2">
              ({activeShape.english})
            </span>

            <div className="p-3.5 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] max-w-lg mx-auto text-left space-y-2">
              <div className="text-xs sm:text-sm font-black text-[#18364D]">
                <span className="text-[#168F83]">Ciri: </span>
                <span>{activeShape.sides}</span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-[#8CA5A8] tracking-wider block mb-1">
                  Contoh Objek Nyata:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeShape.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white rounded-xl text-xs font-black text-[#476571] border border-slate-200 shadow-sm"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 max-w-md mx-auto">
              <button
                onClick={() => {
                  triggerTap();
                  if (selectedShapeIndex > 0) setSelectedShapeIndex(prev => prev - 1);
                }}
                disabled={selectedShapeIndex === 0}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold disabled:opacity-40 shadow-sm transition-all cursor-pointer"
              >
                Sebelum
              </button>

              <button
                onClick={() => {
                  triggerTap();
                  if (selectedShapeIndex < SHAPES_DATA.length - 1) setSelectedShapeIndex(prev => prev + 1);
                }}
                disabled={selectedShapeIndex === SHAPES_DATA.length - 1}
                className="px-5 py-2.5 rounded-2xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black disabled:opacity-40 shadow-sm transition-all cursor-pointer"
              >
                Seterusnya
              </button>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E2EDED] shadow-sm overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max pb-1">
              {SHAPES_DATA.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => { triggerTap(); setSelectedShapeIndex(idx); }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    selectedShapeIndex === idx
                      ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                      : 'bg-[#F1F8F7] text-[#18364D] hover:bg-[#E1F3F0]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 25 SOALAN KUIZ BENTUK & CORAK */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E2EDED] shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#168F83]">
                Soalan {questionIndex + 1} daripada {SHAPES_QUIZZES.length}
              </span>
              <p className="text-[11px] font-bold text-[#8CA5A8]">
                Markah: {score} betul
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {SHAPES_QUIZZES.map((_, i) => (
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
                Tahniah! 25 Soalan Bentuk Selesai!
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
                  onClick={() => { triggerTap(); setActiveView('module-adventure'); }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Modul 7: Pulau Pengembaraan</span>
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

              {/* Visual Bentuk jika ada */}
              {currentQ.visualType === 'shape-display' && currentQ.visualData && (
                <div className="flex justify-center my-3 py-1">
                  {renderShapeVisual(currentQ.visualData.shape)}
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
                        className={`min-h-[110px] w-full p-4 rounded-2xl font-black border-2 flex flex-col items-center justify-center gap-1 transition-all select-none shadow-sm cursor-pointer ${btnStyle} active:scale-95 text-center`}
                      >
                        <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-[#18364D] text-white text-xs font-black flex items-center justify-center shadow-sm">
                          {choice.id}
                        </span>

                        <span className="text-lg sm:text-xl font-black mt-2">
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
                      {isCorrect ? 'Tahniah! Jawapan bentuk kamu tepat!' : currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                  >
                    <span>{questionIndex === SHAPES_QUIZZES.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}</span>
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
        message={isAnswered && isCorrect ? 'Hebat adik! Bentuk ada di mana-mana di sekeliling kita!' : 'Kira bucu dan sisinya untuk pastikan jenis bentuk itu!'}
      />
    </div>
  );
};
