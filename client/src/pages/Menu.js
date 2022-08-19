import React, { useState } from "react";
import { ReactComponent as LOGO } from "../assets/logo.svg";
import { ReactComponent as X_ICON } from "../assets/icon-x.svg";
import { ReactComponent as O_ICON } from "../assets/icon-o.svg";
import * as MS from "../styles/MenuStyles";
import * as W from "../styles/Widgets";
import { getUser } from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";

const Menu = ({ socket }) => {
  const [playingAs, setPlayingAs] = useState("X");
  const navigate = useNavigate();

  const challengeFriend = () => {
    socket.emit("createChallenge", {
      x: playingAs === "X" && getUser(),
      o: playingAs === "O" && getUser(),
      creator: getUser(),
    });
  };

  socket.on("game created", (gameInfo) =>
    navigate(
      `/game?gameId=${gameInfo.gameId}&playingAs=${
        gameInfo.x === getUser() ? "X" : "O"
      }&versus=friend`
    )
  );

  return (
    <MS.MenuCover>
      <W.Container>
        <MS.Header>
          <LOGO />
        </MS.Header>
        <MS.Banner>
          <p>PICK PLAYER 1’S MARK</p>
          <MS.SelectType>
            <MS.Button
              active={playingAs === "X"}
              onClick={() => setPlayingAs("X")}>
              <X_ICON />
            </MS.Button>
            <MS.Button
              active={playingAs === "O"}
              onClick={() => setPlayingAs("O")}>
              <O_ICON />
            </MS.Button>
          </MS.SelectType>
          <p className="secondary-text">REMEMBER : X GOES FIRST</p>
        </MS.Banner>
        <W.ButtonLink
          to={`/game?versus=${"cpu"}&playingAs=${playingAs}`}
          color="yellow">
          NEW GAME (VS CPU)
        </W.ButtonLink>
        <div style={{ margin: "20px" }}></div>
        <W.ButtonLink
          to={`/game?versus=${"player"}&playingAs=${playingAs}`}
          color="blue">
          NEW GAME (VS PLAYER)
        </W.ButtonLink>
        <div style={{ margin: "20px" }}></div>
        <W.Button2 color="silver" onClick={challengeFriend}>
          CHALLENGE FRIEND
        </W.Button2>
      </W.Container>
    </MS.MenuCover>
  );
};

export default Menu;
