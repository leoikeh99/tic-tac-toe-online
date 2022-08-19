import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Menu from "./pages/Menu";
import GlobalStyles from "./styles/GlobalStyles";
import { io } from "socket.io-client";
import { onConnect } from "./utils/socketEvents";
import { createUser } from "./utils/helperFunctions";
const socket = io("http://localhost:5000/", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

createUser();
onConnect(socket);

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Menu socket={socket} />} />
        <Route path="/game" element={<Game socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
