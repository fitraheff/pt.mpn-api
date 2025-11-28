-- DropIndex
DROP INDEX "users_name_key";

-- CreateTable
CREATE TABLE "Partners" (
    "id" TEXT NOT NULL,
    "nama_partner" VARCHAR(250) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);
