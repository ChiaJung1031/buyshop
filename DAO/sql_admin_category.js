const dbhelp = require("../utility/dbhelp");


//查詢分類(載入抓出所有分類名單)
exports.select_allcategory = async function(req)
{
        let select_sql= "select name,sort from category order by name,sort asc";
        let resultobj =  await dbhelp.executequery_no_param(select_sql);
        return resultobj;
};

//查詢分類(新增前查看是否重複)
exports.select_category = async function(req)
{
        let select_sql= "select name from category where name='"+req["catename"]+"'";
        let resultobj =  await dbhelp.executequery_no_param(select_sql);
        return resultobj;
};

//查詢分類裡是否有商品
exports.check_category = async function(req)
{
        let select_sql= "select * from product left join category on product.protypeno= category.categoryno where category.name = '"+req["catename"]+"'";
        let resultobj =  await dbhelp.executequery_no_param(select_sql);
        console.log(resultobj,"SQL@@@@@@@@@@@@@@@@@@")
        return resultobj;
};

//新增分類
exports.create_category = async function(req)
{
        let insert_sql= "insert into category(name,sort,createdatetime,updatetime) value(?,?,?,?)";
        let insert_val = [req["catename"],req["new_no"],req["createdatetime"],req["updatetime"]];
        let resultobj =  await dbhelp.executequery(insert_sql,insert_val);
        return resultobj;
};



//刪除分類
exports.delete_category = async function(req)
{
        let delete_sql= "delete from category where name='"+req["catename"]+"'";
        let resultobj =  await dbhelp.executequery_no_param(delete_sql);
        return resultobj;
};