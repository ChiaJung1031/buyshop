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
    
    document.getElementById("lbltitleRegist").innerHTML ="會員註冊"
    Show("btnInsert")
    hide("btnUpdate")
    Show("btnRegistPrePage")

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

function btnShowMember_click()
{
    
    btnRegist_click();
    hide("txtemail");
    hide("txtpassword");
    hide("divalert");
    hide("btnInsert")
    hide("btnRegistPrePage")
    Show("btnUpdate")
    
    document.getElementById("lbltitleRegist").innerHTML ="會員資料修改"

    //load member data
    fetch("/member/search",{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{

        if(data["RespCode"] == '0000'){
          document.getElementById("txtphonenum").value = data.RespData[0].phonenum;
          document.getElementById("txtaddr").value = data.RespData[0].addr;
          document.getElementById("txtname").value = data.RespData[0].name;
            
        }
        else if(data["RespCode"] == 'XXXX')
        {
            alert("取得會員資料失敗，請稍後再試！")
        }
        else
        {
             document.getElementById("divalert").innerHTML = data["RespDesc"];
             Show("divalert")
        }
    })

}
function btnUpdate_click()
{

    let phonenum = document.getElementById("txtphonenum").value;
    let addr = document.getElementById("txtaddr").value;
    let name = document.getElementById("txtname").value;
    
    let member_info = {
                    "phonenum":phonenum,
                    "addr":addr,
                    "name":name
                   };
        
        hide("divalert");
        fetch("/member/update",{
            method:"POST",   
            body: JSON.stringify(member_info),
            headers: {
                "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data["RespCode"] == '0000'){
                    alert("修改成功！");;
                    load_member();
                
                }
                else if(data["RespCode"] == 'XXXX')
                {
                    alert("修改失敗，請稍後再試！")
                }
                else
                {
                     document.getElementById("divalert").innerHTML = data["RespDesc"];
                     Show("divalert")
                }
            })
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
    location.href ="/member/logout"   
}
function btnForgetPwNext_click()
{

    let email = document.getElementById("txtEmail_ForgetPw").value;
 
    let info = {"email":email};

        fetch("/member/forgot_password",{
            method:"POST",   
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                console.log(data)
                if(data.RespCode == '0000'){
                    document.getElementById("lblMsg_ForgetPw").innerText ="重設密碼信件已寄到您的Email" ;
                    Show("lblMsg_ForgetPw")
                    Show("btnForgetPwOK")
                    hide("btnForgetPwNext")
                }
                else if(data.RespCode == 'XXXX')
                {
                    alert("重設密碼信件寄送失敗，請稍後再試！")
                }
                else
                {
                     document.getElementById("divalert_ForgetPw").innerHTML = data.RespDesc;
                     Show("divalert_ForgetPw")
                }
            })
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
   window.location.href =  "/cart";
}


//編輯商品
function load_category(){

    fetch("/product/category",{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{

        if(data.RespCode  == '0000')
        {
            let count = data.RespData.length;
            let loopcount = count > 8 ? 7 : count;
            let ulnav=document.getElementById("ulnav");
            let ul_all_category=document.getElementById("ul_all_category");

            
            let li_Html ='';
            for(let i=0;i<loopcount;i++){
                li_Html += '<li class="nav-item"><a class="nav-link text-white" aria-current="page" href="/product/list/' + data.RespData[i].categoryno + '?nowpage=1">'+ data.RespData[i].name+'</a></li>';
           }

           //分類數量 > 8 在位置八的地方顯示 所有分類按鈕
           if(count > 8)
           {
             li_Html +=' <li class="nav-item btn-all-category"> <a class="nav-link text-white"   data-bs-toggle="collapse" href="#collapse_all_category" role="button" aria-expanded="false" aria-controls="collapse_all_category">所有分類</a></li>';
           }
           ulnav.innerHTML =li_Html;

           //ul_all_category
           let li_Html_all_category =""
           for(let i=loopcount;i<count;i++){
                li_Html_all_category += '<li ><a class="text-decoration-none text-black" href="/product/list/' + data.RespData[i].categoryno + '?nowpage=1">'+ data.RespData[i].name+'</a></li>';
           }
           ul_all_category.innerHTML =li_Html_all_category;

       }
    }).catch((e) => {
        console.log(e,",load_category 失敗")
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
function btnInsert_click(){
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
    console.log(data)
        if(data.RespCode  == '0000')
        {
            document.getElementById("btnadmin").innerHTML = data.RespData[0].name;
            let uladmin=document.getElementById("uladmin");
            let li_Html ='<li><a class="dropdown-item" href="/order/search">訂單查詢</a></li>';
                li_Html += '<li><a class="dropdown-item" onclick="btnShowMember_click()">會員資料修改</a></li>';
                li_Html +='<li><a class="dropdown-item" href="/member/reset_password">重設密碼</a></li>';
                li_Html += '<li><hr class="dropdown-divider"></li>';
                li_Html += '<li><a class="dropdown-item" href="#" id="btnLogOut" onclick="btnLogOut_click()">登出</a></li>';
           
           uladmin.innerHTML =li_Html;
           Show("divMemberInfo")
           hide("divLoginShow")
       }
    }).catch((e) => {
        console.log(e,",load_member 失敗")
    });
}
