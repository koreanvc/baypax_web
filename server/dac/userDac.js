
'use strict';

var config = require('../config/config'),
	mysql= require('mysql'),
	connection= mysql.createConnection(config.mysql)

module.exports = {

  insertUser: function (email,name,pwd, callback) {
    var user={
    	'user_mail':email,
		'user_name':name,
		'user_pwd':pwd
	}
    connection.connect(function(err){
    	if(err){
    		console.error('mysql connection error');
    		callback(err);
    	}
    	else{
    		var query=connection.query('insert into users set ?',user,function(err,result){
    			if(err){
    				console.error(err);
    				callback(err);
    			}
    			console.log(query);
    			callback(null,result);
    		})
    	}
    })
  },

  selectUser: function (email, callback) {
    
	var query=connection.query('select user_mail,user_name from users where user_mail='+mysql.escape(email),function(err,result){
		if(err){
			console.error(err);
			callback(err);
		}
		//console.log(query);
		else{
			console.log(result);
			callback(null,result);
		}
	})
  },

  selectAllServers: function (callback) {
    var client = redis.createClient(config.redis.port, config.redis.host);
    client.lrange('pm2serverList', 0, -1, function (err, res) {
      client.quit();
      // check error
      if (err) {
        err = new ServiceUnavailableError(err);
      }

      // callback
      callback(err,res);
    });
  }
}