# RuangAman.id — Edukasi Anti-Cyberbullying & Etika Komunikasi Daring

Proyek website ini disusun untuk memenuhi **Penilaian Sumatif Akhir Semester (PSAS) Informatika TIK** pada materi pokok **Dampak Sosial Informatika dan Pengembangan Website Berbantuan AI**.

---

## 1. Analisis Masalah & Dampak Sosial Informatika
* **Permasalahan Nyata:** Interaksi pelajar di grup obrolan, forum gim, dan kolom komentar media sosial sering mengaburkan batas etika. Komentar merendahkan fisik/nama orang tua, pembuatan stiker dari foto aib tanpa izin, hingga pengucilan grup kerap dinormalisasi sebagai "candaan".
* **Dampak Sosial & Psikologis:** Menurunnya rasa percaya diri korban, munculnya kecemasan, ketakutan masuk sekolah, rusaknya iklim pertemanan kelas, hingga konflik digital yang merembet menjadi konflik fisik.
* **Kebutuhan Pengguna:** Siswa membutuhkan media edukasi empatik, simulasi pengambilan keputusan saat menghadapi perundungan, panduan penyimpanan bukti yang benar, serta saluran pelaporan simulatif yang aman.

## 2. Tujuan & Sasaran Pengguna
* **Sasaran Pengguna:** Pelajar SMA, pengurus OSIS/MPK, dan konselor sebaya.
* **Tujuan Website:**
  1. Meningkatkan kesadaran mengenai bentuk-bentuk *cyberbullying* dan konsekuensi jejak digital.
  2. Melatih respons aman bagi korban maupun saksi (*upstander*) melalui simulasi kasus.
  3. Menyediakan prototipe AI simulatif untuk mengecek potensi kalimat merendahkan sebelum dikirim.
  4. Menyediakan formulir pelaporan simulatif terintegrasi Google Sheets tanpa mengumpulkan data pribadi sensitif.

## 3. Etika Digital, Privasi, & Keamanan Dasar
* **Perlindungan Data Pribadi:** Formulir menggunakan **Nama Samaran / Inisial** dan data contoh; tidak meminta NIK, nomor telepon, alamat rumah, maupun kata sandi.
* **Keamanan Repositori:** Tidak ada API Key rahasia atau kredensial akun yang dipublikasikan di GitHub.
* **Sanitasi Input:** Kode Google Apps Script dilengkapi sanitasi karakter awal (`=`, `+`, `-`, `@`) untuk mencegah *Formula Injection* pada Google Sheets.

## 4. Arsitektur Teknologi & Integrasi Google Apps Script
* **Frontend:** HTML5 Semantik, CSS3 (tampilan *3D Glassmorphism* modern & responsif), dan Vanilla JavaScript (ES6).
* **Backend Otomatisasi (`Code.gs`):** Google Apps Script menerima data JSON melalui metode `POST` (`doPost(e)`) dan mencatatnya secara otomatis ke tab `Laporan_Simulasi` pada Google Sheets.
* **Hosting / Publikasi:** Dapat dipublikasikan langsung melalui **GitHub Pages** (`Settings > Pages > Deploy from branch main`).

## 5. Dokumentasi Penggunaan & Verifikasi AI
Sesuai ketentuan proyek PSAS, pemanfaatan AI dalam pengembangan website ini didokumentasikan secara transparan:

| Aspek | Keterangan |
| :--- | :--- |
| **Kebutuhan AI** | 1) Membantu menyusun struktur antarmuka 3D modern dan logika interaksi JavaScript.<br>2) Menyediakan fitur prototipe **Asisten Cek Etika Kalimat** bagi pengguna. |
| **Contoh Prompt** | *"Buatkan struktur HTML, CSS, dan JS untuk website edukasi anti-cyberbullying siswa SMA dengan simulasi skenario dan form integrasi Google Apps Script."* |
| **Hasil & Kontribusi** | Mempercepat pembuatan kerangka antarmuka responsif, logika simulasi kasus interaktif, dan skrip koneksi ke Google Sheets. |
| **Proses Verifikasi** | 1) Memeriksa ulang seluruh kode agar bebas dari API key/kredensial.<br>2) Menguji langsung kamus kata pada fitur **AI Cek Etika** dengan kalimat ejekan, *gaslighting* candaan ("baper"), dan kalimat netral.<br>3) Memberi label jelas **MODE SIMULASI TERVERIFIKASI** pada fitur AI di halaman web agar tidak diklaim sebagai model LLM penuh. |

## 6. Pengujian Fungsi & Tampilan (Testing Checklist)
* [x] **Navigasi & Tautan:** Seluruh menu navigasi mengarah ke bagian halaman yang tepat dan menu hamburger berfungsi pada layar ponsel.
* [x] **Efek 3D & Responsivitas:** Kartu *3D Tilt* merespons gerakan kursor dengan halus dan tata letak menyesuaikan layar *mobile* maupun *desktop*.
* [x] **Simulasi Kasus:** Ketiga skenario menampilkan umpan balik sesuai pilihan tindakan aman atau berisiko.
* [x] **Fitur AI Simulasi:** Mampu membedakan kalimat penghinaan, kalimat meremehkan perasaan, dan kalimat konstruktif.
* [x] **Integrasi Formulir & Apps Script:** Data simulasi berhasil masuk ke baris baru pada Google Sheets dengan stempel waktu otomatis.
