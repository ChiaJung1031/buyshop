const mysql = require("mysql2");
const dotenv = require('dotenv').config();

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD , 
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});


module.exports = conn;