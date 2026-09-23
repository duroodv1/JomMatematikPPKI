import { ExternalLink, GitBranch } from 'lucide-react';

export function GitHubGuide() {
  return (
    <section className="border-b border-[#E2EDED] py-5" aria-labelledby="github-guide-title">
      <div className="flex items-center gap-2">
        <GitBranch size={21} className="shrink-0 text-[#18364D]" />
        <h3 id="github-guide-title" className="text-base font-bold">Muat naik ke GitHub</h3>
      </div>
      <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#526b75]">
        <li>Nyahmampatkan ZIP dan buka folder <code className="break-all">JomMatematikPPKI-PWA</code>.</li>
        <li>Cipta repositori baharu, contohnya <code>jom-matematik-ppki</code>. Pilih <strong>Public</strong> untuk GitHub Pages dengan pelan percuma dan gunakan cawangan <strong>main</strong>.</li>
        <li>Pilih <strong>Add file &gt; Upload files</strong>. Muat naik <strong>kandungan folder projek</strong>, termasuk <code>.github</code>. Pastikan <code>package.json</code> berada pada akar repositori, kemudian simpan perubahan.</li>
        <li>Buka <strong>Settings &gt; Pages</strong>. Tetapkan <strong>Source: GitHub Actions</strong>.</li>
        <li>Buka <strong>Actions &gt; Terbitkan Jom Matematik PPKI &gt; Run workflow</strong>. Selepas berjaya, buka pautan laman dalam keputusan penerbitan.</li>
      </ol>
      <a href="https://github.com/new?name=jom-matematik-ppki" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#D4E3E5] px-4 text-sm font-bold text-[#18364D] transition hover:bg-[#F1F8F7]">
        Cipta Repositori di GitHub <ExternalLink size={15} />
      </a>
      <p className="mt-3 text-xs leading-relaxed text-[#607982]">Anda perlu log masuk di github.com sendiri. Butang ini hanya membuka GitHub; aplikasi tidak memuat naik fail atau mengakses akaun anda.</p>
      <details className="mt-4">
        <summary className="cursor-pointer py-2 text-sm font-bold text-[#18364D]">Aliran kerja gagal atau fail tersembunyi hilang?</summary>
        <p className="mt-1 text-sm leading-relaxed text-[#526b75]">Muat naik melalui pelayar melangkau folder bermula dengan titik. Jika <code>deploy-pages.yml</code> berada di akar repositori, GitHub tidak akan membacanya.</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#526b75]">
          <li>Pilih <strong>Add file &gt; Create new file</strong>.</li>
          <li>Taip laluan penuh <code>.github/workflows/deploy-pages.yml</code> pada ruang nama fail.</li>
          <li>Salin kandungan <code>deploy-pages.yml</code> yang berada di akar, tampal, kemudian <strong>Commit changes</strong>.</li>
          <li>Padam salinan lama di akar dan sebarang folder pembungkus seperti <code>JomMatematikPPKI</code>.</li>
        </ol>
        <p className="mt-2 text-sm leading-relaxed text-[#526b75]">Pakej terkini menetapkan Node.js 22 terus dalam aliran kerja, jadi ralat <code>.nvmrc does not exist</code> tidak lagi berlaku. Binaan juga akan menjana semula fail tersembunyi yang hilang.</p>
      </details>
      <details className="mt-4">
        <summary className="cursor-pointer py-2 text-sm font-bold text-[#18364D]">GitHub Pages memaparkan skrin kosong?</summary>
        <p className="mt-1 text-sm leading-relaxed text-[#526b75]">Pastikan <strong>Settings &gt; Pages &gt; Source: GitHub Actions</strong>, bukan Deploy from a branch. Tunggu tugas binaan dan penerbitan berjaya sebelum membuka URL laman. Fail TypeScript dalam src/ mesti dibina kepada keluaran dist/ terlebih dahulu.</p>
        <p className="mt-2 text-sm leading-relaxed text-[#526b75]">Selepas memuat naik versi terkini, gunakan halaman pemulihan jika pelayar masih memaparkan versi lama. Kemajuan murid tidak dipadam.</p>
        <a href="./recovery.html" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-[#168F83] underline underline-offset-4">Buka Halaman Pemulihan</a>
      </details>
      <details className="mt-4">
        <summary className="cursor-pointer py-2 text-sm font-bold text-[#18364D]">Segerakkan dengan GitHub Desktop</summary>
        <p className="mt-1 text-sm leading-relaxed text-[#526b75]">Sesuai untuk komputer Windows atau Mac. Fail ZIP ialah salinan kod sahaja, bukan sambungan automatik ke GitHub.</p>
        <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-[#526b75]">
          <li>Pasang <a href="https://desktop.github.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#168F83] underline underline-offset-4">GitHub Desktop</a> dan log masuk dengan akaun GitHub anda.</li>
          <li>Jika belum ada repositori, ikut langkah muat naik di atas terlebih dahulu. Kemudian pilih <strong>File &gt; Clone Repository</strong>, pilih repositori anda dan tekan <strong>Clone</strong>.</li>
          <li>Pilih cawangan <strong>main</strong>. Tekan <strong>Fetch origin</strong>, kemudian <strong>Pull origin</strong> jika terdapat perubahan baharu.</li>
          <li>Sunting fail dalam folder klon, atau salin kandungan ZIP terkini ke situ. Kekalkan folder <code>.git</code> dan semak fail sebelum menggantikan suntingan sedia ada. <code>package.json</code> mesti kekal pada akar repositori.</li>
          <li>Semak tab <strong>Changes</strong>, isi <strong>Summary</strong>, kemudian tekan <strong>Commit to main</strong>. Commit menyimpan perubahan pada komputer sahaja.</li>
          <li>Tekan <strong>Push origin</strong> untuk menghantar perubahan ke GitHub. Jika main dilindungi, gunakan cawangan baharu dan pull request.</li>
        </ol>
        <p className="mt-3 text-xs leading-relaxed text-[#607982]">Sebelum menyunting: Fetch origin, kemudian Pull origin jika perlu. Selepas menyunting: semak perubahan, Commit, kemudian Push origin. Jangan muat naik kata laluan, token atau data murid.</p>
        <p className="mt-2 text-xs leading-relaxed text-[#607982]">Perubahan yang dibuat dalam editor aplikasi ini masih perlu dieksport sebagai ZIP terkini dan disalin ke folder klon. Penyegerakan ini hanya untuk kod sumber, bukan skor murid pada peranti.</p>
      </details>
      <details className="mt-4">
        <summary className="cursor-pointer py-2 text-sm font-bold text-[#18364D]">Muat turun semula dan kemas kini</summary>
        <p className="mt-1 text-sm leading-relaxed text-[#526b75]">Pada repositori GitHub, pilih butang hijau <strong>Code &gt; Download ZIP</strong> untuk mendapatkan sumber terkini. Commit perubahan ke main untuk membina dan menerbitkan semula PWA.</p>
        <p className="mt-2 text-sm leading-relaxed text-[#526b75]">Panduan penuh, termasuk cara memuat naik fail tersembunyi dan menyelesaikan ralat penerbitan, disertakan dalam <code>PANDUAN-GITHUB.md</code>.</p>
      </details>
    </section>
  );
}