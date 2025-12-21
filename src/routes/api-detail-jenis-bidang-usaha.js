import express from "express";
import detailJenisBidangUsahaController from "../controllers/detail-jenis-bidang-usaha-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const detailJenisBidangUsahaRouter = express.Router();

detailJenisBidangUsahaRouter.get('/', detailJenisBidangUsahaController.getAll);
detailJenisBidangUsahaRouter.get('/:id', detailJenisBidangUsahaController.getById);

detailJenisBidangUsahaRouter.use(authMiddleware);

detailJenisBidangUsahaRouter.post('/add', detailJenisBidangUsahaController.add);
detailJenisBidangUsahaRouter.put('/:id', detailJenisBidangUsahaController.update);
detailJenisBidangUsahaRouter.delete('/:id', detailJenisBidangUsahaController.remove);

export {
    detailJenisBidangUsahaRouter
}