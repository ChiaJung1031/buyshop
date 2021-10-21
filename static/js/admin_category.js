window.onload = function(){
    selectcate();

    let menu = document.getElementById("menu");
    menu.addEventListener('click',(event)=>
    {
        window.location.href = "/admin_menu";
    })
}

//查詢分類
function selectcate()
{
    fetch("/select_category/",{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.RespCode =='XXXX')
        {
            document.getElementById("table").style.display="none";
        }
        else
        {
            let tbody = document.getElementById("tbody");
            for(let i=0;i<data.RespData.length;i++)
            {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td1_txt = document.createTextNode([data.RespData[i].name]);
                let td2_txt = document.createTextNode([data.RespData[i].sort]);
                td1.appendChild(td1_txt);
                td2.appendChild(td2_txt);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
            }
        }
    });
}

//新增分類
function createcate()
{
    let catename = document.getElementById("new_cate").value;
    let new_no =  document.getElementById("new_no").value;
    let info = {"catename":catename,"new_no":new_no}
    if(catename == "" ||  new_no == "" ){
        alert("請輸入分類名稱及編號！")
    }
    else{
            fetch("/new_category/",{
                method:"POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json"
                    }
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data.RespCode == "0000")
                {
                    alert("新增成功！")
                    location.reload();
                }
                else
                {
                    alert("分類名稱重複！")
                }
              
                
            });
        }
}



//刪除分類
function deletecate()
{
        let dele_cate = document.getElementById("dele_cate").value;
        let info = {"catename":dele_cate}
        if(dele_cate == "")
        {
            alert("請輸入欲刪除的分類名稱！")
        }
        else
        {
            fetch("/delete_category/",{
                    method:"PATCH",
                    body: JSON.stringify(info),
                    headers: {
                               "Content-Type": "application/json"
                             }
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    if(data.RespCode =='0000')
                    {
                        alert("刪除成功！")
                        location.reload();
                    }
                    else
                    {
                        alert("請輸入正確的分類名稱！")
                    }
                });
        }


}