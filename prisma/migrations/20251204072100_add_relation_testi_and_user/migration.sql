/*
  Warnings:

  - Added the required column `id_user` to the `Testimoni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimoni" ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Testimoni" ADD CONSTRAINT "Testimoni_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
