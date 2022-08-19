import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const theme = {
  yellow: { main: "#F2B137", inset: "#CC8B13", hover: "#FFC860" },
  blue: { main: "#31C3BD", inset: "#118C87", hover: "#65E9E4" },
  silver: { main: "#A8BFC9", inset: "#6B8997", hover: "#DBE8ED" },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
