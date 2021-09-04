var express = require('express');
var router = express.Router();
const Cart = require('../module/cart');
console.log('/111');
router.get('/cart', function (req, res, next) {
   
    if(!req.session.cart) {
        return res.render('cart', {products:{}});
    }
    const cart = new Cart(req.session.cart);
    console.log(cart);
    return res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/cart/add-to-cart/:id', function (req, res) {
    const body = req.body;
    console.log(body);
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    // Product.findById(productId, function (err, product) {
    //     if(err) {
    //         return res.redirect('/');
    //     }
    
        const product = {products: cart.generateArray(), totalPrice: cart.totalPrice}
       // {item: {title:'aaa'}, qty: 1, price: 100};
        cart.add(product, product.id);
        req.session.cart = cart;
       // console.log(req.session.cart);
         res.redirect('/cart');
      
   // })
});

module.exports = router;
