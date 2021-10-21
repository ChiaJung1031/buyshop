const express = require('express');
const router = express.Router();
const bomodule = require('../module/cart');
const auth = require("../utility/auth")

//car.ejs 顯示購物車清單
router.get('/cart',async function (req, res) {
    let paramsobj = {"sessioncart" :req.session.cart };
    let resultobj= await bomodule.get_cart(paramsobj);

    return res.render('cart', resultobj);
});

//nav.ejs 取的購物車總數
router.get('/cart/get', async function (req, res) {
    let paramsobj = {"sessioncart" :req.session.cart };
    let resultobj= await bomodule.get_cart(paramsobj);

   return res.end(JSON.stringify(resultobj))
});

//填寫收件人資訊
router.get('/cart/receiverinfo',auth,async function (req, res) { 
    
    let paramsobj = {"sessionuserid" :req.user.userid ,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.get_receiverinfo(paramsobj);

   if(resultobj.RespData.cart.products.length > 0 )return res.render('cartreceiverinfo', resultobj);
   else  res.redirect('/cart');
  
});

//加入購物車
router.get('/cart/add/:productno/:qty', async function (req, res) {

    let paramsobj = {"productno": req.params.productno,"qty": req.params.qty,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.add_cart(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});

//購物車商品數量減一
router.get('/cart/reducebyOne/:id', async function (req, res) {
    let paramsobj = {"id": req.params.id,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.reduce_byOne(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});

//購物車商品數量加一
router.get('/cart/addbyOne/:id', async function (req, res) {

    let paramsobj = {"id": req.params.id,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.add_byOne(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});

//購物車商品移除
router.get('/cart/removeItem/:id', async function (req, res) {
  
    let paramsobj = {"id": req.params.id,"sessioncart" :req.session.cart };
    let resultobj= await bomodule.remove_Item(paramsobj);
    req.session.cart = await bomodule.CART_get();

   return res.end(JSON.stringify(resultobj))
});


module.exports = router;
