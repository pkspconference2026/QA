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

// ID sesi semasa - tukar untuk setiap acara/sesi supaya soalan tidak bercampur
export const SESSION_ID = "pksp2026";
