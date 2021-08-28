window.onload = function(){
    load_old_product();

    //刊登商品
     let form = document.getElementById("sellfrom");
     form.addEventListener('submit',(event)=>{
         event.preventDefault();  
         let checkpage=location.href.split('/createproduct/')[1]; 
         if(checkpage == "sell")
         {   
             if(savelfile.length == 0){
                 alert("刊登商品至少上傳一張照片！")
             }
             else{
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
                 fetch("/api/createproduct/sell",{
                     method:"POST",
                     body: form_Data,
                     contentType: 'multipart/form-data',
                 }).then((response)=>{
                     return response.json();
                 }).then((data)=>{
                     if(data["RespCode"] == "200"){
                         alert("刊登商品成功！")
                         window.location.href = "/createproduct/sell";
                     }
                     else{
                         alert("刊登商品失敗，"+data["RespDesc"])
                     }
                 });
             }
         }
         else{
                 //查看目前有幾張照片
                 let countpic=document.getElementById("show").getElementsByTagName("img").length;
                 if(countpic.length == 0){
                     alert("刊登商品至少上傳一張照片！")
                 }
                 else{
                     let form_Data = new FormData();
                     //把上傳圖片取出
                     let count = savelfile.length;
                     for(let i=0;i<count;i++){
                         let item = savelfile[i];
                         form_Data.append("file", item);
                     }
                     let allurl="";
                     for(let n=0;n<countpic;n++){
                     let c_https = document.getElementById("show").getElementsByTagName("img")[n].src.substring(0,5);
                     if(c_https=="https"){
                         allurl+=document.getElementById("show").getElementsByTagName("img")[n].src +",";
                         }
                     }       
                     form_Data.append("existfile", allurl);     
                     form_Data.append("productname", document.getElementById("productname").value);
                     form_Data.append("intro", document.getElementById("intro").value);
                     form_Data.append("protypeno", document.getElementById("protypeno").value);
                     form_Data.append("unitprice", document.getElementById("unitprice").value);
                     form_Data.append("specialprice", document.getElementById("specialprice").value);
                     form_Data.append("cost", document.getElementById("cost").value);
                     form_Data.append("totalcount", document.getElementById("totalcount").value);
                     form_Data.append("cansalecount", document.getElementById("cansalecount").value);
                     console.log(form_Data)
                     fetch("/api/createproduct/"+checkpage,{
                         method:"PATCH",
                         body: form_Data,
                         contentType: 'multipart/form-data',
                     }).then((response)=>{
                         return response.json();
                     }).then((data)=>{
                        if(data["RespCode"] == "200"){
                            alert("刊登商品成功！")
                            window.location.href = "/createproduct/sell";
                        }
                        else{
                            alert("刊登商品失敗，"+data["RespDesc"])
                        }
                     });
                 }
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


//編輯商品
function load_old_product(){
    let productID=location.href.split('/createproduct/')[1]; //取得商品ID
    fetch("/api/createproduct/"+productID,{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data["error"]  == null)
        {
            let allphoto = (data["data"]["photo"]).substring(0,data["data"]["photo"].length-1).split(',');
            let count = allphoto.length;
            for(let i=0;i<count;i++){
                let divshow=document.getElementById("show");
                let showpic =document.createElement("div");
                let show_id="show"+i;
                showpic.setAttribute("id",show_id);
                showpic.className="showpic";
                let pic = document.createElement("img");
                pic.setAttribute("src",allphoto[i]);
                let pic_id="pic"+i;
                pic.setAttribute("id",pic_id);
                pic.className="everypic";
                let p_x = document.createElement("p");
                p_x.setAttribute("onclick","deletepic("+show_id+","+pic_id+")");
                p_x.className="dele";
                p_x.innerHTML="X";
                showpic.appendChild(pic);
                showpic.appendChild(p_x);
                divshow.appendChild(showpic);
            }
        }
    }).catch((e) => {
        console.log(e,",登入data失敗內容~~~~~~~~~~~")
    });
 }