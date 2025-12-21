import express from "express";
import galleryController from "../controllers/gallery-controller.js";
import { upload } from "../middleware/multer-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const galeryRouter = express.Router();

// ----------------------
// Galery Routes
// ----------------------
galeryRouter.get("/", galleryController.getAll);
galeryRouter.get("/:id", galleryController.getById);

galeryRouter.use(authMiddleware);
galeryRouter.post("/add", upload("image"), galleryController.create);
galeryRouter.put("/:id", upload("image"), galleryController.update);
galeryRouter.delete("/:id", galleryController.remove);

export {
    galeryRouter
};