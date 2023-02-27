import express from "express";

import { FriendsController } from "../controllers/index.js";

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
  console.log("ip address:", req.ip);
  next();
});

friendsRouter.get("/", FriendsController.getFriends);
friendsRouter.get("/:friendId", FriendsController.getFriend);
friendsRouter.post("/", FriendsController.postFriend);

export default friendsRouter;
