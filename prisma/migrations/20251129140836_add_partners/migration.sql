/*
  Warnings:

  - A unique constraint covering the columns `[nama_partner]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partners" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partners_nama_partner_key" ON "Partners"("nama_partner");

-- CreateIndex
CREATE INDEX "Partners_nama_partner_idx" ON "Partners"("nama_partner");
