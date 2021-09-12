const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_order.js');
const utlLog = require('../utility/log4js.js');


exports.insert_order = async function(paramsobj){

            let resultobj= {};
            let respcode="XXXX";
            let respdata = {};
            let respdesc ="";
            let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            let result ;
            let orderno  = dateFormat(new Date(), "yyyymmddHHMMss");
            //log
            let log4js = utlLog.getlog4js();
            let logger = log4js.getLogger("order");
            try
            {
             //取購物車資料
             const cartmodule = require('../module/cart.js')
             let cart = await cartmodule.get_cart(paramsobj);
              //insert orderlist 、insert orderdetail
              let info = {
                  "orderno": orderno,
                  "email": paramsobj.email,
                  "recptname": paramsobj.recptname,
                  "recpttel": paramsobj.recpttel,
                  "recptaddr": paramsobj.recptaddr,
                  "saletime": resptime,
                  "deliveryfee": cart.RespData.deliveryfee,
                  "payyn": 'N',
                  "reftyn": 'N',
                  "updatetime": resptime,
                  "orderproducts": cart.RespData.products
                };


              result = await db.insert_order(info);


              //準備輸出的資料
                respdata.ordertotalPrice = cart.RespData.ordertotalPrice;
                respdata.orderno = orderno;
                respcode ='0000';
                console.log('【insert_order result.respdata】...')
                console.log(result.respdata)

                //清空購物車
                //cartmodule.CART_init([]);


            }
            catch(message)
            {
                respdesc = message;
            }

            if(respcode == "XXXX") {
                //寫入log
                logger.error("insert_order" + respdesc);
            }

            resultobj.RespCode = respcode;
            resultobj.RespTime = resptime;
            resultobj.RespDesc = respdesc;
            resultobj.RespData = respdata;


            return resultobj;


};


