import fs from "fs";
import path from "path";
import galleryService from "../services/gallery-service.js";
import { createGallerySchema, updateGallerySchema } from "../validations/gallery-validation.js";

export default {
    // CREATE
    async create(req, res, next) {
        try {
            // console.log(req.file);
            req.body.image = req.file ? req.file.path : null;
            const data = await createGallerySchema.validateAsync(req.body);
            const result = await galleryService.createGallery(data);

            res.status(201).json({
                message: "Gallery created successfully",
                data: result,
            });
        } catch (err) {
            if (req.file) { //ditambahkan untuk menghapus file jika terjadi error
                fs.unlink(req.file.path, () => { });
            } // sampai sini
            next(err);
        }
    },

    // GET ALL
    async getAll(req, res, next) {
        try {
            const result = await galleryService.getAllGallery();
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    // GET BY ID
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await galleryService.getGalleryById(id);

            if (!result) {
                return res.status(404).json({ message: "Gallery not found" });
            }

            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    // UPDATE
    async update(req, res, next) {
        try {
            req.body.image = req.file ? req.file.path : null;
            const { id } = req.params;
            const data = await updateGallerySchema.validateAsync(req.body);
            const result = await galleryService.updateGallery(id, data);

            res.json({
                message: "Gallery updated successfully",
                data: result,
            });
        } catch (err) {
            if (req.file) { //ditambahkan untuk menghapus file jika terjadi error
                fs.unlink(req.file.path, () => { });
            } // sampai sini
            next(err);
        }
    },

    // DELETE
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const result = await galleryService.deleteGallery(id);
            res.json({
                message: "Gallery deleted successfully",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
};