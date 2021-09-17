const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const app = express();
const engine = require('ejs-locals');
var path = require('path');//1100828 ruby add
const dotenv = require('dotenv').config();

// app.engine('ejs', engine);//1100828 ruby mark
// app.set('views', './views');//1100828 ruby mark
app.set('views', path.join(__dirname, 'views'));//1100828 ruby add
app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.static(__dirname + '/static'));

app.use(express.urlencoded({extended:false}))
//1100911 ruby 修改為限制session 30過期，secret改為抓  process.env
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: { maxAge: 600 * 3000 } //30分鐘到期
}))


//1100916 ruby 每次 req 都跑這裡
app.use((req, res, next) => {
    console.log('req.session....')
    if(!req.session.userid )console.log('req.session.userid is null')
     
    next();
})

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



const createproduct = require('./apis/api_createproduct');
app.use('/api',createproduct);




//前台頁面
app.get('/', function(req, res){
    res.render('index');
});
app.get('/index', function(req, res){
    res.render('index');
});


//後台新增商品頁面
app.get('/createproduct/sell', function(req, res){
    res.render('createproduct');
});

//管理者頁面 apun 08/26 add
app.get('/admin', function(req, res){
    res.render('admin');
});

app.listen(5000, function(){
    console.log('Example app listening at http://localhost:5000')
  });
  