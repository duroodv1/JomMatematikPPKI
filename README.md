# Jom Matematik PPKI: PWA Untuk GitHub

Pengembaraan Dunia Angka. Belajar, Main, Bijak.

Kod sumber React, TypeScript, Vite dan Tailwind CSS untuk tujuh modul matematik PPKI. Aplikasi tidak memerlukan akaun atau pelayan pangkalan data untuk pembelajaran. Ciri Bina APK dan log masuk pentadbir tidak disertakan.

## Jika GitHub Pages Menunjukkan Skrin Kosong

1. Pastikan **Settings > Pages > Source** ialah **GitHub Actions**, bukan **Deploy from a branch** untuk pakej kod sumber ini. Fail `src/main.tsx` tidak boleh dilaksanakan secara terus oleh GitHub Pages.
2. Push pakej sumber terkini ke main, kemudian jalankan aliran kerja **Terbitkan Jom Matematik PPKI**. Tunggu kedua-dua tugas binaan dan penerbitan berjaya. Buka URL daripada hasil tugas deploy, bukan pautan fail index.html pada github.com.
3. Selepas versi baharu diterbitkan, jika cache lama masih digunakan, buka `recovery.html` di bawah URL aplikasi. Contoh: `https://NAMA-PENGGUNA.github.io/jom-matematik-ppki/recovery.html`.
4. Tekan **Pulihkan Cache Aplikasi**, kemudian **Buka Aplikasi Semula**. Pemulihan hanya memadam cache aplikasi pada skop ini dan tidak memadam LocalStorage atau kemajuan murid.
5. Jika masih gagal, cuba tab pelayar biasa dan kongsi URL laman serta mesej Console dengan pembangun. Jangan padam semua data laman tanpa membuat sandaran.

Pemuat aplikasi mempunyai paparan HTML asas jika skrip gagal. Data simpanan lama disahkan sebelum digunakan; nilai asal yang perlu dibaiki disimpan dalam kunci LocalStorage berakhiran `_recovery_backup` jika storan dibenarkan. Kegagalan sokongan PWA tidak lagi menghalang antara muka pembelajaran dibuka.

## Muat Turun Kod Sumber

Buka aplikasi, pilih **Tetapan > PWA dan Kod Sumber > 1. Sediakan ZIP GitHub**. Tunggu status **Semakan ZIP lulus**, kemudian tekan **2. Simpan ZIP GitHub**.

Fail baharu: `JomMatematikPPKI-GitHub.zip`. Nyahmampatkan fail sebelum menjalankan projek atau memuat naik ke GitHub. Kod sumber, data soalan, logo, ikon PWA, konfigurasi GitHub Pages dan panduan disertakan. Arkib tidak mengandungi kemajuan atau maklumat murid yang disimpan pada peranti pengguna.

ZIP dijana terus dalam pelayar daripada sumber yang dibenamkan semasa binaan Vite. Ia tidak bergantung pada pautan ZIP berasingan atau cache muat turun lama. CRC32, kandungan setiap fail, fail wajib dan ikon disemak sebelum butang simpan dipaparkan. Nama fail, bilangan fail dan saiz sebenar dipaparkan dalam panel.

Butang **Simpan ZIP** menggunakan pautan muat turun sebenar yang ditekan pengguna, bukan klik automatik selepas permintaan rangkaian. Jika disokong, gunakan **Pilih Lokasi Simpan** atau **Simpan melalui Perkongsian**. Penunjuk penyediaan selesai tidak bermaksud fail sudah disimpan pada peranti.

Jika pratonton menyekat muat turun, gunakan **Buka Panel dalam Tab Baharu** dan ulang dua langkah di atas. Pautan ini membuka aplikasi dengan `?pwa-source=1` supaya panel yang betul terus dipaparkan. Pada komputer semak Downloads; pada iPhone atau iPad semak Files, termasuk iCloud Drive > Downloads. Jangan cuba menukar fail HTML atau fail separa muat turun kepada `.zip`.

## GitHub Pages

