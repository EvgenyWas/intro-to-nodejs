import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { friendsRouter, messagesRouter } from "./routers/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 3000;

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "My friends are perfect",
    caption: "Let's go doing magic!",
  });
});

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
