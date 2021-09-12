const prdct = require('../module/product.js');
const member = require('../module/member.js')
const dateFormat = require("dateformat");
const utlLog = require('../utility/log4js.js');
let cart = [];//cart = [{productno:A01,qty:1,unitprice:100},{productno:A02,qty:1,unitprice:200},totalQty:XXX,totalPrice:XXX]
let totalQty =0;
let totalPrice =0;
const deliveryfee = 60;

module.exports.add_cart = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata={};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  

    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("cart");
    try
    {
         //1.取該 productno 資料
        let info = {"productno": paramsobj.productno};
        let product = (await prdct.get_productdtl(info)).RespData[0];
        //2.加入購物車
        let price =  parseInt(product.specialprice,10) > 0 ? parseInt(product.specialprice,10) : parseInt(product.unitprice,10);
        this.CART_init(paramsobj.sessioncart);
        let _cart =  this.CART_get();
        let obj = {
            id : _cart.length,
            productno: product.productno,
            productname: product.productname,
            qty: parseInt(paramsobj.qty,10) ,
            picpath : product.picpath.split(',')[0] ,
            intro : product.intro ,
            unitprice:  parseInt(product.unitprice,10) ,
            specialprice:  parseInt(product.specialprice,10) ,
            cansalecount:  parseInt(product.cansalecount,10),
            costtotalprice:  parseInt(product.cost,10) * parseInt(paramsobj.qty,10),
            subtotal : parseInt(paramsobj.qty,10) *  price
        }
        this.CART_add(obj);

      //準備輸出的資料
      respcode ='0000';
      //respdata = cart;
    

    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【addtocart】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;

    return resultobj;


};

module.exports.get_cart = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata={};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  
    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("cart");
    try
    {
       this.CART_init(paramsobj.sessioncart);
       let _cart = this.CART_get();

      //準備輸出的資料
      respdata.products = _cart;
      respdata.totalQty = totalQty ;
      respdata.totalPrice = totalPrice;
      respdata.deliveryfee = _cart.length > 0 ? deliveryfee : 0;
      respdata.ordertotalPrice = totalPrice + respdata.deliveryfee;
      respcode ='0000';
    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【getcart】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;

 
    console.log(resultobj)


    return resultobj;


};
module.exports.reduce_byOne = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata={};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
 
 
    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("cart");
    try
    {
        this.CART_init(paramsobj.sessioncart);
        this.CART_reduceByOne(paramsobj.id);
        let _cart = this.CART_get();

      //準備輸出的資料 
      respdata.product = _cart[this.CART_findindex(paramsobj.id)];
      respdata.totalQty = totalQty ;
      respdata.totalPrice = totalPrice;
      respdata.deliveryfee = _cart.length > 0 ? deliveryfee : 0;;
      respdata.ordertotalPrice = totalPrice + respdata.deliveryfee;
      respcode ='0000';
    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【reduce_byOne】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;
    

    return resultobj;


};

module.exports.add_byOne = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata={};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

 
    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("cart");
    try
    {
        this.CART_init(paramsobj.sessioncart);
        this.CART_addByOne(paramsobj.id);
        let _cart = this.CART_get();

      //準備輸出的資料
      respdata.product = _cart[this.CART_findindex(paramsobj.id)];
      respdata.totalQty = totalQty ;
      respdata.totalPrice = totalPrice;
      respdata.deliveryfee = _cart.length > 0 ? deliveryfee : 0;
      respdata.ordertotalPrice = totalPrice + respdata.deliveryfee;
      respcode ='0000';
    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【add_ByOne】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;
    
 

    return resultobj;


};

module.exports.remove_Item = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata={};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
   
   
    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("cart");
    try
    {
        this.CART_init(paramsobj.sessioncart);
        this.CART_removeItem(paramsobj.id);
   

      //準備輸出的資料
      respdata.totalQty = totalQty ;
      respdata.totalPrice = totalPrice;
      respdata.deliveryfee = cart.length > 0 ? deliveryfee : 0;;
      respdata.ordertotalPrice = totalPrice + respdata.deliveryfee;
      respcode ='0000';
    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【remove_Item】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;

    return resultobj;


};

module.exports.get_receiverinfo = async function(paramsobj){

    let resultobj= {};
    let respcode="XXXX";
    let respdata={};
    let respdesc ="";
    let resptime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  
 
    //log
    let log4js = utlLog.getlog4js();
    let logger = log4js.getLogger("cart");
    try
    {
        let info = {"userid": paramsobj.sessionuserid ,'sessioncart':paramsobj.sessioncart};
        //購物車的資料 RespData
        let Respcart = await this.get_cart(info);
  
        //會員資料 RespData 
        let Respmember =await member.get_memberinfo(info)
    
      //準備輸出的資料
      respdata.cart = Respcart.RespData;
      respdata.receiverinfo = Respmember.RespData;
      respcode ='0000';
    }
    catch(message)
    {
        respdesc = message;
    }

    if(respcode == "XXXX") {
        //寫入log
        logger.error("【get_receiverinfo】" + respdesc);
    }

    resultobj.RespCode = respcode;
    resultobj.RespTime = resptime;
    resultobj.RespDesc = respdesc;
    resultobj.RespData = respdata;
    console.log('get_receiverinfo...')
    console.log(resultobj)

    return resultobj;


};


module.exports.CART_init = function(sessioncart){
    console.log('CART_init sessioncart...')
    console.log(sessioncart)

    if(sessioncart){cart = sessioncart}
    if(cart.length == 0)
    {
         totalQty =0;
         totalPrice =0;
    }
} 
module.exports.CART_get = function(){
  return cart ;
} 
module.exports.CART_add = function(pdct){

     let price = pdct.specialprice > 0 ?pdct.specialprice : pdct.unitprice;
     totalQty =  totalQty + pdct.qty;
     totalPrice =  totalPrice + (price * pdct.qty) ;

     //整合同個 productno
    let findproductno = cart.map(function(item, index, array){
            return item.productno == pdct.productno
     });
    let index = findproductno.indexOf(true)

     if(index >= 0) 
     {
        //repalce obj in cart by this index 
        cart[index].qty = pdct.qty + cart[index].qty;
        cart[index].subtotal = price * cart[index].qty ;
     }
     else  cart.push(pdct)

  } 
  module.exports.CART_addByOne = function (id) {
    let index = this.CART_findindex(id)
     let price = cart[index].specialprice > 0 ?cart[index].specialprice : cart[index].unitprice; 
     cart[index].qty++;
     cart[index].subtotal = cart[index].qty * price;
     totalQty++;
     totalPrice += price;
 };
 
module.exports.CART_reduceByOne = function (id) {

    let index = this.CART_findindex(id)
    let price = cart[index].specialprice > 0 ?cart[index].specialprice : cart[index].unitprice; 
    cart[index].qty--;
    cart[index].subtotal = cart[index].qty * price;
    totalQty--;
    totalPrice -= price;

    if(cart[index].qty <= 0) {
        cart.splice(index, 1); 
    }
};


module.exports.CART_removeItem = function (id) {

    let index = this.CART_findindex(id)
    let price = cart[index].specialprice > 0 ?cart[index].specialprice : cart[index].unitprice; 
    totalQty -= cart[index].qty;
    totalPrice -= (price * cart[index].qty);
    cart.splice(index, 1); 

};

module.exports.CART_findindex = function (id) {

    let index ;
    for(let i=0 ; i< cart.length ; i++)
    {
      if(cart[i].id== id )
      {
         index = i;
          break;
      }
    }


    return index;
 };
