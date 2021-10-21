const utl = require('../utility/util');
const utlenc = require('../utility/encrypt');
const bo = require('../module/member');
const db = require('../DAO/sql_member');
const jwtoken = require("../utility/jwtoken")
const dotenv = require('dotenv').config();

module.exports.register = async function(paramsobj){

    let lstrrespdesc = [];

     //檢核必填
     //email、password、姓名、電話、地址
     if(paramsobj.email.trim() == false)lstrrespdesc.push("電子郵件");
     if(paramsobj.password.trim()  == false)lstrrespdesc.push("密碼");
     if(paramsobj.name.trim()  == false)lstrrespdesc.push("姓名");
     if(paramsobj.phonenum.trim()  == false)lstrrespdesc.push("手機號碼");
     if(paramsobj.addr.trim()  == false)lstrrespdesc.push("地址");
     if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);

 
     //檢核資料格式
     //檢核email 格式 、檢核密碼長度 需大於八碼 、檢核電話格式
     if(utl.isemail(paramsobj.email.trim()) == false)lstrrespdesc.push("電子郵件格式錯誤");
     if(utl.ispassword(paramsobj.password.trim()) == false)lstrrespdesc.push("密碼長度需大於八碼");
     if(utl.isphonenum(paramsobj.phonenum.trim()) == false)lstrrespdesc.push("手機號碼格式錯誤");
     if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.basic)


     //特殊檢核
     //該 email 是否已存在
    let  info = { "email" : paramsobj.email};
    let  data = await bo.search(info);
    if(data.RespCode =="0000" && data.RespData.length > 0) 
    {
        lstrrespdesc.push("該電子郵件已註冊過");
        return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }else if(data.RespCode =="XXXX"){
         lstrrespdesc.push("發生錯誤請稍後在試");
         return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
    
    
   return utl.genresultobj(lstrrespdesc,"0000")

};



module.exports.update = async function(paramsobj){

  let lstrrespdesc = [];

   //檢核必填
   //email、password、姓名、電話、地址
   if(paramsobj.name.trim()  == false)lstrrespdesc.push("姓名");
   if(paramsobj.phonenum.trim()  == false)lstrrespdesc.push("手機號碼");
   if(paramsobj.addr.trim()  == false)lstrrespdesc.push("地址");
   if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);


   //檢核資料格式
   //檢核email 格式 、檢核電話格式
   if(utl.isphonenum(paramsobj.phonenum.trim()) == false)lstrrespdesc.push("手機號碼格式錯誤");
   if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.basic)


   //特殊檢核
 
  
 return utl.genresultobj(lstrrespdesc,"0000")

};
module.exports.login = async function(paramsobj){

    let lstrrespdesc = [];

     //檢核必填
     //email、password、姓名、電話、地址
     if(paramsobj.email.trim() == false)lstrrespdesc.push("電子郵件");
     if(paramsobj.password.trim()  == false)lstrrespdesc.push("密碼");
     if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);

     //檢核資料格式

     //特殊檢核
     //是否登入成功
     let  info = { "email" : paramsobj.email,"password" : utlenc.encrypt(paramsobj.password)};
     let  data = await db.get_member_by_email_pw(info);
          data = await JSON.parse(data);

    if(data.respdesc !=""){
         lstrrespdesc.push("發生錯誤請稍後在試");
         return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
    else if ( data.respdata.length == 0) 
    {
        lstrrespdesc.push("帳號、密碼錯誤 登入失敗");
        return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
    
    
   return utl.genresultobj(lstrrespdesc,"0000")

};

module.exports.search = async function(paramsobj){

  let lstrrespdesc = [];
  
  if(!paramsobj.email || !paramsobj.name )
  {
    lstrrespdesc.push("會員尚未登入")
    return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
   
  }
  

    
   return utl.genresultobj(lstrrespdesc,"0000")

}

module.exports.resetpassword = async function(paramsobj){
console.log(paramsobj)
  let lstrrespdesc = [];
     //驗證token
     if(paramsobj.from == "mail")//因從email驗證信過來的為非登入狀態故需驗證token
     {
          //檢查token是否已經用過 1100929
          let  infotoken = { "email" : paramsobj.email};
          let  datatoken = await db.getresetpwtoken(infotoken);
          let iserror =false;
          datatoken = await JSON.parse(datatoken);  

          if(datatoken.respdata[0].resetpwtoken !='' && datatoken.respdata[0].resetpwtoken  == paramsobj.token)
          {  //檢查token是否有效 
               let result = jwtoken.verifytoken(paramsobj.token);
               if(result.isvaild == false) iserror =true;
          } 
          else iserror =true;

          if(iserror)
          {
               lstrrespdesc.push("用戶端驗證失敗");
               return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
          }
     }
    
   //檢核必填
   //舊密碼 新密碼 新密碼確認
   if(paramsobj.from == "web" && paramsobj.oldpw.trim()  == false)lstrrespdesc.push("舊密碼");//因從email驗證信過來的為忘記密碼,故只有登入後按修改密碼的才需檢查舊密碼是否有輸入
   if(paramsobj.newpw.trim()  == false)lstrrespdesc.push("新密碼");
   if(paramsobj.newpwcheck.trim()  == false)lstrrespdesc.push("新密碼確認");
   if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);


   //檢核資料格式
   //檢核密碼
     if(utl.ispassword(paramsobj.newpw.trim()) == false)lstrrespdesc.push("密碼長度需大於八碼");
     if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.basic)


   //特殊檢核
   //確認舊密碼是否正確
   if(paramsobj.from == "web")
   {
     let  info = { "email" : paramsobj.email,"password" : utlenc.encrypt(paramsobj.oldpw.trim())};
     let  data = await db.get_member_by_email_pw(info);
          data = await JSON.parse(data);
  
    if(data.respdesc !=""){
         lstrrespdesc.push("發生錯誤請稍後在試");
         return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
    else if ( data.respdata.length == 0) 
    {
        lstrrespdesc.push("舊密碼錯誤");
        return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
    }
  
   }
  
     //新新密碼 與 新密碼確認 是否資料是否一致
     if(paramsobj.newpw.trim() != paramsobj.newpwcheck.trim())
     {
        lstrrespdesc.push("新密碼與新密碼確認輸入不一致");
        return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
     }
  
 return utl.genresultobj(lstrrespdesc,"0000")

};

