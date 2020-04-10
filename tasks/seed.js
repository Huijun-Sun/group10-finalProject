const universities = require("../data/universities");
const connection = require('../config/mongoConnection');

async function main() {
    try{
        var dt = {date: new Date()};
        console.log(await universities.addUniversity("Stevens Instituite of Technology",["Computer Science","Information Systems","Financial Engineering","Business Intelligent & Analytics"],"Private",["Masters","UnderGraduate","Graduate Certication"],"Hoboken,NJ",[dt,dt],"$40000",4.2,135,"$4000",300,"stevens.edu",2,2.8,),["spring","fall"]);
        console.log(await universities.getUniversity_finder("Computer Science",300,5,3.1));
        console.log(await universities.getDeadline("fall"));
        console.log("DB data Added");
    
  
    
}
    catch(e)
    {
        console.log(e);
    }
}

main();