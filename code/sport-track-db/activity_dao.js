const db = require('./sqlite_connection.js');

const ActivityDAO = function(){
    this.insert = function(values, callback) {
      const stmt = db.prepare("INSERT INTO Activity VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)");

      stmt.run([values.numA, values.date, values.description,values.beginHour,values.duration,values.distance, values.freqMin,values.freqMax,values.freqMoy,values.theUser], callback);
    };

    this.update = function(key, values, callback) {
      const stmt = db.prepare("UPDATE Activity SET date = ?, description = ?,beginHour = ?,duration =?,distance = ?, freqMin = ?, freqMax = ?, freqMoy= ?, theUser= ? WHERE numA = ?");

      stmt.run([values.date, values.description,values.distance, values.freqMin,values.freqMax,values.freqMoy,values.theUser], callback);
    };

    this.delete = function(key, callback) {
      const stmt = db.prepare("DELETE FROM Activity WHERE numA = ?");

      stmt.run([key], callback);
    };

    this.findAll = function(callback) {
      db.all("SELECT * FROM Activity", callback);
    };

    this.findByKey = function(key, callback) {
      db.get("SELECT * FROM Activity WHERE numA = ?", [key], callback);
    };
};

const dao = new ActivityDAO();

module.exports = dao;