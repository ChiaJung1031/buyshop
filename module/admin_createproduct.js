const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_admin_createproduct');
const utlLog = require('../utility/log4js');


//新增商品
exports.create_product = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata=[];
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    let result ;
    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("category");
    try
    {
      result = await db.create_product(paramsobj);
      result = await JSON.parse(result);
      if(result.respdata.affectedRows == 1)
      {
        respcode ='0000';
        respdata = "新增成功！";
      } 
      else
      {
        respcode ='XXXX';
        respdata = "新增失敗！";
      }
    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【admin_create_product】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;

    return resultobj;


};

//查詢商品
exports.search_product = async function(paramsobj)
{
  let resultobj= {};
  let respcode="XXXX";
  let respdata=[];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("category");
  try
  {
    result = await db.search_product(paramsobj);
    result = await JSON.parse(result);
    if(result.respdata.length != 0)
    {
      respcode ='0000';
      respdata = result.respdata;
    } 
    else
    {
      respcode ='XXXX';
      respdata = "查詢失敗！";
    }
  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【admin_search_product】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;

  return resultobj;
};


//修改商品
exports.update_product = async function(paramsobj){

  let resultobj= {};
  let respcode="XXXX";
  let respdata=[];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("category");
  try
  {
    result = await db.update_product(paramsobj);
    result = await JSON.parse(result);
    console.log(result,"~~~~~~~~~~~~~!!!!")
    if(result.respdata.affectedRows == 1)
    {
      respcode ='0000';
      respdata = "修改成功！";
    } 
    else
    {
      respcode ='XXXX';
      respdata = "新增失敗！";
    }
  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【admin_update_product】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;

  return resultobj;


};