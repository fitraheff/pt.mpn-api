-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "telp" INTEGER NOT NULL,
    "token" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bidang_Usaha" (
    "id_BUsaha" TEXT NOT NULL,
    "nama_BUsaha" VARCHAR(225) NOT NULL,
    "deskripsi" TEXT,
    "poto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bidang_Usaha_pkey" PRIMARY KEY ("id_BUsaha")
);

-- CreateTable
CREATE TABLE "Jenis_Usaha" (
    "id" TEXT NOT NULL,
    "nama_jenis" VARCHAR(250) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "bidangUsahaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jenis_Usaha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail_JBU" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(250) NOT NULL,
    "jenisUsahaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Detail_JBU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimoni" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "foto" TEXT NOT NULL,
    "pesan_testi" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimoni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "id_users" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partners" (
    "id" TEXT NOT NULL,
    "nama_partner" VARCHAR(250) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pesan" (
    "id_pesan" TEXT NOT NULL,
    "name_pesan" VARCHAR(100) NOT NULL,
    "email_pesan" VARCHAR(255) NOT NULL,
    "pesan_isi" TEXT NOT NULL,
    "layanan_pesan" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pesan_pkey" PRIMARY KEY ("id_pesan")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Testimoni_nama_key" ON "Testimoni"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_nama_partner_key" ON "Partners"("nama_partner");

-- CreateIndex
CREATE INDEX "Partners_nama_partner_idx" ON "Partners"("nama_partner");

-- AddForeignKey
ALTER TABLE "Jenis_Usaha" ADD CONSTRAINT "Jenis_Usaha_bidangUsahaId_fkey" FOREIGN KEY ("bidangUsahaId") REFERENCES "Bidang_Usaha"("id_BUsaha") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_JBU" ADD CONSTRAINT "Detail_JBU_jenisUsahaId_fkey" FOREIGN KEY ("jenisUsahaId") REFERENCES "Jenis_Usaha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimoni" ADD CONSTRAINT "Testimoni_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
