import express from "express";
import testimoniController from "../controllers/testimoni-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const testimoniRouter = express.Router();

testimoniRouter.use(authMiddleware);
testimoniRouter.post("/add", testimoniController.add);
// testimoniRouter.get("/:id", testimoniController.getById);
// testimoniRouter.put("/update", testimoniController.update);

export {
    testimoniRouter
}