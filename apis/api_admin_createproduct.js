const express = require('express');
const router = express.Router();
const bomodule_createproduct = require('../module/admin_createproduct');
const dateFormat = require("dateformat");
const aws = require('../awsS3.js');
require('dotenv').config()

//上傳照片會用到
const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })
   
var upload = multer({storage})
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:false}))

const formData = require('express-form-data');
app.use(formData.parse());
const CDN=process.env.AWS_CDN

router.get('/admin_createproduct',async function (req, res) {
    return res.render('admin_createproduct');
});

//新增商品
router.post('/createproduct',upload.array('file'),async function(req,res){
    try
    {                                                                                    
        let myfile = req.files;
        let picture ="";
        let allurl="";
        for(let i=0;i<myfile.length;i++){
            picture=await aws.uploadtoS3(myfile[i]);
            allurl+= CDN + picture.key +",";
        }
        let idnum=dateFormat(new Date(), "yyyymmddHHMMss");
        let datetime=dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        let product_info = {
            "productno": idnum + "e202108",
            "protypeno": req.body["protypeno"],
            "productname": req.body["productname"],
            "unitprice": req.body["unitprice"],
            "specialprice": req.body["specialprice"],
            "cost": req.body["cost"],
            "intro": req.body["intro"],
            "totalcount": req.body["totalcount"],
            "cansalecount": req.body["cansalecount"],
            "picpath": allurl,
            "createdatetime":datetime,
            "updatedatetime":datetime
        };
        let result = await bomodule_createproduct.create_product(product_info);
        res.end(JSON.stringify(result))
        
    }
    catch(message)
    {
        console.log('拒絕後跑這~~Error:'+message)
    }   
    
});

//查詢商品
router.get('/searchproduct/:id',async function(req,res){
  try
  {  
      let proid=req.params.id;
      let info={"proid":proid};
      let result = await bomodule_createproduct.search_product(info);
      console.log(result,"============")
      return res.end(JSON.stringify(result))
  }
  catch(message)
  {
      console.log('拒絕後跑這~~Error:'+message)
  }   
  
});



router.patch('/modifyproduct',upload.array('file'),async function(req,res){
  try
  {  
      let myfile = req.files;
      let resultpic ="";
      let allurl="";
      let datetime=dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
      for(let i=0;i<myfile.length;i++){
          resultpic=await aws.uploadtoS3(myfile[i]);
          allurl+= CDN + resultpic.key +",";
      }
      let product_info = {
          "productno": req.body["productno"],
          "protypeno": req.body["protypeno"],
          "productname": req.body["productname"],
          "unitprice": req.body["unitprice"],
          "specialprice": req.body["specialprice"],
          "cost": req.body["cost"],
          "intro": req.body["intro"],
          "totalcount": req.body["totalcount"],
          "cansalecount": req.body["cansalecount"],
          "picpath": allurl,
          "updatedatetime":datetime
      };
      let result = await bomodule_createproduct.update_product(product_info);
      res.end(JSON.stringify(result))
  }
  catch(message)
  {
      console.log('拒絕後跑這~~Error:'+message)
  }   
  
});

module.exports = router;
