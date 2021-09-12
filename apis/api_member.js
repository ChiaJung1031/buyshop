const express = require('express');
const session=require('express-session')
const bomodule = require("../module/member.js")


// const app = express();

// app.use(express.json()); 

// app.use(express.urlencoded({extended:false}))
// app.use(session({
//     secret:'keyboard cat',
//     resave:false,
//     saveUninitialized:true
// }))
const router = express.Router();


//取得會員資料
// router.get('/productlist/:typeno',async function(req,res){
//     //取商品資料
//     let paramsobj = {"typeno": req.params.typeno ,"nowpage": req.query.nowpage};
//     let resultobj= await bomodule.get_productlist(paramsobj);

//     return res.render('productlist', resultobj);
//  });


//取得會員資料
 router.get('/member/getmemberinfo/:userid',async function(req,res){

    let resultobj= await bomodule.get_memberinfo();   
    return res.end(JSON.stringify(resultobj))

 });


module.exports = router;