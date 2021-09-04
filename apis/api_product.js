const express = require('express');
const session=require('express-session')
const bomodule = require("../module/product.js")


const app = express();

app.use(express.json()); 

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))
const router = express.Router();


//取得商品列表資料
router.get('/productlist/:typeno',async function(req,res){
    //取商品資料
    let paramsobj = {"typeno": req.params.typeno ,"nowpage": req.query.nowpage};
    let resultobj= await bomodule.get_productlist(paramsobj);

    return res.render('productlist', resultobj);
 });

 //取得商品"詳細"資料
router.get('/productdtl/:productno',async function(req,res){
   
    let paramsobj = {"productno": req.params.productno };
    let resultobj= await bomodule.get_productdtl(paramsobj);
    //console.log(resultobj)

    return res.render('productdtl', resultobj);
 });



//取 nav 資料
 router.get('/productcategory',async function(req,res){

    let resultobj= await bomodule.get_category();   
    return res.end(JSON.stringify(resultobj))

 });

module.exports = router;