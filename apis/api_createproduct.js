const express = require('express');
const session=require('express-session')
const querystring = require('querystring'); 
const dateFormat = require("dateformat");
const db = require('../DAO/sql_createproduct.js');
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
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))

const formData = require('express-form-data');
app.use(formData.parse());
const router = express.Router();
const CDN=process.env.AWS_CDN



router.post('/createproduct/:id',upload.array('file'),async function(req,res){
    try
    {  
        let myfile = req.files;
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~",myfile)
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
        let result = await db.upload_pro(product_info);
        result = await JSON.parse(result);
        res.end(JSON.stringify(result))
        
    }
    catch(message)
    {
        console.log('拒絕後跑這~~Error:'+message)
    }   
    
});


router.get('/createproduct/:id',async function(req,res){
  try
  {  
      let proid=req.params.id;
      let info={"proid":proid};
      let result = await db.get_uploadpro(info);
      result = await JSON.parse(result);
      if(result["error"] == null)
      {
          res.end(JSON.stringify(result))
      }
  }
  catch(message)
  {
      console.log('拒絕後跑這~~Error:'+message)
  }   
  
});



router.patch('/createproduct/:id',upload.array('file'),async function(req,res){
  try
  {  
      let myfile = req.files;
      let resultpic ="";
      let allurl="";
      for(let i=0;i<myfile.length;i++){
          resultpic=await aws.uploadtoS3(myfile[i]);
          allurl+= CDN + resultpic.key +",";
      }
      let all_photo=req.body["existfile"]+allurl;
      let product_info = {
          "id":req.params.id,
          "protypeno": req.body["protypeno"],
          "productname": req.body["productname"],
          "unitprice": req.body["unitprice"],
          "specialprice": req.body["specialprice"],
          "cost": req.body["cost"],
          "intro": req.body["intro"],
          "totalcount": req.body["totalcount"],
          "cansalecount": req.body["cansalecount"],
          "picpath": allurl,
      };
      let result = await db.update_pro(product_info);
      result = await JSON.parse(result);
      if(result["error"] == null)
      {
          res.end(JSON.stringify(result))
      }
  }
  catch(message)
  {
      console.log('拒絕後跑這~~Error:'+message)
  }   
  
});

module.exports = router;
