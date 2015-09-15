'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var User = require('../app/models/user.js');

module.exports = function() {
	// Initialize express app
	var app = express();
	app.use(bodyParser.json());

    // Set jade as the template engine
	app.set('view engine', 'jade');
    // Set views path
    app.set('views', './app/views');
	app.use('/public', express.static('public'));

    app.get('/', function(req, res){
		res.render('index', {
			title: 'steli.io'
		});
	});

	app.post('/api/createUser', function (req, res, next) {
		'use strict';
		var user = new User ({
			name: req.body.name
		});
		user.save (function (err, user) {
			if (err) {
				return next(err);
			}
			res.status(201).json(user);
		});
	});

	app.get('/api/listUsers', function (req, res, next) {
		'use strict';
		User.find (function (err, users) {
			if (err) {
				return next (err);
			}
			res.json(users);
		});
	});

	app.delete('/api/deleteUser/:name', function (req, res, next) {
		'use strict';
		var name2del = req.params.name;
		User.findOneAndRemove ({name: name2del}, function (err, user) {
			if (err) {
				return next(err);
			}
			res.status(200).json(user);
		});
	});

	// Return Express server instance
	return app;
};
