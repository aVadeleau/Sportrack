const db = require('./sqlite_connection.js');

const DataDAO = function(){
    this.insert = function(values, callback) {
      const stmt = db.prepare("INSERT INTO Data VALUES (?, ?, ?, ?, ?, ?, ?)");

      stmt.run([values.numD, values.hour, values.heartFreq,values.latitude, values.longitude, values.altitude, values.theActivity], callback);
    };

    this.update = function(key, values, callback) {
      const stmt = db.prepare("UPDATE Data SET numD = ?, hour = ?, heartFreq = ?, latitude = ?, longitude = ?, altitude = ?, theActivity = ? WHERE numD = ?");

      stmt.run([values.hour, values.heartFreq,values.latitude, values.longitude, values.altitude, values.theActivity], callback);
    };

    this.delete = function(key, callback) {
      const stmt = db.prepare("DELETE FROM Data WHERE numD = ?");

      stmt.run([key], callback);
    };

    this.findAll = function(callback) {
      db.all("SELECT * FROM Data", callback);
    };

    this.findByKey = function(key, callback) {
      db.get("SELECT * FROM Data WHERE numD = ?", [key], callback);
    };
};

const dao = new DataDAO();

module.exports = dao;