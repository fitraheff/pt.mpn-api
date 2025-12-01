import express from "express";
import partnersController from "../controllers/partners-controller.js";
import { uploadPartnerLogo } from "../middleware/logoPartners-middleware.js";

const partnerRouter = express.Router();

// Routes untuk partner
partnerRouter.get("/", partnersController.getAll);
partnerRouter.get("/:id", partnersController.getById);
partnerRouter.post("/add", uploadPartnerLogo, partnersController.create);
partnerRouter.put("/:id", uploadPartnerLogo, partnersController.update);
partnerRouter.delete("/:id", partnersController.remove);

export {
    partnerRouter
}