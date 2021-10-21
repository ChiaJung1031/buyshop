const jwtoken  = require("./jwtoken")


const auth = async (req, res, next) => {
   //2.之後 requset header 都會帶著有 token 的 cookie
   //3.需要權限才能操作的頁面，需先認證 token
   let token = req.cookies.token ?req.cookies.token:"";
    console.log('auth token....')
    console.log(token)
    let verify = jwtoken.verifytoken(token);
    let user = {
      userid : "",
      username : "",
      islogin : false
    };
    if(verify.isvaild)
    {
      let encode = verify.data;
      //1100929 如已經會員登入 每次 request 時，token的到期時間要更新 cookie到期時間也要更新
      let newtoken = jwtoken.genAuthtoken(encode._id,encode._name,"login");
      res.cookie('token', newtoken, { maxAge: parseInt(process.env.JWT_EXPIRESIN_LOGIN) * 60 *1000 , httpOnly: true}); 

       
          user.userid = encode._id;
          user.username = encode._name;
          user.islogin = true;

          req.user = user;
        
        next();
    }
    else
    {  
      let url = req.url;
      let method = req.method;
       console.log(req.url,req.method)
       if(url == "/member/check_login" && method == "GET" )
       {
            req.user = user;
            next();
       }
       else
       {
         res.redirect('/product/list');
       }

    }
    
}

module.exports = auth;
