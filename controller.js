const { friends } = require("./bd");

function controller(req, res) {
  const urlParts = req.url.split("/");

  switch (req.method) {
    case "GET":
      getRequest();
      break;

    case "POST":
      postRequest();
      break;

    default:
      res.statusCode = 404;
      res.end();
      break;
  }

  function getRequest() {
    switch (urlParts[1]) {
      case "friends":
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        if (urlParts.length === 3) {
          const friendIndex = urlParts[2];
          res.end(JSON.stringify(friends.get(friendIndex)));
        } else {
          res.end(JSON.stringify([...friends.values()]));
        }
        break;

      case "messages":
        res.setHeader("Content-Type", "text/html");
        res.write(
          "<html><body><ul><li>Hello Isaac!</li><li>What are your thoughts on astronomy?</li></ul></body></html>"
        );
        res.end();
        break;

      default:
        res.statusCode = 404;
        res.end();
        break;
    }
  }

  function postRequest() {
    switch (urlParts[1]) {
      case "friends":
        req.on("data", (data) => {
          const friend = data.toString();
          console.log("Request:", friend);
          friends.set(friends.size(), JSON.parse(friend));
        });
        req.pipe(res);
        break;

      default:
        res.statusCode = 404;
        res.end();
        break;
    }
  }
}

module.exports = controller;
