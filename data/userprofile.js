
const mongodb = require("mongodb");
const mongoCollections = require('../config/mongoCollections');
const universities = mongoCollections.universities;
const userprofile = mongoCollections.user_Profile;
const user= require('./user');
const univdatamodule= require('./universities');



//Function to get a particular user profile
async function getUserProfile(id) {
    if (!id) throw 'You must provide an id to search for';
    
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }   
    
    const upCollection = await userprofile();
    const userpro = await upCollection.findOne({ userid: obj_Id });
    if (userpro === null) throw 'No user profile found for your id';
    //returning the userprofile details
    return userpro;
  }


//Function to create user profile  
async function createUserProfile(userid,intMastersMba,intProgram, intTerm, intYear, underGradCollege, underGradProgram, greVerbal, greQuant, greAwa, gmatScore, toeflScore){
    if(!intProgram) throw `Program of interest required`;
    if(!intMastersMba) throw `Interested degree required`;
    if(!intYear) throw `Interested to year to apply required`;
    if(!intTerm) throw `Interested Term required`;
    if(!underGradCollege) throw `Undergrad College required`;
    if(!underGradProgram) throw `UnderGrad Program required`;
    //If scores are not given, setting it to not appeared or not applicable
    if(greVerbal==='' || greVerbal === null){
        greVerbal="NA";
    }
    if(greQuant===''|| greQuant===null){
        greQuant="NA"; 
    }
    if(greAwa===''|| greAwa===null){
        greAwa="NA";
    }
    if(gmatScore===''||gmatScore===null){
        gmatScore="NA";
    }
    if(toeflScore===''||toeflScore===null){
        toeflScore="NA";
    }
    if(typeof userid !== "object" && typeof userid !== "string") throw `User Id should of type Object or string`;
    var obj_Id;
    if(typeof userid === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(userid); 
    }
    if(typeof userid === "object"){
        obj_Id = mongodb.ObjectID(userid);
    }  
     
    const userproCollection = await userprofile();

    let newUserProfile = {
        userid: obj_Id,
        intMastersMba: intMastersMba,
        intProgram: intProgram,
        intTerm: intTerm,
        intYear: intYear,
        underGradCollege: underGradCollege,
        underGradProgram: underGradProgram,
        greVerbal: greVerbal,
        greQuant: greQuant,
        greAwa: greAwa,
        gmatScore: gmatScore, 
        toeflScore: toeflScore,
        int_app_university: [],
        work_exp:[],
        projects:[],
        tech_papers:[],
        extracurriculars:[],
        blogs:[]
    };

    
    //Inserting the new user profile into the database collection
    const insertInfo = await userproCollection.insertOne(newUserProfile);
    if (insertInfo.insertedCount === 0){
        throw 'Could not create userprofile';
    }
    
    const insertedProfile = await this.getUserProfile(obj_Id);
    return insertedProfile;
}

//Async function to display same status profiles on the update
async function sameStatusProfiles (university, course, status){

    const userproCollection = await userprofile();

    const userproList = await userproCollection.find({}).toArray();
    const all_userpro=[];
    for(let each_userpro of userproList){
            const eachuser_info = [];
            let gre;
            if(each_userpro.greVerbal != null && each_userpro.greQuant != null){
              gre = parseInt(each_userpro.greVerbal) + parseInt(each_userpro.greQuant);
            }
            for(let each_intappUni of each_userpro.int_app_university){
                if(each_intappUni.uniName === university && each_intappUni.uniProgram === course && each_intappUni.uniStatus=== status){
                const eachuser_data = {
                  id: each_userpro.userid,  
                  uniName: each_intappUni.uniName,
                  year:each_userpro.intYear,
                  status:each_intappUni.uniStatus,
                  gre:gre,
                  toefl:each_userpro.toeflScore
                }
                eachuser_info.push(eachuser_data);
             }  
            }
            
            const user_data = {
                uni: eachuser_info
            }
            if(!isEmptyObject(user_data.uni)){
                all_userpro.push(user_data);
            }   
            
    } 
    return all_userpro;
}

