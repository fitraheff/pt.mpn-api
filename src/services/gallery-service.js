import {prisma} from "../application/database.js";
import fs from "fs";
import path from "path";

export default {
    // CREATE
    async createGallery(data) {
        return await prisma.gallery.create({
            data: {
                image: data.image,
                id_users: data.id_users,
            },
        });
    },

    // GET ALL
    async getAllGallery() {
        return await prisma.gallery.findMany({
            include: {
                users: {
                    select: {
                        // id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    // GET BY ID
    async getGalleryById(id) {
        return await prisma.gallery.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        // id: true,
                        name: true,
                    },
                },
            },
        });
    },

    // UPDATE
    async updateGallery(id, data) {
        // Cek data lama berdasarkan ID
        const oldData = await prisma.gallery.findUnique({ where: { id } });
        if (!oldData) throw new Error("Gallery not found");

        // Jika user upload gambar baru → hapus gambar lama dari folder
        if (data.image && oldData.image) {
            const oldPath = path.join(oldData.image); // oldData.image sudah mengandung "uploads/..."

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        // Lakukan update data
        return prisma.gallery.update({
            where: { id },
            data: {
                image: data.image ? data.image : oldData.image, // kalau tidak upload → tetap gunakan gambar lama
                id_users: data.id_users ?? oldData.id_users,
            },
        });
    },

    // DELETE
    async deleteGallery(id) {
        const oldData = await prisma.gallery.findUnique({ where: { id } });
        if (!oldData) throw new Error("Gallery not found");

        if (oldData.image) {
            const oldPath = path.join(oldData.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        return prisma.gallery.delete({
            where: { id },
        });
    },
};