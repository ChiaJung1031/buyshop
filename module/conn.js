const mysql = require("mysql2");

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database:"buyshop",
    waitForConnections: true,
    connectionLimit: 10,
});


module.exports = conn;