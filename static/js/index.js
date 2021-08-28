window.onload=function(){
   
}

function btnForgetPw_click()
{
    document.getElementById("btnRegistClose").click();
    document.getElementById("btnLoginClose").click();
    document.getElementById("btnForgetPwShow").click();
    document.getElementById("lblMsg_ForgetPw").classList.remove("d-none");
    document.getElementById("lblMsg_ForgetPw").classList.add("d-none");
}

function btnRegist_click()
{
    document.getElementById("btnRegistShow").click();btnRegistShow
    document.getElementById("btnLoginClose").click();
    document.getElementById("btnForgetPwClose").click();

}

function btnRegistPrePage_click()
{
    document.getElementById("btnRegistClose").click();
    document.getElementById("btnLoginShow").click();
    document.getElementById("btnForgetPwClose").click();

}
function btnForgetPwPrePage_click()
{
    document.getElementById("btnRegistClose").click();
    document.getElementById("btnLoginShow").click();
    document.getElementById("btnForgetPwClose").click();

}

function btnLogin_click()
{
    document.getElementById("txtmemberid_login").value ="";
    document.getElementById("txtpassword_login").value ="";
    document.getElementById("btnLoginClose").click();
    document.getElementById("btnLoginClose").click();
    document.getElementById("btnMemberInfo").classList.remove("d-none");
    document.getElementById("btnLoginShow").classList.add("d-none");
    
    
}
function btnLogOut_click()
{
    document.getElementById("btnLoginShow").classList.remove("d-none");
    document.getElementById("btnMemberInfo").classList.add("d-none");
    
}
function btnForgetPwNext_click()
{
    document.getElementById("lblMsg_ForgetPw").innerText ="暫時密碼已寄到您的Email" ;
    document.getElementById("lblMsg_ForgetPw").classList.remove("d-none");
  
    
}







