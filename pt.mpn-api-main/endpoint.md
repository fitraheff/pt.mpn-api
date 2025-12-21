# DOKUMENTASI API PT. MPN  
**Base URL:** `https://api.ptmpn.com` (atau `http://localhost:3000` saat development)

Semua response berformat JSON.

---

### 1. Auth – Login & User
| Method | Endpoint                     | Auth? | Deskripsi                              |
|-------|------------------------------|-------|----------------------------------------|
| POST  | `/api/users/login`           | Tidak | Login → dapat token di cookie          |
| GET   | `/api/users/:id`             | Ya    | Lihat profil user tertentu             |
| PUT   | `/api/users/update`          | Ya    | Update profil user (name, password)    |
| POST  | `/api/users/logout`          | Ya    | Hapus cookie token                     |
| POST  | `/api/users/add`             | Ya + SUPERADMIN | Buat user baru (hanya superadmin) |
| GET   | `/api/users`                 | Ya + SUPERADMIN | Lihat semua user                   |

**Request Login**
```json
{
  "email": "admin@mpn.com",
  "password": "123456"
}
```

**Response Login (201)**
```json
{
  "message": "Login berhasil",
  "user": { "id": "...", "name": "Admin", "email": "...", "role": "SUPERADMIN" }
}
```

---

### 2. Bidang Usaha
| Method | Endpoint                            | Auth? | Deskripsi                              |
|--------|-------------------------------------|-------|----------------------------------------|
| GET    | `/api/bidang-usaha`                 | Tidak | Ambil semua bidang usaha               |
| GET    | `/api/bidang-usaha/:id`             | Tidak | Detail bidang usaha                    |
| POST   | `/api/bidang-usaha/add`             | Ya    | Tambah bidang usaha + upload foto      |
| PUT    | `/api/bidang-usaha/:id`             | Ya    | Update nama & deskripsi                |
| PUT    | `/api/bidang-usaha/foto/:id`        | Ya    | Ganti foto bidang usaha                |
| DELETE | `/api/bidang-usaha/:id`             | Ya    | Hapus bidang usaha                     |
| DELETE | `/api/bidang-usaha/foto/:id`        | Ya    | Hapus foto saja (field jadi null)        |

**Lihat Foto Publik (tanpa login)**
```
GET https://api.ptmpn.com/uploads/1765382006852-544812296.jpg
```

---

### 3. Jenis Usaha (Nested di Bidang Usaha)
| Method | Endpoint                                      | Auth? | Deskripsi                              |
|--------|-----------------------------------------------|-------|----------------------------------------|
| GET    | `/api/jenis-usaha`                            | Tidak | Semua jenis usaha                      |
| GET    | `/api/jenis-usaha/:id`                        | Tidak | Detail jenis usaha                     |
| POST   | `/api/jenis-usaha/add/:id_BUsaha`             | Ya    | Tambah jenis usaha + foto              |
| PUT    | `/api/jenis-usaha/update/:id`                 | Ya    | Update jenis usaha + ganti foto        |
| DELETE | `/api/jenis-usaha/delete/:id`                 | Ya    | Hapus jenis usaha                      |

Foto jenis usaha juga disimpan di folder `uploads/` → akses publik sama seperti bidang usaha.

---

### 4. Gallery
| Method | Endpoint                 | Auth? | Deskripsi                              |
|--------|--------------------------|-------|----------------------------------------|
| GET    | `/api/gallery`           | Tidak | Semua foto gallery                     |
| GET    | `/api/gallery/:id`       | Tidak | Detail satu foto                       |
| POST   | `/api/gallery/add`       | Ya    | Upload foto gallery (field: image)     |
| PUT    | `/api/gallery/:id`       | Ya    | Ganti foto gallery                     |
| DELETE | `/api/gallery/:id`       | Ya    | Hapus foto gallery                     |

Foto gallery → `https://api.ptmpn.com/uploads/...`

---

### 5. Testimoni
| Method | Endpoint                 | Auth? | Deskripsi                              |
|--------|--------------------------|-------|----------------------------------------|
| GET    | `/api/testimoni`         | Tidak | Semua testimoni                        |
| GET    | `/api/testimoni/:id`     | Tidak | Detail testimoni                       |
| POST   | `/api/testimoni/add`     | Ya    | Tambah testimoni + foto (field: foto)  |
| PUT    | `/api/testimoni/:id`     | Ya    | Update testimoni + ganti foto          |
| DELETE | `/api/testimoni/:id`     | Ya    | Hapus testimoni                        |

---

### 6. Partners / Mitra
| Method | Endpoint                 | Auth? | Deskripsi                              |
|--------|--------------------------|-------|----------------------------------------|
| GET    | `/api/partners`          | Tidak | Semua mitra                            |
| GET    | `/api/partners/:id`      | Tidak | Detail mitra                           |
| POST   | `/api/partners/add`      | Ya    | Tambah mitra + logo (field: logo)      |
| PUT    | `/api/partners/:id`      | Ya    | Update mitra + ganti logo              |
| DELETE | `/api/partners/:id`      | Ya    | Hapus mitra                            |

---

### 7. Company Profile
| Method | Endpoint                        | Auth? | Deskripsi                              |
|--------|---------------------------------|-------|----------------------------------------|
| GET    | `/api/company-profile`          | Ya    | Ambil data company profile             |
| PUT    | `/api/company-profile/update`   | Ya    | Update company profile (nama, alamat, dll) |

---

### 8. Pesan / Contact Form
| Method | Endpoint                 | Auth? | Deskripsi                              |
|--------|--------------------------|-------|----------------------------------------|
| GET    | `/api/pesan`             | Ya    | Lihat semua pesan masuk (admin only)   |
| GET    | `/api/pesan/:id`         | Ya    | Detail pesan                           |
| POST   | `/api/pesan/add`         | Tidak | Kirim pesan dari website (publik)      |
| PUT    | `/api/pesan/:id`         | Ya    | Update status (dibaca/selesai)         |
| DELETE | `/api/pesan/:id`         | Ya    | Hapus pesan                            |

---

### 9. Detail Jenis Bidang Usaha (Hubungan Many-to-Many)
| Method | Endpoint                                     | Auth? | Deskripsi                              |
|--------|----------------------------------------------|-------|----------------------------------------|
| GET    | `/api/detail-jenis-bidang-usaha`             | Tidak | Semua relasi                           |
| GET    | `/api/detail-jenis-bidang-usaha/:id`         | Tidak | Detail relasi                          |
| POST   | `/api/detail-jenis-bidang-usaha`            | Ya    | Tambah relasi                          |
| PUT    | `/api/detail-jenis-bidang-usaha/:id`         | Ya    | Update relasi                          |
| DELETE | `/api/detail-jenis-bidang-usaha/:id`         | Ya    | Hapus relasi                           |

---

### Upload Foto / File
Semua upload pakai `multipart/form-data` dengan field name:
- `poto` → bidang usaha
- `foto` → jenis usaha, testimoni
- `image` → gallery
- `logo` → partners

File disimpan di folder `uploads/` → bisa diakses publik tanpa token.

---

### Status Code yang Dipakai
| Code | Arti                          |
|------|-------------------------------|
| 200  | OK                            |
| 201  | Created (login, create)       |
| 400  | Bad Request salah / validasi gagal |
| 401  | Token kurang / expired        |
| 403  | Forbidden (bukan superadmin)  |
| 404  | Data tidak ditemukan          |
| 500  | Server error                  |

---