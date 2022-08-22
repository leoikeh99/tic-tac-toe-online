import styled from "styled-components";

export const ModalCover = styled.div`
  position: fixed;
  height: 266px;
  width: 100%;
  background: #1f3641;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding: 45px 0;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  lertter-spacing: 1px;
  color: #a8bfc9;

  @media (max-width: 518px) {
    height: 228px;
    padding: 35px 0;
  }
`;

export const Heading = styled.h2`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2.5px;
  letter-spacing: 2.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 16px 0 24px 0;
  color: ${({ winner }) =>
    winner === "X" ? "#31C3BD" : winner === "O" ? "#F2B137" : "#A8BFC9"};

  @media (max-width: 518px) {
    font-size: 24px;
    gap: 0px;
    margin: 3px 0 10px 0;

    svg {
      transform: scale(0.47);
      margin-right: -5px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const AliasCover = styled.div`
  position: fixed;
  height: 280px;
  width: 500px;
  background: #1f3641;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding: 20px 0;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  lertter-spacing: 1px;
  color: #a8bfc9;
  border-radius: 10px;
`;

export const Input = styled.input`
  padding: 20px 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  color: #fff;
  background: #1a2a33;
  border: none;
  width: 70%;
`;
