var config = require('../config/config'),
  userDac = require('../dac/userDac'),
  bcrypt = require('bcrypt-nodejs');

module.exports = {
  logIn: function (mail, pwd, callback) {
    //console.log(mail + pwd);
    userDac.selectUser(mail, function(err,data){
      if(err){
        console.log(err);
        callback(null,JSON.stringify({code:-99}));
      }
      else{
        if(data[0]) {
          if (bcrypt.compareSync(pwd, data[0].user_pwd)) {
            callback(null, JSON.stringify({ code: 1 }));
          }
          else {
            callback(null, JSON.stringify({ code: -1 }));
          }
        }
        else{
          callback(null, JSON.stringify({ code: -2 }));
        }
      }
    });
  },

  register: function (mail, name, pwd, callback) {
    userDac.selectUser(mail, function (err, data) {
      if (err) {
        console.log(err);
        callback(null,JSON.stringify({code:-99}));
      }
      else {
        if (data != "") {
          callback(null, JSON.stringify({ code: -1 }));
        } else {
          userDac.insertUser(mail, name, bcrypt.hashSync(pwd), function (err, data) {
            if (err) {
              //console.log(err);
              callback(null, JSON.stringify({ code: -1 }));
            }
            else if (data.affectedRows == 1) {
              callback(null, JSON.stringify({ code: 1 }))
            }
          });
        }
      }
    });
  }
};