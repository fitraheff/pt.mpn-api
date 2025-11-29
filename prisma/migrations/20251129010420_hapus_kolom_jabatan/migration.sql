/*
  Warnings:

  - You are about to drop the column `jabatan` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_idx";

-- DropIndex
DROP INDEX "users_name_idx";

-- DropIndex
DROP INDEX "users_name_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "jabatan",
ADD COLUMN     "token" VARCHAR(100);
