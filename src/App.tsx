import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { CountingModule } from './views/CountingModule';
import { AdditionModule } from './views/AdditionModule';
import { SubtractionModule } from './views/SubtractionModule';
import { MoneyModule } from './views/MoneyModule';
import { TimeModule } from './views/TimeModule';
import { ShapesModule } from './views/ShapesModule';
import { AdventureModule } from './views/AdventureModule';
import { StickerShopModal } from './views/StickerShopModal';
import { CertificateModal } from './views/CertificateModal';
import { ParentDashboardModal } from './views/ParentDashboardModal';
import { SettingsModal } from './views/SettingsModal';
import { MascotSelectorModal } from './views/MascotSelectorModal';
import { TrophiesModal } from './views/TrophiesModal';
import { startPwa } from './pwa/client';

const MainContent: React.FC = () => {
  const { activeView, activeModal } = useApp();

  const renderModuleView = () => {
    switch (activeView) {
      case 'module-counting':
        return <CountingModule />;
      case 'module-addition':
        return <AdditionModule />;
      case 'module-subtraction':
        return <SubtractionModule />;
      case 'module-money':
        return <MoneyModule />;
      case 'module-time':
        return <TimeModule />;
      case 'module-shapes':
        return <ShapesModule />;
      case 'module-adventure':
        return <AdventureModule />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        {renderModuleView()}
      </div>

      {/* Paparan Tetingkap Modal */}
      {activeModal === 'sticker-shop' && <StickerShopModal />}
      {activeModal === 'certificate' && <CertificateModal />}
      {activeModal === 'parent-dashboard' && <ParentDashboardModal />}
      {activeModal === 'settings' && <SettingsModal />}
      {activeModal === 'mascot-selector' && <MascotSelectorModal />}
      {activeModal === 'trophies' && <TrophiesModal />}
    </div>
  );
};

export function App() {
  React.useEffect(() => {
    // Optional installation support must never prevent the learning UI from mounting.
    try { startPwa(); } catch (error) { console.warn('Sokongan PWA tidak tersedia pada pelayar ini.', error); }
  }, []);
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
