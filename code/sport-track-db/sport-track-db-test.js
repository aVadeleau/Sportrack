var user_dao = require('./sport-track-db').user_dao;
var activity_dao = require('./sport-track-db').activity_dao;
var data_dao= require('./sport-track-db').data_dao;
var db = require('./sport-track-db').db_connection;



user_dao.delete("jeantesteur@mail.fr",(err)=>{

    if(err) {

        console.log("User DAO : Delete error "+err);

    }
    else { 

        console.log("UserDAO : Delete OK");
        user_dao.insert({email: "jeantesteur@mail.fr", lastname: "Testeur", firstname: "Jean", birthday: "01/01/97", sexe: "homme", height: 180, weight: 80, password:"Azerty02" },(err)=> {

            if(err) {
        
                console.log("User DAO : Insert error "+err);
        
            }
            else { 
        
                console.log("UserDAO : Insert OK");
                user_dao.update("jeantesteur@mail.fr",{lastname: "Testeur", firstname: "Jean", birthday: "01/01/97", sexe: "homme", height: 180, weight: 80, password:"Azerty02" },(err)=> {

                    if(err) {
                
                        console.log("User DAO : Update error "+err);
                
                    }
                    else { 
                
                        console.log("UserDAO : Update OK");
                        user_dao.findAll((err)=> {


                            if(err) {
                        
                                console.log("User DAO : findAll error "+err);
                        
                            }
                            else { 
                        
                                console.log("UserDAO : findAll OK");
                                user_dao.findByKey("jeantesteur@mail.fr",(err)=> {

                                    if(err) {
                                
                                        console.log("User DAO : findByKey error "+err);
                                
                                    }
                                    else { 
                                
                                        console.log("UserDAO : findByKey OK");
                                
                                    }
                                });
                        
                            }
                        
                        });
                
                    }
                    
                });
                
        
            }
            
        })

    }

}); 

;









activity_dao.delete(04,(err)=>{

    if(err) {

        console.log("ActivityDAO : Delete error "+err);

    }
    else { 

        console.log("ActivityDAO : Delete OK");
        activity_dao.insert({numA:04,date:"06/10/19",description:"Cardio",beginHour:"17h50",durantion:"2h30",distance:2.5,freqMin:75,freqMax:120,freqMoy:95,theUser:"jeantesteur@mail.fr"},(err)=>{

            if(err) {
        
                console.log("Activity DAO : Insert error "+err);
        
            }
            else { 
        
                console.log("ActivityDAO : Insert OK");
                activity_dao.update(04,{date:"07/10/19",description:"Cardio",beginHour:"16h30",durantion:"2h00",distance:2.0,freqMin:75,freqMax:110,freqMoy:95,theUser:"jeantesteur@mail.fr"},(err)=>{

                    if(err) {
                
                        console.log("Activity DAO : Update error "+err);
                
                    }
                    else { 
                
                        console.log("ActivityDAO : Update OK");
                        activity_dao.findAll((err)=>{

                            if(err) {
                        
                                console.log("ActivityDAO : findAll error "+err);
                        
                            }
                            else { 
                        
                                console.log("ActivityDAO : findAll OK");
                                activity_dao.findByKey((err)=>{

                                    if(err) {
                                
                                        console.log("ActivityDAO : findByKey error "+err);
                                
                                    }
                                    else { 
                                
                                        console.log("ActivityDAO : findByKey OK");
                                
                                    }
                                
                                });
                                
                        
                            }
                        
                        });
                
                    }
                }); 
        
            }
        });  
        

    }

});













data_dao.delete(04,(err)=>{

    if(err) {

        console.log("DataDAO : Delete error "+err);

    }
    else { 

        console.log("DataDAO : Delete OK");
        data_dao.insert({numD: 04,hour:"16h30",heartFreq:85,latitude:45.5646,longitude:78.64644564,altitude:-2.5677869,theActivity:04},(err)=>{

            if(err) {
        
                console.log("DataDAO : Insert error "+err);
        
            }
            else { 
        
                console.log("DataDAO : Insert OK");
                data_dao.update(04,{hour:"16h30",heartFreq:85,latitude:45.5646,longitude:78.64644564,altitude:-2.5677869,theActivity:04},(err)=>{

                    if(err) {
                
                        console.log("DataDAO : Update error "+err);
                
                    }
                    else { 
                
                        console.log("DataDAO : Update OK");
                        data_dao.findAll((err)=>{

                            if(err) {
                        
                                console.log("DataDAO : findAll error "+err);
                        
                            }
                            else { 
                        
                                console.log("DataDAO : findAll OK");
                                data_dao.findByKey((err)=>{

                                    if(err) {
                                
                                        console.log("DataDAO : findByKey error "+err);
                                
                                    }
                                    else { 
                                
                                        console.log("DataDAO : findByKey OK");
                                
                                    }
                                
                                });
                                
                        
                            }
                        
                        });
                        
                
                    }
                
                });
                
        
            }
        
        });

    }

});









