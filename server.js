const http = require("node:http");
const controller = require("./controller");

const PORT = 3000;

const server = http.createServer();

server.on("request", (req, res) => controller(req, res));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
