const express = require('express')
const app = express()
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require('./db');
connectDB()
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


app.get("/emit-test", (req, res) => {
    io.emit("newNote", { user: "TestUser", title: "Hello World Note" });
    res.send("Event emitted");
});


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

// app.listen(3000, () => {
//     console.log('server is running at 3000.')
// })
server.listen(6000, () => {
  console.log("Socket.io server running on port 6000");
});