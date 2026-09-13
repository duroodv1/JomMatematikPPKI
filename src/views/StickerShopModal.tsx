import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STICKERS_STORE } from '../data/mascots';
import { X, Coins, Sparkles, Check, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const StickerShopModal: React.FC = () => {
  const { 
    setActiveModal, 
    progress, 
    buySticker, 
    triggerTap, 
    speakText 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Pelekat' },
    { id: 'haiwan', label: '🐾 Haiwan' },
    { id: 'kenderaan', label: '🚀 Kenderaan' },
    { id: 'makanan', label: '🍕 Makanan' },
    { id: 'piala', label: '🏆 Piala & Lencana' }
  ];

  const filteredStickers = STICKERS_STORE.filter(s => 
    activeCategory === 'all' ? true : s.category === activeCategory
  );

  const handleBuy = (stickerId: string, cost: number, name: string) => {
    triggerTap();
    if (progress.coins < cost) {
      speakText(`Syiling adik belum cukup. Kumpul lagi ${cost - progress.coins} syiling dengan menjawab soalan kuiz!`);
      return;
    }
    const success = buySticker(stickerId, cost);
    if (success) {
      speakText(`Tahniah! Pelekat ${name} berjaya dibuka!`);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {
        // Abaikan
      }
    }
  };

  const unlockedCount = progress.unlockedStickers.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E2EDED] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Pengepala */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18364D] to-[#1E455F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
              🏪
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                Kedai Pelekat Ceria PPKI
              </h2>
              <p className="text-xs text-[#9FD7D0] font-bold">
                Tebus syiling emas hasil kejayaan kuiz adik!
              </p>
            </div>
          </div>

          <button
            onClick={() => { triggerTap(); setActiveModal(null); }}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Baki Syiling */}
        <div className="p-3 sm:p-4 bg-[#F7FAFA] border-b border-[#E2EDED] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 bg-[#FFF8E9] border border-[#F8C84E] px-3 py-1.5 rounded-2xl">
            <Coins size={18} className="text-[#D78E15] fill-[#F8C84E]" />
            <span className="font-black text-[#18364D] text-sm">
              Baki: {progress.coins} Syiling
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-[#168F83] bg-[#E7F8F4] px-3 py-1.5 rounded-2xl border border-[#B9E2DC]">
            <Sparkles size={14} />
            <span>Koleksi: {unlockedCount} / {STICKERS_STORE.length} Dibuka</span>
          </div>
        </div>

        {/* Kategori */}
        <div className="p-2 sm:p-3 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => { triggerTap(); setActiveCategory(c.id); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-[#1BAE9D] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Pelekat */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[50vh] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredStickers.map(sticker => {
            const isUnlocked = progress.unlockedStickers.includes(sticker.id);
            const canAfford = progress.coins >= sticker.cost;

            return (
              <div
                key={sticker.id}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all ${
                  isUnlocked
                    ? 'bg-[#E7F8F4] border-[#B9E2DC]'
                    : 'bg-white border-[#E2EDED] hover:border-[#1BAE9D]'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-inner flex items-center justify-center text-3xl mb-1.5 relative">
                  <span className={isUnlocked ? '' : 'filter grayscale opacity-50'}>
                    {sticker.emoji}
                  </span>
                  {isUnlocked && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#1BAE9D] text-white p-0.5 rounded-full shadow">
                      <Check size={12} />
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-black text-[#18364D] line-clamp-1 mb-0.5">
                  {sticker.name}
                </h4>

                <p className="text-[10px] text-[#8CA5A8] font-semibold mb-2 line-clamp-1">
                  {sticker.description}
                </p>

                {isUnlocked ? (
                  <span className="text-[10px] font-black text-[#168F83] bg-white px-2 py-0.5 rounded-lg border border-[#B9E2DC] w-full">
                    Milik Adik ✓
                  </span>
                ) : (
                  <button
                    onClick={() => handleBuy(sticker.id, sticker.cost, sticker.name)}
                    className={`w-full py-1.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                      canAfford
                        ? 'bg-[#1BAE9D] hover:bg-[#159989] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Lock size={11} />
                    <span>{sticker.cost} 🪙</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-[#F7FAFA] border-t border-[#E2EDED] text-center">
          <p className="text-[11px] font-bold text-[#8CA5A8]">
            💡 Teruskan menjawab kuiz untuk mengumpul lebih banyak syiling emas!
          </p>
        </div>
      </div>
    </div>
  );
};
