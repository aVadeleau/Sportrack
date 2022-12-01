
const CalculDistance= function () {

    this.calculDistance2PointsGPS= function (lat1,long1,lat2,long2){

        var ret;
        const R=6378.137;

        lat1 = Math.PI*(lat1/180);
        long1 = Math.PI*(long1/180);
        lat2 = Math.PI*(lat2/180);
        long2 = Math.PI*(long2/180);

        ret=R*Math.acos(Math.sin(lat2)*Math.sin(lat1)+Math.cos(lat2)*Math.cos(lat1)*Math.cos(long2-long1));
        
        return ret;
    }

    this.calculDistanceTrajet=function (activity){

        var somme,j=0;
        somme = 0;
        for(var i=0;i<activity.length-1;i++){
            
            j=i+1;
            console.log("somme :"+somme);
            somme+=calculDistance2PointsGPS(activity[i][0],activity[i][1],activity[j][0],activity[j][1]);
        }
        return somme;
    }    

}

const calc= new CalculDistance();
module.exports= calc;
