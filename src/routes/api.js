import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware, authSuperadminMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/login", userController.login);

userRouter.use(authMiddleware);
userRouter.put("/update", userController.update);

userRouter.use(authSuperadminMiddleware);
userRouter.post("/add", userController.add);

export {
    userRouter
}