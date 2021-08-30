const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const app = express();
const engine = require('ejs-locals');
var path = require('path');//1100828 ruby add

// app.engine('ejs', engine);//1100828 ruby mark
// app.set('views', './views');//1100828 ruby mark
app.set('views', path.join(__dirname, 'views'));//1100828 ruby add
app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.static(__dirname + '/static'));

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))



// const user = require('./apis/api_user');
// app.use('/api',user);


//apun 08/26 add //1100830 ruby mark 因run起來有錯誤先註解掉,有需要用時再打開
// const member = require('./apis/api_member');
// app.use('/api',member);

const productdtl = require('./apis/api_productdtl');
app.use('/api',productdtl);


const createproduct = require('./apis/api_createproduct');
app.use('/api',createproduct);


//前台頁面
app.get('/', function(req, res){
    res.render('index');
});
app.get('/index', function(req, res){
    res.render('index');
});
app.get('/productdtl/:id', function(req, res){
    res.render('productdtl');
});
app.get('/productlist/:typeno', function(req, res){//1100828 ruby add
    res.render('productlist');
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
  