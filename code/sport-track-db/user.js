
class User {

    constructor(email,lastname,firstname,birthday,sexe,height,weight,password){
        this.email=email;
        this.lastname=lastname;
        this.firstname=firstname;
        this.birthday=birthday;
        this.sexe=sexe;
        this.height=height;
        this.weight=weight;
        this.password=password;
    }


    getEmail= function(){ return this.email;}
    getLastname= function(){ return this.lastname;}
    getFirstname= function(){ return this.firstname;}
    getBirthday= function(){ return this.birthday;}
    getSexe= function(){ return this.sexe;}
    getHeight= function(){ return this.height;}
    getWeight= function(){ return this.weight;}
    getPassword= function(){ return this.password;}



}


const user = new User(email,lastname,firstname,birthday,sexe,height,weight,password);

module.exports = user;