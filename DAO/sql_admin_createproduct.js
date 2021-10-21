const dbhelp = require("../utility/dbhelp");

//新增商品
exports.create_product = async function(req)
{
    
        let insert_sql= "insert into product(productno,protypeno,productname,unitprice,"+
            "specialprice,cost,intro,totalcount,cansalecount,picpath,createdatetime,updatedatetime)"+
            "value(?,?,?,?,?,?,?,?,?,?,?,?)";
        let insert_val = [req["productno"],req["protypeno"],req["productname"],req["unitprice"],req["specialprice"],req["cost"],
                          req["intro"],req["totalcount"],req["cansalecount"],req["picpath"],req["createdatetime"],req["updatedatetime"]];
        let resultobj =  await dbhelp.executequery(insert_sql,insert_val);
        return resultobj;
};

//查詢商品
exports.search_product = async function(req)
{
        let select_sql= "select * from product where productno = '"+req["proid"]+"'";
        let resultobj =  await dbhelp.executequery_no_param(select_sql);
        return resultobj;
};

//修改商品
exports.update_product = async function(req)
{
    let update_sql= "update product set productname='"+req["productname"]+"',intro='"+req["intro"]+"',picpath='"+req["picpath"]+"',protypeno='"+req["protypeno"]+"',unitprice='"+req["unitprice"]+"',specialprice='"+req["specialprice"]+"',cost='"+req["cost"]+"',totalcount='"+req["totalcount"]+"',cansalecount='"+req["cansalecount"]+"',updatedatetime='"+req["updatedatetime"]+"' where productno='"+req["productno"]+"'";
    let resultobj = await dbhelp.executequery_no_param(update_sql);
    return resultobj;
};

//查詢分類
exports.loadcategory = async function(req)
{
        let select_sql= "select * from category";
        let resultobj =  await dbhelp.executequery_no_param(select_sql);
        return resultobj;
};
