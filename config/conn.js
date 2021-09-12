const dotenv = require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD , 
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
}
//const conn = mysql.createPool(config);


//module.exports = conn;
module.exports = config;