import express from "express";
import partnersController from "../controllers/partners-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { upload } from "../middleware/multer-middleware.js";

const partnersRouter = express.Router();

// Routes untuk partner
partnersRouter.get("/", partnersController.getAll);
partnersRouter.get("/:id", partnersController.getById);

partnersRouter.use(authMiddleware);

// uploadImage("logo") ← wajib ada field name
partnersRouter.post("/add", upload("logo"), partnersController.create);
partnersRouter.put("/:id", upload("logo"), partnersController.update);

partnersRouter.delete("/:id", partnersController.remove);

export {
    partnersRouter
}