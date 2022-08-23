import express from "express";
import { Server } from "socket.io";
import {
  createChallenge,
  joinGame,
  quitGame,
  rematch,
  updateGame,
} from "./sockets/game.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
app.use(express.json({ extended: true, limit: "50mb" }));
dotenv.config();

//serve client
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(), "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () =>
  console.log(`http server running on port: ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("createChallenge", (gameData) => createChallenge(socket, gameData));
  socket.on("joinGame", (data) => joinGame(io, socket, data));
  socket.on("updateGame", (game) => updateGame(io, game));
  socket.on("rematch", (data) => rematch(io, data));
  socket.on("quitGame", (game) => quitGame(io, socket, game));
});
