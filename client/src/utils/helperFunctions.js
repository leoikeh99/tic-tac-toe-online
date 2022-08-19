import data from "./data.json";
import { v4 as uuidv4 } from "uuid";

export const numberOfMoves = (moves) =>
  moves.filter((move) => move === "X").length +
  moves.filter((move) => move === "O").length;

export const getGameStatus = (gameInfo) => {
  let status = false;
  if (numberOfMoves(gameInfo.moves) >= 5) {
    data.winningVariations.forEach((variation) => {
      if (
        gameInfo.moves[variation[0]] === "X" &&
        gameInfo.moves[variation[1]] === "X" &&
        gameInfo.moves[variation[2]] === "X"
      ) {
        status = {
          winner: "X",
          gameOver: true,
          variation,
          rounds: [...gameInfo.rounds, "X"],
        };
      } else if (
        gameInfo.moves[variation[0]] === "O" &&
        gameInfo.moves[variation[1]] === "O" &&
        gameInfo.moves[variation[2]] === "O"
      ) {
        status = {
          winner: "O",
          gameOver: true,
          variation,
          rounds: [...gameInfo.rounds, "O"],
        };
      } else if (numberOfMoves(gameInfo.moves) === 9 && status === false) {
        status = {
          tie: true,
          gameOver: true,
          rounds: [...gameInfo.rounds, "tie"],
        };
      }
    });
  }

  return status;
};

export const getPosition = (index) =>
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ][index];

export const getIndex = (x, y) => {
  if (x === 0 && y === 0) return 0;
  if (x === 0 && y === 1) return 1;
  if (x === 0 && y === 2) return 2;
  if (x === 1 && y === 0) return 3;
  if (x === 1 && y === 1) return 4;
  if (x === 1 && y === 2) return 5;
  if (x === 2 && y === 0) return 6;
  if (x === 2 && y === 1) return 7;
  if (x === 2 && y === 2) return 8;
};

export const randNumber = () => Math.floor(Math.random() * 3);

export const createUser = () =>
  !localStorage.getItem("user") && localStorage.setItem("user", uuidv4());

export const getUser = () => {
  if (!localStorage.getItem("user")) localStorage.setItem("user", uuidv4());
  return localStorage.getItem("user");
};
