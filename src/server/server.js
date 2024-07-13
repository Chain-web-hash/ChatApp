const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const path = require("path");

//stuff
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server);

const users = {};

// middleware:
app.use(express.static(path.join(__dirname, "..", "client", "dist")))

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"))
})

io.on("connection", (socket) => {
  //events:
  socket.on("join", (name) => {
    users[socket.id] = name;
    io.emit("user-joined", name);
  });
  socket.on('disconnect', () => {
    if (users[socket.id])
        io.emit('user-left', users[socket.id])
        users[socket.id] = null;
  })
  socket.on("msg", (chat_msg) => socket.broadcast.emit("chat_msg", chat_msg)); // server emits the message to all the other clients
});

server.listen(port, () => console.log(`Server listening on ${port}`));
