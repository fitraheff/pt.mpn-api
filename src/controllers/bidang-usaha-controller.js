import {
    getAllBU,
    getBUById,
<<<<<<< HEAD
=======
    countBUName,
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
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
<<<<<<< HEAD
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
=======

        const CountBU = await countBUName(data.nama_BUsaha);

        if (CountBU > 0) {
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(400).json({
                message: "Nama bidang usaha sudah terdaftar, silakan gunakan nama lain."
            });
        }

        const poto = req.file ? req.file.path : null;

        const BU = await createBU({
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi || null,
            poto: poto || null
        });

        // Mengirim response sukses
        return res.status(201).json(BU);

    } catch (error) {
        if (req.file) { fs.unlink(req.file.path, () => { }); }

>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
        return res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
export const updateBidangUsaha = async (req, res) => {
    try {
<<<<<<< HEAD
        // Mengambil id dari URL
        const id = req.params.id;

        // Mengambil data yang akan diubah dari body
        const data = await validate(validationBU, req.body);
        // const { nama_BUsaha, deskripsi } = req.body;

        // Memanggil service untuk update data
=======
        const id = req.params.id;
        const data = await validate(validationBU, req.body);
        const CountBU = await countBUName(data.nama_BUsaha);

        if (CountBU > 0) {
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(400).json({
                message: "Nama bidang usaha sudah terdaftar, silakan gunakan nama lain."
            });
        }

        if (!data || !data.nama_BUsaha) {
            return res.status(400).json({
                message: "Gagal memproses data."
            });
        }

>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
        const BU = await updateBU(id, {
            nama_BUsaha: data.nama_BUsaha,
            deskripsi: data.deskripsi || null,
        });

<<<<<<< HEAD
        // Mengirim response data yang sudah di-update
        return res.json(BU);
    } catch (error) {
        console.error(error);

        // Jika ID tidak ditemukan di database
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        }
=======
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

>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
        return res.status(400).json({ message: error.message });
    }
};

// UPDATE POTO
export const updatePotoBU = async (req, res) => {
    try {
        // Ambil ID dari parameter URL
        const id = req.params.id;

<<<<<<< HEAD
        // Cek apakah data Bidang Usaha dengan ID tersebut ada
        const bUsaha = await getBUById(id); // update URL foto baru
=======
        const bUsaha = await getBUById(id);
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
        if (!bUsaha) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        };

<<<<<<< HEAD
        let dataUpdate = {}; // object kosong untuk data update

        // Jika user mengirim file foto
=======
        let dataUpdate = {};

>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
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
<<<<<<< HEAD
        // Mengambil id dari URL
        const id = req.params.id;

        // Menghapus data dari database
        await deleteBU(id);

        // Mengirim response berhasil
        return res.json({ message: 'Bidang Usaha telah di hapus' });
    } catch (error) {
        // console.error(error);
        // Jika ID tidak ditemukan di database
=======
        const id = req.params.id;
        await deleteBU(id);
        return res.json({ message: 'Bidang Usaha telah di hapus' });
    } catch (error) {
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE FOTO 
export const deletePotoBU = async (req, res) => {
    try {
<<<<<<< HEAD
        // Mengambil id dari URL
        const id = req.params.id;

        // Ambil data Bidang Usaha berdasarkan ID
        const bUsaha = await getBUById(id);

        // Jika data tidak ditemukan atau tidak punya poto
=======
        const id = req.params.id;
        const bUsaha = await getBUById(id);
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
