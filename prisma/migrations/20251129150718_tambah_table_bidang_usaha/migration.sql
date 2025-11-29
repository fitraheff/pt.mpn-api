-- CreateTable
CREATE TABLE "Bidang_Usaha" (
    "id_BUsaha" TEXT NOT NULL,
    "nama_BUsaha" VARCHAR(225) NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bidang_Usaha_pkey" PRIMARY KEY ("id_BUsaha")
);
