import express from "express";
import {BUController} from '../controllers/bidang-usaha-controller.js';
import { authMiddleware } from "../middleware/auth-middleware.js";
import { upload } from "../middleware/multer-middleware.js";

const BURouter = express.Router();

// Bebas tanpa login
BURouter.get('/', BUController.getAllBidangUsaha);
BURouter.get('/:id', BUController.getBidangUsahaById);
BURouter.get('/foto/:id', upload("poto"),  BUController.getPotoBUById );

BURouter.use(authMiddleware); // Wajib login
BURouter.post('/add', upload("poto"), BUController.createBidangUsaha );
BURouter.put(' /:id', BUController.updateBidangUsaha );
BURouter.put('/foto/:id', upload("poto"), BUController.updatePotoBU );
BURouter.delete('/:id', BUController.deleteBidangUsaha );
BURouter.delete('/foto/:id', BUController.deletePotoBU );

export { BURouter };