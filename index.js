const express = require("express");
const app = express();
const moment = require("moment/moment");
const socket = require("socket.io");
const mainRouter = require("./src/routes/index")
const socketController = require("./src/connection/index")
const http = require("http")
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000

require("dotenv").config();

app.use(express.static("public"))
app.use(cors());
app.use(bodyParser.json());
app.use("/", mainRouter);


const server = http.createServer(app);
const soocket = socket(server, {
  cors: {
    origin: "*",
  },
});

soocket.on("connection", (socket) => {
  console.log("user baru");
  socketController(soocket, socket);
})


// const morgan = require("morgan");
// require("dotenv").config();

// const { response } = require("./src/helper/common")





// app.use(morgan("dev"));
// const corsOptions = {
//     origin: "*",
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// app.all("*", (req, res, next) => {
// response(res, 404, false, null, "404 Not Found");
// });

// const io = new Server(httpServer, {
//   cors: {
//     origin:"http://localhost:3000"
//   }
// });

// io.on("connection", (socket) => {
//   console.log(`user connect ${socket.id}`)

//   socket.on("initialRoom",({room})=>{
//     console.log(room)
//     socket.join(`room:${room}`)
// })

// socket.on("message",(data)=>{
//   io.to(`room:${data.group}`).emit("messageBe",{
//       sender: data.name,
//       message: data.message,
//       date:  moment().format("HH:mm")
//   })
//   console.log(data)
// })

//   socket.on("disconnect",()=>{
//     console.log(`user disconnect ${socket.id}`)
//   })
// })

server.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`)
});