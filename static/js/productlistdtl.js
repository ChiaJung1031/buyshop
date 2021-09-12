window.onload=function(){
    
}
 

//加入購物車
function  addtocart(no){
  let qty = document.getElementById('ddlqty').value
  
  if(parseInt(qty,10) > 0)
  {
    fetch("/cart/add/" + no +"/" + qty , {
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
          //購物車總數量 + 1
          load_cart();
    });
  }
  else
  {
      alert("請選擇數量")
  }
    
}

