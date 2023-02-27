export default class MessagesController {
  static getMessages(req, res) {
    res.render("messages", {
      title: "Messages to my Friends!",
      friend: "Elon Musk",
    });
  }

  static postMessage() {
    console.log("Updating messages...");
  }
}
