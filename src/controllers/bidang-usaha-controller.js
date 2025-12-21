import {
    getAllBU,
    getBUById,
    createBU,
    updateBU,
    deleteBU
}
    from '../services/bidang-usaha-service.js';
import { validate } from "../validations/validation.js"
import { validationBU } from "../validations/bidang-usaha-validation.js";
import fs from "fs";
import path from "path";

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
        const poto = req.file ? req.file.path : null;

        // Mengambil data dari body request
        // const { id_BUsaha, nama_BUsaha, deskripsi, poto } = req.body;

        // Menyimpan data ke database lewat service
        const BU = await createBU({
            // id_BUsaha,
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi || null,
            poto: poto
        });

        // Mengirim response sukses dengan status 201
        return res.status(201).json(BU);
    } catch (error) {
        if (req.file) { fs.unlink(req.file.path, () => { }); } //ditambahkan untuk menghapus file jika terjadi error
        // console.error(error);
        return res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
export const updateBidangUsaha = async (req, res) => {
    try {
        // Mengambil id dari URL
        const id = req.params.id;

        // Mengambil data yang akan diubah dari body
        const data = await validate(validationBU, req.body);
        // const { nama_BUsaha, deskripsi } = req.body;

        // Memanggil service untuk update data
        const BU = await updateBU(id, {
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi || null,
        });

        // Mengirim response data yang sudah di-update
        return res.json(BU);
    } catch (error) {
        console.error(error);

        // Jika ID tidak ditemukan di database
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(400).json({ message: error.message });
    }
};

// UPDATE POTO
export const updatePotoBU = async (req, res) => {
    try {
        // Ambil ID dari parameter URL
        const id = req.params.id;

        // Cek apakah data Bidang Usaha dengan ID tersebut ada
        const bUsaha = await getBUById(id); // update URL foto baru
        if (!bUsaha) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

        let dataUpdate = {}; // object kosong untuk data update

        // Jika user mengirim file foto
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
        // Mengambil id dari URL
        const id = req.params.id;

        // Menghapus data dari database
        await deleteBU(id);

        // Mengirim response berhasil
        return res.json({ message: 'Bidang Usaha telah di hapus' });
    } catch (error) {
        // console.error(error);
        // Jika ID tidak ditemukan di database
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE FOTO 
export const deletePotoBU = async (req, res) => {
    try {
        // Mengambil id dari URL
        const id = req.params.id;

        // Ambil data Bidang Usaha berdasarkan ID
        const bUsaha = await getBUById(id);

        // Jika data tidak ditemukan atau tidak punya poto
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
