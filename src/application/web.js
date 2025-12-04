import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api.js";

export const web = express();
web.use(express.json());

web.use(userRouter);

web.use('/uploads',
    express.static('uploads')
)

web.use(errorMiddleware);