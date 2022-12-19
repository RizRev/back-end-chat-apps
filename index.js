const express = require("express");
const { createServer } = require("http");
const moment = require("moment/moment");
const { Server } = require("socket.io");


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:"http://localhost:3000"
  }
});
const PORT = 4000

io.on("connection", (socket) => {
  console.log(`user connect ${socket.id}`)

  socket.on("initialRoom",({room})=>{
    console.log(room)
    socket.join(`room:${room}`)
})

socket.on("message",(data)=>{
  io.to(`room:${data.group}`).emit("messageBe",{
      sender: data.name,
      message: data.message,
      date:  moment().format("HH:mm")
  })
  console.log(data)
})

  socket.on("disconnect",()=>{
    console.log(`user disconnect ${socket.id}`)
  })
})

httpServer.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`)
});