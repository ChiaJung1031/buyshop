const express = require('express');
const router = express.Router();
const bomodule = require('../module/order');
const bomodule_cart = require('../module/cart');
const dateFormat = require("dateformat");


router.post('/order/insert',async function (req, res) {

    if(req.session.cart && req.session.cart.length > 0  )//&& req.session.userid
      {

          let paramsobj = {
            "email": req.session.userid,
            "recptname": req.body.recptname,
            "recpttel": req.body.recpttel,
            "recptaddr": req.body.recptaddr,
            "sessioncart" :req.session.cart
          };

          let resultobj= await bomodule.insert_order(paramsobj);
          //清空購物車
          if(resultobj.RespCode ==='0000') req.session.cart = [];

          console.log('/order/insert...resultobj')
          console.log(resultobj)
          return res.render('orderfinish',resultobj);
        }
        else
        {
           res.redirect('/cart');
        }

  });

router.get('/order/Search',async function (req, res) {

//先預設都查進三個月的資料
let today = new Date();
let saletimeS = new Date();
saletimeS.setMonth(saletimeS.getMonth() - 3);

  let paramsobj = {
    "email":  req.session.userid,
    "saletimeS": saletimeS.toLocaleDateString(),
    "saletimeE": today.toLocaleDateString()
  };
  console.log('paramsobj...')
   console.log(paramsobj)
  let resultobj= await bomodule.Search(paramsobj);

    return res.render('ordersearch', resultobj);
});


// router.get('/cart/get', async function (req, res) {
//     let paramsobj = {"sessioncart" :req.session.cart };
//     let resultobj= await bomodule.get_cart(paramsobj);

//    return res.end(JSON.stringify(resultobj))
// });



module.exports = router;
