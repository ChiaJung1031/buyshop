const dateFormat = require("dateformat");
const mysql = require("mysql2");

const config = require('../config/conn.js');//　載入conn.js模組
const conn = mysql.createPool(config);

//載入各商品資料
exports.get_memberinfo = function(req)
{
    return new Promise(function(resolve,reject)
    {   
   

            let select_sql= "select name,addr,phonenum from member where email = '" + req["userid"] +"'";

            let resultobj= {};
            let respdata=[];
            let respdesc ="";

            conn.query(select_sql, function(err, results, fields)
            {  
                if (err) 
                { 
                    respdesc = err;

                    resultobj.respdesc = respdesc;
                    resultobj.respdata = respdata;
                   
                    reject(JSON.stringify(resultobj))//執行後 會直接跑到上一層的 catch
                
                }
                else 
                { 
                    respdata = results;

                    resultobj.respdesc = respdesc;
                    resultobj.respdata = respdata;

                    resolve(JSON.stringify(resultobj))
                  
                }
            });

         
    });
}