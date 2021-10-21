window.onload=function(){
    // getproinfo();
 }
  
 
 function ordercancel(orderno)
{

    let info = {"orderno":orderno};
    
        fetch("/order/cancel",{
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
                    alert("取消訂單成功")
                    window.location.reload();
                }
                else if(data["RespCode"] == 'XXXX')
                {
                    alert("取消失敗，請稍後再試！")
                }
                else
                {
                    alert(data["RespDesc"]) 
                }
            })
   
}