import express from "express";
import testimoniController from "../controllers/testimoni-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { uploadImage } from "../middleware/image-middleware.js";

const testimoniRouter = express.Router();

testimoniRouter.use(authMiddleware);
testimoniRouter.post("/add",uploadImage("foto"), testimoniController.add);
// testimoniRouter.get("/", testimoniController.getById);
// testimoniRouter.put("/:id", uploadImage("foto"), testimoniController.update);
// testimoniRouter.delete("/:id", testimoniController.remove);

export {
    testimoniRouter
}