import {
    getAllBU,
    getBUById,
    countBUName,
    createBU,
    updateBU,
    deleteBU
}
    from '../services/bidang-usaha-service.js';
import { validate } from "../validations/validation.js"
import { validationBU } from "../validations/bidang-usaha-validation.js";
import fs from "fs";
import path from "path";
import { prisma } from '../application/database.js';

// GET ALL
export const getAllBidangUsaha = async (req, res) => {
    try {
        // Memanggil service untuk mengambil semua data dari database
        const BU = await getAllBU();

        // Mengirimkan semua data dalam bentuk JSON
        return res.json(BU);

    } catch (error) {

        // Menampilkan error di terminal
        console.error(error);

        // Mengirim response error jika terjadi kegagalan server
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET BY ID
export const getBidangUsahaById = async (req, res) => {
    try {
        // Mengambil parameter id dari URL
        const id = req.params.id;

        // Mengambil data dari database berdasarkan id
        const BU = await getBUById(id);

        // Jika data tidak ditemukan
        if (!BU) return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });

        // Jika data ditemukan, kirim sebagai response
        return res.json(BU);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET BY ID FOTO
export const getPotoBUById = async (req, res) => {
    try {
        // Mengambil parameter id dari URL
        const id = req.params.id;

        // Mengambil data dari database berdasarkan id
        const BU = await getBUById(id);

        // Jika data tidak ditemukan
        if (!BU) {
            return res.status(404).json({
                message: 'ID Bidang Usaha tidak ditemukan!!'
            });
        }

        // Jika foto belum ada
        if (!BU.poto) {
            return res.status(404).json({
                message: 'Foto untuk Bidang Usaha ini belum tersedia'
            });
        }

        // Jika foto ada, kirim hanya fotonya saja
        return res.json({
            id: BU.id_BUsaha,
            poto: BU.poto
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// CREATE
export const createBidangUsaha = async (req, res) => {
    try {
        const data = await validate(validationBU, req.body);

        const CountBU = await countBUName(data.nama_BUsaha);

        if (CountBU > 0) {
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(400).json({
                message: "Nama bidang usaha sudah terdaftar, silakan gunakan nama lain."
            });
        }

        const poto = req.file ? `/uploads/${req.file.filename}` : null;

        const BU = await createBU({
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi || null,
            poto: poto || null
        });

        // Mengirim response sukses
        return res.status(201).json(BU);

    } catch (error) {
        if (req.file) { fs.unlink(req.file.path, () => { }); }

        return res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
export const updateBidangUsaha = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await validate(validationBU, req.body);
        const existingCount = await prisma.bidang_Usaha.count({
            where: {
                nama_BUsaha: {
                    equals: data.nama_BUsaha,
                    mode: 'insensitive'
                },
                NOT: {
                    id_BUsaha: id  // ←← INI YANG WAJIB DITAMBAHKAN
                }
            }
        });

        if (existingCount > 0) {
            return res.status(400).json({
                message: "Nama bidang usaha sudah terdaftar di data lain, silakan gunakan nama lain."
            });
        }

        const BU = await updateBU(id, {
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi || null,
        });

        return res.json({
            message: "Update Berhasil",
            data: BU
        });

    } catch (error) {
        console.error("Error Detail:", error);

        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        }

        if (error.code === 'P2002') {
            return res.status(400).json({
                message: `Nama Bidang Usaha '${req.body.nama_BUsaha}' sudah terdaftar, gunakan nama lain.`
            });
        }

        return res.status(400).json({ message: error.message });
    }
};

// UPDATE POTO
export const updatePotoBU = async (req, res) => {
    try {
        // Ambil ID dari parameter URL
        const id = req.params.id;

        const bUsaha = await getBUById(id);
        if (!bUsaha) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

        let dataUpdate = {};

        if (req.file) {
            dataUpdate.poto = `/uploads/${req.file.filename}`;
        }

        if (req.body.poto) {
            dataUpdate.poto = req.body.poto;
        }

        if (Object.keys(dataUpdate).length === 0) {
            return res.json({
                message: "Tidak ada foto yang diubah",
                data: bUsaha
            });
        }

        const updated = await updateBU(id, dataUpdate);

        return res.json({
            message: "Foto berhasil diperbarui",
            data: updated
        });

    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// DELETE
export const deleteBidangUsaha = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteBU(id);
        return res.json({ message: 'Bidang Usaha telah di hapus' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE FOTO 
export const deletePotoBU = async (req, res) => {
    try {
        const id = req.params.id;
        const bUsaha = await getBUById(id);
        if (!bUsaha || !bUsaha.poto) {
            return res.status(404).json({
                message: "Foto Bidang Usaha tidak ditemukan"
            });
        }

        // Ambil path file dari URL
        const filePath = path.join(
            process.cwd(),
            bUsaha.poto.replace("../uploads", "uploads")
        );

        // Hapus file fisik jika ada
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await updateBU(id, {
            poto: null
        });

        return res.json({
            message: "Foto Bidang Usaha berhasil dihapus"
        });

    } catch (error) {
        // console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const BUController = {
    getAllBidangUsaha,
    getBidangUsahaById,
    getPotoBUById,
    createBidangUsaha,
    updateBidangUsaha,
    updatePotoBU,
    deleteBidangUsaha,
    deletePotoBU
};