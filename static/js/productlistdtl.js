window.onload=function(){
    
}
 


//加入購物車
function  addtocart(){
    let typeno=location.href.split('/productlist/')[1]; //取得商品ID
    fetch("/api/productlist/"+typeno,{
        method:"GET"
    }).then((response)=>{
        console.log(response)
        return response.json();
    }).then((data)=>{
        //repeat produvt card
        console.log(data)
        
    });
}

