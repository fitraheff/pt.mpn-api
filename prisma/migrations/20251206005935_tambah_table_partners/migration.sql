-- CreateTable
CREATE TABLE "Partners" (
    "id" TEXT NOT NULL,
    "nama_partner" VARCHAR(250) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partners_nama_partner_key" ON "Partners"("nama_partner");

-- CreateIndex
CREATE INDEX "Partners_nama_partner_idx" ON "Partners"("nama_partner");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");
