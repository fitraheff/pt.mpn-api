-- CreateTable
CREATE TABLE "Testimoni" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "foto" TEXT NOT NULL,
    "pesan_testi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimoni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Testimoni_nama_key" ON "Testimoni"("nama");
