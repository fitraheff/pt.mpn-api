import fs from "fs";
import testimonyService from "../services/testimoni-service.js"

const add = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await testimonyService.add(req, userId);
        res.status(200).json({
            data: result
        });
        // console.log("berhasi membuat testimoni")
    } catch (e) {
        if (req.file) {
            fs.unlink(req.file.path, () => { }); //Mencegah file orphan (file yang tersimpan tapi tidak tercatat di database)
        }
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await testimonyService.getAll();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id || req.testimoni.id
        const result = await testimonyService.getById(id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        const result = await testimonyService.put(req);
        res.status(200).json({
            data: result
        });
        // console.log("Update testimoni berhasil")
    } catch (e) {
        if (req.file) {
            fs.unlink(req.file.path, () => { });
        }
        next(e);
    }
}

const del = async (req, res, next) => {
    try {
        const result = await testimonyService.del(req);
        res.status(200).json({
            data: result
        });
        // console.log("Data berhasil dihapus")
    } catch (e) {
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