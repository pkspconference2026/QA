# Sistem Soal Jawab Langsung - PKSP 2026

Prototaip sistem Q&A untuk persidangan: peserta hantar soalan dari telefon, moderator luluskan, dan soalan yang diluluskan terus dipaparkan di skrin LED, disusun ikut undi tertinggi.

## Pautan GitHub Pages

- Borang peserta: `https://pkspconference2026.github.io/QA/index.html`
- Skrin LED / projektor: `https://pkspconference2026.github.io/QA/display.html`
- Panel moderator: `https://pkspconference2026.github.io/QA/admin.html`

## Fail

- `index.html` - borang peserta untuk hantar soalan dan undi soalan sedia ada.
- `display.html` - skrin LED / projektor untuk papar soalan yang diluluskan.
- `admin.html` - panel moderator untuk luluskan, tolak, atau tandakan soalan sudah dijawab.
- `firebase-config.js` - konfigurasi projek Firebase.
- `firestore.rules` - peraturan keselamatan asas untuk Firestore.

## Cara login admin

Panel moderator menggunakan Firebase Authentication, bukan kata laluan statik di dalam kod.

1. Buka `https://pkspconference2026.github.io/QA/admin.html`.
2. Masukkan emel moderator yang didaftarkan dalam Firebase Authentication.
3. Masukkan kata laluan akaun moderator tersebut.

Emel moderator yang dibenarkan dalam `firestore.rules` sekarang ialah `eagosjr@gmail.com`. Jika mahu tambah moderator lain, tambah akaun itu dalam Firebase Authentication dan masukkan emelnya dalam fungsi `isModerator()` di `firestore.rules`.

## Cara pasang

1. **Cipta projek Firebase**
   Pergi ke [console.firebase.google.com](https://console.firebase.google.com), pilih Add project, dan ikut langkah setup.

2. **Aktifkan Firestore**
   Dalam projek, pergi ke Build > Firestore Database > Create database, kemudian pilih mod production.

3. **Dapatkan kunci konfigurasi**
   Project settings > General > Your apps > tambah app web, kemudian salin nilai `firebaseConfig` ke dalam `firebase-config.js`.

4. **Aktifkan Firebase Authentication**
   Pergi ke Build > Authentication > Sign-in method, aktifkan Email/Password, kemudian cipta akaun moderator.

5. **Pasang peraturan keselamatan**
   Firestore Database > Rules > salin kandungan `firestore.rules` > Publish.

6. **Hoskan fail**
   Cara paling mudah untuk repo ini ialah GitHub Pages. Pastikan Pages menghala kepada branch `main`, kemudian gunakan pautan di bahagian atas README ini.

## Sebelum guna untuk acara sebenar

- Pastikan kata laluan moderator disimpan hanya dalam Firebase Authentication, bukan dalam fail repo.
- Peraturan Firestore dalam `firestore.rules` masih membenarkan sesiapa ubah `voteCount` secara terus untuk fungsi undi. Ini cukup untuk prototaip, tetapi kalau mahu elak abuse atau bot spam undi, pertimbangkan Cloud Functions untuk kawal proses undi di sisi server.
- `SESSION_ID` dalam `firebase-config.js` membolehkan anda guna Firestore yang sama untuk beberapa sesi/acara berlainan. Tukar nilai ini ikut sesi.

## Struktur data Firestore

**Koleksi `questions`**

| Field | Jenis | Keterangan |
|---|---|---|
| `text` | string | Kandungan soalan, maksimum 280 aksara |
| `name` | string | Nama peserta atau Anonim |
| `status` | string | `pending` / `approved` / `answered` / `rejected` |
| `voteCount` | number | Jumlah undi semasa |
| `sessionId` | string | Pengenal sesi/acara |
| `createdAt` | timestamp | Masa dihantar |

**Koleksi `votes`**

| Field | Jenis | Keterangan |
|---|---|---|
| ID dokumen | string | `{questionId}_{deviceId}` - elak undi berulang |
| `questionId` | string | Rujukan soalan |
| `deviceId` | string | ID peranti, disimpan di localStorage telefon |
| `createdAt` | timestamp | Masa diundi |
