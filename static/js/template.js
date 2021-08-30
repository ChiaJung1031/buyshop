window.onload = function(){
    login();
}

//登入
function login(){
    let account = document.getElementById("admin_account").value;
    let password = document.getElementById("admin_password").value;
    let login_info = {"account": account, "password": password};
    if(account !="" && password != "")
    {
        fetch("/api/member/",{
            method:"PATCH",
            body: JSON.stringify(login_info),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
           if(data["error"] == null){
               
           }
          
        });

    }
    else
    {
        alert("請輸入帳號及密碼！")
    }
}