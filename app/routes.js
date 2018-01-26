var moment	= require('moment');
var db	 	= require('../config/database.js');
var conn	= db.connection;
var bcrypt	= require('bcrypt-nodejs');
var fs		= require('fs');
var middleware	= require('./middleware.js');

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

	app.post('/login', passport.authenticate('local', {
            successRedirect : '/portal', 
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
    	} else if (!checkPassword(req.body.new_password)) {
    		req.flash('resetMessage', 'Passwords must have one capital letter, one lowercase letter, and one number.');
    		res.redirect('/password'); return;
    	} else {	
            conn.query("SELECT password FROM user WHERE username = ?",[req.user.username], function(err, rows){
            	if (!bcrypt.compareSync(req.body.current_password, rows[0].password)){
            		req.flash('resetMessage', 'Incorrect current password.');
            		res.redirect('/password'); return;
            	} else {
					conn.query("UPDATE user SET password=?, change_flag=0 WHERE uid=?", [bcrypt.hashSync(req.body.new_password), req.user.uid],
						function(err, e) {
							req.logout();
							req.flash('loginMessage', 'Password changed! Log in again with your new password.');
							res.redirect('/login');
						});
				}
    		});
        }
    });

}
