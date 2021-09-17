//check 資料夾 統一回傳的格式
module.exports.genresultobj = function (lstrrespdesc,respcode) {

  let resultobj= {}; 

  if( respcode == this.respcodelist.required){
   //必填檢核回傳
    resultobj.RespCode = respcode;
    resultobj.RespDesc =  lstrrespdesc.join('、')  + " 為必填欄位";

   }else if(respcode == this.respcodelist.basic || respcode == this.respcodelist.special) {
    //基本檢核回傳 //特殊檢核回傳
        resultobj.RespCode = respcode;
        resultobj.RespDesc =  lstrrespdesc.join('、');

   }else {
    //檢核都沒問題回傳
        resultobj.RespCode = respcode;
        resultobj.RespDesc =  "";
   }

   

   console.log('genresultobj....')
   console.log(resultobj)
   return resultobj;
}

//check 資料夾回傳的 三種 respcode list
module.exports.respcodelist =
       {
            required: "R001",
            basic: "B001",
            special: "S001"
        }; 
        
  

//email 格式驗證
module.exports.isemail = function (email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//電話 格式驗證
module.exports.isphonenum = function (phonenum) {
  //長度 10 碼 且為 數字
   if(phonenum.length != 10) return false;
   if(!this.isnumeric(phonenum))return false;

   return true;
}

//是否為數字
module.exports.isnumeric = function (value) {
    let re =  /^-?\d+$/
    return re.test(value);
}

//檢核密碼長度
module.exports.ispassword = function (password) {
    return password.trim().length >= 8
}
