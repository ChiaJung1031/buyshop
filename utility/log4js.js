const fs = require('fs');
const dateFormat = require("dateformat");
const path = require("path");
const log4js = require('log4js');


module.exports.getConfig =  function(baseLogPath)
{
    let configjson = {
      appenders: { 
            std: { type: "stdout", level: "all", layout:{type: "basic", } },//輸出到終端機
            product: { type: "DateFile", filename: path.join(baseLogPath,"product.log") ,  encoding: "utf-8" }

        },
      categories: { 
          default: {appenders: ["std"], level: "debug"},
          product: {appenders: ["std", "product"], level: "all"},

          
        }
    }

  return configjson;
  
}

module.exports.getLogDirPath = function()
{
    let nowdate = dateFormat(new Date(), "yyyy-mm-dd");
    let baseLogPath = path.resolve(__dirname, '../logs/' + nowdate)
    let LogDirPath = "";
    let IsExist = fs.existsSync(baseLogPath);
     if(!IsExist)
     {
        if(this.createLogDir(baseLogPath))
        {
            LogDirPath = baseLogPath;
        }
     }
     else
     {

        LogDirPath = baseLogPath;
     }

  return baseLogPath;
};

module.exports.createLogDir = function(baseLogPath)
{
    let Issuccess = false;

     fs.mkdirSync(baseLogPath) , { recursive:true }, (err) => { 
        if (err) {  
            return Issuccess;
        } 
        else{
            Issuccess = true;
            return Issuccess;
        }
    };            
};



module.exports.setConfig = function(configjson)
{
    log4js.configure(configjson);
}

module.exports.getlog4js = function(configjson)
{
    let logpath = this.getLogDirPath();
    let config = this.getConfig(logpath)
     this.setConfig(config);

    return log4js;
}