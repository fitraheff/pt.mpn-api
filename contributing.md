# CONTRIBUTING.md

## 👋 Selamat datang di panduan kontribusi
Dokumen ini berisi aturan dan alur kerja agar seluruh anggota tim dapat berkolaborasi dengan rapi, konsisten, dan profesional.

---

## 🧩 1. Struktur Branch
Kami menggunakan workflow berikut:

- **main** → kode stabil & siap rilis
- **dev** → integrasi fitur sebelum masuk main
- **feature/<nama-fitur>** → tempat kerja masing-masing developer

Contoh:
- `feature/user`
- `feature/testimoni`
- `feature/pelatihan`

---

## 🛠️ 2. Cara Memulai
1. Clone repository
2. Checkout ke branch dev:
   ```bash
   git checkout dev
   git pull origin dev
   ```
3. Buat branch fitur baru:
   ```bash
   git checkout -b feature/<nama-fitur>
   ```

---

## ✍️ 3. Aturan Commit
Gunakan format berikut:

**Format singkat:**
```
<prefix>(modul): deskripsi singkat
```

**Prefix standar:**
- feat: fitur baru
- fix: bug fix
- refactor: perbaikan struktur
- docs: dokumentasi
- style: formatting
- chore: konfigurasi / setup
- test: penambahan pengujian

**Contoh:**
```
feat(user): add login and register endpoint
```

---

## 🔄 4. Workflow Pull Request
1. Push branch fitur:
   ```bash
   git push origin feature/<nama-fitur>
   ```
2. Buat Pull Request (PR) ke branch **dev**
3. Gunakan *template PR* yang telah disediakan
4. Pastikan sudah:
   - Menjalankan testing lokal
   - Mengecek format & konsistensi kode
   - Update dokumentasi jika perlu
5. Tunggu review minimal 1 anggota tim
6. Setelah disetujui, PR boleh di-merge ke **dev**

---

## 🧪 5. Testing
Sebelum mengirim PR:
- Jalankan aplikasi dan pastikan tidak ada error
- Test endpoint/API/UI sesuai fitur
- Pastikan tidak ada perubahan yang mempengaruhi modul lain

---

## 📂 6. Struktur Project (Jika Ada Standar Khusus)
Pastikan seluruh file ditempatkan sesuai struktur yang telah disepakati.

Contoh (sesuaikan dengan project nyata):
```
src/
  controllers/
  routes/
  middlewares/
  utils/
  models/
```

---

## ✔️ 7. Checklist Sebelum Merge
- [ ] Kode bersih & rapi
- [ ] Tidak ada console.log yang tidak penting
- [ ] Sudah merge perubahan terbaru dari dev jika perlu
- [ ] Tidak ada konflik
- [ ] Sudah ditest

---

## 🤝 8. Etika Kolaborasi
- Hormati reviewer dan diskusi perbaikan
- Tulis PR & commit dengan jelas
- Jangan merge PR sendiri tanpa approval (kecuali disepakati)
- Utamakan kualitas & stabilitas project

---

## 🚀 9. Kontak & Bantuan
- Cek ke repo githubnya pt.mpn terus buat git pull requenst

---
Tekan Ctrl + Shift + V (Windows/Linux) atau Cmd + Shift + V (Mac) → langsung muncul preview di panel baru.

Terima kasih sudah berkontribusi! 🙌