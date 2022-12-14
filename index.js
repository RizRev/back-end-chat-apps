const express = require("express");
const { createServer } = require("http");
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

  let time = new Date()
  socket.on("message",(data)=>{
    socket.emit("messageBe",{message:data,date:time})
    console.log(data)
  })

  socket.on("disconnect",()=>{
    console.log(`user disconnect ${socket.id}`)
  })
})

httpServer.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`)
});