const express = require('express');
const router = express.Router();
var user_dao = require('sport-track-db').user_dao;
const bcrypt= require('bcryptjs');
const fs= require('fs');



router.get('/',function(req,res){

  console.log(req.session.email);
  console.log(req.session.email!==undefined);


  let fileJSON = fs.readFileSync('./isConnect.json');
  let json = JSON.parse(fileJSON); 
 
  if ( json.isConnect.connection){
    res.redirect('/connect/account');

  }
  else{
    res.render('connect');  
  }  
  
});
  



router.post('/',function(req,res){
  const email= req.body.email;
  const password= req.body.password;

  
  user_dao.findByKey(email,function(err, rows) {
    if(err){
        console.log("ERROR= " +err);
    }
    else {
      if(rows==undefined){
        testPass="defined"
      } 
      else {   

        testPass=rows.password;
      }

      //Cette fonction sert à comparer un mot de passe hashé et un mot de passe 
      bcrypt.compare(password,testPass,function(err,verif){

        if (err){
          console.log("error"+err);
        }
        if (verif){

          req.session.email=email;
              
          console.log(req.session.email);

          let isConnect ={
            "isConnect":{
              "connection":true,
              "currentUser":req.session.email
            }
            
          };
          //On écrit l'objet dans le fichier .json 
          let data = JSON.stringify(isConnect);
          fs.writeFileSync('./isConnect.json', data);
          
          res.render('account');
          console.log(" Connection réussie !");

                      
        }  
        else {
          console.log("Connection échouée veuillez vérifier votre mot de passe /email");
          res.render('connect');
          
        }
      });      
    }  
  });   
});


router.get('/disconnect',function(req,res){

  req.session.destroy(err=>{
    if(err){
      res.render('account');
    }
    else {

      //Quand on se déconnecte on créé un objet qui sera inséré dans un .json qui correspond  à la déconnection  
      console.log("Déconnexion réussie ! ");
      let isConnect ={
        "isConnect":{
            "connection":false,
            "currentUser":undefined 
        }
    
      };
      //On insère l'objet dans un .json   
      let data = JSON.stringify(isConnect);
      fs.writeFileSync('./isConnect.json', data);

      res.render('disconnect');
    }
  });
  

});


router.get('/account',function(req,res){


  let fileJSON = fs.readFileSync('./isConnect.json');
  let json = JSON.parse(fileJSON); 
 
  console.log("JSON: "+json.isConnect.connection);
  console.log("Condition :"+json.isConnect.connection==false);


 /*Alternative qui permet de déterminer si l'utilisateur n'est pas connecté,  
  si il n'est pas connecté( l'attribut connection du fichier .json est à false ) alors on rédirige vers la vue connect
  */

  if ( !json.isConnect.connection){
    res.redirect('/connect');

  }
  else{
    res.render('account');  
  }
});


module.exports = router;  
      