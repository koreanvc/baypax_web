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
			port: 80,
			ip: '0.0.0.0'
		}
	};