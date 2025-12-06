const express = require('express');
const app = express();
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const note = require('./routes/noteRoutes');
const http = require("http");
const { Server } = require("socket.io");
const { initSocket, emitNewNote } = require("./socket/emitNote");
const connectDB = require('./config/db');

connectDB();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
initSocket(io);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);
app.use('/note', note);

server.listen(5000, () => {
  console.log("Socket.io server running on port 5000");
});
