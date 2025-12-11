import express from "express";
import testimoniController from "../controllers/testimoni-controller.js";
import { upload } from "../middleware/multer-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const testimoniRouter = express.Router();

testimoniRouter.get('/', testimoniController.getAll);
testimoniRouter.get('/:id', testimoniController.getById);

testimoniRouter.use(authMiddleware);
testimoniRouter.post('/add', upload("foto"), testimoniController.add);
testimoniRouter.put('/:id', upload("foto"), testimoniController.put);
testimoniRouter.delete('/:id', testimoniController.del);

export {
    testimoniRouter
}