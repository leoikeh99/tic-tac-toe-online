import styled from "styled-components";

export const BoardCover = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin: 20px 0;
`;

export const Tile = styled.button`
  height: 140px;
  background: #1f3641;
  border-radius: 15px;
  box-shadow: inset 0px -8px 0px #10212a;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ gameInfo: { winner, variation }, index }) =>
    winner === "X" && variation.some((val) => val === index)
      ? "#31C3BD"
      : winner === "O" && variation.some((val) => val === index)
      ? "#F2B137"
      : null};
  box-shadow: ${({ gameInfo: { winner, variation }, index }) =>
    winner === "X" && variation.some((val) => val === index)
      ? "inset 0px -8px 0px #118C87"
      : winner === "O" &&
        variation.some((val) => val === index) &&
        "inset 0px -8px 0px #CC8B13"};

  .x-full,
  .o-full {
    svg {
      fill: ${({ gameInfo: { winner, variation }, index }) =>
        winner && variation.some((val) => val === index) && "#1F3641"};
    }
  }

  .o-outline,
  .x-outline {
    display: none;
  }

  &:hover {
    .x-outline {
      display: ${({ move, numberOfMoves }) =>
        numberOfMoves % 2 !== 1 && move === "" && "block"};

      svg {
        stroke: #31c3bd;
      }
    }
    .o-outline {
      display: ${({ move, numberOfMoves }) =>
        numberOfMoves % 2 === 1 && move === "" && "block"};

      svg {
        stroke: #f2b137;
      }
    }
  }
`;
