window.onload = function(){
    load_category();
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

//編輯商品
function load_category(){

    fetch("/productcategory",{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{

        if(data.RespCode  == '0000')
        {
            let count = data.RespData.length;
            let ulnav=document.getElementById("ulnav");
            let li_Html =' <li class="nav-item"><a class="nav-link text-white" aria-current="page" href="../index">首頁</a></li>';
            for(let i=0;i<count;i++){
               
                let li_html = document.createElement("li");
                li_Html += '<li class="nav-item"><a class="nav-link text-white" aria-current="page" href="../productlist/' + data.RespData[i].categoryno + '?nowpage=1">'+ data.RespData[i].name+'</a></li>';
           }
           ulnav.innerHTML =li_Html;
       }
    }).catch((e) => {
        console.log(e,",productcategory data失敗內容")
    });
 }