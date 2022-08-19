import React from "react";
import * as MS from "../../styles/ModalStyles";
import { Button } from "../../styles/Widgets";

export const CreateAlias = () => {
  return (
    <MS.AliasCover>
      <MS.Heading>CREATE ALIAS</MS.Heading>
      <MS.Input />
      <MS.Buttons>
        <Button color="silver">CANCEL</Button>
        <Button color="yellow">CREATE CHALLENGE</Button>
      </MS.Buttons>
    </MS.AliasCover>
  );
};
