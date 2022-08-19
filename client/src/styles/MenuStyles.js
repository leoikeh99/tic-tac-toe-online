import styled from "styled-components";

export const MenuCover = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
`;

export const Banner = styled.div`
  width: 100%;
  padding: 24px 24px 30px 24px;
  background: #1f3641;
  border-radius: 15px;
  color: #a8bfc9;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  box-shadow: inset 0px -8px 0px #10212a;
  margin-bottom: 40px;

  .secondary-text {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.5;
  }
`;

export const SelectType = styled.div`
  height: 72px;
  background: #1a2a33;
  padding: 9px;
  border-radius: 10px;
  display: flex;
  margin: 24px 0 17px 0;
`;

export const Button = styled.button`
  border: 0;
  background: ${({ active }) => (active ? "#A8BFC9" : "transparent")};
  font-family: inherit;
  height: 100%;
  width: 50%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.1s ease-in;

  svg {
    fill: ${({ active }) => (active ? "#1A2A33" : "#A8BFC9")};
    transform: scale(0.5);
  }

  &:hover {
    background: ${({ active }) => !active && "rgba(168, 191, 201, 0.05)"};
  }
`;
