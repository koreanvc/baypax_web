var config = require('../config/config'),
    userDac = require('../dac/userDac');

module.exports = {
  logIn:function(mail,pwd,callback){
    console.log(mail+pwd);
    callback(null,'test');
  },
  register:function(mail,name,pwd,callback){
    userDac.selectUser(mail,function(err,data){
      if(err){
        callback(err);
      }
      else{
        console.log(data);
      }
    })
  },

  getServerList:function(callback){
    callback(null,JSON.stringify(config.pm2servers));
  }
};
