const { store, list } = require("../model/chat");

module.exports = (io, socket) => {
  socket.on("ping", (data) => {
    socket.emit("ping-response", data);
  });
  // buat join room private chat
  socket.on("join-room", (data) => {
    console.log("sudah sampai sini, join room")
    const { id, fullname, phonenumber, password } = data;
    socket.join(id);
  });

  // ngirim pm
  socket.on("send-message", (data) => {
    console.log("data kirim pesan",data)
    const resultSimpanPesan = store(data)
    .then(async () => {
      const listChats = await list(data.sender, data.receiver);
      io.to(data.receiver).emit("send-message-response", listChats.rows);
      console.log("ini diproses")
      console.log("result simpan pesan", resultSimpanPesan)
    })
    .catch((err) => {
      console.log("error send message");
      console.log(err);
    });
      
  });

  //get histori chat
  socket.on("chat-history", async (data) => {
    try {
      console.log(data, "data")
      const listChats = await list(data)
      console.log(listChats.rows,"ini listchat")
      io.to(data.sender).emit("send-message-response", listChats.rows);
    } catch (err) {
      console.log("Error chat-history");
      console.log(err);
    }
  });
};