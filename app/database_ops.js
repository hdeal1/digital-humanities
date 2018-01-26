var mysql = require("mysql");
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = {
	connection: connection
};
