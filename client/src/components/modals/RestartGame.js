import React from "react";
import * as MS from "../../styles/ModalStyles";
import { Button } from "../../styles/Widgets";

export const RestartGame = ({ gameInfo, setGameInfo, setRestart }) => {
  const restartGame = () => {
    setGameInfo({
      ...gameInfo,
      rounds: [],
      moves: ["", "", "", "", "", "", "", "", ""],
    });
    setRestart(false);
  };
  return (
    <MS.ModalCover>
      <MS.Heading>RESTART GAME</MS.Heading>
      <MS.Buttons>
        <Button color="silver" onClick={() => setRestart(false)}>
          NO, CANCEL
        </Button>
        <Button color="yellow" onClick={restartGame}>
          YES, RESTART
        </Button>
      </MS.Buttons>
    </MS.ModalCover>
  );
};
