const express = require('express');
const session=require('express-session')
const bomodule = require("../module/member")
const check = require("../check/check_member")
const router = express.Router();


//取得會員資料
 router.get('/member/search',async function(req,res){

  let resultobj = {};
  let paramsobj = {
    "email": req.session.userid,
    "name": req.session.username
  };

  let check_resultobj = await check.search(paramsobj);

    if(check_resultobj.RespCode == '0000') 
    {
      resultobj= await bomodule.search(paramsobj);
    }
    else resultobj = check_resultobj;  
    
    console.log(resultobj)

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

   let paramsobj = {
      "email": req.body.email,
      "password": req.body.password,
    };

    let check_resultobj = await check.login(paramsobj);

    if(check_resultobj.RespCode == '0000') 
    {
      resultobj= await bomodule.login(paramsobj);
      req.session.userid = resultobj.RespData.member.email;
      req.session.username = resultobj.RespData.member.name;
    }
    else resultobj = check_resultobj;
    

    return res.end(JSON.stringify(resultobj))

 });





module.exports = router;