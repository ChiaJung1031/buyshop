window.onload = function(){
 
    document.getElementById("modifybox").style.display="none";

    let menu = document.getElementById("menu");
    menu.addEventListener('click',(event)=>
    {
        window.location.href = "/admin_menu";
    })


     //修改商品
     let form = document.getElementById("sellfrom");
     form.addEventListener('submit',(event)=>
     {
         event.preventDefault();  
         let totalcount = document.getElementById("totalcount").value;
         let cansalecount = document.getElementById("cansalecount").value;
       
            let countpic=document.getElementById("show").getElementsByTagName("img").length;
            let protypeno=document.getElementById("protypeno").value;
             if(countpic.length == 0){
                alert("刊登商品至少上傳一張照片！")
             }
             else if(parseInt(totalcount)<parseInt(cansalecount))
             {
                alert("可銷售數量不可大於庫存數量！")
             }
             else if(protypeno=="")
             {
                alert("請選擇類別！")
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
                 form_Data.append("productno", document.getElementById("productno").value);
                 form_Data.append("productname", document.getElementById("productname").value);
                 form_Data.append("intro", document.getElementById("intro").value);
                 form_Data.append("protypeno", document.getElementById("protypeno").value);
                 form_Data.append("unitprice", document.getElementById("unitprice").value);
                 form_Data.append("specialprice", document.getElementById("specialprice").value);
                 form_Data.append("cost", document.getElementById("cost").value);
                 form_Data.append("totalcount", document.getElementById("totalcount").value);
                 form_Data.append("cansalecount", document.getElementById("cansalecount").value);
                 fetch("/modifyproduct",{
                     method:"PATCH",
                     body: form_Data,
                     contentType: 'multipart/form-data',
                 }).then((response)=>{
                     return response.json();
                 }).then((data)=>{
                     if(data.RespCode =='0000'){
                         alert("商品修改成功！")
                         window.location.href = "/admin_searchproduct";
                     }
                     else
                     {
                         alert("商品修改失敗"+data["respdesc"])
                     }
                 });
             }
     });
}


function search(){
    loadcategory();
    let productID = document.getElementById("search_id").value;
    fetch("/searchproduct/"+productID,{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.RespCode =='0000')
        {
            document.getElementById("searchbox").style.display="none";
            document.getElementById("modifybox").style.display="block";
            for(let i=0;i<data.RespData.length;i++)
            {
                let allphoto = (data.RespData[i].picpath).substring(0,data.RespData[i].picpath.length-1).split(',');
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
                document.getElementById("productno").value=data.RespData[i].productno;
                document.getElementById("protypeno").value=data.RespData[i].protypeno;
                document.getElementById("productname").value=data.RespData[i].productname;
                document.getElementById("unitprice").value=data.RespData[i].unitprice;
                document.getElementById("specialprice").value=data.RespData[i].specialprice;
                document.getElementById("cost").value=data.RespData[i].cost;
                document.getElementById("intro").value=data.RespData[i].intro;
                document.getElementById("totalcount").value=data.RespData[i].totalcount;
                document.getElementById("cansalecount").value=data.RespData[i].cansalecount;
            }
           
        }
        else{
            alert("請輸入正確的商品編號")
            document.getElementById("modifybox").style.display="none";
        }
    }).catch((e) => {
   
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

//產生類別選項
function loadcategory(){
    fetch("/loadcategory",{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.RespCode =='0000')
        {
            let protype=document.getElementById("protype");
            let select =document.createElement("select");
            select.setAttribute("id","protypeno");
            let option0=document.createElement("option");
            option0.value = "";
            option0.text = "請選擇分類";
            select.appendChild(option0);
            option0.selected = true;
            for(let i=0;i<data.RespData.length;i++)
            {
                let option =document.createElement("option");
                option.value = "g"+[i];
                option.text = data.RespData[i].name;
                select.appendChild(option);
            }
            protype.appendChild(select);
        }
        else
        {
            alert("請先新增分類！至少新增一項！")
            window.location.href = "/admin_category";
        }
    });
}
