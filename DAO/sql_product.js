const dbhelp = require("../utility/dbhelp");

//載入各商品資料
exports.get_productlist = async function(req)
{

            let offsetnum =  (req["pagesize"] * req["nowpage"]) - req["pagesize"];
            let select_sql= "select a1.productno,a1.productname,a1.intro,a1.picpath,a1.unitprice,a1.specialprice,a1.cansalecount,b2.categoryno,b2.name as categoryname";
            select_sql += " from product a1 ";
            select_sql += " left join category b2 on (a1.categoryno = b2.categoryno)";
            select_sql += " where a1.categoryno = ? limit ? offset ?";
            
            let array_param = [req["typeno"],req["pagesize"],offsetnum]
            
            
            let resultobj =  await dbhelp.executequery(select_sql,array_param);

            return resultobj;
           
};

//載入各商品資料
exports.get_productlist_by_keyword = async function(req)
{

            let select_sql= "select a1.productno,a1.productname,a1.intro,a1.picpath,a1.unitprice,a1.specialprice,a1.cansalecount,b2.categoryno,b2.name as categoryname";
            select_sql += " from product a1 ";
            select_sql += " left join category b2 on (a1.categoryno = b2.categoryno)";
            select_sql += " where a1.productname like  ? ";
            
            let array_param = ["%" + req["keyword"] + "%"]
            
            
            let resultobj =  await dbhelp.executequery(select_sql,array_param);

            return resultobj;
           
};
 

exports.get_productCnt = async function(req)
{

    let select_sql= "select count(*) as total from product where categoryno = ?";
    let array_param = [req["typeno"]]
            
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;

  
}

//載入商品分類
exports.get_category = async function(req)
{

    let select_sql= "select categoryno,name from category order by sort";
    let resultobj =  await dbhelp.executequery_no_param(select_sql);

    return resultobj;
 
}

//載入商品分類
exports.get_categoryname = async function(req)
{

    let select_sql= "select categoryno,name from category where categoryno = ?";
    let array_param = [req["typeno"]]
    
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;
 
}

//載入商品分類
exports.get_first_category = async function()
{

    let select_sql= "select  categoryno,name from category order by sort limit 1";
    let resultobj =  await dbhelp.executequery_no_param(select_sql);

    return resultobj;
 
}

//載入各商品資料
exports.get_productdtl = async function(req)
{

    let select_sql= "select a1.productno,a1.productname,a1.intro,a1.picpath,a1.unitprice,a1.specialprice,a1.cansalecount,b2.name as categoryname,a1.cost ";
        select_sql += " from product a1 ";
        select_sql += " left join category b2 on (a1.categoryno = b2.categoryno)";
        select_sql += " where a1.productno = ?"

    let array_param = [req["productno"]]
            
    let resultobj =  await dbhelp.executequery(select_sql,array_param);

    return resultobj;

   
}