window.onload = function(){

        let menu = document.getElementById("menu");
        menu.addEventListener('click',(event)=>
        {
            window.location.href = "/admin_menu";
        })
    
        //刊登商品
         let form = document.getElementById("sellfrom");
         form.addEventListener('submit',(event)=>
         {
             event.preventDefault();  
             let totalcount = document.getElementById("totalcount").value;
             let cansalecount = document.getElementById("cansalecount").value;
           
                 if(savelfile.length == 0)
                 {
                     alert("刊登商品至少上傳一張照片！")
                 }
                 else if(parseInt(totalcount)<parseInt(cansalecount))
                 {
                    alert("可銷售數量不可大於庫存數量！")
                 }
                 else
                 {
                     let form_Data = new FormData();
                     //把上傳圖片取出
                     let count = savelfile.length;
                     for(let i=0;i<count;i++){
                         let item = savelfile[i];
                         form_Data.append("file", item);
                     }
                     form_Data.append("productname", document.getElementById("productname").value);
                     form_Data.append("intro", document.getElementById("intro").value);
                     form_Data.append("protypeno", document.getElementById("protypeno").value);
                     form_Data.append("unitprice", document.getElementById("unitprice").value);
                     form_Data.append("specialprice", document.getElementById("specialprice").value);
                     form_Data.append("cost", document.getElementById("cost").value);
                     form_Data.append("totalcount", document.getElementById("totalcount").value);
                     form_Data.append("cansalecount", document.getElementById("cansalecount").value);
                     fetch("/createproduct",{
                         method:"POST",
                         body: form_Data,
                         contentType: 'multipart/form-data',
                     }).then((response)=>{
                         return response.json();
                     }).then((data)=>{
                         if(data["RespCode"] == "0000"){
                             alert("刊登商品成功！")
                             window.location.href = "/admin_createproduct";
                         }
                         else
                         {
                             alert("刊登商品失敗"+data["respdesc"])
                         }
                     });
                 }
         });
    
}

//上傳商品照片區
var savelfile=[];
var fileid=[];
function uploadpic(){
    var imgs="";
    imgs = document.getElementById("show").getElementsByTagName("img");
    var len = imgs.length;
   for (var i = 0; i < len ; i++) 
   {
     if(len!=0){
      var img_id = imgs[i].id;
     }
     else{
        len = 0;
     }
   }
    if(len >5){
        alert("上傳照片上限6張！")
    }
    else{
        if(len != 0){
            var newlen = img_id.substring(img_id.length-1);
            var nextnum=parseInt(newlen)+1;
        }
        else{
            nextnum = 0;
        }
        let file = document.getElementById("file").files;
        if(file.length > 0){
            let filereader = new FileReader();
            filereader.readAsDataURL(file[0]);
            filereader.onload=function(e)
            {
                let divshow=document.getElementById("show");
                let showpic =document.createElement("div");
                let show_id="show"+nextnum;
                showpic.setAttribute("id",show_id);
                showpic.className="showpic";
                let pic = document.createElement("img");
                pic.setAttribute("src",e.target.result);
                let pic_id="pic"+nextnum;
                pic.setAttribute("id",pic_id);
                pic.className="everypic";
                let p_x = document.createElement("p");
                p_x.setAttribute("onclick","deletepic("+show_id+","+pic_id+")");
                p_x.className="dele";
                p_x.innerHTML="X";
                showpic.appendChild(pic);
                showpic.appendChild(p_x);
                divshow.appendChild(showpic);
                savelfile.push(file[0]); //陣列紀錄上傳的圖片
                fileid.push(pic_id);//陣列紀錄上傳的圖片ID
                console.log(savelfile)
                console.log(savelfile[0])
                console.log(fileid)
            }
        }
    }
}

//刪除圖片
function deletepic(showid,picid){
    document.getElementById(showid.id).remove();
    let pic_id=picid.id;
    if(fileid.indexOf(picid)){
        let num=fileid.indexOf(pic_id);
        fileid.splice(num,1);
        savelfile.splice(num,1);
        console.log(num)
    }
}


