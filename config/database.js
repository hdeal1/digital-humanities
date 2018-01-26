var mysql = require('mysql');

var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'minstersminions',
	database: 'digital_humanities'
});

module.exports = {
	connection : conn
}
