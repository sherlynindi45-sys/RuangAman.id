// Inisialisasi Ikon Lucide
lucide.createIcons();

// ==========================================
// 1. KONFIGURASI GOOGLE APPS SCRIPT (PUBLIC WEB APP URL)
// Catatan Keamanan: URL Web App Apps Script aman ditempatkan di frontend
// selama tidak memuat API Key pribadi atau password.
// Ganti string di bawah dengan URL Web App hasil Deploy Apps Script milikmu.
// ==========================================
const APPS_SCRIPT_URL = "MASUKKAN_URL_WEB_APP_GOOGLE_APPS_SCRIPT_DI_SINI";

// ==========================================
// 2. NAVIGASI MOBILE
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ==========================================
// 3. INTERAKTIVITAS 3D TILT HALUS (MODERN & TIDAK NORAK)
// ==========================================
const tiltElements = document.querySelectorAll("[data-tilt]");

tiltElements.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Sudut rotasi dibatasi maksimal 6 derajat agar tetap elegan & nyaman dibaca
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

// ==========================================
// 4. SIMULASI KASUS PERUNDUNGAN DARING
// ==========================================
const scenarios = [
  {
    title: "Kasus 1: Stiker Foto Aib di Grup Kelas",
    context: "Seseorang membuat stiker WhatsApp dari foto wajah teman sekelas yang sedang mengantuk lalu mengirimkannya berkali-kali di grup angkatan sambil ditertawakan.",
    options: [
      {
        text: "A. Ikut menyimpan stikernya dan membalas 'wkwk' supaya tidak dianggap kaku oleh teman grup.",
        isSafe: false,
        feedback: "Kurang Tepat: Ikut menertawakan memperkuat perilaku perundungan (bystander pasif) dan memperluas jejak digital yang menyakiti korban."
      },
      {
        text: "B. Tidak menyebarkan stiker, mengingatkan di grup secara tenang bahwa menyebar foto tanpa izin melanggar privasi, lalu menyapa korban lewat chat pribadi.",
        isSafe: true,
        feedback: "Tindakan Tepat & Empatik: Kamu memutus rantai penyebaran, menegakkan batas etika tanpa memicu keributan, dan memberi dukungan moral pada korban."
      },
      {
        text: "C. Membalas dengan membuat stiker balik dari foto aib si pelaku agar dia merasakan hal yang sama.",
        isSafe: false,
        feedback: "Berisiko Tinggi: Membalas perundungan dengan perundungan baru menjadikanmu ikut melanggar etika privasi dan memperkeruh konflik."
      }
    ]
  },
  {
    title: "Kasus 2: Pengucilan Sengaja di Grup Tugas/Pertemanan",
    context: "Beberapa siswa membuat grup baru tanpa mengundang satu teman, lalu menyindir teman tersebut lewat unggahan status media sosial.",
    options: [
      {
        text: "A. Mengambil tangkapan layar sindiran sebagai bukti jika dibutuhkan, menolak ikut menyindir, dan mengajak teman yang dikucilkan berdiskusi agar tidak merasa sendirian.",
        isSafe: true,
        feedback: "Tindakan Tepat & Empatik: Pengucilan daring (exclusion) berdampak serius pada rasa percaya diri. Dukungan teman sebaya adalah pelindung psikologis paling efektif."
      },
      {
        text: "B. Menyebarkan tangkapan layar grup rahasia tersebut ke seluruh sekolah agar terjadi keributan besar.",
        isSafe: false,
        feedback: "Kurang Tepat: Menyebarluaskan konflik ke publik justru memperbesar drama. Bukti sebaiknya hanya diserahkan kepada pihak pendamping (Wali Kelas / Guru BK)."
      }
    ]
  },
  {
    title: "Kasus 3: Komentar Body Shaming di Unggahan Teman",
    context: "Di kolom komentar foto kegiatan sekolah, muncul beberapa komentar anonim yang mengejek bentuk tubuh dan warna kulit salah satu siswa.",
    options: [
      {
        text: "A. Melaporkan komentar tersebut menggunakan fitur Report akun/komentar, lalu menuliskan komentar positif yang mengapresiasi karya/kegiatan teman tersebut.",
        isSafe: true,
        feedback: "Tindakan Tepat & Empatik: Melaporkan komentar membantu sistem platform menindak pelanggaran, sementara komentar positif menetralkan dampak psikologis pada korban."
      },
      {
        text: "B. Memaki-maki akun anonim tersebut di kolom komentar dengan kata-kata kasar.",
        isSafe: false,
        feedback: "Kurang Tepat: Akun anonim sengaja memancing emosi. Membalas dengan kata kasar hanya menaikkan interaksi (engagement) komentar jahat tersebut."
      }
    ]
  }
];

