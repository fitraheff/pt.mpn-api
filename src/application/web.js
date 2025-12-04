import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api-users.js";
import { partnersRouter } from "../routes/api-partners.js";
import { BURouter } from "../routes/api-BUsaha.js";
import { testimoniRouter } from "../routes/api-testimoni.js";

export const web = express();
web.use(express.json());

// Base routes
web.use("/api/users", userRouter);
web.use("/api/partners", partnersRouter);
web.use("/api/bidang-usaha", BURouter);
web.use("/api/testimoni", testimoniRouter);

web.use(errorMiddleware);

