function login(){
    let admin_account = document.getElementById("admin_account").value;
    let admin_password = document.getElementById("admin_password").value;
    if(admin_account != "buyshopadmin" && admin_password != "eric202108" ){
        alert("請確認帳號或密碼是否正確！")
    }
    else{
        window.location.href = "/admin_menu";
    }
   
}