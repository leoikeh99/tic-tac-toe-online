import styled from "styled-components";

export const GameCover = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlayerTurn = styled.span`
  width: 140px;
  height: 52px;
  background: #1f3641;
  border-radius: 10px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  box-shadow: inset 0px -4px 0px #10212a;
  color: #a8bfc9;
  font-weight: 700;
  font-size: 16px;
  margin-left: -20px;

  svg {
    transform: scale(0.31);
    margin-right: -20px;
    margin-left: -23px;
    fill: #a8bfc9;
  }
`;

export const Reload = styled.button`
  height: 52px;
  width: 52px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #a8bfc9;
  box-shadow: inset 0px -4px 0px #6b8997;
  cursor: pointer;
`;

export const History = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const HistoryItem = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #1a2a33;
  text-align: center;
  padding: 13px 0 11px 0;
  line-height: 24px;
  background: ${({ theme, color }) => theme[color].main};
  width: 100%;
  border-radius: 15px;

  .value {
    font-weight: 700;
    font-size: 24px;
  }
`;
