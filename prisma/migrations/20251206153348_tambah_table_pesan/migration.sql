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
