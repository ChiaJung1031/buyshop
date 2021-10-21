const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_admin_category');
const utlLog = require('../utility/log4js');

//查詢分類
exports.select_category = async function(){
  let resultobj= {};
  let respcode="XXXX";
  let respdata=[];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result_name ;
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("category");
  try
  {
     result_name = await db.select_allcategory();
     result_name = await JSON.parse(result_name);
     if(result_name.respdata.length != 0)
     {
      respcode="0000";
      respdata = result_name.respdata;
     }
     else
     {
      respcode="XXXX";
      respdata = "查無資料";
     }
    
  }
  catch(message)
  {
      respdesc = message;
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;
  return resultobj;
};


//新增分類
exports.create_category = async function(paramsobj){

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

      //建立分類
      let checkname = {"catename":paramsobj["catename"]};
      let info = {"catename":paramsobj["catename"],"new_no":paramsobj["new_no"],"createdatetime":resptime,"updatetime":resptime};
      result_name = await db.select_category(checkname);
      result_name = await JSON.parse(result_name);
      if(result_name.respdata.length ==0)
      {
        result = await db.create_category(info);
        result = await JSON.parse(result);
        if(result.respdata.affectedRows== 1)
        {
          respcode ='0000';
          respdata = result.respdata;
        }
        else
        {
          respcode ='XXXX';
          respdata = "新增失敗，請洽管理員！";
        }
      }
      else
      {
        if(respcode == "XXXX") 
        {
            //寫入log
            logger.error("【admin_create_category】" + respdesc);
            respdesc = "分類名稱重複！";
        }
      }

    }
    catch(message)
    {
        respdesc = message;
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;
    return resultobj;
};


//刪除分類
exports.delete_category = async function(paramsobj){

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

    //刪除分類
    let info = {"catename":paramsobj["catename"]}
    result = await db.delete_category(info);
    result=JSON.parse(result);
    if(result.respdata.affectedRows== 1)
    {
      respcode ='0000';
      respdata = "刪除成功！";
    }
    else
    {
      respcode ='XXXX';
      RespDesc = "請輸入正確的分類名稱！";
    }
  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【admin_delete_category】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;

  return resultobj;
};

//查詢分類裡是否有商品
exports.check_category = async function(categoryname){
  let resultobj= {};
  let respcode="XXXX";
  let respdata=[];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result_name ;
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("category");
  try
  {
     result_name = await db.check_category(categoryname);
     result_name = await JSON.parse(result_name);
     if(result_name.respdata.length != 0)
     {
        respcode="XXXX_D";
        respdata = "不可刪除該分類！";
     }
     else
     {
        respcode="0000";
        respdata = result_name.respdata;
     }
    
  }
  catch(message)
  {
      respdesc = message;
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;
  return resultobj;
};