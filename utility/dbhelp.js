const mysql = require("mysql2");
const mysql2_promise = require('mysql2/promise')
const config = require('../config/conn');//　載入conn.js模組
const pool = mysql.createPool(config);

var connect = null ;

pool.getConnection((err, connection) => {
    if (err) {
          console.log(err)
    } else {
   
        console.log('getConnection  sucess')
        connect = connection;  
        //connection.end()
    }
});



exports.executequery =  function (str_query,array_param) {

    return new Promise(function(resolve,reject)
    {
        console.log(str_query)
        console.log(array_param)
        let resultobj= {};
        let respdata=[];
        let respdesc ="";
        // 取得連線;
        pool.query( str_query, array_param , function(err, results, fields) {
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
            // 釋放連線
            if(connect)connect.release();
          
       });
    });
   
}

exports.executequery_no_param =  function (str_query) {

    return new Promise(function(resolve,reject)
    {
        let resultobj= {};
        let respdata=[];
        let respdesc ="";
        // 取得連線;
        pool.query( str_query , function(err, results, fields) {
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
            // 釋放連線
            if(connect) connect.release();
       });
    });
   
}


exports.executequery_use_tran = async function (array_query,array_param) {

   let connect = await mysql2_promise.createConnection(config)
    let resultobj= {};
    let respdata=[];
    let respdesc ="";
    
    try
    {
        await connect.beginTransaction()
        let queryPromises = []
       

        array_query.forEach((query, index) => {
            queryPromises.push(connect.query(query, array_param[index]))
        })

        let results = await Promise.all(queryPromises)
   
        await connect.commit()
        await connect.end()

        respdata = results;

        resultobj.respdesc = respdesc;
        resultobj.respdata = respdata;

        return Promise.resolve(JSON.stringify(resultobj))
        
    } catch (err) {
        await connect.rollback()
        await connect.end()

        respdesc = err;
        resultobj.respdesc = respdesc;
        resultobj.respdata = respdata;

        return Promise.reject(JSON.stringify(resultobj))
    }
}