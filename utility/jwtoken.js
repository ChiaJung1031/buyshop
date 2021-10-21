const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const exp_resetpw = process.env.JWT_EXPIRESIN_RESETPW;//先設定30分鐘
const exp_login = process.env.JWT_EXPIRESIN_LOGIN;//先設定30分鐘


// 設定密鑰
const secret = process.env.JWT_SECRET; 
// 建立 Token
module.exports.genAuthtoken = function ( userid,username,type) {
    let _exp = 0;
    if(type == "login") _exp = parseInt(Date.now() / 1000) + exp_login * 60;
    else if (type =="resetPw") _exp = parseInt(Date.now() / 1000) + exp_resetpw * 60;
   
    return jwt.sign({ _id: userid.toString(),_name: username.toString() , exp: _exp}, secret)
}


// 驗證 Token
module.exports.verifytoken = function (token) {
    let obj = {};
    let data = null;
    let isvaild = false;
    let msg = "";
    try{
         data = jwt.verify(token, secret)
         isvaild = true;
    }catch(e){
        msg =e.toString();
    }

    obj.isvaild = isvaild;
    obj.data = data;
    obj.msg = msg;

    console.log(obj)

    return  obj

}
