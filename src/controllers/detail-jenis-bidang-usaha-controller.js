import detailJenisService from "../services/detail-jenis-bidang-usaha-service.js";

const add = async (req, res, next) => {
    try {
        const result = await detailJenisService.add(req.body);
        res.status(201).json({
            message: "Detail jenis bidang usaha berhasil ditambahkan",
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const result = await detailJenisService.getAll();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await detailJenisService.getById(id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await detailJenisService.update(id,req.body);
        res.status(200).json({
            message: "Detail jenis bidang usaha berhasil diperbarui",
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await detailJenisService.remove(id);
        res.status(200).json({
            message: "Detail jenis bidang usaha berhasil dihapus",
            data: result
        });
    } catch (e) {
        next(e);
    }
};

export default { add, getAll, getById, update, remove };