//Async function to edit status of interested universities
async function editIntAppUniversity(id, university, course, Status, Comments){
    if (!id) throw 'User Id required to add interested/applied university';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }   
    if(!university) throw `Please provide the university name you wish to update status for:`;
    if(!course) throw `Please provide the program name you wish to update status for:`;
    if(!Status) throw `Please provide the status of you application`;
    if(typeof Comments !== "string") thow `Comments should be of type string`;
    name=university.toLowerCase();
    course1=course.toLowerCase();
    const universityCollection = await universities();  
    const univ = await universityCollection.find({courses: course1,title: name}).toArray();
    if (univ === null || univ.length<1) throw 'The University and course combination does not exist';
   // if(typeof uniName !=="string" || typeof uniProgram !=="string" || typeof uniStatus !== "string"){
     //   throw `Input for search should be of type string`;
     //} 
    //Checking whether the university and course exists in the profile  
   
   
    const userpro = await this.getUserProfile(obj_Id);
   
       let found = 0;
       for(let each_intappUni of userpro.int_app_university){
           console.log(each_intappUni.uniName);
           console.log(each_intappUni.uniProgram);
        if(each_intappUni.uniName === university && each_intappUni.uniProgram === course ){
             found = 1;
        }
    }
   
    if(found === 0){
        throw `University and course not found in your profile. Please add it`;
    }
   
   const sameStatus = await sameStatusProfiles(university, course, Status);
   const status_info = [];
           
            for(let each_intappUni of userpro.int_app_university){
                if(each_intappUni.uniName === university && each_intappUni.uniProgram === course ){
                    
                const updateStatus = {
				  uniName: each_intappUni.uniName,
                  uniProgram: each_intappUni.uniProgram,
                  uniStatus: Status,
                  comments: Comments
                }
                status_info.push(updateStatus);
             }
              else{
			         const oldData = {
					    uniName: each_intappUni.uniName,
                       uniProgram: each_intappUni.uniProgram,
                       uniStatus: each_intappUni.uniStatus,
                       comments: each_intappUni.comments
					 }
					 status_info.push(oldData);
			  }
               let updateData = {
			      int_app_university:status_info
			   }
			    const userproCollection = await userprofile();
             const updateInfo = await userproCollection.updateOne(
            {userid: obj_Id},{$set: updateData});
      
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
              throw `Could not edit the university`;
          }   
    }
    return sameStatus;          
}



//Async function to add interested/applied university to userprofile
async function addIntAppUniversity (id, uniName, uniProgram, uniStatus, comments){
    if (!id) throw 'User Id required to add interested/applied university';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }   
    
    if(!uniName) throw `University Name required`;
    if(!uniProgram) throw `Interested/Appied Program required`;
    if(!uniStatus) throw `Please provide the status of you application`;
    if(typeof comments !== "string") throw `Comments should be of type string`;
    if(typeof uniName !=="string" || typeof uniProgram !=="string" || typeof uniStatus !== "string"){
        throw `Input for search should be of type string`;
     } 
     name=uniName.toLowerCase();
     course=uniProgram.toLowerCase();
     const universityCollection = await universities();  
     const univ = await universityCollection.find({courses: course,title: name}).toArray();
     if (univ === null || univ.length<1) throw 'The University and course combination does not exist';
     const userpro = await this.getUserProfile(obj_Id);
     let found = 0;
     for(let each_intappUni of userpro.int_app_university){
      if(each_intappUni.uniName == uniName && each_intappUni.uniProgram == uniProgram ){
           found = 1;
      }
  }
  if(found === 1){
      throw `University already exists in profile`;
  }
 
    const userproCollection = await userprofile();
    const updateInfo = await userproCollection.updateOne(
        {userid: obj_Id},
        {$addToSet: {int_app_university: {uniName: uniName, uniProgram: uniProgram, uniStatus:uniStatus, comments: comments}}}
      );
  
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
          throw `Could not add the university`;
      }
       
      let userProUni = await this.getUserProfile(obj_Id);
      let gre,result_chances;
            if(userProUni.greVerbal !== "NA" && userProUni.greQuant !== "NA"){
        gre = parseInt(userProUni.greVerbal) + parseInt(userProUni.greQuant);
        result_chances=await univdatamodule.getChances(uniName,gre);
      //  userProUni.status=status;
      // console.log(userProUni);
      console.log(result_chances);
        return result_chances;
      }
      
     else{
      return userProUni;
    }
}



