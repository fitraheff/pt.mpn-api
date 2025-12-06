import {
    getAllPsn,
    getPsnById,
    createPsn,
    updatePsn,
    deletePsn
}
    from '../services/Pesan-service.js';
import { validationPsn } from '../validations/Pesan-validation.js';

// GET ALL
export const getAllMessage = async (req, res) => {
    try {
        const Psn = await getAllPsn();
        return res.json(Psn);
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// GET BY ID
export const getMessageById = async (req, res) => {
    try {
        const id = (req.params.id);

        const Psn = await getPsnById(id);

        if (!Psn) return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        return res.json(Psn);
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// CREATE
export const createMessage = async (req, res) => {
    try {
        const errorValidate = validationPsn(req.body);
        if (errorValidate) {
            return res.status(400).json({ message: errorValidate });
        }

        const { name_pesan, email_pesan, pesan_isi, layanan_pesan } = req.body;

        const Psn = await createPsn({

            name_pesan,
            email_pesan,
            pesan_isi,
            layanan_pesan,

        });

        return res.status(201).json(Psn);
    } catch (error) {
        // console.error(error);
        return res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
export const updateMessage = async (req, res) => {
    try {
        const id = (req.params.id);
        const { name_pesan, email_pesan, pesan_isi, layanan_pesan } = req.body;

        const Psn = await updatePsn(id, {


            name_pesan,
            email_pesan,
            pesan_isi,
            layanan_pesan,

        });

        return res.json(Psn);
    } catch (error) {
        // console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'ID Bidang Usaha tidak ditemukan!!' });
        }
        return res.status(400).json({ message: error.message });
    }
};

//delete
export const deleteMessage = async (req, res) => {
    try {
        const id = (req.params.id);

        await deletePsn(id);

        return res.json({ message: 'pesan telah di hapus' });
    } catch (error) {
        // console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'pesan tidak ditemukan!!' });
        }
        return res.status(500).json({ message: error.message });
    }
};


export default {
    getAllMessage,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
};