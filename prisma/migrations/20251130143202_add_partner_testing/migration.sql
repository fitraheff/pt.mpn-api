/*
  Warnings:

  - Changed the type of `logo` on the `Partners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Partners" DROP COLUMN "logo",
ADD COLUMN     "logo" BYTEA NOT NULL;
