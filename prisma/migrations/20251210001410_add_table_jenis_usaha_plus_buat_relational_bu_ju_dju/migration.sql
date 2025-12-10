/*
  Warnings:

  - Added the required column `jenisUsahaId` to the `Detail_JBU` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail_JBU" ADD COLUMN     "jenisUsahaId" TEXT NOT NULL;

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

-- AddForeignKey
ALTER TABLE "Jenis_Usaha" ADD CONSTRAINT "Jenis_Usaha_bidangUsahaId_fkey" FOREIGN KEY ("bidangUsahaId") REFERENCES "Bidang_Usaha"("id_BUsaha") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_JBU" ADD CONSTRAINT "Detail_JBU_jenisUsahaId_fkey" FOREIGN KEY ("jenisUsahaId") REFERENCES "Jenis_Usaha"("id") ON DELETE CASCADE ON UPDATE CASCADE;
