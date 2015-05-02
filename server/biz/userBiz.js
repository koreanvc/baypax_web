var config = require('../config/config'),
  userDac = require('../dac/userDac'),
  bcrypt = require('bcrypt-nodejs'),
  CONSTS = require('../config/consts'),
  ERR_CD = CONSTS.ERROR_CODES;


module.exports = {
  logIn: function (mail, pwd, callback) {
    //console.log(mail + pwd);
    userDac.selectUser(mail, function (err, data) {
      if (err) {
        console.error(err);
        callback(err);
      }
      else {
        console.log(data);
        if (data[0]) {
          if (bcrypt.compareSync(pwd, data[0].user_pwd)) {
            callback(null, JSON.stringify(CONSTS.SUCCESS_CODE));
          }
          else {
            callback(null, JSON.stringify(ERR_CD.LOGIN.WRONG_PWD));
          }
        }
        else {
          callback(null, JSON.stringify(ERR_CD.LOGIN.NO_USER));
        }
      }
    });
  },

  register: function (params, callback) {
    var mail = params.mail.replace(" ", "");
    if (!isEmail(mail)) {
      callback(null, JSON.stringify(ERR_CD.REGISTER.NOT_MAIL_FORMAT));//메일형식 오류
    }
    else if (params.pwd.length < CONSTS.PWD_MIN) {
      callback(null, JSON.stringify(ERR_CD.REGISTER.WEAK_PWD));//너무 짧은 비밀번호
    }
    else {
      userDac.selectUser(params.mail, function (err, data) {
        if (err) {
          console.error(err);
          callback(err);//에러발생
        }
        else {
          if (data != "") {
            callback(null, JSON.stringify(ERR_CD.REGISTER.ALREADY_JOINED));//이미 가입된 사용자
          } else {
            userDac.insertUser(
              params.mail,
              params.name,
              bcrypt.hashSync(params.pwd),
              params.cCode,
              function (err, data) {
                if (err) {
                  console.error(err);
                  callback(null, JSON.stringify(ERR_CD.SERVER_ERROR));//이미 가입된 사용자
                }
                else if (data.affectedRows == 1) {
                  callback(null, JSON.stringify(CONSTS.SUCCESS_CODE));
                }
              }
            );
          }
        }
      });
    }
  },

  GetCountry: function (callback) {
    userDac.selectAllCountry(function (err, data) {
      if (err) {
        console.error(err);
        callback(err);
      }
      else {
        callback(null, JSON.stringify(data));
      }
    });
  },
  temp: function () {
    temp2(0);
  }
};

function isEmail(str) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(str)) {
    return true;
  }
  else {
    return false;
  }
}

function temp2(idx) {
  console.log(idx);
  if (idx < CONSTS.C_CODE.length) {
    userDac.temp(CONSTS.C_CODE[idx], function (a, b) {
      if (!a) {
        temp2(idx + 1);
      }
    })
  }
}