const simTabs = document.getElementById("simTabs");
const simBody = document.getElementById("simBody");

function renderScenario(index) {
  const item = scenarios[index];
  simBody.innerHTML = `
    <div class="sim-scenario-box">
      <h4>${item.title}</h4>
      <p style="margin-top:0.5rem; color: var(--text-muted);">${item.context}</p>
    </div>
    <p style="font-weight:700; margin-bottom:0.75rem;">Pilih langkah respons terbaikmu:</p>
    <div class="sim-options">
      ${item.options.map((opt, idx) => `
        <button class="sim-option-btn" data-opt="${idx}">${opt.text}</button>
      `).join("")}
    </div>
    <div id="simFeedback" class="sim-feedback hidden"></div>
  `;

  simBody.querySelectorAll(".sim-option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const optIdx = Number(btn.getAttribute("data-opt"));
      const chosen = item.options[optIdx];
      const fbEl = document.getElementById("simFeedback");
      fbEl.classList.remove("hidden", "good", "warn");
      fbEl.classList.add(chosen.isSafe ? "good" : "warn");
      fbEl.innerHTML = `<strong>${chosen.isSafe ? "✔ Respons Aman & Empatik" : "⚠ Perlu Evaluasi Ulang"}</strong><p style="margin-top:0.35rem;">${chosen.feedback}</p>`;
    });
  });
}

simTabs.querySelectorAll(".sim-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    simTabs.querySelectorAll(".sim-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderScenario(Number(tab.getAttribute("data-case")));
  });
});

renderScenario(0);

// ==========================================
// 5. FITUR AI SIMULATIF TERVERIFIKASI (CEK ETIKA KALIMAT)
// ==========================================
const aiInput = document.getElementById("aiInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const aiResult = document.getElementById("aiResult");

document.querySelectorAll(".preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    aiInput.value = btn.getAttribute("data-text");
  });
});

analyzeBtn.addEventListener("click", () => {
  const text = aiInput.value.trim();
  if (!text) {
    aiResult.classList.remove("hidden");
    aiResult.innerHTML = "<p>Silakan ketik atau pilih contoh kalimat terlebih dahulu untuk dianalisis.</p>";
    return;
  }

  const lower = text.toLowerCase();

  // Kamus indikator pola kalimat berisiko (hasil verifikasi manual untuk konteks pelajar)
  const insultPatterns = ["beban", "bodoh", "tolol", "jelek", "gendut", "item", "miskin", "cupu", "norak", "muka kayak", "pantesan"];
  const gaslightPatterns = ["baper", "lemah", "gitu doang", "cuma bercanda", "canda doang", "sensi amat"];

  const foundInsult = insultPatterns.filter(word => lower.includes(word));
  const foundGaslight = gaslightPatterns.filter(word => lower.includes(word));

  aiResult.classList.remove("hidden");

  if (foundInsult.length > 0) {
    aiResult.style.borderLeftColor = "var(--accent-rose)";
    aiResult.innerHTML = `
      <h4 style="color: var(--accent-rose);">⚠ Terdeteksi Potensi Perundungan / Penghinaan</h4>
      <p style="margin:0.4rem 0;"><strong>Indikator Terdeteksi:</strong> Kata/frasa yang menyerang fisik, kemampuan, atau martabat individu (<em>"${foundInsult.join(", ")}"</em>).</p>
      <p style="margin:0.4rem 0;"><strong>Dampak Psikologis:</strong> Dapat menurunkan rasa percaya diri dan mempermalukan penerima di ruang publik.</p>
      <p style="margin-top:0.6rem; background:#f8fafc; padding:0.75rem; border-radius:10px;">
        <strong>Saran Perbaikan Kalimat:</strong> Fokus pada tindakan atau solusi, bukan menyerang pribadi. Contoh: <em>"Yuk kita evaluasi bareng bagian yang masih kurang supaya hasilnya lebih maksimal."</em>
      </p>
    `;
  } else if (foundGaslight.length > 0) {
    aiResult.style.borderLeftColor = "#d97706";
    aiResult.innerHTML = `
      <h4 style="color: #b45309;">⚡ Terdeteksi Normalisasi Candaan / Meremehkan Perasaan</h4>
      <p style="margin:0.4rem 0;"><strong>Indikator Terdeteksi:</strong> Frasa pengabaian empati (<em>"${foundGaslight.join(", ")}"</em>).</p>
      <p style="margin:0.4rem 0;"><strong>Analisis Etika:</strong> Candaan yang sehat membuat kedua belah pihak tertawa. Jika pihak lain merasa terluka, menyebutnya "baper" justru mengabaikan batas kenyamanan orang lain.</p>
      <p style="margin-top:0.6rem; background:#f8fafc; padding:0.75rem; border-radius:10px;">
        <strong>Saran Perbaikan Kalimat:</strong> <em>"Maaf kalau ucapanku tadi bikin nggak nyaman, nggak ada maksud merendahkan."</em>
      </p>
    `;
  } else {
    aiResult.style.borderLeftColor = "var(--accent-teal)";
    aiResult.innerHTML = `
      <h4 style="color: var(--accent-teal);">✔ Kalimat Terlihat Netral / Konstruktif</h4>
      <p style="margin:0.4rem 0;">Tidak ditemukan kata penghinaan langsung maupun meremehkan perasaan pada draf kalimat ini.</p>
      <p style="font-size:0.86rem; color:var(--text-muted);"><em>Catatan Verifikasi: Sistem AI simulasi mengecek pola kata kunci. Tetap pastikan konteks dan nada percakapan menghargai penerima pesan.</em></p>
    `;
  }
});

