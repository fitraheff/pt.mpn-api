/*
  Warnings:

  - You are about to drop the column `id_users` on the `Testimoni` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Testimoni" DROP CONSTRAINT "Testimoni_id_users_fkey";

-- AlterTable
ALTER TABLE "Testimoni" DROP COLUMN "id_users";
