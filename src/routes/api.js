import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware, authSuperadminMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/api/users/login", userController.login);

userRouter.use(authMiddleware);
userRouter.get("/api/users/:id", userController.getById);
userRouter.put("/api/users/update", userController.update);

userRouter.use(authSuperadminMiddleware);
userRouter.post("/api/users/add", userController.add);
userRouter.get("/api/users", userController.getAll);

export {
    userRouter
}