1. Nyahmampatkan ZIP dan buka folder `JomMatematikPPKI-PWA`.
2. Cipta repositori Public dengan cawangan main di [github.com/new](https://github.com/new).
3. Gunakan **Add file > Upload files** untuk memuat naik kandungan folder, bukan ZIP atau folder pembungkus. Pastikan `package.json` dan `.github/workflows/deploy-pages.yml` berada pada akar repositori.
4. Tetapkan **Settings > Pages > Source: GitHub Actions**.
5. Pilih **Actions > Terbitkan Jom Matematik PPKI > Run workflow** pada main. URL laman dipaparkan selepas penerbitan berjaya.

GitHub membina aplikasi untuk anda menggunakan Node.js 22. Tiada token peribadi perlu dimasukkan dalam aplikasi. Untuk muat turun sumber daripada repositori, gunakan **Code > Download ZIP**. Panduan penuh disertakan dalam [PANDUAN-GITHUB.md](PANDUAN-GITHUB.md).

Jangan muat naik fail ZIP sahaja: GitHub tidak menyahmampatkannya secara automatik. Pastikan fail tersembunyi `.github`, `.gitignore`, `.gitattributes` dan `.nvmrc` turut dimuat naik. Jangan muat naik data murid atau rahsia.

## Segerakkan Kod

Untuk penyegerakan berulang pada Windows atau Mac, gunakan GitHub Desktop: **Clone Repository**, sunting dalam folder klon, **Commit to main**, kemudian **Push origin**. Sebelum menyunting, semak **Fetch origin** dan gunakan **Pull origin** jika ada perubahan baharu.

ZIP ialah salinan kod, bukan sambungan automatik. Suntingan dalam editor aplikasi ini perlu dieksport dan disalin ke folder klon sebelum commit dan push. Kekalkan folder `.git` dan semak perubahan sebelum menindih fail. Panduan lengkap terdapat dalam [bahagian penyegerakan](PANDUAN-GITHUB.md#7-segerakkan-dengan-github-desktop) dan panel PWA dalam aplikasi.

## Jalankan Projek

1. Pasang Node.js 22.12 atau lebih baharu yang disokong dan npm.
2. Buka terminal dalam folder `JomMatematikPPKI-PWA` yang telah dinyahmampatkan.
3. Jalankan `npm ci` untuk memasang kebergantungan mengikut `package-lock.json`. Sambungan internet diperlukan untuk pemasangan pertama.
4. Jalankan `npm run dev` untuk menyunting aplikasi. Service Worker sengaja tidak diaktifkan dalam mod pembangunan.
5. Jalankan `npm run build` untuk menyediakan keluaran penerbitan dalam `dist/`.
6. Jalankan `npm run preview` dan buka alamat localhost yang dipaparkan untuk menguji PWA.

Jangan buka `index.html` dengan dwiklik atau melalui `file://`. PWA memerlukan HTTPS atau localhost.

## Fail Utama

| Fail atau folder | Fungsi |
| --- | --- |
| `.github/workflows/deploy-pages.yml` | Bina dan terbitkan PWA secara automatik melalui Actions |
| `.nvmrc`, `.gitattributes`, `.gitignore` | Versi Node.js dan tetapan repositori |
| `PANDUAN-GITHUB.md` | Langkah muat naik, penerbitan dan muat turun melalui GitHub |
| `src/App.tsx` | Pintu masuk aplikasi dan pemilihan modul |
| `src/components/ApplicationBoundary.tsx` | Paparan bantuan jika React mengalami ralat |
| `src/utils/saved-state.ts` | Pengesahan dan pemulihan format simpanan lama |
| `src/data/moduleQuizzes.ts` | Soalan tujuh modul |
| `src/context/AppContext.tsx` | Kemajuan dan tetapan dalam LocalStorage |
| `src/pwa/client.ts` | Pendaftaran Service Worker, pemasangan dan kemas kini |
| `src/pwa/source-bundle.ts` | Membenamkan sumber sebenar dan menjana ikon dalam pelayar |
| `src/pwa/source-archive.mjs` | Penjana ZIP standard dan pengesahan CRC32 setiap fail |
| `src/components/SourceDownload.tsx` | Dua langkah sediakan dan simpan, serta pilihan simpan asli peranti |
| `src/views/PwaSourceModal.tsx` | Muat turun ZIP dan panduan pemasangan |
| `src/index.css` | Reka bentuk dan fon tempatan |
| `public/manifest.webmanifest` | Nama, identiti, skop dan ikon PWA |
| `public/sw.js` | Cache aplikasi dan fail luar talian |
| `public/recovery.html` | Pemulihan cache tanpa memadam kemajuan murid |
| `public/pwa-version.js` | Versi automatik berdasarkan kandungan sumber |
| `public/icons/` | Ikon PNG sebenar 192px, 512px, maskable dan Apple 180px |
| `public/downloads/` | ZIP sumber dan maklumat semakan arkib yang dijana |
| `public/_headers` | Contoh pengepala untuk Netlify atau Cloudflare Pages |
| `scripts/prepare-pwa.mjs` | Menjana ikon, versi dan ZIP serta menyemak integritinya |
| `postcss.config.mjs` | Memanggil persediaan aset sebelum Vite menyalin folder public |
| `tests/sw.test.mjs` | Ujian Service Worker menggunakan Node.js |

`vite.config.ts` sedia ada menggunakan `vite-plugin-singlefile`: JavaScript, CSS, fon dan sumber untuk penjana ZIP dimasukkan ke dalam `dist/index.html`. Fail manifest, Service Worker dan ikon perlu diterbitkan bersama. Salinan ZIP GitHub dalam `dist/downloads/` juga dijana, tetapi muat turun dalam aplikasi tidak bergantung padanya. Nama ZIP PWA lama dikekalkan sebagai alias untuk pautan sedia ada.

Ikon dijana daripada imej `public/icon-app.png` yang sedia ada, bukan digantikan dengan imej baharu. Nama fail asal dikekalkan walaupun format asalnya mungkin berbeza; ikon keluaran disahkan sebagai PNG dengan ukuran yang dinyatakan. Versi maskable mempunyai ruang selamat supaya logo tidak terpotong.

## Terbitkan Melalui HTTPS

1. Jalankan `npm run build` selepas setiap perubahan.
2. Muat naik **semua kandungan** folder `dist/` ke pengehosan statik HTTPS, contohnya Netlify atau Cloudflare Pages. Jangan muat naik hanya `index.html`.
3. Aplikasi menyokong akar laman atau subfolder seperti `/jom-matematik-ppki/`. Laluan logo, ikon, manifest dan Service Worker adalah relatif; gunakan URL direktori yang berakhir dengan `/`.
4. Pastikan `sw.js` dan `pwa-version.js` dihantar sebagai JavaScript dengan `Cache-Control: no-cache`. Jangan halakan fail aset atau ZIP yang hilang kepada `index.html`.
5. Buka laman dalam pelayar biasa. Tunggu status **Sedia untuk digunakan di luar talian** dalam panel PWA sebelum memutuskan internet.

Fail `_headers` dikenali oleh Netlify dan Cloudflare Pages, tetapi tidak dilaksanakan oleh GitHub Pages. Pada pelayan lain, sediakan pengepala yang setara. Pendaftaran Service Worker menggunakan `updateViaCache: none` untuk menyemak versi baharu. Jangan muat naik `node_modules/`, fail rahsia atau data murid.

## Pasang Pada Peranti

1. Android, Chrome atau Edge: gunakan butang **Pasang Aplikasi** jika ditawarkan, atau menu pelayar **Install app / Add to Home screen**.
2. iPhone atau iPad: buka dalam Safari, pilih **Share > Add to Home Screen**.
3. Komputer: gunakan pilihan pemasangan pada bar alamat atau menu Chrome/Edge jika tersedia.

Sokongan dan nama menu bergantung pada pelayar. Panel tidak memaparkan butang pemasangan jika pelayar belum menawarkan acara pemasangan. Pratonton dalam iframe mungkin menyekat pemasangan atau muat turun; buka laman dalam tab berasingan.

## Luar Talian Dan Kemas Kini

- Cache menyimpan keluaran aplikasi, semua soalan yang terkandung dalam JavaScript, fon tempatan, ikon dan manifest. Sumber penjana ZIP terkandung dalam aplikasi; ZIP berasingan tidak diwajibkan untuk cache luar talian.
- Kemajuan dan skor menggunakan LocalStorage pada pelayar/peranti yang sama; tiada penyegerakan antara peranti.
- Suara Bahasa Melayu bergantung pada enjin pertuturan peranti. Pasang data suara Bahasa Melayu (Malaysia) setempat untuk pertuturan tanpa internet. PWA tidak menyertakan rakaman suara.
- Versi Service Worker berubah secara automatik apabila sumber berubah. Gunakan **Semak Kemas Kini**, kemudian **Gunakan Kemas Kini** apabila tersedia. Muat semula dibuat hanya selepas tindakan pengguna.
- Kemas kini tidak memadam LocalStorage. Selesaikan soalan semasa sebelum memuat semula kerana sebahagian keadaan latihan masih berada dalam memori.
- Cache lama dipadam hanya untuk aplikasi dan skopnya sendiri. Cache aplikasi lain tidak dipadam.
- Jika pengguna memadam data laman, menggunakan mod peribadi atau pelayar mengosongkan storan, cache dan kemajuan boleh hilang. Buka semula melalui internet untuk menyediakan cache sekali lagi.

## Semakan

Jalankan `node --test tests/sw.test.mjs` untuk ujian cache, navigasi, kemas kini dan perlindungan cache aplikasi lain.

Jalankan `node --test tests/source.test.mjs` untuk ujian ZIP sah, CRC32, fail HTML yang menyamar sebagai ZIP, arkib terpotong, fail hilang, kandungan berubah dan laluan yang tidak dibenarkan.

Jalankan `node tests/source-bundle-check.mjs` untuk menyemak sumber melalui pemuat modul Vite dan mengekstrak setiap fail dengan pembaca ZIP bebas menggunakan zlib. Semakan ini tidak menggantikan ujian simpanan pada pelayar atau peranti sebenar.

Selepas binaan, jalankan `node tests/github-pages-check.mjs` untuk menyemak fail keluaran, laluan relatif, konfigurasi aliran kerja dan arkib GitHub. Aliran kerja Actions turut menjalankan semakan ini sebelum penerbitan.

Pada Linux x64, `npm run build` juga menjalankan `tests/browser-check.mjs` dengan Chromium dan Playwright. Semakan membuka keluaran sebenar pada akar dan subfolder repositori, menguji tujuh modul, muat semula luar talian, muat turun ZIP, simpanan lama serta halaman pemulihan. Tiada ujian dihantar ke GitHub pengguna. Pada sistem lain, ujian pelayar boleh dijalankan dengan `CHROME_EXECUTABLE_PATH` yang menunjuk kepada Chrome setempat; ujian asas tetap dijalankan semasa binaan.

Persediaan binaan menyemak jenis TypeScript, menjalankan ujian Service Worker, serta menyemak format dan saiz ikon, rujukan manifest, CRC32 ZIP dan kesamaan setiap fail sumber. `public/downloads/pwa-source.json` menyenaraikan fail dan nilai SHA-256 salinan ZIP statik pada pelayan.

ZIP yang dijana dalam pelayar boleh mempunyai saiz atau hash berlainan kerana ikon PNG dihasilkan oleh kanvas pelayar. Gunakan bilangan fail dan saiz yang dipaparkan dalam panel untuk salinan tersebut; kedua-dua kaedah menjalankan pengesahan ZIP penuh.

Untuk semakan manual, buka keluaran `npm run preview`, semak **DevTools > Application > Manifest / Service Workers**, aktifkan mod luar talian, muat semula dan cuba setiap modul. Walaupun ujian Chromium lulus, uji pemasangan sebenar pada Android dan iOS sebelum pengedaran. Kejayaan binaan tidak menjamin semua enjin pertuturan atau semua pelayar menyokong pemasangan.

## Nota Pengedaran

Kod sumber ini memang tersedia kepada sesiapa yang boleh membuka pautan ZIP pada laman yang diterbitkan. Muat turun sumber bukan mekanisme kawalan akses. Fon Fredoka dan Nunito menggunakan lesen SIL Open Font License; salinan lesen disertakan dalam arkib. Semak lesen kebergantungan npm dan hak penggunaan imej sebelum pengedaran semula.