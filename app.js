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


// const user = require('./apis/api_user');
// app.use('/api',user);





app.get('/', function(req, res){
    res.render('index');
});

app.get('/index', function(req, res){
    res.render('index');
});
app.get('/productdtl/:id', function(req, res){
    res.render('productdtl');
});



app.listen(5000, function(){
    console.log('Example app listening at http://localhost:5000')
  });
  