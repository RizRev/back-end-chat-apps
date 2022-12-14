const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin:"https//localhost:3200"
  }
});
const PORT = 3100

io.on("connection", (socket) => {
  console.log(`user connect ${socket.id}`)
});

httpServer.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`)
});