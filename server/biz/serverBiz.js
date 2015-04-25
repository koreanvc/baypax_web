'use strict';

var http = require('http'),
    https = require('https'),
    exec = require('node-ssh-exec'),
    config = require('../config/config'),
    serverDac = require('../dac/serverDac'),
    prvKey=require('fs').readFileSync(config.prvKeyPath);

var pm2ConnectionOption = {
    host: '',
    port: 9615,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
};

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
var getJSON = function(options, onResult)
{
  console.log("rest::getJSON");

  var prot = options.port == 443 ? https : http;
  var req = prot.request(options, function(res)
  {
    var output = '';
    //console.log(options.host + ':' + res.statusCode);
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function() {
      var obj = JSON.parse(output);
      onResult(null,res.statusCode, obj);
    });
  });

  req.on('socket', function (socket) {
    socket.setTimeout(options.timeout);  
    socket.on('timeout', function() {
      req.abort();
    });
  });

  req.on('error', function(err) {
    //req.abort('error: ' + err.message);
    console.log('req err : '+err);
    onResult(err);
  });

  req.end();
};


module.exports = {
  getPM2Info:function(host,username,callback){
    var outtime = 0;
    var sshOption = {
      host:host,
      username:username,
      privateKey:prvKey
    }
    var command = 'pm2 web';

    ssh_exec(sshOption,command,function(err,stdout,stderr){
      if(err){
        callback(err);
      }
      else{
        if(!stderr){
          outtime = 3000;
        }
        setTimeout(function(){
          var options = pm2ConnectionOption;
          options.host = host;
          getJSON(options,function(err,statusCode,obj){
            if(err){
              callback(err);
            }
            else{
              callback(null,JSON.stringify(obj));
            }
          });
        });
      }
    });
  },

  getServerList:function(callback){
    callback(null,JSON.stringify(config.pm2servers));
  },

  test2:function(callback){
    for(var i=0;i<config.pm2servers.length;i++){
      serverDac.insert(config.pm2servers[i],function(err,data){console.log(data)});
    }
    callback(null,null);
  },
  selectAllServers: function(callback){
    serverDac.selectAllServers(function(err,data){
      console.log(data[0]);
      var servers = [];
      for(var i=0;i<data.length;i++){
        var obj = JSON.parse(data[i]);
        console.log(obj);
        servers.push(obj);
      }

      callback(err,JSON.stringify(servers));
    });
  }
};

function ssh_exec(options, command, callback){
  var Client = require('ssh2').Client;

  var stdout="";
  var stderr="";

  var conn = new Client();
  conn.on('ready', function() {
    console.log('Client :: ready');
    conn.exec(command, function(err, stream) {
      if (err){
        callback(err);
      }
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
        callback(null,stdout,stderr);
      }).on('data', function(data) {
        stdout+=data;
        //console.log('STDOUT: ' + data);
      }).stderr.on('data', function(data) {
        stderr+=data;
        //console.log('STDERR: ' + data);
      });
    });
  }).connect(options);
}