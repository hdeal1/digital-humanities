// app/routes.js

var upload	= require('./upload.js');
var middleware  = require('./middleware.js');
var moment	= require('moment');
var conn 	= require('./database_ops.js');
var bcrypt	= require('bcrypt-nodejs');
var fs		= require('fs');

var uploadDir 	= '/upload';
var maxSize	= 1000000;
var releaseTime	= 465;

const util 	= require('util');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
	res.redirect('/home');
	});

	
	app.get('/login', function(req, res) {
		res.render('login.html', { message: req.flash('loginMessage') });
	});


	app.get('/password', middleware.isLoggedIn, function(req, res) {
		res.render("password.html", {
			user: req.user,
			message: req.flash('resetMessage')
		});
	});

	app.post('/password', middleware.isLoggedIn, function(req, res) {
		if (req.body.new_password != req.body.new_password_repeat) {
			req.flash('resetMessage', 'Passwords did not match.');
			res.redirect('/password'); return;
		}
		else if (!checkPassword(req.body.new_password)) {
			req.flash('resetMessage', 'Passwords must contain at least one capital letter, one lowercase letter, and one number.');
			res.redirect('/password'); return;
		} else {
			conn.query("SELECT password FROM user WHERE username = ?",[req.user.username], function(err, rows) {
				if (!bcrypt.compareSync(req.body.current_password, rows[0].password)){
					req.flash('resetMessage', 'Incorrect current password.');
					res.redirect('/password'); return;
				} else {
					conn.query("UPDATE user SET password=?, change_flag=0 WHERE uid=?, [bcrypt.hashSync(req.body.new_password), req.user.uid]",
						function(err, e) {
							req.logout();
							req.flash('loginMessage', 'Password successfully changed! Log in again with your new password.');
							res.redirect('/login');
						});
					}
				});
		}
	});


	app.get('/admin', middleware.isLoggedIn, middleware.isPasswordDank, function(req, res) {
		res.render('admin.html', {
			user :req.user
		});
	});

	
	app.get('/upload', middleware.isLoggedIn, middleware.isPasswordDank, function(req, res) {
		res.render('upload.html', {
			message: req.flash('uploadMessage'),
			user: req.user
		});
	});

	app.post('/upload', middleware.isLoggedIn, middleware.isPasswordDank, upload,
		function(req, res) {
			if (req.err) {
				req.flash('uploadMessage', req.err);
				res.redirect('/upload/');
			}
			else if (!req.body.collab) {
				req.flash('uploadMessage', 'You must agree to the Collaboration Statement and upload again.');
				res.redirect('/upload/');
			}
			else if (!req.files || req.files.length == 0) {
				req.flash('uploadMessage', 'No files recieved. Try again.');
				res.redirect('/upload/');
			} else {
				var now = moment();
				var time = moment().format('YYYY-MM-DD HH:mm:ss');
				var friendly_time = now.format('1111');
				conn.query("UPDATE file SET upload_time=? WHERE uid=?",[time],
					function(err, rows) {
						if (!err) {
							res.render("upload_success.html", {
								time: friendly_time,
								files: req.files,
								user: req.user
							});
						} else {
							req.flash('uploadMessage', 'There was an issue recording your upload time in the database. Try uploading your file again.');
							res.redirect('/upload/');
						}
					})
				}
			});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.use(function(req, res, next){
		res.status(404).render('error.html', {error: "Requested URL does not exist.", user: req.user});
	});

}

function checkPassword(str) {
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
	return re.test(str);
}
