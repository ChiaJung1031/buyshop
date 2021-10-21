const utl = require('../utility/util');
const bo = require('../module/order');
const db = require('../DAO/sql_order');

module.exports.cancel = async function(paramsobj){

    let lstrrespdesc = [];

     //檢核必填
     if(paramsobj.orderno.trim()  == false)lstrrespdesc.push("訂單號碼");
     if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);

     //檢核資料格式


     //特殊檢核
     //該 orderno 是否已存在
     let  info = { "orderno" : paramsobj.orderno};
     let  data = await db.get_order_by_orderno(info);
          data = await JSON.parse(data);

    if(data.respdesc !=""){
         lstrrespdesc.push("發生錯誤請稍後在試");
         return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
    else if ( data.respdata.length == 0) 
    {
        lstrrespdesc.push("查無該訂單資料，取消失敗");
        return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
    
    
    
   return utl.genresultobj(lstrrespdesc,"0000")

};

module.exports.insert = async function(paramsobj){

    let lstrrespdesc = [];

     //檢核必填
     if(paramsobj.recptname.trim()  == false)lstrrespdesc.push("收件人姓名");
     if(paramsobj.recpttel.trim()  == false)lstrrespdesc.push("收件人電話");
     if(paramsobj.recptaddr.trim()  == false)lstrrespdesc.push("收件人地址");
     if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);

     //檢核資料格式
     //檢核電話格式
    if(utl.isphonenum(paramsobj.recpttel.trim()) == false)lstrrespdesc.push("手機號碼格式錯誤");
    if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.basic)



     //特殊檢核
     if(!paramsobj.sessioncart || paramsobj.sessioncart.length == 0 )
     {
        lstrrespdesc.push("購物車無資料");
        return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
     }
    
    
   return utl.genresultobj(lstrrespdesc,"0000")

};


