import { friendsModel } from "../models/index.js";

export default class FriendsController {
  static postFriend(req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        error: "Missing friend name",
      });
    }

    const newFriendId = String(friendsModel.size());
    const newFriend = {
      name: req.body.name,
      id: newFriendId,
    };

    friendsModel.set(newFriendId, newFriend);
    res.json(newFriend);
  }

  static getFriends(req, res) {
    res.json([...friendsModel.values()]);
  }

  static getFriend(req, res) {
    const friendId = req.params.friendId;
    const friend = friendsModel.get(friendId);

    if (friend) {
      res.status(200).json(friend);
    } else {
      res.status(404).json({
        error: "Friend does not exist",
      });
    }
  }
}
