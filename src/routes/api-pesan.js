import express from "express";
import PesanController from "../controllers/Pesan-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const pesanRouter = express.Router();

pesanRouter.use(authMiddleware);

pesanRouter.get("/", PesanController.getAllMessage)
pesanRouter.get("/:id", PesanController.getMessageById)
pesanRouter.post("/add", PesanController.createMessage)
pesanRouter.put("/:id", PesanController.updateMessage)
pesanRouter.delete("/:id", PesanController.deleteMessage)


export {
    pesanRouter
}