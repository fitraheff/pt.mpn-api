import fs from "fs";
import jenisUsahaService from "../services/jenis-usaha-service.js";

const add = async (req, res, next) => {
    try {
        const bidangUsahaId = req.params.id_BUsaha;
        const result = await jenisUsahaService.add(req, bidangUsahaId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        if (req.file) {
            fs.unlink(req.file.path, () => {}); //Mencegah file orphan (file yang tersimpan tapi tidak tercatat di database)
        }
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await jenisUsahaService.getAll();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id || req.jenis_Usaha.id
        const result = await jenisUsahaService.getById(id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        const result = await jenisUsahaService.put(req);
        res.status(200).json({
            data: result
        });
        // console.log("Update testimoni berhasil")
    } catch (e) {
        if (req.file) {
            fs.unlink(req.file.path, () => {});
        }
        next(e);
    }
}

const del = async (req, res, next) => {
    try {
        const result = await jenisUsahaService.del(req);
        res.status(200).json({
            data: result
        });
        // console.log("Data berhasil dihapus")
    } catch(e) {
        next(e);
    }
}

export default {
    add,
    getAll,
    getById,
    put,
    del
}