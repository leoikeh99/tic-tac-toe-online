export const onConnect = (socket) => {
  socket.on("connect", () => {
    console.log(socket.id);
  });
};
