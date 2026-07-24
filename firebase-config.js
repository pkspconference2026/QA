// Konfigurasi projek Firebase "Qestion Conference Talk"
// (projek di mana Firestore database + rules telah disediakan)
export const firebaseConfig = {
  apiKey: "AIzaSyAGbkR3VSfD-7LzzFiQsLttdI3rvsSYku4",
  authDomain: "qestion-conference-talk.firebaseapp.com",
  projectId: "qestion-conference-talk",
  storageBucket: "qestion-conference-talk.firebasestorage.app",
  messagingSenderId: "476595318754",
  appId: "1:476595318754:web:fba0fcaa72bb3120cc93bb"
};

// Nama koleksi Firestore (boleh tukar jika perlu)
export const QUESTIONS_COLLECTION = "questions";
export const VOTES_COLLECTION = "votes";

// Senarai tetap sesi/ceramah sepanjang PKSP 2026 - setiap satu ada Soal Jawab
// berasingan (soalan tak bercampur antara sesi). Tambah/tukar/susun semula
// ikut jadual sebenar sebelum acara. "id" digunakan dalam URL (?sesi=...)
// dan disimpan sebagai sessionId dalam Firestore - elak guna ruang/simbol dalam id.
export const SESSIONS = [
  { id: "ceramah-1", label: "Ceramah 1" },
  { id: "ceramah-2", label: "Ceramah 2" },
  { id: "ceramah-3", label: "Ceramah 3" },
  { id: "ceramah-4", label: "Ceramah 4" },
  { id: "ceramah-5", label: "Ceramah 5" },
  { id: "pembentangan-1", label: "Pembentangan Saintifik 1" },
  { id: "pembentangan-2", label: "Pembentangan Saintifik 2" },
  { id: "pembentangan-3", label: "Pembentangan Saintifik 3" },
  { id: "pembentangan-4", label: "Pembentangan Saintifik 4" },
  { id: "pembentangan-5", label: "Pembentangan Saintifik 5" },
];

// Sesi digunakan jika tiada ?sesi=... dalam URL (contoh semasa buka fail terus untuk ujian)
export const DEFAULT_SESSION_ID = SESSIONS[0].id;

// Baca sesi dari URL (?sesi=xxx). Terima SEBARANG id - bukan setakat yang ada
// dalam SESSIONS - supaya sesi bebas/ad-hoc (dicipta terus dari admin.html)
// turut berfungsi tanpa perlu masuk dalam senarai tetap.
export function getCurrentSessionId() {
  const param = new URLSearchParams(window.location.search).get("sesi");
  return param || DEFAULT_SESSION_ID;
}

// Nama sesi untuk dipaparkan. Jika URL ada ?label=... (digunakan untuk sesi
// bebas/ad-hoc), guna itu dulu. Jika tidak, cari dalam SESSIONS. Jika tiada
// juga, papar id itu sendiri sebagai fallback terakhir.
export function getCurrentSessionLabel() {
  const params = new URLSearchParams(window.location.search);
  const labelParam = params.get("label");
  if (labelParam) return decodeURIComponent(labelParam);
  return getSessionLabel(getCurrentSessionId());
}

export function getSessionLabel(id) {
  const found = SESSIONS.find(s => s.id === id);
  return found ? found.label : id;
}

// Tukar tajuk sesi bebas (cth "Bengkel Tambahan Petang Ini") kepada id ringkas
// selamat untuk URL/Firestore, dengan angka rawak kecil supaya tak berlanggar
// dengan sesi lama yang tajuk sama.
export function slugifySessionTitle(title) {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "sesi";
  const suffix = Date.now().toString(36).slice(-4);
  return `adhoc-${base}-${suffix}`;
}
