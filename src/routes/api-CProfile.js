import express from "express";
import { getProfile, updateProfile } from "../controllers/company-profile-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const cPRouter = express.Router();

cPRouter.use(authMiddleware)
cPRouter.get("/", getProfile);
cPRouter.put("/update", updateProfile);

export { cPRouter };