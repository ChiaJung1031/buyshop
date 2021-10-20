const express = require('express');
const router = express.Router();
const bomodule_category = require('../module/admin_category');
const dateFormat = require("dateformat");

router.get('/admin_category',async function (req, res) {
    return res.render('admin_category');
});

//查詢分類
router.get('/select_category',async function(req,res){
    let result_category =  await bomodule_category.select_category();
    return res.end(JSON.stringify(result_category))
});


//新增分類
router.post('/new_category',async function(req,res){
  
    let catename = req.body["catename"]; //分類名稱 
    let new_no = req.body["new_no"]; //分類編號
    let info = {"catename":catename,"new_no":new_no}
    let result_category =  await bomodule_category.create_category(info);
    return res.end(JSON.stringify(result_category))
});


//刪除分類
router.patch('/delete_category',async function(req,res){
    let catename = req.body["catename"]; //要刪除的分類名稱
    let info = {"catename":catename} 
    let result_category =  await bomodule_category.delete_category(info);
    return res.end(JSON.stringify(result_category))
});




module.exports = router;
