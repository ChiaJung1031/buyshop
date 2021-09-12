const dateFormat = require("dateformat");


const config = require('../config/conn.js');//　載入conn.js模組
const mysql = require('mysql2/promise')

exports.insert_order = async function (req) {

    const conn = await mysql.createConnection(config)
    let resultobj= {};
    let respdata=[];
    let respdesc ="";
    
    try
    {
        await conn.beginTransaction()
        let queryPromises = []
        let queries = []
        let queryValues = []
       
        //orderlist
        let insert_sql_1= "INSERT INTO orderlist "+
        "(orderno,email,recptname,recpttel,recptaddr,saletime,deliveryfee,payyn,reftyn,updatetime) "+
        "VALUES(?,?,?,?,?,?,?,?,?,?)"
        
        let insert_val_1 = [req["orderno"],req["email"],req["recptname"],req["recpttel"],req["recptaddr"],req["saletime"],
                      req["deliveryfee"],req["payyn"],req["reftyn"],req["updatetime"]];
       
        queries.push(insert_sql_1)   
        queryValues.push(insert_val_1) 
         
        //orderdetail product
        req["orderproducts"].forEach((obj, index) => {
            let insert_sql_2= "INSERT INTO orderdetail "+
            "(orderno,productno,productname,tnscount,tnstotalprice,costtotalprice,updatetime) "+
            "VALUES(?,?,?,?,?,?,?)"
    
    
            let insert_val_2 = [req["orderno"],obj.productno,obj.productname,obj.qty,obj.subtotal,obj.costtotalprice,
                          req["updatetime"]];

                          
            queries.push(insert_sql_2)   
            queryValues.push(insert_val_2) 

            //商品的可售數量 - 訂單商品數量
            let now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            let insert_sql_3= "update product set cansalecount = ?,updatedatetime= ? where productno= ? "

            let new_cansalecount = obj.cansalecount - obj.qty ;
            let insert_val_3 = [new_cansalecount,now,obj.productno];

                          
            queries.push(insert_sql_3)   
            queryValues.push(insert_val_3) 
        })
       
     
       

       

        queries.forEach((query, index) => {
            queryPromises.push(conn.query(query, queryValues[index]))
        })

        let results = await Promise.all(queryPromises)
   
        await conn.commit()
        await conn.end()

        respdata = results;

        resultobj.respdesc = respdesc;
        resultobj.respdata = respdata;

        return Promise.resolve(JSON.stringify(resultobj))
        
    } catch (err) {
        await conn.rollback()
        await conn.end()

        respdesc = err;
        resultobj.respdesc = respdesc;
        resultobj.respdata = respdata;

        return Promise.reject(JSON.stringify(resultobj))
    }
}
//載入各商品資料
// exports.insert_order = function(req)
// {
//     return new Promise(function(resolve,reject)
//     {   

//        let resultobj= {};
//         let respdata=[];
//         let respdesc ="";

//         let insert_sql_1= "INSERT INTO orderlist"+
//         "(orderno,email,recptname,recpttel,recptaddr,saletime,deliveryfee,payyn,reftyn,updatetime)"+
//         "VALUES(?,?,?,?,?,?,?,?,?,?)"

//         let insert_sql_2= "INSERT INTO orderdetail"+
//         "(orderno,productno,productname,tnscount,tnstotalprice,costtotalprice,updatetime)"+
//         "VALUES(?,?,?,?,?,?,?)"

//         let insert_val_1 = [req["orderno"],req["email"],req["recptname"],req["recpttel"],req["recptaddr"],req["saletime"],
//                       req["deliveryfee"],req["payyn"],req["reftyn"],req["updatetime"]];

//         let insert_val_2 = [req["orderno"],req["productno"],req["productname"],req["tnscount"],req["tnstotalprice"],req["costtotalprice"],
//                       req["updatetime"]];

//         conn.beginTransaction(function(err) {
//             if (err) { throw err; }
//             conn.query(insert_sql_1, insert_val_1, function (error, results, fields) {
//                     if (error) {
//                         return conn.rollback(function() {
//                             respdesc = error;
//                             respdata = results;
//                         //throw error;
//                         });
//                     }
                
//                 conn.query(insert_sql_2, insert_val_2, function (error, results, fields) {
//                         if (error) {
//                         return conn.rollback(function() {
//                             respdesc = error;
//                             respdata = results;
//                             //throw error;
//                         });
//                         }

//                 if(respdesc){
//                         resultobj.respdesc = respdesc;
//                         resultobj.respdata = respdata;
//                         reject(JSON.stringify(resultobj))
//                     }
//                     else
//                     {
//                         conn.commit(function(err) {
//                             if (err) {
//                                 return conn.rollback(function() {
//                                     respdesc = error;
//                                 // respdata = results;
//                                     reject(JSON.stringify(resultobj))
//                                 // throw err;
//                                 });
//                             }

//                                 resultobj.respdesc = respdesc;
//                                 resultobj.respdata = respdata;
//                                 resolve(JSON.stringify(resultobj))
//                                 console.log('success!');
//                         });
//                     }
    
//               });
//             });
//         });
          /////
   
            // let offsetnum =  (req["pagesize"] * req["nowpage"]) - req["pagesize"];
            // let select_sql= "select a1.productno,a1.productname,a1.intro,a1.picpath,a1.unitprice,a1.specialprice,a1.cansalecount,b2.categoryno,b2.name as categoryname";
            // select_sql += " from product a1 ";
            // select_sql += " left join category b2 on (a1.categoryno = b2.categoryno)";
            // select_sql += " where a1.categoryno ='"+ req["typeno"]+"' limit " + req["pagesize"] + " offset " + offsetnum;

            // let resultobj= {};
            // let respdata=[];
            // let respdesc ="";

            // conn.query(select_sql, function(err, results, fields)
            // {  
            //     if (err) 
            //     { 
            //         respdesc = err;

            //         resultobj.respdesc = respdesc;
            //         resultobj.respdata = respdata;
                   
            //         reject(JSON.stringify(resultobj))//執行後 會直接跑到上一層的 catch
                
            //     }
            //     else 
            //     { 
            //         respdata = results;

            //         resultobj.respdesc = respdesc;
            //         resultobj.respdata = respdata;

            //         resolve(JSON.stringify(resultobj))
                  
            //     }
            // });

         
   // });
//}

