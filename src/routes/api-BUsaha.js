import express from "express";    
import BUController  from '../controllers/bidang-usaha-controller.js';
import { authMiddleware } from "../middleware/auth-middleware.js";

const BURouter = express.Router();

BURouter.get('/', BUController.getAllBidangUsaha);
BURouter.get('/:id', BUController.getBidangUsahaById);

BURouter.use(authMiddleware);

BURouter.post('/', BUController.createBidangUsaha);
BURouter.put('/:id', BUController.updateBidangUsaha);
BURouter.delete('/:id', BUController.deleteBidangUsaha);

export {
    BURouter
}