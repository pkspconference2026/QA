# Nota perubahan keselamatan Q-A

Saya tidak dapat terus menolak perubahan ke GitHub kerana akses tulis repo ditolak oleh integration (`403 Resource not accessible by integration`). Jadi saya sediakan patch:

`q-a-moderation-security-fix.patch`

## Apa yang patch ini buat

1. `index.html`
   - Halaman peserta hanya memaparkan soalan berstatus `approved`.
   - Soalan `pending` tidak lagi kelihatan kepada peserta lain sebelum moderator luluskan.

2. `admin.html`
   - Gate moderator ditukar daripada password hardcoded kepada Firebase Authentication.
   - Moderator perlu log masuk dengan emel dan kata laluan akaun Firebase.

3. `firestore.rules`
   - Orang awam masih boleh hantar soalan baru sebagai `pending`.
   - Orang awam hanya boleh ubah `voteCount`.
   - Hanya emel moderator yang dibenarkan boleh ubah status soalan kepada `approved`, `rejected`, atau `answered`.

## Langkah selepas apply patch

1. Dalam Firebase Console, pergi ke Authentication.
2. Aktifkan provider `Email/Password`.
3. Cipta akaun moderator.
4. Dalam `firestore.rules`, tukar:

```js
["moderator@example.com"]
```

kepada emel moderator sebenar, contohnya:

```js
["moderator@pksp.gov.my"]
```

5. Publish semula Firestore rules.
6. Deploy semula fail static ke GitHub Pages/Firebase Hosting.

## Nota penting

Undian masih tahap prototaip kerana `voteCount` masih boleh diubah oleh client awam. Untuk acara besar atau risiko spam tinggi, langkah seterusnya ialah pindahkan proses undian ke Cloud Functions.
