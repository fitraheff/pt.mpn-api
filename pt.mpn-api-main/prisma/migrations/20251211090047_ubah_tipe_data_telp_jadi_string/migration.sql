/*
  Warnings:

  - Added the required column `Status` to the `Jenis_Usaha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jenis_Usaha" ADD COLUMN     "Status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "telp" SET DATA TYPE VARCHAR(15);
