import fs from "fs";

import partnerService from "../services/partners-service.js";
import { ResponseError } from "../error/response-error.js";

const create = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new ResponseError(400, "Logo wajib diisi");
        }

        const request = {
            ...req.body,
            logo: req.file.filename
        };

        const result = await partnerService.create(request);
        res.status(201).json({
            data: result
        });
    } catch (e) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const partner = await partnerService.getAll();
        res.status(200).json({
            data: partner
        });
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await partnerService.getById(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const request = {
            id: req.params.id, // Ambil ID dari URL
            ...req.body, // Ambbil data dari body (nama_partner & deskripsi)
            logo: req.file ? req.file.filename : undefined // Ambil logo jika ada
        };

        const result = await partnerService.update(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await partnerService.remove(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    getAll,
    getById,
    update,
    remove
}