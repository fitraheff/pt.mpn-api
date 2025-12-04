import express from "express";
import testimoniController from "../controllers/testimoni-controller.js";
import { uploadImage } from "../middleware/multer-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { uploadImage } from "../middleware/image-middleware.js";

const testimoniRouter = express.Router();

testimoniRouter.use(authMiddleware);

testimoniRouter.get('/', testimoniController.getAll);
testimoniRouter.post('/add', uploadImage("foto"), testimoniController.add);
testimoniRouter.get('/:id', testimoniController.getById);
testimoniRouter.put('/:id', uploadImage("foto"), testimoniController.put);
testimoniRouter.delete('/:id', testimoniController.del);

export {
    testimoniRouter
}