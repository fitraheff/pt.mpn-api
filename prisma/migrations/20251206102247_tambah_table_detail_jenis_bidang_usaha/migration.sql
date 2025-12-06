-- CreateTable
CREATE TABLE "Detail_JBU" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Detail_JBU_pkey" PRIMARY KEY ("id")
);
