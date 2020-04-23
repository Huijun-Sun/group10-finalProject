const universities = require("../data/universities");
const Discussion = require("../data/Discussion");
const connection = require('../config/mongoConnection');

async function main() {
    try{
        var dt = {date: new Date()};
       // console.log(await universities.addUniversity("Stevens Instituite of Technology",["Computer Science","Information Systems","Financial Engineering","Business Intelligent & Analytics"],"Private",["Masters","UnderGraduate","Graduate Certication"],"Hoboken,NJ",[dt,dt],"$40000",4.2,135,"$4000",300,"stevens.edu",2,2.8,["spring","fall"],2));
         //console.log(await universities.getUniversity_finder("Computer Science",300,5,3.1,2));
       // console.log(await universities.getDeadline("Stevens Instituite of Technology","Computer Science","fall"));
        //console.log(await universities.getDeadline("Stevens Instituite of Technology","Computer Science"));
        //console.log(await universities.getDeadline(null,"Computer Science"));
       // console.log(await Discussion.addDiscussionTopic("What is the deadline for NYC?"));
       // console.log(await Discussion.addDiscussionComment("For fall?","5ea0cedce1aa145fc46a333e"));
      //  console.log(await Discussion.addDiscussionComment("next week","5ea0cf5907a1306d146630ef"));

     //   console.log(await Discussion.getAllTopics());
    
  
    
}
    catch(e)
    {
        console.log(e);
    }
}

main();