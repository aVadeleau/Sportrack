

const sqlite3 = require('sqlite3').verbose(); // import sqlite3 mode and set to verbose mode


//open database in "memory"
let db= new sqlite3.Database('../db/sport_track.db',(err)=> {                   //creation of a Database object, the paramater (err)  is a callback to  used in the case when we have an error without this, the gestion of the error is not maked
    if (err){

    console.error(' Error  : connection to database failed :'+err.message);    
    }
    else {  
        console.log('Connection to database successfull ! '); 
    }    

});  

module.exports = db; 

/*
//close the database connection

db.close((err)=> {
    if (err) {

        console.error('Error : Closure of database failed :'+err.message);

    }
    else {
        console.log('Close the database connection !');
    }

});

*/