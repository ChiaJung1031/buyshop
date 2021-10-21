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


//修改會員資料
exports.update_member = async function(req)
{
  
    let  _sql= "update member set name =? ,phonenum=? ,addr=? ,updatetime=? where email=? "
            
    let _val = [req["name"],req["phonenum"],
                              req["addr"],req["updatetime"],req["email"]];

    let resultobj =  await dbhelp.executequery(_sql,_val);
    

    return resultobj;
}

//修改密碼
exports.update_password = async function(req)
{
  
    let  _sql= "update member set password =? ,updatetime=? ,resetpwtoken =''  where email=? "
            
    let _val = [req["password"],req["updatetime"],req["email"]];

    let resultobj =  await dbhelp.executequery(_sql,_val);
    

    return resultobj;
}

exports.update_resetpwtoken = async function(req)
{
  
    let  _sql= "update member set resetpwtoken =?  where email=? "
            
    let _val = [req["resetpwtoken"],req["email"]];

    let resultobj =  await dbhelp.executequery(_sql,_val);
    

    return resultobj;
}

//取得會員資料
exports.getresetpwtoken = async function(req)
{

    let select_sql= "select resetpwtoken from member where email = ? ";
    let array_param = [req["email"]]
            
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;

}
