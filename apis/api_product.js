const express = require('express');
const session=require('express-session')
const bomodule = require("../module/product")
const router = express.Router();


//取得商品列表資料
router.get('/product/list/:typeno',async function(req,res){
    //取商品資料
    let paramsobj = {"typeno": req.params.typeno ,"nowpage": req.query.nowpage};
    let resultobj= await bomodule.get_productlist(paramsobj);
  console.log(resultobj)
    return res.render('productlist', resultobj);
 });

 //取得商品列表資料
router.get('/product/list',async function(req,res){
   //取商品資料
   let paramsobj = {"typeno": "" ,"nowpage": ""};
   let resultobj= await bomodule.get_productlist(paramsobj);

   return res.render('productlist', resultobj);
});

//取得商品列表資料(全站搜尋)/product/list
router.post('/product/list',async function(req,res){
   console.log('/product/list....')
   //取商品資料
   let paramsobj = {"keyword": req.body.keyword};
   let resultobj= await bomodule.get_productlist_by_keyword(paramsobj);
 console.log(resultobj)
   return res.render('productlist', resultobj);
});

 //取得商品"詳細"資料
router.get('/product/detail/:productno',async function(req,res){
   
    let paramsobj = {"productno": req.params.productno };
    let resultobj= await bomodule.get_productdtl(paramsobj);
    if(resultobj.RespData.length > 0) return res.render('productdtl', resultobj);
    else res.redirect('/product/list');
   
 });



//取 nav 資料
 router.get('/product/category',async function(req,res){

    let resultobj= await bomodule.get_category();   
    return res.end(JSON.stringify(resultobj))

 });


module.exports = router;