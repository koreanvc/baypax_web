'use strict';

var config = require('../config/config'),
    //sql = require('mssql'),
    redis = require('redis');

module.exports = {

  // insert game
  insert: function (pm2server, callback) {
    // MS-SQL sample code
    // var connection = new sql.Connection(config.database, function (err) {
    //   var request = new sql.Request(connection);

    //   request.input('USER_ID', sql.BigInt, userId);
    //   request.input('TOTAL_SCORE', sql.Int, -1);

    //   request.execute('Your Stored Procedure Name', function (err, recordsets, returnValue) {
    //     connection.close();

    //     callback(err, recordsets[0][0].GAME_ID);
    //   });
    // });

    // Redis sample code

    var client = redis.createClient(config.redis.port, config.redis.host);
    client.rpush('pm2serverList', JSON.stringify(pm2server), function (err, res) {
      client.quit();
      if (err) {
        err = new ServiceUnavailableError(err);
      }
      // callback
      callback(err, res);
    });
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