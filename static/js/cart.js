window.onload=function(){
    
}
 

//數量減一
function  reducebyOne(id){
 let prdct = document.getElementsByClassName('products-'+id+'')
 let qty = document.getElementsByClassName('prdct-qty-'+id+'')[0].innerHTML
 let order = document.getElementsByClassName('order')[0]
 
  if(parseInt(qty,10) -1 > 0)
  {
    fetch("/cart/reducebyOne/" + id  , {
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
          load_cart();
          if(data.RespCode =='0000')
          {
            document.getElementsByClassName('prdct-qty-'+id+'')[0].innerHTML = data.RespData.product.qty
            document.getElementsByClassName('prdct-subtotal-'+id+'')[0].innerHTML = data.RespData.product.subtotal
            order.getElementsByClassName('order-totalQty')[0].innerHTML = data.RespData.totalQty
            order.getElementsByClassName('order-totalPrice')[0].innerHTML = data.RespData.totalPrice
            order.getElementsByClassName('order-deliveryfee')[0].innerHTML = data.RespData.deliveryfee
            order.getElementsByClassName('order-ordertotalPrice')[0].innerHTML = data.RespData.ordertotalPrice
          }
        
    });
   }
   else
   {
       alert("數量至少一個")
   }
    
}

//數量加一
function  addbyOne(id){
    let prdct = document.getElementsByClassName('products-'+id+'')
    let qty = document.getElementsByClassName('prdct-qty-'+id+'')[0].innerHTML
    let cansalecount = document.getElementsByClassName('prdct-cansalecount-'+id+'')[0].value
    let order = document.getElementsByClassName('order')[0]

      if(parseInt(qty,10) + 1 <= parseInt(cansalecount,10) )
      {
        fetch("/cart/addbyOne/" + id  , {
            method:"GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
              load_cart();
              if(data.RespCode =='0000')
              {
                document.getElementsByClassName('prdct-qty-'+id+'')[0].innerHTML = data.RespData.product.qty
                document.getElementsByClassName('prdct-subtotal-'+id+'')[0].innerHTML = data.RespData.product.subtotal
                order.getElementsByClassName('order-totalQty')[0].innerHTML = data.RespData.totalQty
                order.getElementsByClassName('order-totalPrice')[0].innerHTML = data.RespData.totalPrice
                order.getElementsByClassName('order-deliveryfee')[0].innerHTML = data.RespData.deliveryfee
                order.getElementsByClassName('order-ordertotalPrice')[0].innerHTML = data.RespData.ordertotalPrice
              }
        });
      }
        
    }


//移除購物車項目
function  removeItem(id){
    let prdct = document.getElementsByClassName('products-'+id+'')[0]
    let order = document.getElementsByClassName('order')[0]
  
        fetch("/cart/removeItem/" + id  , {
            method:"GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
              load_cart();
              if(data.RespCode =='0000')
              {
                if(data.RespData.totalQty == 0)  window.location.href =  "../cart";

                prdct.remove(); 
                order.getElementsByClassName('order-totalQty')[0].innerHTML = data.RespData.totalQty
                order.getElementsByClassName('order-totalPrice')[0].innerHTML = data.RespData.totalPrice
                order.getElementsByClassName('order-deliveryfee')[0].innerHTML = data.RespData.deliveryfee
                order.getElementsByClassName('order-ordertotalPrice')[0].innerHTML = data.RespData.ordertotalPrice
            }
        });
        
    }

    
    function  checklogin(){   
        fetch("/member/check_login", {
            method:"GET"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
              if(data.RespCode =='0000')
              {
                  if(data.RespData.islogin) window.location.href ="../cart/receiverinfo"
                  else  document.getElementById("btnLoginShow").click();
              }
        });  
    }

        
    function changepage(index)///member/check_login
    {
        let urlarray =['../cart','../product/list'] 
         window.location.href = urlarray[index]
    }

     function orderinsert()
     {
        let recptname = document.getElementsByName("recptname")[0].value ;
        let recpttel =  document.getElementsByName("recpttel")[0].value ;
        let recptaddr = document.getElementsByName("recptaddr")[0].value ;
    
        let info = {
                        "recptname":recptname,
                        "recpttel":recpttel,
                        "recptaddr":recptaddr
                    };
        
        hide("divalert_recpt");
        fetch("/order/insert",{
            method:"POST",   
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json"
                }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data["RespCode"] == '0000'){
                    
                 document.getElementsByName("orderno")[0].value = data["RespData"].orderno;
                 document.getElementsByName("ordertotalPrice")[0].value = data["RespData"].ordertotalPrice ;
                   
                document.getElementById("orderfrom").submit();
                
                }
                else if(data["RespCode"] == 'XXXX')
                {
                    alert("修改失敗，請稍後再試！")
                }
                else if(data["RespCode"] == 'S001')
                {
                    location.href = "/cart";
                }
                else{
                     document.getElementById("divalert_recpt").innerHTML = data["RespDesc"];
                     Show("divalert_recpt")
                }
            })
        

     }
    

