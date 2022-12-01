var db_connection = require('./sqlite_connection');
var user_dao = require('./user_dao');
var activity_dao= require('./activity_dao');
var data_dao= require('./data_dao');
var calcul_distance= require('./calcul_distance');
module.exports = {db: db_connection, user_dao: user_dao,activity_dao:activity_dao,data_dao:data_dao,calcul_distance:calcul_distance};