const express = require('express');
const router = express.Router();
const bomodule = require('../module/cart');


router.get('/cart',async function (req, res) {
    let paramsobj = {"sessioncart" :req.session.cart };
    let resultobj= await bomodule.get_cart(paramsobj);

    return res.render('cart', resultobj);
});

router.get('/cart/receiverinfo',async function (req, res) { 

    req.session.userid ='aaa@gmail.com.tw';//test

   if(req.session.cart && req.session.cart.length > 0 )// && req.session.userid
    {
        let paramsobj = {"sessionuserid" :req.session.userid ,"sessioncart" :req.session.cart };
        let resultobj= await bomodule.get_receiverinfo(paramsobj);

        return res.render('cartreceiverinfo', resultobj);
   }
   else
    {
       res.redirect('/cart');
   }
  
});

router.get('/cart/get', async function (req, res) {
    let paramsobj = {"sessioncart" :req.session.cart };
    let resultobj= await bomodule.get_cart(paramsobj);

   return res.end(JSON.stringify(resultobj))
});
router.get('/cart/add/:productno/:qty', async function (req, res) {

    let paramsobj = {"productno": req.params.productno,"qty": req.params.qty,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.add_cart(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});

router.get('/cart/reducebyOne/:id', async function (req, res) {
    let paramsobj = {"id": req.params.id,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.reduce_byOne(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});

router.get('/cart/addbyOne/:id', async function (req, res) {

    let paramsobj = {"id": req.params.id,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.add_byOne(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});

router.get('/cart/removeItem/:id', async function (req, res) {
  
    let paramsobj = {"id": req.params.id,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.remove_Item(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});


module.exports = router;
