/*
  Warnings:

  - You are about to drop the `Testimoni` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Testimoni" DROP CONSTRAINT "Testimoni_id_users_fkey";

-- DropTable
DROP TABLE "Testimoni";
