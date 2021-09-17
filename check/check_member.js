const utl = require('../utility/util');
const utlenc = require('../utility/encrypt');
const bo = require('../module/member');
const db = require('../DAO/sql_member');

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

  console.log('paramsobj.email')
  console.log(paramsobj.email)
  console.log('paramsobj.name')
  console.log(paramsobj.name)
  console.log('paramsobj.email || paramsobj.name ....')
  console.log(paramsobj.email || paramsobj.name)

  if(paramsobj.email  )
  {
    console.log('paramsobj.email true')
  }

  if(paramsobj.name )
  {
    console.log('paramsobj.name true')
  }
  
  if(!paramsobj.email || !paramsobj.name )
  {
    lstrrespdesc.push("會員尚未登入")
    return utl.genresultobj(lstrrespdesc,utl.respcodelist.special)
   
  }
  

    
   return utl.genresultobj(lstrrespdesc,"0000")

}