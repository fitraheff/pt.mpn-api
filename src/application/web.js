import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api-users.js";
import { BURouter } from "../routes/api-BUsaha.js";
import { testimoniRouter } from "../routes/api-testimoni.js";

export const web = express();
web.use(express.json());

web.use("/api/users", userRouter);
web.use("/api/bidang-usaha", BURouter);
web.use("/api/testimoni", testimoniRouter);

web.use(errorMiddleware);

// web.use("/uploads", express.static("uploads"));