// const dateFormat = require("dateformat");
// const mysql = require("mysql2");

// const config = require('../config/conn.js');//　載入conn.js模組
// const conn = mysql.createPool(config);
const dbhelp = require("../utility/dbhelp");

//取得會員資料
exports.get_member_by_email = async function(req)
{

    let select_sql= "select name,addr,phonenum from member where email = ? ";
    let array_param = [req["email"]]
            
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;

}

//取得會員資料
exports.get_member_by_email_pw = async function(req)
{
    console.log(req)
    let select_sql= "select email,name from member where email = ? and password = ? ";
    let array_param = [req["email"],req["password"]]
            
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;

}

//會員註冊
exports.insert_member = async function(req)
{
  
    let  insert_sql= "INSERT INTO member(email,password,name,phonenum,addr,createdatetime,updatetime) VALUES(?,?,?,?,?,?,?) "
            
    let insert_val = [req["email"],req["password"],req["name"],req["phonenum"],
                              req["addr"],req["createdatetime"],req["updatetime"]];

    let resultobj =  await dbhelp.executequery(insert_sql,insert_val);
    

    return resultobj;
}

