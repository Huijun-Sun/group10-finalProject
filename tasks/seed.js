const universities = require("../data/universities");
const Discussion = require("../data/discussion");
const connection = require('../config/mongoConnection');

async function main() {
    try{
       // var dt = {date: new Date(2020,05,07)};
       var dt =new Date(2020,04,07);
         await universities.addUniversity("stevens instituite of technology",["computer science","information systems"],"Private",["Masters","UnderGraduate","Graduate Certication"],
         "Hoboken,NJ",dt,"$40000",4.2,100,"$4000",300,"stevens.edu",2,2.8,["spring","fall"],1);
        await universities.addUniversity("columbia university",["computer science","information systems","financial engineering","business intelligent & analytics"],"Private",["Masters","UnderGraduate","Graduate Certication"],
        "New York",dt,"$40000",4.8,3,"$4000",310,"columbia.edu",2,3.2,["spring","fall"],2);
        await universities.addUniversity("nyu",["computer science","information systems","financial engineering","business intelligent & analytics"],"Private",["Masters","UnderGraduate","Graduate Certication"],
        "New York",dt,"$40000",4.5,4,"$4000",315,"Nyu.edu",3,3.5,["spring","fall"],3);
        await universities.addUniversity("nyu",["computer science","information systems","financial engineering"],"Private",["Masters","UnderGraduate","Graduate Certication"],
        "New York",dt,"$40000",4.5,4,"$4000",315,"Nyu.edu",3,3.5,["spring","fall"],3);
        await universities.addUniversity("rutgers state university",["computer science","information systems","business intelligent & analytics"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "New Newark,NJ",dt,"$40000",4.4,50,"$4000",308,"Rutgers.edu",1,3,["spring","fall"],1);
        await universities.addUniversity("njit",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "New Newark,NJ",dt,"$40000",4.4,150,"$4000",298,"njit.edu",1,2.9,["spring","fall"],1);
        await universities.addUniversity("ut dallas",["computer science","information systems"],"private",["Masters","UnderGraduate","Graduate Certication"],
        "Dallas",dt,"$40000",4.4,10,"$4000",305,"utdallas.edu",1,2.9,["spring","fall"],1);
        await universities.addUniversity("university of illinois",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "Illinois",dt,"$40000",4.4,150,"$4000",308,"univilli.edu",1,2.9,["spring","fall"],1);
        await universities.addUniversity("perdu",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "Penssylvania",dt,"$40000",4.7,2,"$4000",315,"perdu.edu",3,3.7,["spring","fall"],3);
        await universities.addUniversity("cambridge",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "piscataway,nj",dt,"$40000",4.8,1,"$4000",320,"cambridge.edu",3,3.9,["spring","fall"],4);
        
        
        //console.log(await universities.getUniversity_finder("Computer Science",300,5,3.1,2));
       // console.log(await universities.getDeadline("Stevens Instituite of Technology","Computer Science","fall"));
        //console.log(await universities.getDeadline("Stevens Instituite of Technology","Computer Science"));
        //console.log(await universities.getDeadline(null,"Computer Science"));
       // console.log(await Discussion.addDiscussionTopic("What is the deadline for NYC?"));
       // console.log(await Discussion.addDiscussionComment("For fall?","5ea0cedce1aa145fc46a333e"));
      //  console.log(await Discussion.addDiscussionComment("next week","5ea0cf5907a1306d146630ef"));

     //cd    console.log(await Discussion.getAllTopics());
    
  
    
}
    catch(e)
    {
        console.log(e);
    }
}

main();