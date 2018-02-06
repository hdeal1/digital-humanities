var moment	= require('moment');
var conn = require('./database_ops.js');
var bcrypt	= require('bcrypt-nodejs');
var fs		= require('fs');
var middleware	= require('./middleware.js');

var uploadDir 	= '/upload';
var maxSize	= 1000000;
var releaseTime	= 465;

const util 	= require('util');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.redirect('/login');
	});

	app.get('/home', middleware.isLoggedIn, function(req, res) {
		res.render('home.html', {
			user: req.user,
		});
	});

	app.get('/login', function(req, res) {
		res.render('login.html', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local', {
            successRedirect : '/home', 
            failureRedirect : '/login', 
            failureFlash : true 
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
}
