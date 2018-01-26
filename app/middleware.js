var conn	= require('../config/database.js').connection;
var db_error	= "There was a fatal database error.";

module.exports = {

	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/login');
	},

	isPasswordDank: function(req, res, next) {
		conn.query("SELECT change_flag FROM user WHERE uid=?", [req.user.uid],
			function(err, reset) {
				if(!err) {
					if (reset[0].change_flag == 1) {
						req.flash('resetMessage', 'Welcome! You must choose a new password.');
						res.redirect('/password');
					}
					else 
						return next();
					} else {
						res.render('error.html', {error: db_error, user:req.user});
					}
		});
	}
}


