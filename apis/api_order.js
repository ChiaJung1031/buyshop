const express = require('express');
const router = express.Router();
const bomodule = require('../module/order');
const bomodule_cart = require('../module/cart');
const dateFormat = require("dateformat");


router.post('/order/insert',async function (req, res) { 

    req.session.userid ='aaa@gmail.com.tw';//test

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
          return res.render('cartfinish',resultobj);
        } 
        else
        {
           res.redirect('/cart');
        }
    
  });
// router.get('/cart',async function (req, res) {
//     let paramsobj = {"sessioncart" :req.session.cart };
//     let resultobj= await bomodule.get_cart(paramsobj);

//     return res.render('cart', resultobj);
// });


// router.get('/cart/get', async function (req, res) {
//     let paramsobj = {"sessioncart" :req.session.cart };
//     let resultobj= await bomodule.get_cart(paramsobj);

//    return res.end(JSON.stringify(resultobj))
// });



module.exports = router;
