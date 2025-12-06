let io;

function initSocket(socketIoInstance) {
  io = socketIoInstance;

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function emitNewNote(user, title) {
  if (!io) {
    console.log("Socket.IO not initialized yet");
    return;
  }
  io.emit("newNote", { user, title });
}

module.exports = { initSocket, emitNewNote };
