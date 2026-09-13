import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ApplicationBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state: { error: string | null } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error.message : 'Ralat semasa membuka aplikasi.' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Jom Matematik] Application error:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-5 px-6 py-12 text-[#18364D]">
        <p className="text-sm font-bold text-[#168F83]">Jom Matematik PPKI</p>
        <h1 className="text-3xl font-bold">Aplikasi tidak dapat dibuka</h1>
        <p className="text-base leading-relaxed">Sila cuba muat semula. Jika masalah berterusan, buka halaman pemulihan untuk mendapatkan versi terkini tanpa memadam kemajuan murid.</p>
        <button onClick={() => window.location.reload()} className="min-h-12 rounded-xl bg-[#168F83] px-5 py-3 font-bold text-white">Cuba Muat Semula</button>
        <a href="./recovery.html" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b9e2dc] px-5 py-3 font-bold text-[#168F83]">Buka Halaman Pemulihan</a>
        <details className="text-sm"><summary className="cursor-pointer py-2 font-bold">Maklumat ralat untuk bantuan</summary><pre className="mt-2 whitespace-pre-wrap break-words">{this.state.error.slice(0, 500)}</pre></details>
      </main>
    );
  }
}