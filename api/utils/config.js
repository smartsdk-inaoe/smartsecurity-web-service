var mysql = require('mysql');
exports.getConnection = function(){
	var params = {
		host:'localhost',
		user:'root',
		password:'4DmiN-20#17',
		database:'smarsdkcenidet'
	};
	return mysql.createConnection(params);
}
