/*
  Warnings:

  - You are about to drop the column `Status` on the `Jenis_Usaha` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nama_BUsaha]` on the table `Bidang_Usaha` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Jenis_Usaha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jenis_Usaha" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bidang_Usaha_nama_BUsaha_key" ON "Bidang_Usaha"("nama_BUsaha");
