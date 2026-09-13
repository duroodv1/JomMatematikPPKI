import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MASCOTS } from '../data/mascots';
import { X, Printer, Award, Sparkles, Check, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal: React.FC = () => {
  const { 
    setActiveModal, 
    progress, 
    updateUserProfile, 
    triggerTap, 
    speakText 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(progress.userName);
  const [tempSchool, setTempSchool] = useState(progress.schoolName);

  const currentMascot = MASCOTS.find(m => m.id === progress.activeMascot) || MASCOTS[0];

  const currentDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    triggerTap();
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    } catch {
      // Abaikan
    }
    window.print();
  };

  const handleSaveProfile = () => {
    triggerTap();
    updateUserProfile(tempName, tempSchool, progress.avatar);
    setIsEditing(false);
    speakText(`Nama murid dikemaskini kepada ${tempName}.`);
  };

  const handleReadCertificate = () => {
    triggerTap();
    speakText(
      `Sijil Penghargaan Khas Matematik PPKI. Dengan ini diperakui bahawa ${progress.userName} dari ${progress.schoolName} telah berjaya menguasai tujuh modul matematik PPKI dengan mengumpul ${progress.stars} bintang. Tahniah daripada ${currentMascot.name}!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#E2EDED] shadow-2xl max-w-3xl w-full my-auto flex flex-col overflow-hidden">
        {/* Bar Kawalan Atas (Disembunyikan semasa cetakan) */}
        <div className="p-3 sm:p-4 bg-[#18364D] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="text-[#F8C84E]" size={20} />
            <span className="font-black text-sm">
              Sijil Pencapaian Rasmi PPKI
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadCertificate}
              className="text-xs bg-[#1BAE9D] hover:bg-[#159989] px-3 py-1.5 rounded-xl font-bold cursor-pointer"
            >
              🔊 Dengar Sijil
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs bg-[#F8C84E] hover:bg-[#E2B237] text-[#18364D] px-3 py-1.5 rounded-xl font-bold cursor-pointer flex items-center gap-1"
            >
              <Edit3 size={13} />
              <span>{isEditing ? 'Batal' : 'Ubah Nama'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="text-xs bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl font-bold cursor-pointer flex items-center gap-1"
            >
              <Printer size={13} />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={() => { triggerTap(); setActiveModal(null); }}
              className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer ml-1"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Borang Sunting Nama */}
        {isEditing && (
          <div className="p-4 bg-[#FFF8E9] border-b border-[#F8C84E] flex flex-wrap items-center gap-3 print:hidden">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-black text-[#18364D] block mb-1">Nama Murid:</label>
              <input
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-black text-[#18364D] block mb-1">Nama Sekolah / Kelas:</label>
              <input
                type="text"
                value={tempSchool}
                onChange={e => setTempSchool(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-[#1BAE9D] text-white font-black text-xs rounded-xl cursor-pointer self-end flex items-center gap-1 shadow-sm"
            >
              <Check size={14} />
              <span>Simpan</span>
            </button>
          </div>
        )}

        {/* KERTAS SIJIL (Format Cetakan Rasmi) */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-[#FFFDF8] via-white to-[#F7FCFB] relative">
          <div className="border-8 border-double border-[#F8C84E] rounded-3xl p-6 sm:p-8 relative text-center bg-white shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">🇲🇾</span>
            </div>

            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#D78E15] block">
              PROGRAM PENDIDIKAN KHAS INTEGRASI (PPKI)
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#8CA5A8] uppercase tracking-wider block mb-3">
              KEMENTERIAN PENDIDIKAN MALAYSIA
            </span>

            <div className="w-20 h-0.5 bg-[#F8C84E] mx-auto mb-3" />

            <h1 className="text-2xl sm:text-4xl font-black text-[#18364D] tracking-tight uppercase mb-1">
              SIJIL PENGHARGAAN
            </h1>
            <span className="text-xs sm:text-sm font-black text-[#168F83] uppercase tracking-widest block mb-4">
              JOM MATEMATIK PPKI • DUNIA ANGKA
            </span>

            <p className="text-xs sm:text-sm font-bold text-[#6D7777] mb-1">
              Dengan ini diperakui bahawa:
            </p>

            <h2 className="text-2xl sm:text-4xl font-black text-[#18364D] underline decoration-[#F8C84E] decoration-4 underline-offset-8 my-3">
              {progress.userName}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-[#476571] mb-4">
              dari <span className="font-black text-[#18364D]">{progress.schoolName}</span>
            </p>

            <p className="text-xs sm:text-sm font-semibold text-[#6D7777] max-w-xl mx-auto leading-relaxed mb-6">
              Telah menunjukkan ketekunan dan kecemerlangan yang tinggi dalam menguasai 7 modul matematik asas: membilang nombor 1-20, operasi tambah ceria, operasi tolak mudah, celik wang Malaysia, pengurusan jam dan masa harian, bentuk geometri, serta cabaran Pulau Pengembaraan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-5 pt-3 border-t border-[#E2EDED]">
              <div className="flex items-center gap-2 bg-[#FFF8E9] px-3.5 py-1.5 rounded-2xl border border-[#F8C84E]">
                <Sparkles size={16} className="text-[#D78E15] fill-[#F8C84E]" />
                <div className="text-left">
                  <span className="text-[9px] font-bold text-[#8CA5A8] block">Bintang:</span>
                  <span className="text-xs sm:text-sm font-black text-[#18364D]">{progress.stars} ⭐</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#FFF8E9] px-3.5 py-1.5 rounded-2xl border border-[#F8C84E]">
                <span className="text-lg">🪙</span>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-[#8CA5A8] block">Syiling:</span>
                  <span className="text-xs sm:text-sm font-black text-[#18364D]">{progress.coins}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#E7F8F4] px-3.5 py-1.5 rounded-2xl border border-[#B9E2DC]">
                <span className="text-lg">🎨</span>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-[#8CA5A8] block">Pelekat:</span>
                  <span className="text-xs sm:text-sm font-black text-[#18364D]">{progress.unlockedStickers.length} Dibuka</span>
                </div>
              </div>
            </div>

            {/* Tandatangan & Tarikh */}
            <div className="flex items-end justify-between pt-5 border-t border-slate-200 text-left text-xs font-bold text-slate-700">
              <div>
                <span className="text-[9px] text-[#8CA5A8] block">Tarikh Dianugerahkan:</span>
                <span className="font-extrabold text-[#18364D]">{currentDate}</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-3 border-dashed border-[#F8C84E] flex items-center justify-center text-3xl shadow-inner bg-[#FFF8E9] rotate-3 overflow-hidden">
                  {currentMascot.image ? (
                    <img src={currentMascot.image} alt={currentMascot.name} className="w-full h-full object-cover" />
                  ) : (
                    currentMascot.avatar
                  )}
                </div>
                <span className="text-[8px] font-black uppercase text-[#D78E15] mt-1">
                  COP PENGESAHAN MASCOT
                </span>
              </div>

              <div className="text-right">
                <span className="text-sm text-[#18364D] font-black block italic">
                  {currentMascot.name}
                </span>
                <span className="text-[9px] text-[#8CA5A8] block">
                  Ketua Maskot Matematik PPKI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
