import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin:0;
    padding:0;
    background:#1A2A33;
    font-family: 'Outfit', sans-serif;
  }

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  a{
    text-decoration:none;
  }
`;

export default GlobalStyles;
