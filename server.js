//reqs
//var express	= require('express');
//var session	= require('express-session');
//var cookieParser= require('cookie-parser');
//var bodyParser  = require('body-parser');
//var morgan	= require('morgan');
//var passport	= require('passport');
//var flash	= require('connect-flash');
//var lex		= require('letsencrypt-express');
//var engines	= require('consolidate');

//consts
//var DEV_PORT	= 8080;
//var DOMAIN	= 'http://localhost';
//var email	= 'hank.deal@gmail.com';
//googleSecret is  uGLmZmnFpUi1ZG0reVwznbFe 
//client ID is  426363100328-4d9e6hs9nsvfsu2036c3unrj0k0hsa3u.apps.googleusercontent.com 
//sessionSecret is XfyqdJkbgqLo1p9kzhUm

//var app		= express();

//if (process.env.NODE_ENV == 'production') {
//	'use strict';
//	var lex = lex.create({
//		configDir: require('os').homedir() + '/letsencrypt/etc/',
//		approveRegistration: function (hostname,approve) {
//			if (hostname === DOMAIN) {
//				approve(null, {
//					domains: [DOMAIN],
//					email: EMAIL,
//					agreeTos: true
//				});
//			}
//		}
//	});
//}

//process.umask(0);
//require('./config/passport')(passport);

//app.engine('html', engines.hogan);
//app.set('views', __dirname +'/templates');
//process.env.NODE_ENV != 'production' ? app.use(morgan('dev')) : NULL;
//app.use(cookieParser());
//app.use(bodyParser.urlencoded({
//	extended: true
//}));

//app.use(session({
//	secret: 'XfyqdJkbgqLo1p9kzhUm',
//	resave: true,
//	saveUninitialized: true
//}));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());
//app.use(express.static(__dirname +'/public'));

//require('./app/routes.js')(app, passport);

//if (process.env.NODE_ENV == 'production') {
//	lex.onRequest = app;
//	lex.listen([80], [443, 5001], function() {
//		var protocol = ('requestCert' in this) ? 'https':'http';
//		console.log("Listening at "+ protocol + '://localhost:' + this.address().port);
//	});
//}

//else {
//	app.listen(DEV_PORT, function() {
//		console.log("Listening as http://localhost:8080");
//	})
//}


var express 	= require('express');
var session 	= require('express-session');
var cookieParser= require('cookie-parser');
var bodyParser 	= require('body-parser');
var morgan	= require('morgan');
var passport	= require('passport');
var flash	= require('connect-flash');
var engines	= require('consolidate');

var app 	= express();

require('./config/passport.js')(passport);

app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');
app.use(cookieParser());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(session({
	secret: '3GcdA580QSFonX4MZ9z6rvY0G1WRCFB1',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname +'/public'));

require('./app/routes.js')(app, passport);

var server = app.listen(8080, function() {
	console.log('Your fucking server is listening on port: %s', server.address().port + ', you dumb bitch.');
});











