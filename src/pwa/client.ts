import { useSyncExternalStore } from 'react';

type OfflineState = 'development' | 'checking' | 'ready' | 'unavailable' | 'error';
type InstallOutcome = 'accepted' | 'dismissed';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<unknown>;
  userChoice: Promise<{ outcome: InstallOutcome }>;
}

interface PwaState {
  offline: OfflineState;
  online: boolean;
  installed: boolean;
  canInstall: boolean;
  updateAvailable: boolean;
  checkingUpdate: boolean;
  revision: string;
}

let state: PwaState = {
  offline: import.meta.env.DEV ? 'development' : 'checking',
  online: typeof navigator === 'undefined' || navigator.onLine,
  installed: false,
  canInstall: false,
  updateAvailable: false,
  checkingUpdate: false,
  revision: '',
};
const listeners = new Set<() => void>();
let registration: ServiceWorkerRegistration | undefined;
let installPrompt: InstallPromptEvent | null = null;
let started = false;
let reloadRequested = false;

export function pwaAssetUrl(file: string): string {
  const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
  const base = new URL('./', manifest?.href || window.location.href);
  return new URL(file, base).href;
}

function publish(update: Partial<PwaState>) {
  state = { ...state, ...update };
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

export function usePwaState() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

async function checkOffline(worker: ServiceWorker | null) {
  if (!worker) return;
  const reply = await new Promise<{ ready: boolean; revision?: string }>((resolve) => {
    const channel = new MessageChannel();
    const finish = (result: { ready: boolean; revision?: string }) => {
      window.clearTimeout(timeout);
      channel.port1.close();
      resolve(result);
    };
    const timeout = window.setTimeout(() => finish({ ready: false }), 8000);
    channel.port1.onmessage = (event) => finish(event.data);
    try {
      worker.postMessage({ type: 'CHECK_OFFLINE' }, [channel.port2]);
    } catch {
      finish({ ready: false });
    }
  });
  publish({ offline: reply.ready ? 'ready' : 'error', revision: reply.revision || '' });
}

export function startPwa() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const displayMode = typeof window.matchMedia === 'function' ? window.matchMedia('(display-mode: standalone)') : null;
  const syncInstalled = () => publish({
    installed: Boolean(displayMode?.matches) || Boolean((navigator as Navigator & { standalone?: boolean }).standalone),
  });
  syncInstalled();
  if (typeof displayMode?.addEventListener === 'function') displayMode.addEventListener('change', syncInstalled);
  else if (typeof displayMode?.addListener === 'function') displayMode.addListener(syncInstalled);
  window.addEventListener('online', () => publish({ online: true }));
  window.addEventListener('offline', () => publish({ online: false }));
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event as InstallPromptEvent;
    publish({ canInstall: true });
  });
  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    publish({ installed: true, canInstall: false });
  });

  if (import.meta.env.DEV) return;
  if (!window.isSecureContext || !('serviceWorker' in navigator)) {
    publish({ offline: 'unavailable' });
    return;
  }

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloadRequested) window.location.reload();
    else if (registration) void checkOffline(registration.active);
  });

  const register = async () => {
    try {
      registration = await navigator.serviceWorker.register(pwaAssetUrl('sw.js'), {
        scope: pwaAssetUrl('./'),
        updateViaCache: 'none',
      });
      const currentRegistration = registration;
      publish({ updateAvailable: Boolean(currentRegistration.waiting) });
      const observeInstalling = () => {
        const worker = currentRegistration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed') {
            publish({ updateAvailable: Boolean(currentRegistration.waiting && currentRegistration.active) });
          }
          if (worker.state === 'activated') void checkOffline(worker);
          if (worker.state === 'redundant' && !currentRegistration.active) publish({ offline: 'error' });
        });
      };
      currentRegistration.addEventListener('updatefound', observeInstalling);
      observeInstalling();
      if (currentRegistration.active) await checkOffline(currentRegistration.active);
    } catch {
      publish({ offline: 'error' });
    }
  };

  if (document.readyState === 'complete') void register();
  else window.addEventListener('load', () => { void register(); }, { once: true });
}

export async function installPwa(): Promise<InstallOutcome | 'unavailable'> {
  if (!installPrompt) return 'unavailable';
  const prompt = installPrompt;
  installPrompt = null;
  publish({ canInstall: false });
  await prompt.prompt();
  return (await prompt.userChoice).outcome;
}

export async function checkPwaUpdate(): Promise<void> {
  if (!registration || !navigator.onLine) throw new Error('Sambungkan internet dan buka keluaran PWA melalui HTTPS atau localhost.');
  publish({ checkingUpdate: true });
  try {
    await registration.update();
    publish({ updateAvailable: Boolean(registration.waiting) });
    await checkOffline(registration.active);
  } finally {
    publish({ checkingUpdate: false });
  }
}

export function applyPwaUpdate() {
  if (!registration?.waiting) return;
  reloadRequested = true;
  registration.waiting.postMessage({ type: 'ACTIVATE_UPDATE' });
}