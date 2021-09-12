const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_member.js');
const utlLog = require('../utility/log4js.js');


exports.get_memberinfo = async function(paramsobj){

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
              let info = {"userid": paramsobj.userid};
              result = await db.get_memberinfo(info);
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
           
            console.log('【get_memberinfo】...')
            console.log(resultobj)

            return resultobj;


};


