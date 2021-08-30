const express = require('express');
const app = express();
const router = express.Router();
const dateFormat = require("dateformat");
require('dotenv').config();

const conn = require('../module/conn.js');//　載入conn.js模組


//載入各商品資料
exports.get_product = function(req)
{
    return new Promise(function(resolve,reject)
    {   
       
            let select_sql="select * from product  where protypeno='"+ req["typeno"]+"'";
            let resultobj= {};
            let respcode="XXXX";
            let respdata=[];
            let respdesc ="";
            let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            conn.query(select_sql, function(err, results, fields)
            {  

                if (err) 
                { 
                    respdesc = err;

                    resultobj.RespCode = respcode;
                    resultobj.RespDesc = respdesc;
                    resultobj.RespTime = resptime;
                    resultobj.RespData = respdata;
                    reject(JSON.stringify(resultobj))
                }
                else 
                { 
                    respcode ="0000";
                    respdata = results;

                    resultobj.RespCode = respcode;
                    resultobj.RespDesc = respdesc;
                    resultobj.RespTime = resptime;
                    resultobj.RespData = respdata;

                    resolve(JSON.stringify(resultobj))
                }
            });
    });
}