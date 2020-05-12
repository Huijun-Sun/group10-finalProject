const dbConnection = require('../config/mongoConnection');

const data=require('../data/');

const events = data.events;
let date1=new Date();
date1.setDate(date1.getDate()+2);
let date2=new Date();
date2.setDate(date2.getDate()+4);
/*let date3=new Date();
date3.setDate(date3.getDate()-2);
let date4=new Date();
date4.setDate(date4.getDate()-1);*/

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();
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
   //let b=await bands.addBand(band2.bandName,band2.bandMembers,band2.yearFormed,band2.genres,band2.recordLabel);

   /*date4.setHours(date3.getHours()+1);
   date4.setDate(date3.getDate());

   date2.setHours(date1.getHours()+2);
   date2.setDate(date1.getDate());*/

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

main().catch((error)=>{
	console.log(error);
	db.serverConfig.close();
})