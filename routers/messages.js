import express from "express";

import { MessagesController } from "../controllers/index.js";

const messagesRouter = express.Router();

messagesRouter.get("/", MessagesController.getMessages);
messagesRouter.post("/", MessagesController.postMessage);

export default messagesRouter;