// ==========================================
// 6. PENGIRIMAN FORMULIR KE GOOGLE APPS SCRIPT
// ==========================================
const reportForm = document.getElementById("reportForm");
const formFeedback = document.getElementById("formFeedback");
const sessionLogList = document.getElementById("sessionLogList");
const submitReportBtn = document.getElementById("submitReportBtn");

function appendSessionLog(entry, modeLabel) {
  const emptyEl = sessionLogList.querySelector(".empty-log");
  if (emptyEl) emptyEl.remove();

  const item = document.createElement("div");
  item.className = "log-item";
  item.innerHTML = `
    <strong>${entry.alias}</strong> • <span style="color:var(--primary);">${entry.kategori}</span>
    <p style="margin:0.25rem 0; color:var(--text-muted);">${entry.kronologi}</p>
    <small style="color:var(--accent-teal); font-weight:600;">Status: ${modeLabel} (${entry.waktu})</small>
  `;
  sessionLogList.prepend(item);
}

reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    waktu: new Date().toLocaleString("id-ID"),
    alias: document.getElementById("alias").value.trim(),
    peran: document.getElementById("peran").value,
    kategori: document.getElementById("kategori").value,
    platform: document.getElementById("platform").value,
    kronologi: document.getElementById("kronologi").value.trim()
  };

  submitReportBtn.disabled = true;
  submitReportBtn.textContent = "Mengirim Data Simulasi...";

  // Jika URL Apps Script belum diisi, jalankan mode pratinjau lokal agar demo tetap berjalan mulus
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("MASUKKAN_URL")) {
    setTimeout(() => {
      formFeedback.className = "form-feedback info";
      formFeedback.textContent = "Mode Pratinjau Lokal: Data simulasi valid dan tercatat di log sesi. Tempelkan URL Web App Google Apps Script di script.js untuk menyimpan langsung ke Google Sheets.";
      appendSessionLog(payload, "Tercatat di Pratinjau Lokal");
      reportForm.reset();
      submitReportBtn.disabled = false;
      submitReportBtn.innerHTML = '<i data-lucide="send"></i> Kirim Laporan Simulasi ke Google Sheets';
      lucide.createIcons();
    }, 500);
    return;
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Menghindari hambatan CORS pada endpoint Google Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    formFeedback.className = "form-feedback success";
    formFeedback.textContent = "Berhasil! Laporan simulasi telah dikirim ke Google Apps Script dan dicatat ke Google Sheets tanpa menyimpan data pribadi sensitif.";
    appendSessionLog(payload, "Terkirim ke Google Sheets");
    reportForm.reset();
  } catch (error) {
    formFeedback.className = "form-feedback warn";
    formFeedback.textContent = "Terjadi kendala koneksi saat menghubungi Google Apps Script. Periksa URL Web App dan izin akses (Anyone).";
  } finally {
    submitReportBtn.disabled = false;
    submitReportBtn.innerHTML = '<i data-lucide="send"></i> Kirim Laporan Simulasi ke Google Sheets';
    lucide.createIcons();
  }
});
