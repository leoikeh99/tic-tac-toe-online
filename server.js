import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createChallenge,
  joinGame,
  quitGame,
  rematch,
  updateGame,
} from "./sockets/game.js";

const app = express();
app.use(express.json({ extended: true, limit: "50mb" }));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("createChallenge", (gameData) => createChallenge(socket, gameData));
  socket.on("joinGame", (data) => joinGame(io, socket, data));
  socket.on("updateGame", (game) => updateGame(io, game));
  socket.on("rematch", (data) => rematch(io, data));
  socket.on("quitGame", (game) => quitGame(io, socket, game));
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
  console.log(`http server running on port: ${PORT}`)
);
