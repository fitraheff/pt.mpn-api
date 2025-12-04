import express from "express";
import userController from "../controllers/user-controller.js";
import BUController  from '../controllers/bidang-usaha-controller.js';
import { upload } from "../middleware/multer-middleware.js";
import testimoniController from "../controllers/testimoni-controller.js";
import { authMiddleware, authSuperadminMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/api/users/add", userController.add);
userRouter.post("/api/users/login", userController.login);

userRouter.get('/bidang-usaha', BUController.getAllBidangUsaha);
userRouter.get('/bidang-usaha/:id', BUController.getBidangUsahaById);

// userRouter.use(authMiddleware);
userRouter.get("/api/users/:id", userController.getById);
userRouter.put("/api/users/update", userController.update);

// endpoints for Bidang Usaha
userRouter.post('/bidang-usaha', BUController.createBidangUsaha);
userRouter.put('/bidang-usaha/:id', BUController.updateBidangUsaha);
userRouter.delete('/bidang-usaha/:id', BUController.deleteBidangUsaha);

//endpoints testimoni
userRouter.get('/api/testimoni', testimoniController.getAll);
userRouter.post('/api/testimoni/add', upload("foto"), testimoniController.add);
userRouter.get('/api/testimoni/:id', testimoniController.getById);
userRouter.put('/api/testimoni/:id', upload("foto"), testimoniController.put);
userRouter.delete('/api/testimoni/:id', testimoniController.del);

// userRouter.use(authSuperadminMiddleware);
// userRouter.post("/api/users/add", userController.add);
userRouter.get("/api/users", userController.getAll);



export {
    userRouter
}