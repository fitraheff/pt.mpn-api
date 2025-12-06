


# BackEnd API
Repository ini berisi source code untuk backend aplikasi **OJT Project** yang dibangun menggunakan:
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- Dan beberapa middleware seperti `multer`, `helmet`, dan `cors`.

## 📦 Tech Stack

| Teknologi | Deskripsi |
|----------|-----------|
| **Node.js** | Runtime JavaScript |
| **Express.js** | Backend Framework |
| **Prisma ORM** | Database ORM |
| **PostgreSQL** | Database Relasional |
| **JWT** | Autentikasi |
| **Multer** | Upload file/gambar |
| **Helmet** | Security middleware |
| **Cors** | Cross-origin resource sharing |

## Getting Started 🚀
- **Kloning Repositori**:
`git clone https://github.com/fitraheff/pt.mpn-api.git`

- **Instal Dependensi**:
`npm install`

- **Konfigurasi Environment**:
Salin file `.env.example` menjadi `.env`
Isi variabel lingkungan sesuai kebutuhan

- **Migrasi Database**:
`npx prisma migrate dev`

- **Jalankan Aplikasi**:
`npm run start`

## Environment Variables 🔐
### `DATABASE_URL`
- **Deskripsi**: URL koneksi basis data untuk mengkoneksikan aplikasi dengan database
- **Contoh**: `postgresql://username:password@localhost:5432/nama_database`

### `ACCESS_TOKEN_SECRET`
- **Deskripsi**: Kunci rahasia untuk penandatanganan dan verifikasi token JWT (JSON Web Token)
- **Contoh**: `your_very_long_and_secure_random_secret_key`

### `ACCESS_TOKEN_EXPIRATION`
- **Deskripsi**: Durasi masa berlaku token JWT
- **Contoh**: `1d` → 1 hari

## Project Directory Structure 📂
```bash
src/
├── application/
├── controllers/
├── error/
├── middleware/
├── routes/
├── services/
├── utils/
├── validations/
└── server.js
```