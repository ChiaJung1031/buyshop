window.onload=function(){
   // getproinfo();
}
 

function changePage(topage){

   window.location.href = location.pathname + "?nowpage=" + topage;
}
function prePage(){

   let nowpage = document.getElementById('txtnowpage').value
  
   if(parseInt(nowpage,10) > 1) changePage(parseInt(nowpage,10) -1)
   
}
function nextPage(){

   let nowpage = document.getElementById('txtnowpage').value
   let totalpage = document.getElementById('txttotalpage').value
   if(parseInt(nowpage,10) < parseInt(totalpage,10)) changePage(parseInt(nowpage,10) + 1)
}

