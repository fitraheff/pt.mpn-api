import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware, authSuperadminMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/login", userController.login);

userRouter.use(authMiddleware);
userRouter.get("/:id", userController.getById);
userRouter.put("/update", userController.update);
userRouter.post("/logout", userController.logout);

userRouter.use(authSuperadminMiddleware);
userRouter.post("/add", userController.add);
userRouter.get("/", userController.getAll);



export {
    userRouter
}