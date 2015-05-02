'use strict'

module.exports = {
  PWD_MIN: 6,

  SUCCESS_CODE:{code:1},
  ERROR_CODES: {
    SERVER_ERROR:{code:-99,msg:"서버오류발생"},
    LOGIN:{
      NO_USER:{code:-1,msg:"가입하지 않은 사용자이거나 비밀번호가 틀렸습니다."},
      WRONG_PWD:{code:-2,msg:"가입하지 않은 사용자이거나 비밀번호가 틀렸습니다."}
    },
    REGISTER:{
      ALREADY_JOINED: {code:-1,msg:"이미 가입된 사용자입니다."},
      NOT_MAIL_FORMAT: {code:-2,msg:"메일형식오류"},
      WEAK_PWD:{code:-3,msg:"유효하지않은 비밀번호"}
    }
  }
};