import React from "react";
import * as MS from "../../styles/ModalStyles";
import { ReactComponent as X_ICON } from "../../assets/icon-x.svg";
import { ReactComponent as O_ICON } from "../../assets/icon-o.svg";
import { Button } from "../../styles/Widgets";
import { Link } from "react-router-dom";

export const GameResult = ({
  gameInfo,
  gameInfo: { playingAs, winner, tie, versus },
  setGameInfo,
  userId,
  socket,
}) => {
  const nextRound = () => {
    setGameInfo({
      ...gameInfo,
      tie: false,
      winner: null,
      gameOver: false,
      moves: ["", "", "", "", "", "", "", "", ""],
    });
  };

  const Rematch = () => {
    if (gameInfo.rematch !== userId) {
      socket.emit("rematch", { gameId: gameInfo.gameId, userId });
    }
  };

  return (
    <MS.ModalCover>
      {!tie && versus === "player" && (
        <p>{playingAs === winner ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"}</p>
      )}
      {!tie && versus === "cpu" && (
        <p>{playingAs === winner ? "YOU WON!" : "OH NO, YOU LOST…"}</p>
      )}
      {!tie && versus === "friend" && !gameInfo.userQuit ? (
        gameInfo.x === userId || gameInfo.o === userId ? (
          <p>{playingAs === winner ? "YOU WON!" : "OH NO, YOU LOST…"}</p>
        ) : null
      ) : null}
      {!tie && versus === "friend" && gameInfo.userQuit ? (
        <p>{gameInfo.userQuit !== userId ? "OPPONENT QUIT" : "YOU QUIT"}</p>
      ) : null}
      <MS.Heading winner={winner}>
        {!tie && winner === "X" ? (
          <X_ICON fill="#31C3BD" />
        ) : !tie && winner === "O" ? (
          <O_ICON fill="#F2B137" />
        ) : null}
        {!tie ? "TAKES THE ROUND" : "ROUND TIED"}
      </MS.Heading>
      <MS.Buttons>
        <Link to="/">
          <Button color="silver">QUIT</Button>
        </Link>
        {gameInfo.versus !== "friend" ? (
          <Button color="yellow" onClick={nextRound}>
            NEXT ROUND
          </Button>
        ) : gameInfo.x === userId || gameInfo.o === userId ? (
          !gameInfo.userQuit && (
            <Button color="yellow" onClick={Rematch}>
              {!gameInfo.rematch
                ? "REMATCH"
                : gameInfo.rematch !== userId
                ? "ACCEPT REMATCH"
                : "REMATCH SENT"}
            </Button>
          )
        ) : null}
      </MS.Buttons>
    </MS.ModalCover>
  );
};
