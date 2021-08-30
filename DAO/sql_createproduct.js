const express = require('express');
const app = express();
const router = express.Router();
const dateFormat = require("dateformat");
require('dotenv').config()

const mysql = require("mysql2");


const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database:"buyshop",
    waitForConnections: true,
    connectionLimit: 10,
});


//註冊會員
exports.upload_pro = function(req)
{
    return new Promise(function(resolve,reject)
    {
        let datetime=dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        let msg="";
        let insert_sql= "insert into product(productno,protypeno,productname,unitprice,"+
            "specialprice,cost,intro,totalcount,cansalecount,picpath,createdatetime,updatedatetime)"+
            "value(?,?,?,?,?,?,?,?,?,?,?,?)";
        let insert_val = [req["productno"],req["protypeno"],req["productname"],req["unitprice"],req["specialprice"],req["cost"],
                          req["intro"],req["totalcount"],req["cansalecount"],req["picpath"],req["createdatetime"],req["updatedatetime"]];
        conn.query(insert_sql,insert_val,function(err, results, fields)
        {      
            if (err) 
            { 
                msg={ 
                    "RespCode": "404", //成功統一回傳 0000 失敗 XXXX
                    "RespTime": datetime, //回傳的時間
                    "RespDesc": err, //填錯錯誤訊息 
                    "RespData": "" //回傳的資料obj
                   };
                reject(JSON.stringify(msg))
            }
            else if(results.affectedRows == 1)
            { 
                msg={ 
                    "RespCode": "200", //成功統一回傳 0000 失敗 XXXX
                    "RespTime": datetime, //回傳的時間
                    "RespDesc": "", //填錯錯誤訊息 
                    "RespData": ""//回傳的資料obj
                   };
                resolve(JSON.stringify(msg))
            }
        });

    });
};