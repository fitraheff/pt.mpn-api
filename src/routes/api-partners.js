import express from "express";
import partnersController from "../controllers/partners-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { uploadImage } from "../middleware/image-middleware.js";

const partnersRouter = express.Router();

// partnersRouter.use(authMiddleware);

// Routes untuk partner
partnersRouter.get("/", partnersController.getAll);
partnersRouter.get("/:id", partnersController.getById);

// uploadImage("logo") ← wajib ada field name
partnersRouter.post("/add", uploadImage("logo"), partnersController.create);
partnersRouter.put("/:id", uploadImage("logo"), partnersController.update);

partnersRouter.delete("/:id", partnersController.remove);

export {
    partnersRouter
}