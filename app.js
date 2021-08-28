const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const app = express();
const engine = require('ejs-locals');


app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.static(__dirname + '/static'));

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))


<<<<<<< HEAD
// const user = require('./apis/api_user');
// app.use('/api',user);

=======
//apun 08/26 add
const member = require('./apis/api_member');
app.use('/api',member);

const productdtl = require('./apis/api_productdtl');
app.use('/api',productdtl);
>>>>>>> 1ffa97a5a7d95eefc30796cf7b8f8695f37e9ce5

const createproduct = require('./apis/api_createproduct');
app.use('/api',createproduct);



app.get('/', function(req, res){
    res.render('index');
});
app.get('/index', function(req, res){
    res.render('index');
});
app.get('/productdtl/:id', function(req, res){
    res.render('productdtl');
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
  