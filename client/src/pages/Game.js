import React, { useEffect, useState } from "react";
import * as GS from "../styles/GameStyles";
import * as W from "../styles/Widgets";
import { ReactComponent as LOGO } from "../assets/logo.svg";
import { ReactComponent as X_ICON } from "../assets/icon-x.svg";
import { ReactComponent as O_ICON } from "../assets/icon-o.svg";
import { ReactComponent as RestartIcon } from "../assets/icon-restart.svg";
import { Board } from "../components/Board";
import { useSearchParams } from "react-router-dom";
import {
  getGameStatus,
  getUser,
  numberOfMoves,
} from "../utils/helperFunctions";
import { GameResult } from "../components/modals/GameResult";
import CopyLink from "../components/CopyLink";
import { RestartGame } from "../components/modals/RestartGame";
import { QuitGame } from "../components/modals/QuitGame";

const Game = ({ socket }) => {
  const [params] = useSearchParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [userId] = useState(getUser());
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (params.get("versus") !== "friend" && !params.get("gameId")) {
      setGameInfo({
        versus: params.get("versus"),
        playingAs: params.get("playingAs"),
        gameId: params.get("gameId"),
        moves: ["", "", "", "", "", "", "", "", ""],
        tie: false,
        winner: null,
        gameOver: false,
        rounds: [],
        opponent: null,
      });
    }

    if (params.get("versus") === "friend" && params.get("gameId")) {
      socket.emit("joinGame", {
        userId: getUser(),
        gameId: params.get("gameId"),
      });
    }
  }, [params, socket]);

  useEffect(() => {
    if (gameInfo) {
      if (!gameInfo.gameOver) {
        if (getGameStatus(gameInfo)) {
          setGameInfo({ ...gameInfo, ...getGameStatus(gameInfo) });
          socket.emit("updateGame", {
            ...gameInfo,
            ...getGameStatus(gameInfo),
          });
        }
      }
    }
  }, [gameInfo, socket]);

  socket.on("gameUpdated", (game) => {
    setGameInfo({
      ...gameInfo,
      ...game,
      playingAs: game.x === getUser() ? "X" : "O",
      versus: "friend",
    });
  });

  return (
    <GS.GameCover>
      {gameInfo && (
        <W.Container>
          <GS.Top>
            <LOGO />
            <GS.PlayerTurn>
              {numberOfMoves(gameInfo.moves) % 2 === 0 ? (
                <X_ICON />
              ) : (
                <O_ICON />
              )}
              TURN
            </GS.PlayerTurn>
            {gameInfo.versus !== "friend" ? (
              <GS.Reload onClick={() => setRestart("restart")}>
                <RestartIcon />
              </GS.Reload>
            ) : gameInfo.x === userId || gameInfo.o === userId ? (
              <GS.Reload onClick={() => setRestart("quit")}>QUIT</GS.Reload>
            ) : null}
          </GS.Top>
          {gameInfo.versus !== "friend" && !gameInfo.gameId && (
            <Board gameInfo={gameInfo} setGameInfo={setGameInfo} />
          )}
          {gameInfo.versus === "friend" &&
          gameInfo.gameId &&
          gameInfo.opponent ? (
            <Board
              gameInfo={gameInfo}
              setGameInfo={setGameInfo}
              userId={userId}
              socket={socket}
            />
          ) : (
            gameInfo.versus === "friend" && <CopyLink gameInfo={gameInfo} />
          )}
          <GS.History>
            <GS.HistoryItem color="blue">
              <p>
                X{" "}
                {gameInfo.playingAs === "X" && gameInfo.versus === "cpu"
                  ? "(YOU)"
                  : gameInfo.playingAs === "O" && gameInfo.versus === "cpu"
                  ? "(CPU)"
                  : gameInfo.versus === "player" && gameInfo.playingAs === "X"
                  ? "(P1)"
                  : gameInfo.versus === "player"
                  ? "(P2)"
                  : gameInfo.playingAs === "X" &&
                    gameInfo.versus === "friend" &&
                    userId === gameInfo.x
                  ? "(YOU)"
                  : gameInfo.playingAs === "O" &&
                    gameInfo.versus === "friend" &&
                    userId === gameInfo.o
                  ? "(FRIEND)"
                  : "GUEST"}
              </p>
              <p className="value">
                {gameInfo.rounds.filter((round) => round === "X").length}
              </p>
            </GS.HistoryItem>
            <GS.HistoryItem color="silver">
              <p>TIES</p>
              <p className="value">
                {gameInfo.rounds.filter((round) => round === "tie").length}
              </p>
            </GS.HistoryItem>
            <GS.HistoryItem color="yellow">
              <p>
                O{" "}
                {gameInfo.playingAs === "O" && gameInfo.versus === "cpu"
                  ? "(YOU)"
                  : gameInfo.playingAs === "X" && gameInfo.versus === "cpu"
                  ? "(CPU)"
                  : gameInfo.versus === "player" && gameInfo.playingAs === "O"
                  ? "(P1)"
                  : gameInfo.versus === "player"
                  ? "(P2)"
                  : gameInfo.playingAs === "O" &&
                    gameInfo.versus === "friend" &&
                    userId === gameInfo.o
                  ? "(YOU)"
                  : gameInfo.playingAs === "X" &&
                    gameInfo.versus === "friend" &&
                    userId === gameInfo.x
                  ? "(FRIEND)"
                  : "(GUEST)"}
              </p>
              <p className="value">
                {gameInfo.rounds.filter((round) => round === "O").length}
              </p>
            </GS.HistoryItem>
          </GS.History>
        </W.Container>
      )}
      {gameInfo && gameInfo.gameOver && (
        <>
          <W.Overlay />
          <GameResult
            gameInfo={gameInfo}
            setGameInfo={setGameInfo}
            socket={socket}
            userId={userId}
          />
        </>
      )}
      {restart === "restart" && (
        <>
          <W.Overlay />
          <RestartGame
            gameInfo={gameInfo}
            setGameInfo={setGameInfo}
            setRestart={setRestart}
          />
        </>
      )}
      {restart === "quit" && (
        <>
          <W.Overlay />
          <QuitGame
            setRestart={setRestart}
            socket={socket}
            userId={userId}
            gameInfo={gameInfo}
          />
        </>
      )}
    </GS.GameCover>
  );
};

export default Game;
