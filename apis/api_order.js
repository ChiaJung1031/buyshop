const express = require('express');
const router = express.Router();
const bomodule = require('../module/order');
const bomodule_cart = require('../module/cart');
const dateFormat = require("dateformat");
const check = require("../check/check_order")
const auth = require("../utility/auth")

router.post('/order/insert',auth,async function (req, res) {

    let resultobj = {};
    let paramsobj = {
                "email": req.user.userid,
                "recptname": req.body.recptname,
                "recpttel": req.body.recpttel,
                "recptaddr": req.body.recptaddr,
                "sessioncart" :req.session.cart
              };


      let check_resultobj = await check.insert(paramsobj);

      if(check_resultobj.RespCode == '0000')
      {
         resultobj= await bomodule.insert_order(paramsobj);
        //清空購物車
         if(resultobj.RespCode ==='0000') req.session.cart = [];
      }
      else resultobj = check_resultobj;

      return res.end(JSON.stringify(resultobj))




    // if(req.session.cart && req.session.cart.length > 0  )//&& req.session.userid
    //   {

    //       let paramsobj = {
    //         "email": req.user.userid,
    //         "recptname": req.body.recptname,
    //         "recpttel": req.body.recpttel,
    //         "recptaddr": req.body.recptaddr,
    //         "sessioncart" :req.session.cart
    //       };

    //       let resultobj= await bomodule.insert_order(paramsobj);
    //       //清空購物車
    //       if(resultobj.RespCode ==='0000') req.session.cart = [];

    //       console.log('/order/insert...resultobj')
    //       console.log(resultobj)
    //       return res.render('orderfinish',resultobj);
    //     }
    //     else
    //     {
    //        res.redirect('/cart');
    //     }

  });

router.post('/order/finish',auth,async function (req, res) {

    let resultobj = {
      "RespCode":  "0000",
      "RespData":{
        "ordertotalPrice":  req.body.ordertotalPrice,
        "orderno":  req.body.orderno
      }
    };

    return res.render('orderfinish', resultobj);
  });

router.get('/order/Search',auth,async function (req, res) {

//先預設都查近三個月的資料
let today = new Date();
let saletimeS = new Date();
saletimeS.setMonth(saletimeS.getMonth() - 3);

  let paramsobj = {
    "email":  req.user.userid,
    "saletimeS": saletimeS.toLocaleDateString(),
    "saletimeE": today.toLocaleDateString()
  };

  let resultobj= await bomodule.Search(paramsobj);

    return res.render('ordersearch', resultobj);
});


router.post('/order/cancel',auth,async function (req, res) {

    let resultobj = {};  
    let paramsobj = {
      "orderno":  req.body.orderno
    };
  
    let check_resultobj = await check.cancel(paramsobj);

    if(check_resultobj.RespCode == "0000") resultobj= await bomodule.cancel(paramsobj);
    else resultobj = check_resultobj;
  
    return res.end(JSON.stringify(resultobj))
  });



module.exports = router;
