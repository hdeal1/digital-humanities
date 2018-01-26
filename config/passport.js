var LocalStrategy	= require('passport-local').Strategy;

var bcrypt		= require('bcrypt-nodejs');
var connection		= require('../config/database.js').connection;

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.uid);
	});

	passport.deserializeUser(function(uid, done) {
		connection.query("SELECT user.uid, username, password, change_flag, first_name, last_name, email FROM user INNER JOIN membership\
		ON user.uid = membership.uid INNER JOIN user_meta ON user.uid = user_meta.uid WHERE user.uid = ?",[uid], function(err, rows) {
			done(err, rows[0]);
		});

	});

	passport.use(
		new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) {
			connection.query("SELECT * FROM user WHERE username = ?", [username], function(err, rows) {
				if(err)
					return done(err);
				else if (!rows.length)
					return done(null, false, req.flash('loginMessage', 'Username does not exist.'));
				else if (!bcrypt.compareSync(password, rows[0].password))
					return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
				else
					return done(null, rows[0]);
			});
		})
	);
};






