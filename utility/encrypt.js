const crypto = require('crypto');
const dotenv = require('dotenv').config();

module.exports.encrypt = function (password) {
 // Defining key 
let secret = process.env.ENCRYPT_SECRET; 

// Calling createHash method 
let rePassword = crypto.createHash('sha256', secret) 
                   .update(password) 
                   .digest('hex');

  return rePassword;
}

module.exports.gentoken = function () {
   return crypto.randomBytes(32).toString('base64').substr(0, 8);
 }