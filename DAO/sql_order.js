const dateFormat = require("dateformat");


// const config = require('../config/conn.js');//　載入conn.js模組
// const mysql = require('mysql2/promise')

const dbhelp = require("../utility/dbhelp")

exports.insert_order = async function (req) {

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
   
 

    let resultobj =  await dbhelp.executequery_use_tran(queries,queryValues);

    console.log('executequery_use_tran resultobj....')
    console.log(resultobj)


    return resultobj;
   
    

    // const conn = await mysql.createConnection(config)
    // let resultobj= {};
    // let respdata=[];
    // let respdesc ="";
    
    // try
    // {
    //     await conn.beginTransaction()
    //     let queryPromises = []
    //     let queries = []
    //     let queryValues = []
       
    //     //orderlist
    //     let insert_sql_1= "INSERT INTO orderlist "+
    //     "(orderno,email,recptname,recpttel,recptaddr,saletime,deliveryfee,payyn,reftyn,updatetime) "+
    //     "VALUES(?,?,?,?,?,?,?,?,?,?)"
        
    //     let insert_val_1 = [req["orderno"],req["email"],req["recptname"],req["recpttel"],req["recptaddr"],req["saletime"],
    //                   req["deliveryfee"],req["payyn"],req["reftyn"],req["updatetime"]];
       
    //     queries.push(insert_sql_1)   
    //     queryValues.push(insert_val_1) 
         
    //     //orderdetail product
    //     req["orderproducts"].forEach((obj, index) => {
    //         let insert_sql_2= "INSERT INTO orderdetail "+
    //         "(orderno,productno,productname,tnscount,tnstotalprice,costtotalprice,updatetime) "+
    //         "VALUES(?,?,?,?,?,?,?)"
    
    
    //         let insert_val_2 = [req["orderno"],obj.productno,obj.productname,obj.qty,obj.subtotal,obj.costtotalprice,
    //                       req["updatetime"]];

                          
    //         queries.push(insert_sql_2)   
    //         queryValues.push(insert_val_2) 

    //         //商品的可售數量 - 訂單商品數量
    //         let now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    //         let insert_sql_3= "update product set cansalecount = ?,updatedatetime= ? where productno= ? "

    //         let new_cansalecount = obj.cansalecount - obj.qty ;
    //         let insert_val_3 = [new_cansalecount,now,obj.productno];

                          
    //         queries.push(insert_sql_3)   
    //         queryValues.push(insert_val_3) 
    //     })
       
     
       

       

    //     queries.forEach((query, index) => {
    //         queryPromises.push(conn.query(query, queryValues[index]))
    //     })

    //     let results = await Promise.all(queryPromises)
   
    //     await conn.commit()
    //     await conn.end()

    //     respdata = results;

    //     resultobj.respdesc = respdesc;
    //     resultobj.respdata = respdata;

    //     return Promise.resolve(JSON.stringify(resultobj))
        
    // } catch (err) {
    //     await conn.rollback()
    //     await conn.end()

    //     respdesc = err;
    //     resultobj.respdesc = respdesc;
    //     resultobj.respdata = respdata;

    //     return Promise.reject(JSON.stringify(resultobj))
    // }
}

//取得會員資料
exports.get_order = async function(req)
{
    console.log(req)
    let select_sql= "select a1.orderno,a1.saletime,a1.deliveryfee,a1.recptname,a1.recpttel,a1.recptaddr,a1.reftyn,";
    select_sql += "b2.productno,b2.productname,b2.tnstotalprice,b2.tnscount,c3.picpath ";
    select_sql += "from orderlist as a1 ";
    select_sql += "left join  orderdetail as b2 on (a1.orderno = b2.orderno) ";
    select_sql += "left join  product as c3 on (b2.productno = c3.productno) ";
    select_sql += "where email = ? and CONVERT(a1.saletime, DATE) <= ? and CONVERT(a1.saletime, DATE) >= ? ";
    select_sql += "order by saletime desc,a1.orderno desc";
    
    let array_param = [req["email"],req["saletimeE"],req["saletimeS"]]
            
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;

}

