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
import { CopyLink } from "../components/CopyLink";

const Game = ({ socket }) => {
  const [params] = useSearchParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [userId] = useState(getUser());

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
    console.log("update", game);
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
            <GS.Reload>
              <RestartIcon />
            </GS.Reload>
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
            <CopyLink />
          )}
          <GS.History>
            <GS.HistoryItem color="blue">
              <p>X {gameInfo.playingAs === "X" ? "(YOU)" : "(CPU)"}</p>
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
              <p>O {gameInfo.playingAs === "O" ? "(YOU)" : "(CPU)"}</p>
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
    </GS.GameCover>
  );
};

export default Game;
