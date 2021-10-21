const express = require('express');
const session=require('express-session')
const bomodule = require("../module/member")
const check = require("../check/check_member")
const auth = require("../utility/auth")
const jwtoken = require("../utility/jwtoken")
const router = express.Router();
const dotenv = require('dotenv').config();



//取得會員資料
 router.get('/member/search',auth,async function(req,res){

  let resultobj = {};
  let paramsobj = {
    "email": req.user.userid,
    "name": req.user.username
  };

  let check_resultobj = await check.search(paramsobj);

    if(check_resultobj.RespCode == '0000')  resultobj= await bomodule.search(paramsobj);
    else resultobj = check_resultobj;  

    return res.end(JSON.stringify(resultobj))

 });

 //註冊會員資料
 router.post('/member/register',async function (req, res) { 

         let resultobj = {};
         let paramsobj = {
           "email": req.body.email,
           "password": req.body.password,
           "phonenum": req.body.phonenum,
           "addr": req.body.addr,
           "name": req.body.name
         };
 
         let check_resultobj = await check.register(paramsobj);

         if(check_resultobj.RespCode == "0000") resultobj= await bomodule.register(paramsobj);
         else resultobj = check_resultobj;
         
       

         return res.end(JSON.stringify(resultobj))
   
 });

 //會員登入
 router.post('/member/login',async function(req,res){
   let resultobj ={};
   let paramsobj = {
      "email": req.body.email,
      "password": req.body.password,
    };

    let check_resultobj = await check.login(paramsobj);

    if(check_resultobj.RespCode == '0000') 
    {
      resultobj= await bomodule.login(paramsobj);
      //req.session.userid = resultobj.RespData.member.email;
      //req.session.username = resultobj.RespData.member.name;
     //1. 1100926 登入後給 response token ,把 token 存在名為 token 的 cookie
     let token = jwtoken.genAuthtoken(resultobj.RespData.member.email,resultobj.RespData.member.name,"login");
     res.cookie('token', token, { maxAge: parseInt(process.env.JWT_EXPIRESIN_LOGIN) * 60 *1000 , httpOnly: true}); 
     
    }
    else resultobj = check_resultobj;
    

    return res.end(JSON.stringify(resultobj))

 });



  //會員登出
  router.get('/member/logout',auth ,async function(req,res){

    //req.session.destroy();
    res.clearCookie('token');

    return res.redirect('/product/list');
 
  });

  //修改會員資料
  router.post('/member/update',auth,async function(req,res){
    let resultobj ={};
    let paramsobj = {
       "email": req.user.userid,
       "name": req.body.name,
       "phonenum": req.body.phonenum,
       "addr": req.body.addr
     };
 
     let check_resultobj = await check.update(paramsobj);
 
     if(check_resultobj.RespCode == '0000') resultobj= await bomodule.update(paramsobj);
     else resultobj = check_resultobj;
     
 
     return res.end(JSON.stringify(resultobj))
 
  });

    //修改密碼(會員登入後點選)
    router.get('/member/reset_password',async function(req,res){

      let resultobj = await exports.getreseetPW_resultobj(req.cookies.token,"web");
      return res.render('resetpassword', resultobj);
  })

      //修改密碼(從信箱點認證信時觸發)
      router.get('/member/reset_password/:token',async function(req,res){

        let resultobj = await exports.getreseetPW_resultobj(req.params.token,"mail");
        return res.render('resetpassword', resultobj);
    
        });

  //修改密碼(輸入新密碼後點選確認後觸發)
  router.post('/member/reset_password',async function(req,res){
    let resultobj ={};
    let paramsobj = {
       "email" :  req.body.email,
       "token" :  req.body.token,
       "oldpw": req.body.oldpw,
       "newpw": req.body.newpw,
       "newpwcheck": req.body.newpwcheck,
       "from": req.body.from //from = web or mail
     };


     let check_resultobj = await check.resetpassword(paramsobj);
 
     if(check_resultobj.RespCode == '0000')resultobj= await bomodule.resetpassword(paramsobj); 
     else resultobj = check_resultobj;

     return res.end(JSON.stringify(resultobj))
  });

  //忘記密碼(寄密碼認證信)
  router.post('/member/forgot_password',async function(req,res){
    let resultobj ={};
    let paramsobj = {
       "email" : req.body.email
     };
 
     let check_resultobj = await check.forgotpassword(paramsobj);
 
     if(check_resultobj.RespCode == '0000') resultobj= await bomodule.forgotpassword(paramsobj);
     else resultobj = check_resultobj;
     
 
     return res.end(JSON.stringify(resultobj))
 
  });

  
exports.getreseetPW_resultobj= async function (token,from){
    let paramsobj = {
      "token": token,
      "from": from
    };

    let resultobj = await check.resetpassword_verifytoken(paramsobj);
    resultobj.email ="";
    resultobj.token ="";
    resultobj.from = from;

    if(resultobj.RespCode == '0000')
    {
      let result = jwtoken.verifytoken(paramsobj.token);
      resultobj.email = result.data._id;
      resultobj.token = token;
    }

    return resultobj;

  }

 //檢查目前是否為登入狀態 
 router.get('/member/check_login',auth ,async function(req,res){

  let resultobj ={};
  let paramsobj = {
     "islogin" : req.user.islogin
   };
    console.log('/member/check_login...')
    resultobj= await bomodule.check_login(paramsobj);
    console.log(resultobj)
    
   return res.end(JSON.stringify(resultobj))

});

module.exports = router;