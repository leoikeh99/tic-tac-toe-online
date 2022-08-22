import React from "react";
import * as MS from "../../styles/ModalStyles";
import { Button } from "../../styles/Widgets";
import { useNavigate } from "react-router-dom";

export const QuitGame = ({ setRestart, socket, gameInfo, userId }) => {
  const navigate = useNavigate();
  const quitGame = () => {
    socket.emit("quitGame", {
      userId,
      gameId: gameInfo.gameId,
      userQuit: userId,
      gameOver: true,
      winner: gameInfo.x === userId ? "O" : "X",
      variation: [],
    });
    navigate("/");
  };

  return (
    <MS.ModalCover>
      <MS.Heading>QUIT GAME</MS.Heading>
      <MS.Buttons>
        <Button color="silver" onClick={() => setRestart(false)}>
          NO, CANCEL
        </Button>
        <Button color="yellow" onClick={quitGame}>
          YES, QUIT
        </Button>
      </MS.Buttons>
    </MS.ModalCover>
  );
};
