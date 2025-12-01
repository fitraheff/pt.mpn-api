import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api.js";
import { partnerRouter } from "../routes/api-partners.js";

export const web = express();
web.use(express.json());

// Base routes
web.use("/api/users", userRouter);
web.use("/api/partners", partnerRouter);

web.use(errorMiddleware);

web.use("/uploads", express.static("uploads"));