//Async function to update userprofile
async function editUserProfile(id, intMastersMba,intProgram, intTerm, intYear, underGradCollege, underGradProgram, greVerbal, greQuant, greAwa, gmatScore, toeflScore){
    if (!id) throw 'User Id required to add extracurriculars to the profile';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }
    if(!intProgram) throw `Program of interest required`;
    if(!intMastersMba) throw 'Interested degree required';
    if(!intYear) throw 'Interested to year to apply required';
    if(greVerbal !=='' || greQuant !=='' || greAwa!=="NA") {
        if(greQuant === '' || greAwa === "NA" || greVerbal === ''){
          throw `You must provide provide all the three scores for Gre`;
         
        }
      }
    const userproCollection = await userprofile();
    let updatedUserProfile = {
        intMastersMba: intMastersMba,
        intProgram: intProgram,
        intTerm: intTerm,
        intYear: intYear,
        underGradCollege: underGradCollege,
        underGradProgram: underGradProgram,
        greVerbal: greVerbal,
        greQuant: greQuant,
        greAwa: greAwa,
        gmatScore: gmatScore, 
        toeflScore: toeflScore
    };
    
    //Updting the fields in the database collection
    const updatedInfo = await userproCollection.updateOne({ userid: obj_Id }, { $set: updatedUserProfile });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update userprofile successfully';
    }

    return await this.getUserProfile(obj_Id);
}   
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
//Async function for past admits rejects   
async function pastAdmitsRejects(university, course, status){
    //console.log("here");
    if(!university) throw `University Name required`;
    if(!course) throw `Course required`;
    if(!status) throw `Status required`;
    if(typeof university !=="string" && typeof course !=="string" && typeof status !== "string"){
       // console.log("hi"+univ);
       throw `Input for search should be of type string`;
    }   
    name=university.toLowerCase();
    course1=course.toLowerCase();
    const universityCollection = await universities();  
    const univ = await universityCollection.find({courses: course1,title: name}).toArray();
    if (univ === null || univ.length<1) throw 'The University and course combination does not exist';
    const userproCollection = await userprofile();
    const userproList = await userproCollection.find({}).toArray();
    const all_userpro=[];
    for(let each_userpro of userproList){
            const eachuser_info = [];
            let gre;
            if(each_userpro.greVerbal != "NA" && each_userpro.greQuant != "NA"){
              gre = parseInt(each_userpro.greVerbal) + parseInt(each_userpro.greQuant);
            }
            for(let each_intappUni of each_userpro.int_app_university){
                if(each_intappUni.uniName === university && each_intappUni.uniProgram === course && each_intappUni.uniStatus=== status){
                    let username=await user.getUser(each_userpro.userid);
                    const eachuser_data = {
                  id: each_userpro.userid,  
                  uniName: each_intappUni.uniName,
                  year:each_userpro.intYear,
                  status:each_intappUni.uniStatus,
                  gre:gre,
                  toefl:each_userpro.toeflScore,
                  username: username.username
                  
                }
                eachuser_info.push(eachuser_data);
             }  
            }
            
            const user_data = {
                uni: eachuser_info
            }
            if(!isEmptyObject(user_data.uni)){
                all_userpro.push(user_data);
            }   
            
    } 
    return all_userpro;
}

async function getAllUsersProfile(){
    const userproCollection = await userprofile();
    const userproList = await userproCollection.find({}).toArray();
    if (userproList === null) throw 'No user with that id exists';
    return userproList;
}
module.exports = {
    getUserProfile,
    createUserProfile,
    addIntAppUniversity,
    editUserProfile,
    editIntAppUniversity,
    pastAdmitsRejects,
    getAllUsersProfile
};