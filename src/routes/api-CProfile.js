import express from "express";
import { getProfile, updateProfile } from "../controllers/company-profile-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const cPRouter = express.Router();

cPRouter.get("/", getProfile);
cPRouter.use(authMiddleware)
cPRouter.put("/update", updateProfile);

export { cPRouter };