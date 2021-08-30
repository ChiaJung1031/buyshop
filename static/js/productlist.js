window.onload=function(){
    getproinfo();
}

function btnForgetPw_click()
{
    document.getElementById("btnRegistClose").click();
    document.getElementById("btnLoginClose").click();
    document.getElementById("btnForgetPwShow").click();
    document.getElementById("txtEmail_ForgetPw").value ="";
    hide("lblMsg_ForgetPw")
    hide("btnForgetPwOK")
    Show("btnForgetPwNext")

}

function btnRegist_click()
{
    document.getElementById("btnRegistShow").click();
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

    document.getElementById("btnForgetPwClose").click();
    document.getElementById("btnLoginShow").click();
}

function btnLogin_click()
{
    document.getElementById("txtmemberid_login").value ="";
    document.getElementById("txtpassword_login").value ="";
    document.getElementById("btnLoginClose").click();
    document.getElementById("btnLoginClose").click();
    Show("divMemberInfo")
    hide("divLoginShow")
   
}
function btnLogOut_click()
{
    Show("divLoginShow")
    hide("divMemberInfo")   
}
function btnForgetPwNext_click()
{
   document.getElementById("lblMsg_ForgetPw").innerText ="暫時密碼已寄到您的Email" ;
   Show("lblMsg_ForgetPw")
   Show("btnForgetPwOK")
   hide("btnForgetPwNext")
    
}
function btnForgetPwOK_click()
{ 
    document.getElementById("btnForgetPwClose").click();

}
function Show(id)
{ 
    document.getElementById(""+id +"").classList.remove("d-none");

}
function hide(id)
{ 
    document.getElementById(""+id +"").classList.add("d-none");

}

//取得商品資訊
function  getproinfo(){
    let typeno=location.href.split('/productlist/')[1]; //取得商品ID
    fetch("/api/productlist/"+typeno,{
        method:"GET"
    }).then((response)=>{
        console.log(response)
        return response.json();
    }).then((data)=>{
        //repeat produvt card
        console.log(data)
        
    });
}
