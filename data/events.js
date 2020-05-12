const mongoCollections = require('../config/mongoCollections');
const events = mongoCollections.events;
const { ObjectId } = require('mongodb');

module.exports={
    myCompare(property){
        return function(obj1,obj2){
            var val1=obj1[property];
            var val2=obj2[property];
            return val2-val1;
        }
    },
    async getAllEvents(){
        const eventCollection= await events();
        let eventList= await eventCollection.find({}).toArray();
        if(!eventList.length)
            throw "No events found!";

        eventList.sort(this.myCompare("end_date"));

        for(let i=0;i<eventList.length;i++)
        {
            let start_date =new Date(parseInt(eventList[i].start_date.toString()));
            eventList[i].start_date=start_date.getFullYear()+"-"+ (start_date.getMonth()<9?("0"+(start_date.getMonth()+1)):(start_date.getMonth()+1)) + "-"+(start_date.getDate()<10?"0"+start_date.getDate():start_date.getDate());
            
            let start_hour=start_date.getHours();
            let start_min=start_date.getMinutes();

            if(start_min<10){
                start_min="0"+start_min;
            }

            if(start_hour<12){
                //start_hour="0"+start_hour;
                if(start_hour<10){
                    start_hour="0"+start_hour+":"+start_min+" AM";
                }
                else{
                    start_hour=start_hour+":"+start_min+" AM";
                }
            }
            else{
                if(start_hour==12){
                    start_hour=start_hour+":"+start_min+" PM";
                }
                else if(start_hour==24){
                    start_hour=(start_hour-12)+":"+start_min+" AM";
                }
                else{
                    start_hour=start_hour-12;
                    if(start_hour<10){
                        start_hour="0"+start_hour+":"+start_min+" PM";
                    }
                    else{
                       start_hour=start_hour+":"+start_min+" PM";
                    }
                }
            }
            eventList[i].start_hour=start_hour;

            let end_date=new Date(parseInt(eventList[i].end_date.toString()));
            eventList[i].end_date=end_date.getFullYear()+"-"+ (end_date.getMonth()<9?("0"+(end_date.getMonth()+1)):(end_date.getMonth()+1)) + "-"+(end_date.getDate()<10?"0"+end_date.getDate():end_date.getDate());
            
            let lastingTime=parseInt(eventList[i].lasting_time.toString());
            if(lastingTime<24){
                //hour
                if(lastingTime==1){
                    eventList[i].lasting_time=lastingTime+" hr";
                }
                else{
                    eventList[i].lasting_time=lastingTime+" hrs";
                }
            }
            else{
                //day
                lastingTime=Math.floor(lastingTime/24);
                if(lastingTime==1){
                    eventList[i].lasting_time=lastingTime+" day";
                }
                else{
                    eventList[i].lasting_time=lastingTime+" days";
                }
            }
            //eventList[i].lasting_time= lastingTime<=24?(lastingTime<=1? (lastingTime+"hr"):(lastingTime+"hrs")):(Math.floor(lastingTime/24)<=1?(Math.floor(lastingTime/24)+"day"):(Math.floor(lastingTime/24)+"days"));
        }

        return eventList;
    },
    async getUpcomingEvents(){
        //console.log("upcoming1");
        const eventCollection= await events();
        //console.log("upcoming2");
        let eventList= await eventCollection.find({}).toArray();
        //eventList.sort(this.compare("start_date"));
        eventList.sort(this.myCompare("end_date"));

        //console.log("upcoming4");

        let upcomingEventList=new Array();
        let i=0;
        let now=new Date();
        //let now_str=now.getTime().toString();
        let now_num=now.getTime();
        while(i<eventList.length)
        {
            //let start_date =new Date(parseInt(eventList[i].start_date.toString()));
            //if(parseInt(eventList[i].start_date.toString())>=now_num)
            if(eventList[i].end_date.toString()>now_num)
            {
                upcomingEventList.push(eventList[i]);
            }
            else{
                break;
            }
            i++;
        }
        upcomingEventList.reverse();

        for(let i=0;i<upcomingEventList.length;i++)
        {
            let start_date =new Date(parseInt(upcomingEventList[i].start_date.toString()));
            upcomingEventList[i].start_date=start_date.getFullYear()+"-"+ (start_date.getMonth()<9?("0"+(start_date.getMonth()+1)):(start_date.getMonth()+1)) + "-"+(start_date.getDate()<10?"0"+start_date.getDate():start_date.getDate());
            
            let start_hour=start_date.getHours();
            let start_min=start_date.getMinutes();

            if(start_min<10){
                start_min="0"+start_min;
            }

            if(start_hour<12){
                //start_hour="0"+start_hour;
                if(start_hour<10){
                    start_hour="0"+start_hour+":"+start_min+" AM";
                }
                else{
                    start_hour=start_hour+":"+start_min+" AM";
                }
            }
            else{
                if(start_hour==12){
                    start_hour=start_hour+":"+start_min+" PM";
                }
                else if(start_hour==24){
                    start_hour=(start_hour-12)+":"+start_min+" AM";
                }
                else{
                    start_hour=start_hour-12;
                    if(start_hour<10){
                        start_hour="0"+start_hour+":"+start_min+" PM";
                    }
                    else{
                       start_hour=start_hour+":"+start_min+" PM";
                    }
                }
            }
            upcomingEventList[i].start_hour=start_hour;
            
            let end_date=new Date(parseInt(upcomingEventList[i].end_date.toString()));
            upcomingEventList[i].end_date=end_date.getFullYear()+"-"+ (end_date.getMonth()<9?("0"+(end_date.getMonth()+1)):(end_date.getMonth()+1)) + "-"+(end_date.getDate()<10?"0"+end_date.getDate():end_date.getDate());
            
            let lastingTime=parseInt(upcomingEventList[i].lasting_time.toString());
            //upcomingEventList[i].lasting_time= (lastingTime<=24?(lastingTime+"hr"):(Math.floor(lastingTime/24)+"dy"));
            if(lastingTime<24){
                //hour
                if(lastingTime==1){
                    upcomingEventList[i].lasting_time=lastingTime+" hr";
                }
                else{
                    upcomingEventList[i].lasting_time=lastingTime+" hrs";
                }
            }
            else{
                //day
                lastingTime=Math.floor(lastingTime/24);
                if(lastingTime==1){
                    upcomingEventList[i].lasting_time=lastingTime+" day";
                }
                else{
                    upcomingEventList[i].lasting_time=lastingTime+" days";
                }
            }
        }
        return upcomingEventList;
    },
    async getPastEvents(){
        const eventCollection= await events();
        let eventList= await eventCollection.find({}).toArray();
        eventList.sort(this.myCompare("end_date"));
        eventList.reverse();

        let pastEventList=new Array();
        let i=0;
        let now=new Date();
        let now_str=now.getTime().toString();
        while(i<eventList.length)
        {
            //let start_date =new Date(parseInt(eventList[i].start_date.toString()));
            if(eventList[i].end_date<now_str)
            {
                pastEventList.push(eventList[i]);
            }
            else{
                break;
            }
            i++;
        }
        pastEventList.reverse();

        for(let i=0;i<pastEventList.length;i++)
        {
            let start_date =new Date(parseInt(pastEventList[i].start_date.toString()));
            pastEventList[i].start_date=start_date.getFullYear()+"-"+ (start_date.getMonth()<9?("0"+(start_date.getMonth()+1)):(start_date.getMonth()+1)) + "-"+(start_date.getDate()<10?"0"+start_date.getDate():start_date.getDate());
            
            let start_hour=start_date.getHours();
            let start_min=start_date.getMinutes();

            if(start_min<10){
                start_min="0"+start_min;
            }

            if(start_hour<12){
                //start_hour="0"+start_hour;
                if(start_hour<10){
                    start_hour="0"+start_hour+":"+start_min+" AM";
                }
                else{
                    start_hour=start_hour+":"+start_min+" AM";
                }
            }
            else{
                if(start_hour==12){
                    start_hour=start_hour+":"+start_min+" PM";
                }
                else if(start_hour==24){
                    start_hour=(start_hour-12)+":"+start_min+" AM";
                }
                else{
                    start_hour=start_hour-12;
                    if(start_hour<10){
                        start_hour="0"+start_hour+":"+start_min+" PM";
                    }
                    else{
                       start_hour=start_hour+":"+start_min+" PM";
                    }
                }
            }
            pastEventList[i].start_hour=start_hour;

            let end_date=new Date(parseInt(pastEventList[i].end_date.toString()));
            pastEventList[i].end_date=end_date.getFullYear()+"-"+ (end_date.getMonth()<9?("0"+(end_date.getMonth()+1)):(end_date.getMonth()+1)) + "-"+(end_date.getDate()<10?"0"+end_date.getDate():end_date.getDate());
            
            let lastingTime=parseInt(pastEventList[i].lasting_time.toString());
            //pastEventList[i].lasting_time= (lastingTime<=24?(lastingTime+"hr"):(Math.floor(lastingTime/24)+"dy"));
            if(lastingTime<24){
                //hour
                if(lastingTime==1){
                    pastEventList[i].lasting_time=lastingTime+" hr";
                }
                else{
                    pastEventList[i].lasting_time=lastingTime+" hrs";
                }
            }
            else{
                //day
                lastingTime=Math.floor(lastingTime/24);
                if(lastingTime==1){
                    pastEventList[i].lasting_time=lastingTime+" day";
                }
                else{
                    pastEventList[i].lasting_time=lastingTime+" days";
                }
            }
        }

        return pastEventList;
    },
    async updateEvent(id,title, start_date, end_date,lasting_time,address,description,event_link,img_url){
        const eventCollection=await events();
        if(!id){
            throw new Error("need to input an id");
        }
        let objId=id;
        if(typeof(id)=="string"){
            objId = ObjectId.createFromHexString(id);
        }
        else if(typeof(id)!="object"){
            throw new Error("type of input id is wrong");
        }

        if(!title)
        {
            throw new Error("title input is losted");
        }
        if(!start_date)
        {
            throw new Error("start_date input is losted");
        }
        if(!end_date)
        {
            throw new Error("end_date input is losted");
        }
        if(!lasting_time)
        {
            throw new Error("lasting_time input is losted");
        }
        if(!address)
        {
            throw new Error("address input is losted");
        }
        if(!description)
        {
            throw new Error("description input is losted");
        }
        if(!event_link)
        {
            throw new Error("event_link input is losted");
        }
        if(!img_url)
        {
            throw new Error("img_url input is losted");
        }
        let lasting=parseInt(lasting_time);
        if(!lasting||lasting<0)
        {
            throw new Error("lasting_time input is not valid");
        }

        let event={
            title:title,
            start_date:start_date,
            end_date:end_date,
            lasting_time:lasting_time,
            address:address,
            description:description,
            event_link:event_link,
            img_url:img_url
        }

        const info=await eventCollection.updateOne({_id:objId},{$set:event});
        if(info.modifiedCount===0){
            throw new Error("Could not update events successfully");
        }
    },
    async addEvent(title, start_date, end_date,lasting_time,address,description,event_link,img_url){
        if(!title)
        {
            throw new Error("title input is losted");
        }
        if(!start_date)
        {
            throw new Error("start_date input is losted");
        }
        if(!end_date)
        {
            throw new Error("end_date input is losted");
        }
        if(!lasting_time)
        {
            throw new Error("lasting_time input is losted");
        }
        if(!address)
        {
            throw new Error("address input is losted");
        }
        if(!description)
        {
            throw new Error("description input is losted");
        }
        if(!event_link)
        {
            throw new Error("event_link input is losted");
        }
        if(!img_url)
        {
            throw new Error("img_url input is losted");
        }
        let lasting=parseInt(lasting_time);
        if(!lasting||lasting<0)
        {
            throw new Error("lasting_time input is not valid");
        }

        let event={
            title:title,
            start_date:start_date,
            end_date:end_date,
            lasting_time:lasting_time,
            address:address,
            description:description,
            event_link:event_link,
            img_url:img_url
        }

        const eventCollection=await events();
        const insertInfo = await eventCollection.insertOne(event);
        if (insertInfo.insertedCount === 0) throw new Error('Could not add event');
        
        return insertInfo.insertedId;
    },
    async deleteEvent(id){
        const eventCollection=await events();
        if(!id){
            throw new Error("need to input an id");
        }
        let objId=id;
        if(typeof(id)=="string"){
            objId = ObjectId.createFromHexString(id);
        }
        else if(typeof(id)!="object"){
            throw new Error("type of input id is wrong");
        }

        const info=await eventCollection.deleteOne({_id:objId});
        if(info.deletedCount===0){
            throw new Error(`Could not delete event with id of ${id}`);
        };

        return true;
    }
}