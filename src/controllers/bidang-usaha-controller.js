import { prisma } from '../application/database.js';

// GET ALL
const getAllBidangUsaha = async (req, res) => {
    try {
        const BU = await prisma.Bidang_Usaha.findMany();

        return res.json(BU);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET BY ID
const getBidangUsahaById = async (req, res) => {
    try {
        const id = req.params.id;

        const BU = await prisma.Bidang_Usaha.findUnique({
            where: { id_BUsaha: id }
        });

        if (!BU) return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        return res.json(BU);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// CREATE
const createBidangUsaha = async (req, res) => {
    try {
        const { id_BUsaha, nama_BUsaha, deskripsi } = req.body;

        // ini tadi id buusahanya di apus karna kan udh di set otomatis di schema prisma pke uuid
        if (!nama_BUsaha) {
            return res.status(400).json({ message: 'ID dan Nama wajib diisi' });
        }

        const BU = await prisma.Bidang_Usaha.create({
            data: {
                id_BUsaha,
                nama_BUsaha,
                deskripsi: deskripsi || null
            }
        });

        return res.status(201).json(BU);
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
const updateBidangUsaha = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_BUsaha, deskripsi } = req.body;

        const BU = await prisma.Bidang_Usaha.update({
            where: { id_BUsaha: id },
            data: {
                nama_BUsaha,
                deskripsi
            }
        });

        return res.json(BU);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(400).json({ message: error.message });
    }
};

// DELETE
const deleteBidangUsaha = async (req, res) => {
    try {
        const id = req.params.id;

        await prisma.Bidang_Usaha.delete({
            where: { id_BUsaha: id }
        });

        return res.json({ message: 'Bidang Usaha telah di hapus' });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    getAllBidangUsaha,
    getBidangUsahaById,
    createBidangUsaha,
    updateBidangUsaha,
    deleteBidangUsaha
};
