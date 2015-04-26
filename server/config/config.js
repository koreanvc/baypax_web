'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..')

	module.exports = {
		root: rootPath,
		redis: {
			host: '192.168.0.28',
			port: 6379
		},
		webServer: {
			port: 8080,
			ip: '0.0.0.0'
		},
		mysql:{
			host:'localhost',
			port:3306,
			user:'baypax',
			password:'baypax',
			database:'baypax'
		}
	};