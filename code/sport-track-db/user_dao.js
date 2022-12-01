const db = require('./sqlite_connection.js');

const UserDAO = function(){
    this.insert = function(values, callback) {
      const stmt = db.prepare("INSERT INTO User VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

      stmt.run([values.email, values.lastname, values.firstname,values.birthday, values.sexe, values.height, values.weight,values.password], callback);
    };

    this.update = function(key, values, callback) {
      const stmt = db.prepare("UPDATE User SET lastname = ?, firstName = ?, birthday = ?, sexe = ?, height = ?, weight = ?, password = ? WHERE email = ?");

      stmt.run([values.lastname, values.firstname,values.birthday, values.sexe, values.height, values.weight,values.password], callback);
    };

    this.delete = function(key, callback) {
      const stmt = db.prepare("DELETE FROM User WHERE email = ?");

      stmt.run([key], callback);
    };

    this.findAll = function(callback) {
      db.all("SELECT * FROM User", callback);
    };

    this.findByKey = function(key, callback) {
      db.get("SELECT * FROM User WHERE email = ?", [key], callback);
    };
};

const dao = new UserDAO();

module.exports = dao;