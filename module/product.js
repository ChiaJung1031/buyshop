const dateFormat = require("dateformat");
const db = require('../DAO/sql_product.js');
const utlLog = require('../utility/log4js.js');



const pagesize = 8;

exports.get_productlist = async function(paramsobj){
 
            let resultobj= {};
            let respcode="XXXX";
            let respdata=[];
            let respdesc ="";
            let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            let result ;
            let totalcnt = 0;
            //log
            let log4js = utlLog.getlog4js();
            let logger = log4js.getLogger("product");
            try
            {


             //檢查  typeno 是否符合格式 長度=1 的英文字母

             //檢查 nowpage 是否為數字 且 大於 0

              //撈產品資料
              let info = {"typeno": paramsobj.typeno ,"nowpage" : paramsobj.nowpage , "pagesize" : pagesize};
              result = await db.get_productlist(info);
              result = await JSON.parse(result);
                 
             //計算分頁
               let result2  = await db.get_productCnt(info); 
               result2 = await JSON.parse(result2);

               let totalpage = (result2.respdata[0].total % pagesize) > 0 ? parseInt(result2.respdata[0].total / pagesize,10) + 1 : parseInt(result2.respdata[0].total / pagesize,10)  ;
               totalcnt = result2.respdata[0].total ;


              //準備輸出的資料
                respcode ='0000'; 
                respdata = result.respdata;
                respdata.totalpage = totalpage;
                respdata.nowpage = paramsobj.nowpage;
                respdata.totalcnt = totalcnt;
                

            }
            catch(message)
            {
                respdesc = message;
            }
           
            if(respcode == "XXXX") {
                //寫入log 
                logger.error("【get_productlist】" + respdesc);
            }

            resultobj.RespCode = respcode;
            resultobj.RespTime = resptime;
            resultobj.RespDesc = respdesc;
            resultobj.RespData = respdata;
           
            return resultobj;

 
};

exports.get_category = async function(paramsobj){
 
  let resultobj= {};
  let respcode="XXXX";
  let respdata=[];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("product");
  try
  {
    //撈產品分類資料
      result = await db.get_category();
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
      logger.error("【get_category】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;

  return resultobj;


};

exports.get_productdtl = async function(paramsobj){
 
  let resultobj= {};
  let respcode="XXXX";
  let respdata=[];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("product");
  try
  {


   //檢查  productno 是否符合格式 
   

    //撈產品資料
      let info = {"productno": paramsobj.productno};
      result = await db.get_productdtl(info);
      result = await JSON.parse(result);

    //準備輸出的資料
      respcode ='0000'; 
      respdata = result.respdata;
      respdata.totalpage = totalpage;

  }
  catch(message)
  {
      respdesc = message;
  }
 
  if(respcode == "XXXX") {
      //寫入log 
      logger.error("【get_productdtl】" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;
 
  return resultobj;


};


