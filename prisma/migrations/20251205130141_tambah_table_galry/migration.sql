-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "id_users" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
