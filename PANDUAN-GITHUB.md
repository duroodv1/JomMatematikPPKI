# Muat Naik Dan Muat Turun Melalui GitHub

Pakej: **JomMatematikPPKI-GitHub.zip**. Ini ialah kod sumber PWA lengkap bersama konfigurasi GitHub Pages. Anda tidak perlu memasang Android Studio.

## 1. Simpan Pakej

1. Buka aplikasi dan pilih **Tetapan > PWA dan Kod Sumber**.
2. Tekan **1. Sediakan ZIP GitHub**. Tunggu status **Semakan ZIP lulus**.
3. Tekan **2. Simpan ZIP GitHub**. Jika pelayar menyekat muat turun dalam pratonton, gunakan **Buka Panel dalam Tab Baharu** dan ulang langkah tersebut.
4. Nyahmampatkan ZIP. Buka folder **JomMatematikPPKI-PWA** di dalamnya.

**Jangan muat naik fail ZIP sahaja ke repositori. GitHub tidak menyahmampatkannya secara automatik. Muat naik kandungan di dalam folder projek.**

## 2. Cipta Repositori

1. Log masuk melalui [github.com](https://github.com).
2. Buka [New repository](https://github.com/new).
3. Masukkan nama, contohnya `jom-matematik-ppki`.
4. Pilih **Public** jika menggunakan GitHub Free untuk GitHub Pages. Repositori peribadi memerlukan pelan atau kebenaran GitHub yang bersesuaian.
5. Jangan tambah README, lesen atau gitignore baharu kerana pakej ini sudah mengandungi fail projek. Tekan **Create repository**.
6. Gunakan cawangan **main**. Jika akaun anda menggunakan nama cawangan lain, tukar kepada main atau sesuaikan senarai branches dalam fail aliran kerja.

## 3. Muat Naik Fail

1. Pada halaman repositori kosong, tekan pautan **uploading an existing file**. Pada repositori yang sudah mempunyai fail, pilih **Add file > Upload files**.
2. Seret semua kandungan folder projek ke kawasan muat naik. `package.json`, `index.html` dan `README.md` mesti berada pada peringkat akar repositori, bukan di dalam satu lagi folder `JomMatematikPPKI-PWA/`.
3. Pastikan folder **.github** serta fail **.gitignore**, **.gitattributes** dan **.nvmrc** turut dimuat naik. Aktifkan paparan fail tersembunyi jika perlu.
4. Masukkan mesej seperti `Tambah aplikasi Jom Matematik PPKI` dan simpan menggunakan **Commit changes** pada main. Jika anda menggunakan cawangan baharu, gabungkan pull request ke main.
5. Semak bahawa fail **.github/workflows/deploy-pages.yml** benar-benar wujud pada GitHub. Jika folder tersembunyi tidak dimuat naik, gunakan **Add file > Create new file**, masukkan laluan penuh tersebut, kemudian salin kandungan fail yang sama daripada pakej.

### Membetulkan Kedudukan Fail Aliran Kerja

Muat naik melalui pelayar kerap meletakkan `deploy-pages.yml` di akar repositori. GitHub hanya membaca aliran kerja di dalam `.github/workflows/`.

1. Pilih **Add file > Create new file**.
2. Pada ruang nama fail, taip laluan penuh ini, termasuk garis miring:
   `.github/workflows/deploy-pages.yml`
3. Buka `deploy-pages.yml` yang berada di akar repositori, salin keseluruhan kandungannya, kemudian tampal ke dalam fail baharu tadi.
4. Tekan **Commit changes**.
5. Buka fail `deploy-pages.yml` di akar, pilih ikon tong sampah **Delete file**, kemudian commit sekali lagi supaya tiada salinan bertindih.
6. Jika terdapat folder pembungkus seperti `JomMatematikPPKI`, buka folder tersebut dan pastikan tiada salinan `package.json` atau `src/` di situ. Kandungan projek mesti berada pada akar repositori sahaja.

Jangan muat naik `node_modules/`, `dist/`, fail ZIP lama, kata laluan, token, fail `.env` atau data murid. Ikon dalam `public/icons/` boleh dimuat naik, tetapi dijana semula apabila GitHub membina aplikasi.

## 4. Aktifkan GitHub Pages

1. Dalam repositori, buka **Settings > Pages**.
2. Di bawah **Build and deployment**, tetapkan **Source: GitHub Actions**, bukan Deploy from a branch.
3. Buka tab **Actions**, pilih **Terbitkan Jom Matematik PPKI**, kemudian **Run workflow** pada main.
4. Tunggu kedua-dua tugas **Bina dan semak PWA** serta **Terbitkan laman** berjaya. Pembinaan dan penerbitan memerlukan sambungan internet pada pelayan GitHub.
5. Buka URL yang dipaparkan dalam keputusan penerbitan atau **Settings > Pages > Visit site**.

Contoh alamat, bukan pautan laman yang telah dicipta untuk anda:

`https://NAMA-PENGGUNA.github.io/jom-matematik-ppki/`

Aliran kerja menggunakan Node.js 22, menjalankan `npm ci`, membina dengan `npm run build`, menyemak keluaran dan menerbitkan folder `dist/`. Anda tidak perlu menjalankan npm pada komputer sendiri jika hanya memuat naik dan menerbitkan melalui GitHub.

Konfigurasi menggunakan GITHUB_TOKEN sementara yang disediakan secara automatik oleh GitHub Actions. Anda tidak perlu memasukkan token peribadi, kata laluan atau rahsia ke dalam kod aplikasi.

## 5. Muat Turun Daripada GitHub

- Untuk mendapatkan semua kod sumber repositori, buka tab **Code**, tekan butang hijau **Code > Download ZIP**.
- Untuk mendapatkan pakej lengkap dengan ikon yang dijana, buka laman PWA yang diterbitkan dan gunakan **Tetapan > PWA dan Kod Sumber**.
- ZIP daripada butang Code dinamakan oleh GitHub mengikut repositori dan cawangan. Ia tidak semestinya mempunyai nama yang sama seperti ZIP daripada aplikasi.
- GitHub Code ZIP mungkin tidak mengandungi `dist/` atau ikon yang dijana kerana `.gitignore`. Jalankan `npm ci` dan `npm run build` untuk menjana semula fail tersebut, atau biarkan Actions membinanya.

## 6. Kemas Kini Aplikasi

Muat naik atau sunting fail yang berubah dan commit ke main. Actions akan membina serta menerbitkan versi baharu secara automatik. Dalam PWA, gunakan **Semak Kemas Kini > Gunakan Kemas Kini** apabila versi baharu tersedia.

## 7. Segerakkan Dengan GitHub Desktop

Kaedah ini sesuai untuk Windows dan Mac. Fail ZIP yang dimuat turun hanyalah salinan kod. Membuka atau menyunting folder hasil nyahmampat tidak menyegerakkannya secara automatik dengan GitHub.

### Sambungan Kali Pertama

1. Jika belum mempunyai repositori, lengkapkan langkah Cipta Repositori dan Muat Naik Fail di atas dahulu.
2. Pasang [GitHub Desktop](https://desktop.github.com/) dan log masuk melalui akaun GitHub anda. Jangan masukkan kata laluan atau token ke dalam aplikasi Jom Matematik.
3. Pilih **File > Clone Repository**, pilih repositori anda pada tab GitHub.com, tentukan Local Path dan tekan **Clone**. Anda juga boleh menggunakan URL repositori yang disalin melalui **Code > HTTPS** di github.com.
4. Pilih cawangan **main** pada Current Branch. Tekan **Fetch origin**, kemudian **Pull origin** jika GitHub menawarkan perubahan baharu.
5. Buka folder klon melalui menu Repository dalam GitHub Desktop. Inilah folder kerja yang mempunyai sambungan Git, bukan folder ZIP asal.
6. Jika ada sumber yang lebih baharu daripada aplikasi ini, salin kandungan folder `JomMatematikPPKI-PWA` ke folder klon. Jangan salin satu lagi folder pembungkus; `package.json` mesti berada pada akar repositori. Jangan padam atau gantikan folder `.git`.
7. Semak tab **Changes** dan pastikan perubahan yang dipilih memang mahu dihantar. Masukkan ringkasan pada **Summary**, contohnya `Kemas kini Jom Matematik PPKI`, kemudian tekan **Commit to main**.
8. Tekan **Push origin**. Selepas selesai, buka repositori di github.com untuk menyemak commit terkini. Commit sahaja belum menghantar perubahan ke GitHub.

### Setiap Kali Membuat Perubahan

1. Sebelum menyunting, gunakan **Fetch origin** dan **Pull origin** jika terdapat perubahan baharu. Jika masih ada suntingan tempatan yang belum disimpan, commit atau simpan dengan selamat sebelum menarik perubahan lain.
2. Sunting fail dalam folder klon. Jika suntingan dibuat dalam editor aplikasi ini, eksport ZIP terkini dan salin fail yang berubah ke folder klon; tiada sambungan automatik antara editor ini dengan repositori.
3. Semak perubahan sebelum menggantikan fail, terutama jika orang lain turut menyunting repositori. Salinan ZIP penuh boleh menindih suntingan tempatan.
4. Masukkan Summary, tekan **Commit to main**, kemudian **Push origin**.
5. Jika GitHub Pages sudah diaktifkan, semak tab **Actions** dan tunggu binaan serta penerbitan selesai.

| Butang | Fungsi |
| --- | --- |
| Fetch origin | Semak perubahan pada GitHub; belum memasukkannya ke fail kerja. |
| Pull origin | Bawa perubahan daripada GitHub ke folder klon. |
| Commit to main | Rekod perubahan pada komputer. |
| Push origin | Hantar commit tempatan ke GitHub. |

Jika ada konflik, semak dan selesaikan fail yang bercanggah sebelum meneruskan. Jangan gunakan Force push semata-mata untuk mengatasi ralat. Jika cawangan main dilindungi, gunakan cawangan baharu dan pull request mengikut peraturan repositori.

Penyegerakan ini hanya melibatkan **kod sumber**. Skor, bintang dan maklumat murid dalam LocalStorage tidak dihantar ke GitHub. Jangan salin fail `.env`, token atau data peribadi ke repositori.

Pada telefon atau tablet, gunakan **Add file > Upload files** di github.com untuk kemas kini manual. GitHub Desktop tidak tersedia pada Android atau iOS.

## Fail Penting

| Laluan | Kegunaan |
| --- | --- |
| `.github/workflows/deploy-pages.yml` | Binaan dan penerbitan automatik Pages |
| `.nvmrc` | Versi Node.js untuk pembangunan dan Actions |
| `.gitignore` | Mengelakkan fail terjana dan rahsia dimasukkan melalui Git |
| `.gitattributes` | Mengekalkan format baris teks dan fail binari |
| `package.json`, `package-lock.json` | Kebergantungan npm yang konsisten |
| `src/` | Kod aplikasi, semua modul dan penjana ZIP |
| `public/` | Manifest, Service Worker, logo dan aset PWA |
| `scripts/`, `tests/` | Persediaan, semakan arkib dan ujian |
| `README.md` | Panduan PWA dan pembangunan setempat |

## Jika Ada Masalah

### Membaca Mesej Ralat Sebenar

Sebelum membuat pembetulan, lihat punca sebenar:

1. Buka tab **Actions**, pilih larian yang bertanda merah.
2. Tekan tugas **Bina dan semak PWA**.
3. Tekan langkah yang bertanda ✗ untuk membuka log penuh.
4. Baris terakhir berwarna merah ialah puncanya.

| Mesej dalam log | Maksud dan tindakan |
| --- | --- |
| `npm ci can only install packages when your package.json and package-lock.json are in sync` | Kedua-dua fail tidak sepadan. Muat naik semula **kedua-dua** `package.json` dan `package-lock.json` daripada pakej yang sama. Aliran kerja terkini akan cuba `npm install` secara automatik. |
| `Cannot find module` atau `ENOENT` | Ada fail atau folder yang tertinggal. Muat naik semula folder `src/`, `public/`, `scripts/` dan fail akar. |
| `Ikon public/icons/... tiada` | Muat naik semula folder `public/icons` daripada pakej. |
| `Missing script: build` | `package.json` tidak berada di akar repositori atau tersalah muat naik. |

| Masalah | Tindakan |
| --- | --- |
| Ralat `.nvmrc does not exist` | Guna pakej terkini. Aliran kerja baharu menetapkan Node.js 22 terus dan tidak lagi membaca `.nvmrc`. |
| `deploy-pages.yml` berada di akar repositori | Fail mesti berada di `.github/workflows/deploy-pages.yml`. Padam salinan di akar dan cipta semula pada laluan yang betul. |
| Folder `.github` atau `tests` tidak dimuat naik | Muat naik melalui pelayar memang melangkau folder bermula dengan titik. Gunakan **Add file > Create new file** dan taip laluan penuh, atau gunakan GitHub Desktop. |
| Ada folder `JomMatematikPPKI` di dalam repositori | Itu folder pembungkus daripada ZIP. Kandungannya mesti berada di akar. Padam folder bertindih tersebut. |
| Skrin kosong selepas menekan pautan Pages | Pilih Source: GitHub Actions, bukan Deploy from a branch. Pastikan Actions menerbitkan dist/ dan tugas binaan serta deploy berjaya. |
| Versi lama masih kosong selepas penerbitan berjaya | Buka `recovery.html` di bawah alamat PWA, pulihkan cache dan buka semula. Kemajuan murid tidak dipadam. |
| `package.json` tidak dijumpai | Pindahkan kandungan projek ke akar repositori. |
| Tab Actions tidak menunjukkan aliran kerja | Semak `.github/workflows/deploy-pages.yml` dan benarkan GitHub Actions dalam tetapan repositori. |
| Configure Pages gagal | Aktifkan Source: GitHub Actions dalam Settings > Pages, kemudian jalankan semula aliran kerja. |
| Penerbitan menunggu kelulusan | Semak perlindungan environment github-pages atau minta pemilik repositori meluluskan tugas tersebut. |
| Laman memaparkan 404 | Semak URL sebenar daripada keputusan deploy. Pastikan kedua-dua tugas selesai, bukan sekadar kod berjaya dimuat naik. |
| Ikon tidak muncul dalam subfolder | Muat naik versi sumber terkini; laluan ikon, manifest dan Service Worker menggunakan laluan relatif. |
| Masih melihat versi lama | Tutup tab lama atau gunakan Semak Kemas Kini dalam PWA. Jangan padam data laman jika mahu mengekalkan kemajuan murid. |
| Muat turun tidak bermula | Gunakan tab pelayar biasa, sediakan ZIP, kemudian tekan Simpan ZIP secara berasingan. |

GitHub Pages menyediakan laman statik dan tidak melaksanakan pengepala dalam fail Netlify `_headers`. Pendaftaran Service Worker menggunakan `updateViaCache: none` dan versi terjana untuk membantu mengesan kemas kini.

Laman Pages dan kod sumber yang anda kongsi mungkin boleh diakses orang awam. Jangan muat naik data peribadi murid. Semua pemasangan dan penggunaan suara pada peranti sebenar perlu diuji sebelum digunakan di sekolah. Pakej ini tidak mengakses akaun GitHub anda atau menerbitkan laman tanpa tindakan anda.