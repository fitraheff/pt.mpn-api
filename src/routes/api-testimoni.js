import express from "express";
import testimoniController from "../controllers/testimoni-controller.js";
import { upload } from "../middleware/multer-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const testimoniRouter = express.Router();

testimoniRouter.use(authMiddleware);
testimoniRouter.get('/', testimoniController.getAll);
testimoniRouter.post('/add', upload("foto"), testimoniController.add);
testimoniRouter.get('/:id', testimoniController.getById);
testimoniRouter.put('/:id', upload("foto"), testimoniController.put);
testimoniRouter.delete('/:id', testimoniController.del);

export {
    testimoniRouter
}