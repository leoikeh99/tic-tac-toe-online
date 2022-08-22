import { v4 as uuidv4 } from "uuid";

let games = [];

export const createChallenge = (socket, gameData) => {
  const gameId = uuidv4();
  const game = {
    gameId,
    ...gameData,
    moves: ["", "", "", "", "", "", "", "", ""],
    opponent: null,
    rounds: [],
    tie: false,
    winner: null,
    gameOver: false,
  };
  games = [...games, game];

  socket.join(gameId);
  socket.emit("game created", game);
};

export const joinGame = (io, socket, data) => {
  if (!games.some((game) => game.gameId === data.gameId)) return;

  if (
    !games.find((game) => game.gameId === data.gameId).opponent &&
    games.find((game) => game.gameId === data.gameId).creator !== data.userId
  ) {
    games = games.map((game) =>
      game.gameId === data.gameId
        ? {
            ...game,
            opponent: data.userId,
            x: game.x ? game.x : data.userId,
            o: game.o ? game.o : data.userId,
          }
        : game
    );
  }

  socket.join(data.gameId);
  updateGame(
    io,
    games.find((game) => game.gameId === data.gameId)
  );
};

export const updateGame = (io, game) => {
  if (!games.some((_game) => _game.gameId === game.gameId)) return;

  games = games.map((_game) =>
    _game.gameId === game.gameId ? { ..._game, ...game } : _game
  );
  io.in(game.gameId).emit(
    "gameUpdated",
    games.find((_game) => _game.gameId === game.gameId)
  );
};

export const rematch = (io, data) => {
  const game = games.find((game) => game.gameId === data.gameId);
  if (!game) return;

  if (game.opponent === data.userId || game.creator === data.userId) {
    if (game.rematch === data.userId) return;

    if (game.rematch && game.rematch !== data.userId) {
      const _game = {
        moves: ["", "", "", "", "", "", "", "", ""],
        tie: false,
        winner: null,
        gameOver: false,
        rematch: false,
      };
      games = games.map((game) =>
        game.gameId === data.gameId ? { ...game, ..._game } : game
      );

      io.in(game.gameId).emit(
        "gameUpdated",
        games.find((_game) => _game.gameId === game.gameId)
      );
      return;
    }

    games = games.map((game) =>
      game.gameId === data.gameId ? { ...game, rematch: data.userId } : game
    );

    io.in(game.gameId).emit(
      "gameUpdated",
      games.find((_game) => _game.gameId === game.gameId)
    );
  }
};

export const quitGame = (io, socket, game) => {
  if (!games.some((_game) => _game.gameId === game.gameId)) return;

  games = games.map((_game) =>
    _game.gameId === game.gameId ? { ..._game, ...game } : _game
  );

  socket.leave(game.gameId);

  io.in(game.gameId).emit(
    "gameUpdated",
    games.find((_game) => _game.gameId === game.gameId)
  );
};
