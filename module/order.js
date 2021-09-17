const { json } = require("body-parser");
const dateFormat = require("dateformat");
const db = require('../DAO/sql_order');
const utlLog = require('../utility/log4js');


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


exports.Search = async function(paramsobj){

  let resultobj= {};
  let respcode="XXXX";
  let respdata = [];
  let respdesc ="";
  let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  let result ;
  let orderlist = [];
  let orderdetail = {};
  //log
  let log4js = utlLog.getlog4js();
  let logger = log4js.getLogger("order");
  try
  {
    let info = {
        "email": paramsobj.email,
        "saletimeS": paramsobj.saletimeS,
        "saletimeE": paramsobj.saletimeE,
      };


    result = await db.get_order(info);
    result = await JSON.parse(result);

    //1.取 distinct orderno 陣列
    let set_orderno = new Set(result.respdata.map(item => item.orderno));    
    let array_orderno = [...set_orderno];   

    //2.取每個 orderno 對應的 orderdetail 資料
    array_orderno.forEach((x)=>{
      let array_detail = result.respdata.filter(function(item, index, array){
        return item.orderno == x;    
      });
    
      // let itemarray_price= array_detail.map(item=>item.tnstotalprice);
      // let ordertotalPrice = itemarray_price.reduce((a,b)=>a+b); 
      // let itemarray_qty= array_detail.map(item=>item.tnstotalprice);
      // let ordertotalaty = itemarray_qty.reduce((a,b)=>a+b); 


      let obj ={};
      obj.orderno = x;
      obj.saletime = dateFormat(array_detail[0].saletime, "yyyy-mm-dd") ;
      obj.orderstatus = array_detail[0].reftyn == "Y" ? "訂單取消":  array_detail[0].reftyn == "N" ?"訂單成立" : "";


      obj.deliveryfee = array_detail[0].deliveryfee;
      obj.recptname = array_detail[0].recptname;
      obj.recpttel = array_detail[0].recpttel;
      obj.recptaddr = array_detail[0].recptaddr;

      console.log('array_detail....')
      console.log(array_detail)

      let ordertotalqty = 0;
      let ordertotalPrice = 0;
      obj.orderdetail =[];

      array_detail.forEach((item)=>{
        ordertotalqty += item.tnscount;
        ordertotalPrice += item.tnstotalprice;

        let obj_detail = {
          productno : item.productno,
          picpath : item.picpath.split(",")[0],
          productname: item.productname,
          tnscount: item.tnscount,
          tnsunitprice: item.tnstotalprice / item.tnscount,
          tnstotalprice: item.tnstotalprice
        }

        obj.orderdetail.push(obj_detail)

        console.log('obj_detail....')
        console.log(obj_detail)
      })

      obj.producttotalPrice = ordertotalPrice;
      obj.ordertotalaty = ordertotalqty;
      obj.ordertotalPrice = ordertotalPrice + array_detail[0].deliveryfee ;

       //3.加入 orderlist 陣列
      orderlist.push(obj)
    })




    //準備輸出的資料
      respdata = orderlist;
      respcode ='0000';
     
     

  }
  catch(message)
  {
      respdesc = message;
  }

  if(respcode == "XXXX") {
      //寫入log
      logger.error("Search" + respdesc);
  }

  resultobj.RespCode = respcode;
  resultobj.RespTime = resptime;
  resultobj.RespDesc = respdesc;
  resultobj.RespData = respdata;

  console.log('resultobj....')
  console.log(resultobj)

  return resultobj;


};

