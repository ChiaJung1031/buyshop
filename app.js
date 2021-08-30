const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const app = express();
const engine = require('ejs-locals');
var path = require('path');//1100828 ruby add


//app.engine('ejs', engine);//1100828 ruby mark
//app.set('views', './views');//1100828 ruby mark
// view engine setup
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


const productlist = require('./apis/api_productlist');
app.use('/api',productlist);


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


app.listen(5000, function(){
    console.log('Example app listening at http://localhost:5000')
  });
  