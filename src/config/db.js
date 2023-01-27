const { Pool } = require("pg");
const pool = new Pool({
  user: 
  // process.env.DB_USER
  "postgres"
  ,
  host: 
  // process.env.DB_HOST
  "localhost"
  ,
  database: 
  // process.env.DB_NAME
  "Chat_apps"
  ,
  password: 
  // process.env.DB_PASS
  "Perfect78"
  ,
  port: 
  // process.env.DB_PORT
  "5432"
  ,
});

pool.connect((err) => {
  if (err) {
    console.log("ini error db",err);
  } else {
    console.log("success connect to db");
  }
});

module.exports = pool;
