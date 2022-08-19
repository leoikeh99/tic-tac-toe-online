import React, { useEffect } from "react";
import * as BS from "../styles/BoardStyles";
import { ReactComponent as X_ICON } from "../assets/icon-x.svg";
import { ReactComponent as O_ICON } from "../assets/icon-o.svg";
import { ReactComponent as X_ICON_OUTLINE } from "../assets/icon-x-outline.svg";
import { ReactComponent as O_ICON_OUTLINE } from "../assets/icon-o-outline.svg";
import {
  getIndex,
  getPosition,
  numberOfMoves,
  randNumber,
} from "../utils/helperFunctions";
import TicTacToeEngine, { Player } from "tic-tac-toe-minimax-engine";
let game = new TicTacToeEngine(Player.PLAYER_ONE);

export const Board = ({ gameInfo, setGameInfo, userId, socket }) => {
  const playMove = (index) => {
    let _moves = gameInfo.moves;
    if (gameInfo.versus === "player") {
      if (gameInfo.moves[index] === "" && !gameInfo.gameOver) {
        if (numberOfMoves(gameInfo.moves) % 2 === 0) {
          _moves[index] = "X";
          setGameInfo({
            ...gameInfo,
            moves: _moves,
          });
        } else {
          _moves[index] = "O";
          setGameInfo({
            ...gameInfo,
            moves: _moves,
          });
        }
      }
    }
    if (gameInfo.versus === "cpu") {
      if (gameInfo.moves[index] === "" && !gameInfo.gameOver) {
        //if user is X
        if (
          gameInfo.playingAs === "X" &&
          numberOfMoves(gameInfo.moves) % 2 === 0
        ) {
          //user plays
          _moves[index] = "X";

          const moveIndexes = getPosition(index);
          game.makeNextMove(moveIndexes[0], moveIndexes[1]);

          if (numberOfMoves(_moves) < 9) {
            const { x, y } = game.getBestMove();
            const _index = getIndex(x, y);

            //cpu plays
            game.makeNextMove(x, y);
            _moves[_index] = "O";
          }

          setGameInfo({
            ...gameInfo,
            moves: _moves,
          });
        }
        //if user is O
        else if (
          gameInfo.playingAs === "O" &&
          numberOfMoves(gameInfo.moves) % 2 !== 0
        ) {
          //user plays
          _moves[index] = "O";

          const moveIndexes = getPosition(index);
          game.makeNextMove(moveIndexes[0], moveIndexes[1]);

          if (numberOfMoves(_moves) <= 9) {
            const { x, y } = game.getBestMove();
            const _index = getIndex(x, y);

            //cpu plays
            game.makeNextMove(x, y);
            _moves[_index] = "X";
          }

          setGameInfo({
            ...gameInfo,
            moves: _moves,
          });
        }
      }
    }
    if (gameInfo.versus === "friend") {
      if (gameInfo.x === userId && numberOfMoves(gameInfo.moves) % 2 === 0) {
        _moves[index] = "X";

        socket.emit("updateGame", { gameId: gameInfo.gameId, moves: _moves });

        setGameInfo({
          ...gameInfo,
          moves: _moves,
        });
      } else if (
        gameInfo.o === userId &&
        numberOfMoves(gameInfo.moves) % 2 !== 0
      ) {
        _moves[index] = "O";

        socket.emit("updateGame", { gameId: gameInfo.gameId, moves: _moves });

        setGameInfo({
          ...gameInfo,
          moves: _moves,
        });
      }
    }
  };

  useEffect(() => {
    if (gameInfo.versus === "cpu") {
      if (gameInfo.gameOver) {
        game = new TicTacToeEngine(Player.PLAYER_ONE);
      }
      if (numberOfMoves(gameInfo.moves) === 0 && gameInfo.playingAs === "X") {
        game = new TicTacToeEngine(Player.PLAYER_ONE);
      }
      if (numberOfMoves(gameInfo.moves) === 0 && gameInfo.playingAs === "O") {
        let _moves = gameInfo.moves;
        let x = randNumber();
        let y = randNumber();
        game.makeNextMove(x, y);
        _moves[getIndex(x, y)] = "X";

        setGameInfo({
          ...gameInfo,
          moves: _moves,
        });
      }
    }
  }, [gameInfo]);

  return (
    <BS.BoardCover>
      {gameInfo.moves.map((move, index) => (
        <BS.Tile
          key={index}
          index={index}
          gameInfo={gameInfo}
          move={move}
          numberOfMoves={numberOfMoves(gameInfo.moves)}
          onClick={() => playMove(index)}>
          {move === "X" ? (
            <span className="x-full">
              <X_ICON fill="#31C3BD" />
            </span>
          ) : move === "O" ? (
            <span className="o-full">
              <O_ICON fill="#F2B137" />
            </span>
          ) : null}
          <span className="x-outline">
            <X_ICON_OUTLINE />
          </span>
          <span className="o-outline">
            <O_ICON_OUTLINE />
          </span>
        </BS.Tile>
      ))}
    </BS.BoardCover>
  );
};
