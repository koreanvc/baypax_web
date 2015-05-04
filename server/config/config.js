'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..')

	module.exports = {
		root: rootPath,
		webServer: {
			port: 8080,
			ip: '0.0.0.0'
		},
		mysql: {
      host: 'gumabae.iptime.org',
      port: 3306,
      user: 'baypax',
      password: 'baypax123',
      database: 'baypax'
    }
	};