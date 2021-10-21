const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_member');
const utlLog = require('../utility/log4js');
const utlenc = require('../utility/encrypt');
const mailer = require('../utility/sendmail');
const jwtoken = require("../utility/jwtoken")

exports.search = async function(paramsobj){

            let resultobj= {};
            let respcode="XXXX";
            let respdata = {};
            let respdesc ="";
            let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            let result ;
   
            //log
            let log4js = utlLog.getlog4js();
            let logger = log4js.getLogger("member");
            try
            {


              //撈會員資料
              let info = {"email": paramsobj.email};
              result = await db.get_member_by_email(info);
              result = await JSON.parse(result);

              //準備輸出的資料
                respcode ='0000';
                respdata = result.respdata;
   

            }
            catch(message)
            {
                respdesc = message;
            }

            if(respcode == "XXXX") {
                //寫入log
                logger.error("【get_memberinfo】" + respdesc);
            }

            resultobj.RespCode = respcode;
            resultobj.RespTime = resptime;
            resultobj.RespDesc = respdesc;
            resultobj.RespData = respdata;
           
        

            return resultobj;


};

exports.register = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
   // let respdata = {};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    let result ;

    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("member");
    try
    {
    
      //insert member
      let info = {
        "email": paramsobj.email,
        "password": utlenc.encrypt(paramsobj.password),
        "phonenum": paramsobj.phonenum,
        "name": paramsobj.name,
        "addr": paramsobj.addr,
        "createdatetime": resptime,
        "updatetime": resptime,
      };
        

      result = await db.insert_member(info);
      result = await JSON.parse(result);

      //準備輸出的資料
     // respdata = result.respdata;
      respcode ='0000';


    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【insert_member】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    //resultobj.RespData = respdata;
   
  
    return resultobj;


};

exports.update = async function(paramsobj){

  let resultobj= {};
  let respcode="XXXX";
 // let respdata = {};
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;

  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("member");
  try
  {
  
    //insert member
    let info = {
      "email": paramsobj.email,
      "phonenum": paramsobj.phonenum,
      "name": paramsobj.name,
      "addr": paramsobj.addr,
      "updatetime": resptime,
    };
      

    result = await db.update_member(info);
    result = await JSON.parse(result);

    //準備輸出的資料
   if(result.respdata.affectedRows > 0)respcode ='0000';
   else respdesc+="update_member affectedRows=0"


  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【update】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  //resultobj.RespData = respdata;
 

  return resultobj;


};


exports.login = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata = {};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    let result ;

    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("member");
    try
    {
    
      //insert member
      let info = {
        "email": paramsobj.email,
        "password": utlenc.encrypt(paramsobj.password)
      };
        

      result = await db.get_member_by_email_pw(info);
      result = await JSON.parse(result);

      //準備輸出的資料
      respdata.member = result.respdata[0];
      respcode ='0000';


    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【login】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;
   
  
    return resultobj;


};

exports.resetpassword = async function(paramsobj){

  let resultobj= {};
  let respcode="XXXX";
  //let respdata = {};
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;

  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("member");
  try
  {
  
    //insert member
    let info = {
      "email": paramsobj.email,
      "password": utlenc.encrypt(paramsobj.newpw),
      "updatetime" : resptime
    };
      
    //1.update password && update resetpwtoken  = ''  1100929
    result = await db.update_password(info);
    result = await JSON.parse(result);

    //準備輸出的資料
    if(result.respdata.affectedRows > 0)respcode ='0000';
    else respdesc+="update_password affectedRows=0"


  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【resetpassword】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
 //resultobj.RespData = respdata;
 

  return resultobj;


};


exports.forgotpassword = async function(paramsobj){

  let resultobj= {};
  let respcode="XXXX";
  //let respdata = {};
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;

  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("member");
  try
  {
    //1.產生token
    let token = jwtoken.genAuthtoken(paramsobj.email,"","resetPw");
     //1100929
     //2.token 寫入DB member resetpwtoken 欄位 
    let info = {
      "email": paramsobj.email,
      "resetpwtoken" : token
    };
    

    console.log(token.length)

    result = await db.update_resetpwtoken(info);
    result = await JSON.parse(result);
   
    //3.記密碼驗證信 連結包含 token
    if(result.respdata.affectedRows > 0) 
    {
      await mailer.sendResetEmail( paramsobj.email, token);
      //準備輸出的資料
      respcode ='0000';
    }
    else
    {
      respdesc+="update_resetpwtoken affectedRows=0"
    }
 
  }
  catch(message)
  {
      respdesc += message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【forgotpassword】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
 //resultobj.RespData = respdata;
 

  return resultobj;


};

exports.check_login = async function(paramsobj){

  let resultobj= {};
  let respcode="XXXX";
  let respdata = {};
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("member");
  try
  {
       //準備輸出的資料
       respcode ='0000';
       respdata.islogin = paramsobj.islogin;
      
  }
  catch(message)
  {
      respdesc += message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【check_login】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;
 

  return resultobj;


};






