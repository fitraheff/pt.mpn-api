import express from "express";
import jUsahaController from "../controllers/jenis-usaha-controller.js";
import { upload } from "../middleware/multer-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const jUsahaRouter = express.Router();

jUsahaRouter.get('/', jUsahaController.getAll);
jUsahaRouter.get('/:id', jUsahaController.getById);

jUsahaRouter.use(authMiddleware);
jUsahaRouter.post('/add/:id_BUsaha', upload("foto"), jUsahaController.add);
jUsahaRouter.put('/update/:id', upload("foto"), jUsahaController.put);
jUsahaRouter.delete('/delete/:id', jUsahaController.del);

export {
    jUsahaRouter
}