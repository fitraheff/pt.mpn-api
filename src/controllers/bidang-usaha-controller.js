import {
    getAllBU,
    getBUById,
    createBU,
    updateBU,
    deleteBU
    } 
from '../services/bidang-usaha-service.js';
import { validationBU } from '../validations/bidang-usaha-validation.js';

// GET ALL
export const getAllBidangUsaha = async (req, res) => {
    try {
        const BU = await getAllBU();
        return res.json(BU);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET BY ID
export const getBidangUsahaById = async (req, res) => {
    try {
        const id = req.params.id;

        const BU = await getBUById(id);

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
export const createBidangUsaha = async (req, res) => {
    try {
        const errorValidate = validationBU(req.body);
        if (errorValidate) {
            return res.status(400).json({ message: errorValidate });
        }

        const { id_BUsaha, nama_BUsaha, deskripsi } = req.body;

        const BU = await createBU({
            id_BUsaha,
            nama_BUsaha,
            deskripsi: deskripsi || null
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
export const updateBidangUsaha = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_BUsaha, deskripsi } = req.body;

        const BU = await updateBU(id, {
            nama_BUsaha,
            deskripsi
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
export const deleteBidangUsaha = async (req, res) => {
    try {
        const id = req.params.id;

        await deleteBU(id);

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