module.exports.forgotpassword = async function(paramsobj){

  let lstrrespdesc = [];

   //檢核必填
   //email
   if(paramsobj.email.trim() == false)lstrrespdesc.push("電子郵件");
   if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);

   //檢核資料格式
   if(utl.isemail(paramsobj.email.trim()) == false)lstrrespdesc.push("電子郵件格式錯誤");
   if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.basic)

   //特殊檢核
   //是否為會員
   let  info = { "email" : paramsobj.email};
   let  data = await db.get_member_by_email(info);
        data = await JSON.parse(data);

  if(data.respdesc !=""){
       lstrrespdesc.push("發生錯誤請稍後在試");
       return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
  }
  else if ( data.respdata.length == 0) 
  {
      lstrrespdesc.push("該電子郵件非已註冊會員");
      return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
  }
  
  
 return utl.genresultobj(lstrrespdesc,"0000")

};

module.exports.resetpassword_verifytoken = async function(paramsobj){

     let lstrrespdesc = [];
   
      //檢核必填
      if(paramsobj.token.trim() == false)lstrrespdesc.push("驗證碼");
      if(lstrrespdesc.length > 0) return utl.genresultobj(lstrrespdesc,utl.respcodelist.required);
      //檢核資料格式
   
      //特殊檢核
      let  infotoken = { "email" : paramsobj.email};
      let  datatoken = await db.getresetpwtoken(infotoken);
      datatoken = await JSON.parse(datatoken);  
 
      //驗證token
      let result = await jwtoken.verifytoken(paramsobj.token);
      let iserror =false;

     if(result.isvaild == false){ iserror = true }
     else if(paramsobj.from == "mail")
     {//檢查 resetpwtoken 是否為空，確認是否已重置密碼了
          let  infotoken = { "email" : result.data._id};
          let  datatoken = await db.getresetpwtoken(infotoken);
          datatoken = await JSON.parse(datatoken);  
          if(datatoken.respdata[0].resetpwtoken =='') iserror = true
     }

     if(iserror)
     {
          lstrrespdesc.push("用戶端驗證失敗");
          return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
     }
    
     
    return utl.genresultobj(lstrrespdesc,"0000")
   
   };
