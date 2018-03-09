var mysql = require('mysql');

//LOCAL CONFIGURATION
/*exports.getConnection = function(){
	var params = {
		host:'localhost',
		user:'root',
		password:'4DmiN-20#17',
		database:'smarsdkcenidet'
	};
	return mysql.createConnection(params);
}*/
//REMOTE CONFIGURATION
exports.getConnection = function(){
	var params = {
		host:'207.249.127.16',
		user:'smartsdkcenidet',
		password:'hdcenidet2018*',
		database:'smarsdkcenidet'
	};
	return mysql.createConnection(params);
}