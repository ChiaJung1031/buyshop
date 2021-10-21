const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();


var smtpTransport = nodemailer.createTransport({
  service: process.env.MAIL_SERViCE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
    tls: {
    rejectUnauthorized: false
  }
});

module.exports.sendResetEmail = async function(email, token){

    let url = process.env.HOST_NAME +"/member/reset_password/" + token;
    let html = "<p><br>＊ 此信件為系統發出信件，請勿直接回覆，感謝您的配合。謝謝！＊<br><br>";
        html +="親愛的會員 您好：<br><br>";
        html +="這封認證信是由鄉間曉路發出，用以處理您忘記密碼，當您收到本「認證信函」後，請直接點選下方連結重新設置您的密碼，無需回信。";
        html +="</p>";
        html +="<p><a href='" + url +"' target='_blank'><font color='#FF0000'>按此認證，重設密碼</font></a><br></p>";
        html +="<p>為了確保您的會員資料安全，重設密碼的連結將於此信件寄出後30分鐘內或您重設密碼後失效。</p><br><br>"  ;
        html +="鄉間曉路網站：" + process.env.HOST_NAME + "<br>";
  
      await smtpTransport.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "鄉間曉路會員密碼認證信函",
      html: html,
    })
  
};

module.exports.sendVerifyEmail = async (email, token) => {
  // change first part to your domain
  var url = "http://localhost:8000/user/verifyemail?token=" + token;

  await smtpTransport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "VERIFY Your EMAIL",
    text: `Click on this link to verify ${url}`,
    html: `<h3> Click on this link to verify your email : ${url} </h3>`,
  });
};