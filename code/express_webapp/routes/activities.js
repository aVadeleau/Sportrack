const express = require('express');
const router = express.Router();
var activity_dao = require('sport-track-db').activity_dao;
var data_dao = require('sport-track-db').data_dao;
const fs=require("fs");




//To verify if the insertion/update is ok 
router.get('/', function(req, res, next) {

    activity_dao.findAll(function(err,rows){

        if (err!= null) {
            console.log("ERROR :"+err);
        }
        else {

            res.render('activities',{data:rows});

        }    
    });
});
  


  
  
  module.exports = router;