import React, { useState } from "react";
import styled from "styled-components";
import { getUser } from "../utils/helperFunctions";

const CopyLink = ({ gameInfo }) => {
  const [link] = useState(
    `http://localhost:3000/game?gameId=${gameInfo.gameId}&playingAs=${
      gameInfo.x === getUser() ? "O" : "X"
    }&versus=friend`
  );
  const [hasCopied, setHasCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <Cover>
      <Text>To invite a friend to play, give this URL:</Text>
      <InputCover>
        <Input type="text" value={link} readOnly />
        <Button onClick={copyLink}>
          {!hasCopied ? "Copy Link" : "Copied!"}
        </Button>
      </InputCover>
      <Text>The first person to come to this URL will play with you.</Text>
    </Cover>
  );
};

const Cover = styled.div`
  width: 100%;
  padding: 35px 25px;
  background: #1f3641;
  border-radius: 15px;
  margin: 40px 0;
`;

const Text = styled.p`
  color: #fff;
  font-size: 18px;
`;

const Input = styled.input`
  border: 0;
  padding: 10px;
  width: 250px;
  height: 40px;
  background: #1a2a33;
  border-radius: 3px 0 0 3px;
  color: #fff;
  font-family: inherit;
`;

const InputCover = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Button = styled.button`
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
  border: 0;
  border-radius: 0 3px 3px 0;
  background: #31c3bd;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

export default CopyLink;
