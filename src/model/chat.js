const pool = require("../config/db");

const store = (data) => {
    const {sender,receiver,message} = data; 
    // console.log(data)
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO chat (sender_id,receiver_id,message) VALUES ('${sender}','${receiver}','${message}')`
        ), (err,res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        }
    })
}

const list = (data) =>{
    return new Promise((resolve, reject) => {
        const {sender,receiver} = data
        // console.log("histori pesan",kirim,terima);
        console.log("ini bisa")
        console.log(sender,receiver,"test")
        pool.query(
            `SELECT chats.id_chat, chats.message, userSender.fullname AS sender, userReceiver.fullname AS receiver
            FROM chat as chats
            LEFT JOIN users AS userSender ON chats.sender_id=userSender.id
            LEFT JOIN users AS userReceiver ON chats.receiver_id=userReceiver.id 
            WHERE
            (sender_id='${sender}' AND receiver_id='${receiver}')
            OR (sender_id='${receiver}' AND receiver_id='${sender}') ORDER BY waktu_pesan`
        , (err,res) => {
            if (err) {
                reject(err);
                console.log("ini err",err)
            }
            resolve(res);
            console.log(res,"ini res")
        })
    })
}

module.exports = {
    store,
    list
}