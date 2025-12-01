-- DropIndex
DROP INDEX "users_jabatan_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile" DROP NOT NULL;
