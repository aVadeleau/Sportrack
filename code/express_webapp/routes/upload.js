const express = require('express');
const router = express.Router();
var activity_dao = require('sport-track-db').activity_dao;
var data_dao = require('sport-track-db').data_dao; 
var calcDist= require('sport-track-db').calcul_distance;
const fs=require("fs");


router.get('/',function(req,res){

    //Permet de lire le fichier .json qui contient les informations de connexion    
    let fileJSON = fs.readFileSync('./isConnect.json');
    let json = JSON.parse(fileJSON); 
   
    if (!json.isConnect.connection){
      res.redirect('/connect/account');
  
    }
    else{
      res.render('upload');  
    }

});



router.post('/',function(req,res){

    //Permet de récupérer le nombre d'activités pour récupérer numA, si aucune activité est présente dans la base , numA est initié à 0
    activity_dao.findAll(function(err, rows) {
        if(err != null){
            console.log("ERROR= " +err);
        }
        else {
            if (rows==undefined){
                var numA=0;
            }
            else {
                var numA = rows.length;
            }
          
            var activityFile= req.files.activityFile; 

            //Déplace le fichier activité.json dans le répertoire cité, ci-dessus
            activityFile.mv("public/activité/"+ "activité.json",function(error){
                if(error){
                    console.log("Erreur upload impossible :"+error);
                  
                }
                else{
                    activity_dao.findByKey(numA,function(err, rows){

                        if(err != null) {
                            console.log("ERROR :"+err);

                        }
                        else {
                            // Si le numéro n'est pas compris dans la base alors on met testNum à -1 (pour que la comparaison un peu plus loin passe)    
                            if(rows==undefined){
                                testNum=-1;
                            }
                            else{
                                testNum=rows.numA;
                            }


                            if( testNum==numA){
                                console.log("Activité déjà existante veuillez en insérer une autre");
                                res.render('account');
                            }
                            else{
                            
                                let fileJSON = fs.readFileSync('./public/activité/activité.json');
                                let json = JSON.parse(fileJSON); 

                                //Calcul de la distance
                                let distance=0;
                                var j=0;
                                for(var i=0;i<json.data.length-1;i++){
                        
                                    j=i+1;
                                    distance+=calcDist.calculDistance2PointsGPS(json.data[i].latitude,json.data[i].longitude,json.data[j].latitude,json.data[j].longitude);
                                }
                                distance= distance*1000;

                                //Calcul de la freq min :
                                let freqMin=150;
                    
                                for(var i=0; i<json.data.length-1;i++){

                                    if (freqMin> json.data[i].cardio_frequency) {
                                        freqMin= json.data[i].cardio_frequency;

                                    }

                                }
                                //Calcul de la freq max:
                                let freqMax=0;
                                
                                for(var i=0; i<json.data.length-1;i++){    
                                    if(freqMax<json.data[i].cardio_frequency) {
                                        freqMax= json.data[i].cardio_frequency;
                                    } 
                                }

                                //Calcul de la freq Moy:
                                let freqMoy=0;
                                let sum=0;

                                for(var i=0; i<json.data.length;i++){ 
                            
                                    sum+=json.data[i].cardio_frequency;

                                }
                                let nbFreq = json.data.length;      
                                freqMoy = (sum / nbFreq); 

                                var max = freqMax;
                                var min= freqMin;
                                var moy= freqMoy;    
                                 
                                let lastI =  json.data.length-1;          
                                let duration= dateDiff(json.data[0].time,json.data[lastI].time);       

                                        

                                //Lis le fichier d'activité et le découpe :
                                fileJSONUser = fs.readFileSync('./isConnect.json');
                                jsonUser = JSON.parse(fileJSONUser); 
                                let user= jsonUser.isConnect.currentUser;

                                 
                                activity_dao.insert({numA: numA, date:json.activity.date, description:json.activity.description,beginHour: json.data[0].time, duration:duration, distance:distance, freqMin:min, freqMax:max, freqMoy:moy ,theUser:user },function(err){

                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log('Une activité à été ajouté');
                                    }

                                    //Insertion de la data (ActivityEntry) :   
                                    data_dao.findAll(function(err, rows){ 
                
                                        if(err != null){
                                            console.log("ERROR: "+err);
                    
                                        }
                                        else{
                                            if(rows==undefined){
                                                var numD=0;
                                            }
                                            else{
                                                var numD= rows.length; 
                                            }

                                            //Permet de récupérer le nombre de données d'activités pour récupérer numD, si aucune donnée d'activité est présente dans la base , numD est initié à 0   
                                            data_dao.findByKey(numD,function(err, rows){
                                                
                                                if(err != null){
                                                    console.log("ERROR:"+err);                                                    
                                                }
                                                else{
                                                    if(rows==undefined){
                                                        testNumD=-1;
                                                    }
                                                    else{
                                                        testNumD=rows.numD;
                                                    }

                                                    if(testNumD==numD){
                                                        console.log("Donnée d'activité déja existante");      
                                                        res.render('account');
                                                    }
                                                    else {
                                                        //On lis le fichier d'activité et on découpe le .json
                                                        let fileJSON = fs.readFileSync('./public/activité/activité.json');
                                                        let json = JSON.parse(fileJSON);
                                                             
                                                        for(var i=0; i<json.data.length; i++){

                                                            //On insère la donnée d'activité dans la BDD
                                                            data_dao.insert({numD: numD,hour:json.data[i].time, heartFreq:json.data[i].cardio_frequency, latitude:json.data[i].latitude, longitude:json.data[i].longitude, altitude:json.data[i].altitude, theActivity:numA},function(err){

                                                                if(err){
                                                                    console.log(err);

                                                                }
                                                                else{
                                                                    console.log("Une donnée d'activité à été ajouté :"+numD);


                                                                }

                                                            });   
                                                            numD++;
                                                            res.end();             
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    });     
                                });
                            }   
                        }
                    });  
                }
            });
        }
    });
});



function dateDiff(date1, date2) {
    let ret = "";// Initialisation du retour
    let h = parseInt(parseInt(date2.substring(0,2))-parseInt(date1.substring(0,2)));
    if(parseInt(h)<10){
        h = "0"+h;
    }
    let m = parseInt(parseInt(date2.substring(3,5))-parseInt(date1.substring(3,5)));
    if(parseInt(m)<10){
        m = "0"+m;
    }
    let s = parseInt(parseInt(date2.substring(6,8))-parseInt(date1.substring(6,8)));
    if(parseInt(s)<10){
        s = "0"+s;
    }
    console.log(h+":"+m+":"+s)
    ret = h+":"+m+":"+s;
    return ret;
}


module.exports = router;