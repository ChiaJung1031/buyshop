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
    console.log(prdct)
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
    
    function changepage(index)
    {
        let urlarray =['../cart','../cart/receiverinfo','../productlist/A?nowpage=1'] 
         window.location.href = urlarray[index]
    }

     function orderinsert()
     {
         if( document.getElementsByName("recptname")[0].value !='' &&
         document.getElementsByName("recpttel")[0].value !='' && 
         document.getElementsByName("recptaddr")[0].value!='' )
        {
            document.getElementById("orderfrom").submit();


        }
        else
        {
            alert("收件人資訊，請填寫完整。")
        }
        

     }
    

