window.onload=function(){
    
}

//修改密碼
function btnUpdatePwOK_click(){

    //update password
    let oldpw = document.getElementById("txtOldPw") ? document.getElementById("txtOldPw").value : "";
    let newpw = document.getElementById("txtNewPw").value;
    let newpwcheck = document.getElementById("txtNewPwCheck").value;
    let token = document.getElementById("txttoken_UpdatePw").value;
    let email = document.getElementById("txtemail_UpdatePw").value;
    let from = document.getElementById("txtfrom_UpdatePw").value;

    
    
    let info = {
                "email":email,
                "token":token,
                "oldpw":oldpw,
                "newpw":newpw,
                "newpwcheck":newpwcheck,
                "from":from
               };
             
        hide("divalert_UpdatePw");

        fetch("/member/reset_password",{
            method:"POST",   
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                console.log(data)
                if(data["RespCode"] == '0000'){
                    alert("修改成功!")
                    window.location.href = "/product/list";
                }
                else if(data["RespCode"] == 'XXXX')
                {
                    alert("修改失敗，請稍後再試！")
                }
                else
                {
                     document.getElementById("divalert_UpdatePw").innerHTML = data["RespDesc"];
                     Show("divalert_UpdatePw")
                }
            })

    
}