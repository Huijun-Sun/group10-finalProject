const universities = require("../data/universities");
const Discussion = require("../data/discussion");
const connection = require('../config/mongoConnection');

async function main() {
    try{
       // var dt = {date: new Date(2020,05,07)};
       let dt =new Date(2020,04,15);
         await universities.addUniversity("massachusetts instituite of technology",["computer science","information systems"],"Private",["Masters","UnderGraduate","Graduate Certication"],
         "Boston,MA",dt,"$50000",4.2,10,"$5500",300,"www.mit.edu",2,3.4,["spring","fall"],1,"Although it’ll no doubt be fascinating and highly inspiring to read about MIT, it could also give you a serious inferiority complex because Massachusetts Institute of Technology is perhaps the best overall college in the world. It makes sure its students are no less. To get into MIT, you need to be excellent in everything, and even that probably won’t be enough.MIT is absolutely top-notch in everything, from infrastructure to faculty to extracurriculars to placements to alumni. An interesting bit of trivia: the aggregated revenues of companies founded by MIT alumni would rank as the eleventh largest economy in the world. Now, that's MIT.We associate only one word with MIT USA - WOW.","GRE TOEFL/IELTS required");

          dt =new Date(2020,05,17);
         await universities.addUniversity("columbia university",["computer science","information systems","financial engineering","business intelligent & analytics"],"Private",["Masters","UnderGraduate","Graduate Certication"],
        "New York,NY",dt,"$80000",4.8,3,"$8000",310,"www.columbia.edu",2,3.2,
        ["fall"],2,
        "Columbia University is a private Ivy League research university in New York City. Established in 1754 on the grounds of Trinity Church in Manhattan, Columbia is the oldest institution of higher education in New York and the fifth-oldest institution of higher learning in the United States","GMAT/GRE TOEFL required");
       
         dt =new Date(2020,05,06);
        await universities.addUniversity("nyu",["computer science","information systems","financial engineering","business intelligent & analytics"],"Private",["Masters","UnderGraduate","Graduate Certication"],
        "New York,NY",dt,"$70000",4.5,4,"$7000",315,"www.Nyu.edu",3,3.5,["spring","fall"],3,"New York University is a private research university based in New York City. Founded in 1831 by Albert Gallatin as an institution to admit based upon merit rather than birthright or social class, NYU's historical campus is in Greenwich Village. NYU is the largest independent research university in the United States.","GRE TOEFL required");
       
         dt =new Date(2020,04,27);
        await universities.addUniversity("stevens institute of technology",["computer science","information systems","financial engineering","mechanical engineering"],"Private",["Masters","UnderGraduate","Graduate Certication"],
        "Hoboken,NJ",dt,"$40000",4.1,40,"$4000",300,"www.stevens.edu",1,2.9,["spring","fall"],1,"Stevens Institute of Technology is a private research university in Hoboken, New Jersey. Incorporated in 1870, it is one of the oldest technological universities in the United States and was the first college in America solely dedicated to mechanical engineering.","TOEFL Required");
       
         dt =new Date(2020,04,29);
        await universities.addUniversity("rutgers state university",["computer science","information systems","construction management"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "New Brunswick,NJ",dt,"$20000",4.4,50,"$2000",308,"www.Rutgers.edu",1,3,["spring","fall"],1,"Rutgers, The State University of New Jersey, commonly referred to as Rutgers University, or RU, is an American public research university in New Jersey. It is the largest institution of higher education in New Jersey. Rutgers was originally chartered as Queen's College on November 10, 1766.","GMAT GRE TOEFL required");
       
         dt =new Date(2020,06,04);
        await universities.addUniversity("new jersey institute of technology",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "Newark,NJ",dt,"$25000",4.4,150,"$4000",298,"www.njit.edu",1,2.9,["spring","fall"],1,"The New Jersey Institute of Technology is a public research university in Newark, New Jersey. Founded in 1881 with the support of local industrialists and inventors especially Edward Weston, NJIT opened as Newark Technical School in 1885 with 88 students.","TOEFL/IELTS Required ");
       
         dt =new Date(2020,07,01);
        await universities.addUniversity("ut dallas",["computer science","information systems"],"private",["Masters","UnderGraduate","Graduate Certication"],
        "Richardson,TX",dt,"$30000",4.4,10,"$3000",305,"wwww.utdallas.edu",1,2.9,["spring","fall"],1,"The University of Texas at Dallas (UTD or UT Dallas) is a public research university with its main campus in Richardson, Texas. The institution was initially established as a private research arm of Texas Instruments in 1961 as the Graduate Research Center of the Southwest (GRCS)","GRE Required" );
       
         dt =new Date(2020,04,17);
        await universities.addUniversity("university of illinois",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "Chicago,IL",dt,"$55000",4.4,150,"$3000",308,"wwww.uic.edu",1,2.9,["spring","fall"],1,"The University of Illinois at Chicago is a public research university in Chicago, Illinois. Its campus is in the Near West Side community area, adjacent to the Chicago Loop","GRE TOEFL Required");
       
         dt =new Date(2020,05,07);
        await universities.addUniversity("purdue",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "Lafayette,IN",dt,"$46000",4.7,2,"$5000",315,"www.purdue.edu",3,3.7,["spring","fall"],3,"Purdue University is a public research university in West Lafayette, Indiana, and the flagship campus of the Purdue University system. The university was founded in 1869 after Lafayette businessman John Purdue donated land and money to establish a college of science, technology, and agriculture in his name","GRE/GMAT Required");
       
         dt =new Date(2020,04,30);
        await universities.addUniversity("Carnegie Mellon ",["computer science","information systems"],"public",["Masters","UnderGraduate","Graduate Certication"],
        "Pittsburg,pa",dt,"$40000",4.8,1,"$4000",320,"cambridge.edu",3,3.9,["spring","fall"],4,"Carnegie Mellon University is a private research university based in Pittsburgh, Pennsylvania. Founded in 1900 by Andrew Carnegie as the Carnegie Technical Schools, the university became the Carnegie Institute of Technology in 1912 and began granting four-year degrees.","GRE GMAT TOEFL IELTS any 3 needed");
        
        console.log("done");
        //console.log(await universities.getUniversity_finder("Computer Science",300,5,3.1,2));
       // console.log(await universities.getDeadline("Stevens Instituite of Technology","Computer Science","fall"));
        //console.log(await universities.getDeadline("Stevens Instituite of Technology","Computer Science"));
        //console.log(await universities.getDeadline(null,"Computer Science"));
      // await Discussion.addDiscussionTopic("What is the deadline for NYC?")
       // console.log(await Discussion.addDiscussionComment("For fall?","5ea0cedce1aa145fc46a333e"));
      //  console.log(await Discussion.addDiscussionComment("next week","5ea0cf5907a1306d146630ef"));

     //cd    console.log(await Discussion.getAllTopics());
   
   // events seed start
   const db = await dbConnection();
   await db.dropDatabase();
   
   const events = data.events;
   let date1=new Date();
   //date1.setDate(date1.getDate()+2);
   let date2=new Date();
   //date2.setDate(date2.getDate()+4);
   var hours;
   //event 1
   date1.setDate(9);
   date1.setHours(15);
   date1.setMinutes(0);

   date2.setDate(9);
   date2.setHours(17);
   date2.setMinutes(0);

   hours=date2.getHours()-date1.getHours();
   let event1={
    title:"Mother's Day Virtual Celebration: #ForMyHero2020",
    start_date:date1.getTime().toString(),
    end_date:date2.getTime().toString(),
    lasting_time:hours,
    address:"Online",
    description:"The SGA will be partnering with Radical Pause and Wine & Design studio for our Mother's Day Virtual Celebration #ForMyHero2020.",
    event_link:"https://stevens.campuslabs.com/engage/event/5701597",
    img_url:"../../public/img/event1.PNG"
    };
   let a=await events.addEvent(event1.title, event1.start_date, event1.end_date, 
    event1.lasting_time, event1.address, event1.description, event1.event_link, event1.img_url);

   //event 2
   date1.setDate(11);
   date1.setHours(9);
   date1.setMinutes(0);

   date2.setDate(15);
   date2.setHours(17);
   date2.setMinutes(0);

   hours=2*24+8;
   let event2 ={
	title:"Virtual Library Office Hours via Ask Us chat!",
    start_date:date1.getTime().toString(),
    end_date:date2.getTime().toString(),
    lasting_time:hours,
    address:"Online",
    description:"Our ASK US chat will be available from our home page in an instant pop-up and the ASK US button on our home page.",
    event_link:"https://stevens.campuslabs.com/engage/event/5695555",
    img_url:"../../public/img/event2.PNG"
   };
   let b=await events.addEvent(event2.title,event2.start_date,event2.end_date,event2.lasting_time,event2.address,event2.description,event2.event_link,event2.img_url);

   //event 3
   date1.setDate(6);
   date1.setHours(12);
   date1.setMinutes(0);

   date2.setDate(6);
   date2.setHours(13);
   date2.setMinutes(0);

   hours=date2.getHours()-date1.getHours();;
   let event3 ={
      title:"Career Development Workshop Series - Interviewing Techniques",
       start_date:date1.getTime().toString(),
       end_date:date2.getTime().toString(),
       lasting_time:hours,
       address:"Online",
       description:"Nail the interview! It's all about the preparation.",
       event_link:"https://stevens.campuslabs.com/engage/event/5706871",
       img_url:"../../public/img/event3.PNG"
      };
   let c=await events.addEvent(event3.title,event3.start_date,event3.end_date,event3.lasting_time,event3.address,event3.description,event3.event_link,event3.img_url);
   
   //event 4
   date1.setDate(6);
   date1.setHours(21);
   date1.setMinutes(0);

   date2.setDate(6);
   date2.setHours(23);
   date2.setMinutes(45);

   hours=date2.getHours()-date1.getHours();;
   let event4 ={
         title:"Alphademics - Online Edition",
          start_date:date1.getTime().toString(),
          end_date:date2.getTime().toString(),
          lasting_time:hours,
          address:"Online",
          description:"We will go over creative tips and tricks to increase your productivity, reduce your stress, and keep you better intuned to your respective classes.",
          event_link:"https://stevens.campuslabs.com/engage/event/5709787",
          img_url:"../../public/img/event4.PNG"
         };
   let d=await events.addEvent(event4.title,event4.start_date,event4.end_date,event4.lasting_time,event4.address,event4.description,event4.event_link,event4.img_url);
   
    //event 5
   date1.setDate(1);
   date1.setHours(17);
   date1.setMinutes(0);

   date2.setDate(1);
   date2.setHours(21);
   date2.setMinutes(0);

   hours=date2.getHours()-date1.getHours();;
   let event5 ={
         title:"CSU Remote Gaming Night",
          start_date:date1.getTime().toString(),
          end_date:date2.getTime().toString(),
          lasting_time:hours,
          address:"Online",
          description:"Join us via Zoom and play online games! Heads Up, Drawful and Smash Bros Ultimate, and More!",
          event_link:"https://stevens.campuslabs.com/engage/event/5706673",
          img_url:"../../public/img/event5.PNG"
         };
   let e=await events.addEvent(event5.title,event5.start_date,event5.end_date,event5.lasting_time,event5.address,event5.description,event5.event_link,event5.img_url);
   
   
   await db.serverConfig.close();
     
}
    catch(e)
    {
        console.log(e);

        db.serverConfig.close();
    }
}

main();