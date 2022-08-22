import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 460px;
  margin: auto;

  @media (max-width: 491px) {
    width: 95%;
  }
`;

export const ButtonLink = styled(Link)`
  width: 100%;
  border: 0;
  border-radius: 15px;
  color: #1a2a33;
  background: ${({ theme, color }) => theme[color].main};
  box-shadow: inset 0px -8px 0px ${({ theme, color }) => theme[color].inset};
  font-size: 20px;
  font-weight: 700;
  font-family: inherit;
  padding: 17px 15px 25px 15px;
  letter-spacing: 1.25px;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  display: block;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: ${({ theme, color }) => theme[color].hover};
  }
`;

export const Button = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 15px 17px 17px 17px;
  color: #1a2a33;
  background: ${({ theme, color }) => theme[color].main};
  box-shadow: inset 0px -8px 0px ${({ theme, color }) => theme[color].inset};
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  display: block;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: ${({ theme, color }) => theme[color].hover};
  }
`;

export const Button2 = styled.button`
  width: 100%;
  border: 0;
  border-radius: 15px;
  color: #1a2a33;
  background: ${({ theme, color }) => theme[color].main};
  box-shadow: inset 0px -8px 0px ${({ theme, color }) => theme[color].inset};
  font-size: 20px;
  font-weight: 700;
  font-family: inherit;
  padding: 17px 0 25px 0;
  letter-spacing: 1.25px;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  display: block;
  text-align: center;

  &:hover {
    background: ${({ theme, color }) => theme[color].hover};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  opacity: 0.5;
`;
