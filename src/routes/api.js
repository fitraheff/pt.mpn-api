import express from "express";
import userController from "../controllers/user-controller.js";
import partnersController from "../controllers/partners-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { uploadPartnerLogo } from "../middleware/logoPartners-middleware.js";

const userRouter = express.Router();

// userRouter.use(authMiddleware);

// userRouter.post("/login", userController.login);


export {
    userRouter
}