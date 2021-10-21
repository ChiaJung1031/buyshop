const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_product');
const utlLog = require('../utility/log4js');



const pagesize = 8;

exports.get_productlist = async function(paramsobj){

            let resultobj= {};
            let respcode="XXXX";
            let respdata=[];
            let respdesc ="";
            let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            let result ;
            let totalcnt = 0;
            let nowpage = "";
            let typeno = "";
            let findname ="";

            //log
            let log4js = utlLog.getlog4js();
            let logger = log4js.getLogger("product");
            try
            {


            
            if(paramsobj.typeno && paramsobj.nowpage)
            {
              typeno= paramsobj.typeno ;
              nowpage = paramsobj.nowpage;
            }
            else{
              //確認 typeno nowpage 是否為空,如為空設定預設值]
              //取排序最前面的分類項目 no
              let first_category =  await db.get_first_category();
              first_category = await JSON.parse(first_category);
              typeno= first_category.respdata[0].categoryno.toString();
              nowpage = "1";
            }
            
              //撈產品資料
              let  info = {"typeno": typeno ,"nowpage" : nowpage , "pagesize" : pagesize};
              console.log(info)
              result = await db.get_productlist(info);
              result = await JSON.parse(result);

             //計算分頁
               let result2  = await db.get_productCnt(info);
               result2 = await JSON.parse(result2);

               let totalpage = (result2.respdata[0].total % pagesize) > 0 ? parseInt(result2.respdata[0].total / pagesize,10) + 1 : parseInt(result2.respdata[0].total / pagesize,10)  ;
               totalcnt = result2.respdata[0].total ;
               

               //如沒有撈到資料 則需另外撈目前分類名稱
               if(totalcnt > 0) findname =result.respdata[0].categoryname;
               else
               {
                  let result3  = await db.get_categoryname(info);
                  result3 = await JSON.parse(result3);
                  findname = result3.respdata[0].name
               }

              //準備輸出的資料
                respdata = result.respdata;
                respdata.totalpage = totalpage;
                respdata.nowpage = paramsobj.nowpage;
                respdata.totalcnt = totalcnt;
                respdata.findname = findname;
                respcode ='0000';


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


exports.get_productlist_by_keyword = async function(paramsobj){

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
    //撈產品資料
      let info = {"keyword": paramsobj.keyword};
      result = await db.get_productlist_by_keyword(info);
      result = await JSON.parse(result);
      totalcnt = result.respdata.length;


    //準備輸出的資料
      respdata = result.respdata;
      respdata.totalcnt = totalcnt;
      respdata.findname = paramsobj.keyword;
      respcode ='0000';

  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("【get_productlist_by_keyword】" + respdesc);
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
      respdata = result.respdata;
      respcode ='0000';

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
    
      //準備輸出的資料;
      respdata = result.respdata;
      respcode ='0000'

      

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


