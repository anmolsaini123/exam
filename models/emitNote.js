const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");

function emitNewNote(userName, title) {
  socket.emit("newNote", { user: userName, title });
}

module.exports = emitNewNote;
