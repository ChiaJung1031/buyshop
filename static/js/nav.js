window.onload = function(){
    load_category();
    load_cart();
    load_member(); //取得會員資料 

    
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

    let email = document.getElementById("txtemail_login").value;
    let password = document.getElementById("txtpassword_login").value;
    
    let info = {"email":email, "password":password};
    
        hide("divalert_login");

        fetch("/member/login",{
            method:"POST",   
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data["RespCode"] == '0000'){
                    //1.重新整理該頁面 
                    load_member();
                    document.getElementById("txtemail_login").value ="";
                    document.getElementById("txtpassword_login").value ="";
                    document.getElementById("btnLoginClose").click();
                }
                else if(data["RespCode"] == 'XXXX')
                {
                    alert("登入失敗，請稍後再試！")
                }
                else
                {
                     document.getElementById("divalert_login").innerHTML = data["RespDesc"];
                     Show("divalert_login")
                }
            })
   
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
function toCartpage()
{ 
   window.location.href =  "../cart";
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

 //取得購物車商品總數量
 //加入購物車
function load_cart(){

      fetch("/cart/get", {
          method:"GET"
      }).then((response)=>{
          return response.json();
      }).then((data)=>{
            //購物車總數量 + 1
         console.log(data)
          document.getElementById('lblcartqty').innerText = data.RespData.totalQty;
       
          
      });
}

//填寫資料完點註冊
function btnregister_click(){
    let email = document.getElementById("txtemail").value;
    let password = document.getElementById("txtpassword").value;
    let phonenum = document.getElementById("txtphonenum").value;
    let addr = document.getElementById("txtaddr").value;
    let name = document.getElementById("txtname").value;
    
    let register_info = {
                    "email":email,
                    "password":password,
                    "phonenum":phonenum,
                    "addr":addr,
                    "name":name
                   };
    
        hide("divalert");

        fetch("/member/register",{
            method:"POST",   
            body: JSON.stringify(register_info),
            headers: {
                "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data["RespCode"] == '0000'){
                    alert("註冊成功，請重新登入！")
                    btnRegistPrePage_click();
                }
                else if(data["RespCode"] == 'XXXX')
                {
                    alert("註冊失敗，請稍後再試！")
                }
                else
                {
                     document.getElementById("divalert").innerHTML = data["RespDesc"];
                     Show("divalert")
                }
            })
    }

//取得會員資料
function load_member(){

    fetch("/member/search",{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{

        if(data.RespCode  == '0000')
        {
            document.getElementById("btnadmin").innerHTML = data.RespData[0].name;
            let uladmin=document.getElementById("uladmin");
            let li_Html ='<li><a class="dropdown-item" href="../order/search">訂單查詢</a></li>';
                li_Html += '<li><a class="dropdown-item" href="../member/update">會員資料修改</a></li>';
                li_Html += '<li><hr class="dropdown-divider"></li>';
                li_Html += '<li><a class="dropdown-item" href="#" id="btnLogOut" onclick="btnLogOut_click()">登出</a></li>';
           
           uladmin.innerHTML =li_Html;
           Show("divMemberInfo")
           hide("divLoginShow")
       }
    }).catch((e) => {
        console.log(e,",checkislogin 失敗")
    });}
