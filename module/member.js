const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_member');
const utlLog = require('../utility/log4js');
const utlenc = require('../utility/encrypt');

exports.search = async function(paramsobj){

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


