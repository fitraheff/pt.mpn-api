import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api-users.js";
import { BURouter } from "../routes/api-BUsaha.js";
import { testimoniRouter } from "../routes/api-testimoni.js";
import { config } from "../utils/config.js";

export const web = express();
web.use(express.json());
web.use(cookieParser());

web.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

web.use(cors({
    origin: config.frontendURL,
    credentials: true,
}));

web.use("/api/users", userRouter);
web.use("/api/bidang-usaha", BURouter);
web.use("/api/testimoni", testimoniRouter);

web.use(errorMiddleware);

// web.use("/uploads", express.static("uploads"));