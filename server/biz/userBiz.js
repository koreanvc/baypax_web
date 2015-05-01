var config = require('../config/config'),
  userDac = require('../dac/userDac');

module.exports = {
  logIn: function (mail, pwd, callback) {
    console.log(mail + pwd);
    callback(null, 'test');
  },
  register: function (mail, name, pwd, callback) {
    userDac.selectUser(mail, function (err, data) {
      if (err) {
        callback(err);
      }
      else {
        if (data != "") {
          callback(null, JSON.stringify({code: -1}));
        } else {
          userDac.insertUser(mail, name, pwd, function (err, data) {
            if (err) {
              //console.log(err);
              callback(null, JSON.stringify({code: -1}));
            }
            else if (data.affectedRows == 1) {
              callback(null, JSON.stringify({code: 1}))
            }
          });
        }
      }
    });
  },

  getServerList: function (callback) {
    callback(null, JSON.stringify(config.pm2servers));
  }
}
;
