import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TIME_QUIZZES } from '../data/moduleQuizzes';
import { DAILY_ROUTINES } from '../data/modulesData';
import { AnalogClock } from '../components/AnalogClock';
import { AudioButton } from '../components/AudioButton';
import { MascotHelper } from '../components/MascotHelper';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Gamepad2, 
  RotateCcw, 
  HelpCircle,
  Volume2
} from 'lucide-react';

export const TimeModule: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState<'study' | 'daily' | 'quiz'>('study');

  // Jam interaktif
  const [selectedHour, setSelectedHour] = useState<number>(3);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  // Status kuiz 25 soalan
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [speakingChoice, setSpeakingChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const currentQ = TIME_QUIZZES[questionIndex];

  const handleSetTime = (h: number, m: number) => {
    triggerTap();
    setSelectedHour(h);
    setSelectedMinute(m);
    const minuteText = m === 30 ? 'setengah' : 'tepat';
    speakText(`Pukul ${h} ${minuteText}. Jarum pendek merah di angka ${h}.`);
  };

  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C', correct: boolean) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
    setIsAnswered(true);

    if (correct) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      triggerCorrect();
      speakText('Tepat sekali! Adik pandai membaca jarum jam dan waktu!');
      completeQuestion('time', questionIndex, 1, 2);
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Abaikan
      }
    } else {
      setIsCorrect(false);
      triggerWrong();
      speakText('Belum tepat. Cuba lihat jarum pendek warna merah.');
    }
  };

  const handleNextQuestion = () => {
    triggerTap();
    if (questionIndex < TIME_QUIZZES.length - 1) {
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
              <span>⏰ Modul 5: Jam &amp; Waktu Kita</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              25 Soalan Kuiz, Jam Analog &amp; Waktu Aktiviti Harian
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
            <Clock size={16} />
            <span>Jam Interaktif</span>
          </button>

          <button
            onClick={() => { triggerTap(); setActiveTab('daily'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white/80'
            }`}
          >
            <BookOpen size={16} />
            <span>Waktu Harian</span>
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
            <span>25 Soalan Jam</span>
          </button>
        </div>
      </div>

      {/* TAB 1: JAM INTERAKTIF */}
      {activeTab === 'study' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider bg-[#E7F8F4] text-[#168F83] px-3 py-1 rounded-full border border-[#B9E2DC]">
              Uji &amp; Gerakkan Jarum Jam
            </span>

            <AudioButton
              text={`Jam ini menunjukkan pukul ${selectedHour} ${selectedMinute === 30 ? 'tiga puluh minit' : 'tepat'}. Jarum pendek merah menunjukkan jam. Jarum panjang biru menunjukkan minit.`}
              label="Dengar Sebutan Jam"
              size="md"
            />
          </div>

          <div className="flex flex-col items-center justify-center my-3">
            <AnalogClock hour={selectedHour} minute={selectedMinute} size={210} showDigital={true} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-w-md w-full">
              <div className="p-3 bg-[#FFEBE4] rounded-2xl border border-[#F9C3B8] text-left">
                <span className="text-[11px] font-black text-[#D86552] block">Jarum Pendek (Merah):</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#18364D]">Menunjukkan JAM ({selectedHour})</span>
              </div>
              <div className="p-3 bg-[#E7F8F4] rounded-2xl border border-[#B9E2DC] text-left">
                <span className="text-[11px] font-black text-[#168F83] block">Jarum Panjang (Biru):</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#18364D]">Menunjukkan MINIT ({selectedMinute})</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <span className="text-[11px] font-black uppercase text-[#8CA5A8] tracking-wider block">
              Pilih Waktu untuk Menguji Jam:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(h => (
                <button
                  key={h}
                  onClick={() => handleSetTime(h, 0)}
                  className={`w-11 h-9 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    selectedHour === h && selectedMinute === 0
                      ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                      : 'bg-white hover:bg-slate-100 text-[#18364D] border border-slate-200'
                  }`}
                >
                  {h}:00
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => handleSetTime(selectedHour, 0)}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                  selectedMinute === 0
                    ? 'bg-[#18364D] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Pukul Tepat (:00)
              </button>
              <button
                onClick={() => handleSetTime(selectedHour, 30)}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                  selectedMinute === 30
                    ? 'bg-[#18364D] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Setengah Jam (:30)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WAKTU AKTIVITI HARIAN */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EDED] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#18364D]">
                  Waktu &amp; Aktiviti Harian Kita
                </h2>
                <p className="text-xs font-bold text-[#8CA5A8]">
                  Kenali perbezaan Pagi, Tengah Hari, Petang dan Malam
                </p>
              </div>

              <AudioButton
                text="Aktiviti harian terbahagi kepada empat waktu: Pagi untuk sarapan dan sekolah, Tengah Hari untuk makan tengah hari, Petang untuk beriadah di padang, dan Malam untuk mengulang kaji dan tidur."
                label="Dengar Penerangan"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DAILY_ROUTINES.map((routine, idx) => (
                <div
                  key={idx}
                  onClick={() => speakText(`${routine.time}. ${routine.title}. ${routine.description}`)}
                  className="p-4 rounded-2xl bg-[#F7FAFA] border border-[#E2EDED] shadow-sm hover:border-[#9FD7D0] cursor-pointer transition-all active:scale-98"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{routine.icon}</span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#168F83] bg-[#E7F8F4] px-2 py-0.5 rounded-md">
                        {routine.time}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-[#18364D] mt-0.5">
                        {routine.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#6D7777]">
                    {routine.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 25 SOALAN KUIZ JAM */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E2EDED] shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-[#168F83]">
                Soalan {questionIndex + 1} daripada {TIME_QUIZZES.length}
              </span>
              <p className="text-[11px] font-bold text-[#8CA5A8]">
                Markah: {score} betul
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
              {TIME_QUIZZES.map((_, i) => (
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
                Tahniah! 25 Soalan Jam Selesai!
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
                  onClick={() => { triggerTap(); setActiveView('module-shapes'); }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Modul 6: Bentuk &amp; Corak</span>
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

              {/* Visual Jam jika ada */}
              {currentQ.visualType === 'clock-display' && currentQ.visualData && (
                <div className="flex justify-center my-3 py-1">
                  <AnalogClock
                    hour={currentQ.visualData.hour}
                    minute={currentQ.visualData.minute}
                    size={180}
                    showDigital={false}
                  />
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
                      {isCorrect ? 'Tahniah! Jawapan waktu kamu tepat!' : currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                  >
                    <span>{questionIndex === TIME_QUIZZES.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}</span>
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
        message={isAnswered && isCorrect ? 'Bagus adik! Urus masa dengan bijak supaya setiap hari gembira!' : 'Lihat jarum pendek warna merah untuk mengetahui nilai jam!'}
      />
    </div>
  );
};
