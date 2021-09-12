const dateFormat = require("dateformat");
const mysql = require("mysql2");

const config = require('../config/conn.js');//　載入conn.js模組
const conn = mysql.createPool(config);


//載入各商品資料
exports.get_productlist = function(req)
{
    return new Promise(function(resolve,reject)
    {   
   
            let offsetnum =  (req["pagesize"] * req["nowpage"]) - req["pagesize"];
            let select_sql= "select a1.productno,a1.productname,a1.intro,a1.picpath,a1.unitprice,a1.specialprice,a1.cansalecount,b2.categoryno,b2.name as categoryname";
            select_sql += " from product a1 ";
            select_sql += " left join category b2 on (a1.categoryno = b2.categoryno)";
            select_sql += " where a1.categoryno ='"+ req["typeno"]+"' limit " + req["pagesize"] + " offset " + offsetnum;

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

exports.get_productCnt = function(req)
{
    return new Promise(function(resolve,reject)
    {   
   
            let select_sql= "select count(*) as total from product where categoryno ='"+ req["typeno"]+"' ";
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

//載入商品分類
exports.get_category = function(req)
{
    return new Promise(function(resolve,reject)
    {   
   
            let select_sql= "select categoryno,name from category order by sort";

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

//載入各商品資料
exports.get_productdtl = function(req)
{
    return new Promise(function(resolve,reject)
    {   
        
        
            let select_sql= "select a1.productno,a1.productname,a1.intro,a1.picpath,a1.unitprice,a1.specialprice,a1.cansalecount,b2.name as categoryname,a1.cost ";
            select_sql += " from product a1 ";
            select_sql += " left join category b2 on (a1.categoryno = b2.categoryno)";
            select_sql += " where a1.productno ='"+ req["productno"] +"'"
          
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