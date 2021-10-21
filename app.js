const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const app = express();
const engine = require('ejs-locals');
var path = require('path');//1100828 ruby add
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');//1100926 ruby add

// app.engine('ejs', engine);//1100828 ruby mark
// app.set('views', './views');//1100828 ruby mark
app.set('views', path.join(__dirname, 'views'));//1100828 ruby add
app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());//1100926 ruby add

app.use(express.urlencoded({extended:false}))
//1100911 ruby 修改為限制session 30過期，secret改為抓  process.env
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: { maxAge: 600 * 3000 } //30分鐘到期
}))



// const user = require('./apis/api_user');
// app.use('/api',user);


//apun 08/26 add //1100830 ruby mark 因run起來有錯誤先註解掉,有需要用時再打開
// const member = require('./apis/api_member');
// app.use('/api',member);



const product = require('./apis/api_product');//1100901 ruby add
app.use('/',product);
const cart = require('./apis/api_cart');
app.use('/',cart);
const order = require('./apis/api_order');
app.use('/',order);
const member = require('./apis/api_member');
app.use('/',member);
const category = require('./apis/api_admin_category');
app.use('/',category);
const createproduct = require('./apis/api_admin_createproduct');
app.use('/',createproduct);
const api_admin_menu = require('./apis/api_admin_menu');
app.use('/',api_admin_menu);
const api_admin_searchproduct = require('./apis/api_admin_searchproduct');
app.use('/',api_admin_searchproduct);
const api_admin_login = require('./apis/api_admin_login');
app.use('/',api_admin_login);




//前台頁面
app.get('/', function(req, res){
    res.redirect('/product/list');
});
app.get('/index', function(req, res){
    res.redirect('/product/list');
});


//後台新增或編輯商品
//app.get('/admin_category/sell', function(req, res){
////    res.render('admin_category');
//});

//管理者登入頁面 
///app.get('/admin_login', function(req, res){
 //   res.render('admin_login');
//});

//後台編輯分類
//app.get('/admin_category', function(req, res){
  //  res.render('admin_category');
//});

//後台目錄
//app.get('/admin_menu', function(req, res){
 //   res.render('admin_menu');
//});


app.listen(3000, function(){
    console.log('Example app listening at http://localhost:3000')
  });