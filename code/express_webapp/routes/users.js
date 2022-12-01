const express = require('express');
const router = express.Router();
var user_dao = require('sport-track-db').user_dao;
const bcrypt= require('bcryptjs'); // Librairie utiliser pour crypter les mots de passe
const fs= require('fs'); // Librairie utiliser pour lire et découper un.json



//Register form
router.get('/form',function(req, res ){

  //Découpe  et lis le .json
  let fileJSON = fs.readFileSync('./isConnect.json');
  let json = JSON.parse(fileJSON);  
 

  /*Alternative qui permet de déterminer si l'utilisateur est connecté,  
  si il est connecté( l'attribut connection du fichier .json est à true) alors on rédirige vers la vue account
  */

  if (json.isConnect.connection){
    res.redirect('/connect/account');

  }
  else{
    res.render('users_form');  
  }

});

router.post('/form',function(req,res){
  
  const email = req.body.email;
  const last = req.body.lastname;
  const first = req.body.firstname;
  const birth = req.body.birthday;
  const sexe= req.body.sexe;
  const height = req.body.height;
  const weight = req.body.weight;
  let password = req.body.password;


    console.log("Sexe : "+sexe );
    console.log("Password before hashing : "+password);


    user_dao.findByKey(email,function(err, rows) {
      if(err != null){
        console.log("ERROR= " +err);
        }
        else {
          if(rows==undefined){
            testMail="defined"
          } 
          else {   

            testMail=rows.email
          }

          console.log(rows);
          console.log(email);
          console.log(testMail);
          
          console.log(testMail==email);

          if ( testMail==email) {

            console.log("Email déja existant veuillez changer ");
            res.render('users_form');
          } 
          else {
            // On crypte le mot de passe  
            bcrypt.genSalt(8,function(err, salt){
              bcrypt.hash(password, salt, function (err, hash){
                if(err){
                  console.log(err);
                }
                password= hash;
                console.log("Password after hashing"+password);
        
                    
                user_dao.insert({email: email ,lastname: last ,firstname: first ,birthday : birth ,sexe: sexe ,height: height ,weight: weight ,password: password},function(err){
                  if(err){
                    console.log(err);
                  }
                  else{
                    console.log('Un utilisateur à été ajouté : '+email );   
                    res.redirect('/connect'); 
                  }   
                });      
              });
            });
          }
        }    
    });             
});


//To verify if the insertion/update is ok 
router.get('/', function(req, res, next) {

  user_dao.findAll(function(err, rows) {
    if(err != null){
      console.log("ERROR= " +err);
    }else {
      res.render('users', {data:rows});
      console.log(rows.length);
    }
  });

});


module.exports = router;