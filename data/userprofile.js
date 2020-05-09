const mongodb = require("mongodb");
const mongoCollections = require('../config/mongoCollections');
const userprofile = mongoCollections.user_Profile;

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
    if (userpro === null) throw 'No user profile with that id';

    return userpro;
  }


//Function to create user profile  
async function createUserProfile(userid,interestedin, undergrad, GRE_GMAT, TOEFL_IELTS_PTE){
    if(!interestedin.program) throw `Program of interest required`;
    if(!interestedin.masters_mba) throw 'Interested degree required';
    if(!interestedin.year) throw 'Interested to year to apply required';
 
    if(typeof userid !== "object" && typeof userid !== "string") throw `User Id should of type Object or string`;
    var obj_Id;
    if(typeof userid === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(userid); 
    }
    if(typeof userid === "object"){
        obj_Id = mongodb.ObjectID(userid);
    }  
    
  //  if(typeof undergrad.college !== "text") throw `Please provide the college name in text format`;
   // if(typeof undergrad.aggregate !== "number") throw `Aggregate should be of type number`;
  
    //All the remaining fields should have a drop down list to choose from ensuring the correct type of field
    const userproCollection = await userprofile();

    let newUserProfile = {
        userid: obj_Id,
        interestedin: {
            masters_mba: interestedin.masters_mba,
            program: interestedin.program,
            term: interestedin.term,
            year: interestedin.year
        },
        undergrad: {
            college: undergrad.college,
            program: undergrad.program,
            aggregate: undergrad.aggregate
        },
        GRE_GMAT: {
                gre_gmat_exam: GRE_GMAT.gre_gmat_exam,
                date_appeared: GRE_GMAT.date_appeared,
                verbal: GRE_GMAT.verbal,
                quant: GRE_GMAT.quant,
                awa: GRE_GMAT.awa,
                ir: GRE_GMAT.ir 
            },
        TOEFL_IELTS_PTE: {
            toefl_ielts_pte_exam: TOEFL_IELTS_PTE.toefl_ielts_pte_exam,
            date_appeared: TOEFL_IELTS_PTE.date_appeared,
            scores: TOEFL_IELTS_PTE.scores
        },
        int_app_university: [],
        work_exp:[],
        projects:[],
        tech_papers:[],
        extracurriculars:[],
        blogs:[]
    };

    let status;
    //Inserting the new user profile into the database collection
    const insertInfo = await userproCollection.insertOne(newUserProfile);
    if (insertInfo.insertedCount === 0){
        throw 'Could not create userprofile';
    }
    else{
       status = "UserProfile Created Successfully";   
    }
    return status;
}

async function sameStatusProfiles (university, course){
    const userproCollection = await userprofile();

    const userproList = await userproCollection.find({}).toArray();
    const all_userpro=[];
    for(let each_userpro of userproList){
            const eachuser_info = [];
            let gre = parseInt(each_userpro.GRE_GMAT.verbal) + parseInt(each_userpro.GRE_GMAT.quant);
            for(let each_intappUni of each_userpro.int_app_university){
                if(each_intappUni.uniName === university && each_intappUni.uniProgram === course && (each_intappUni.uniStatus==="Admit" ||each_intappUni.uniStatus==="Reject")){
                const eachuser_data = {
                  id: each_userpro.userid,  
                  uniName: each_intappUni.uniName,
                  year:each_userpro.interestedin.year,
                  status:each_intappUni.uniStatus,
                  gre:gre,
                  toefl:each_userpro.TOEFL_IELTS_PTE.scores
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
    const sameStatus = await sameStatusProfiles(uniName,uniProgram);

    const userproCollection = await userprofile();
    const updateInfo = await userproCollection.updateOne(
        {userid: obj_Id},
        {$addToSet: {int_app_university: {uniName: uniName, uniProgram: uniProgram, uniStatus:uniStatus, comments: comments}}}
      );
  
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
          throw `Could not add the university`;
      }

      return sameStatus;
}

//Async function to add work exp to userprofile
async function addWorkExp (id, orgName, startDate, endDate, position, location, description){
    if (!id) throw 'User Id required to add interested/applied university';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }

    if(!orgName) throw `Organization Name required`;
    if(!startDate) throw `Start date of work required`;
    //Need to add option for currently working 
    if(!endDate) throw `End date required`;
    if(!position) throw `Please provide your role at the organization`;
    if(!location) throw `Please provide the place of work`;

    const userproCollection = await userprofile();
    const updateInfo = await userproCollection.updateOne(
        {userid: obj_Id},
        {$addToSet: {work_exp: {orgName: orgName, startDate: startDate, endDate:endDate, position: position, location:location, description:description}}}
      );
  
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
          throw `Could not add the work exp`;
      }

      const userworkex = await this.getUserProfile(obj_Id);
      return userworkex.work_exp;
}    

//Async function to add technical papers info to userprofile
async function addTechPaper (id, title, description, link){
    if (!id) throw 'User Id required to add interested/applied university';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }

    if(!title) throw `Please provide Technical Paper name`;
    if(!description) throw `Please provide Technical Paper description`;
    if(!link) throw `Please provide a link to the paper`;
    const userproCollection = await userprofile();
    const updateInfo = await userproCollection.updateOne(
        {userid: obj_Id},
        {$addToSet: {tech_papers: {title: title, description: description, link:link}}}
      );
  
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
          throw `Could not add the paper`;
      }

      const userTechPaper = await this.getUserProfile(obj_Id);
      return userTechPaper.tech_papers;
}

//Async function to add projects info to userprofile
async function addProject (id, title, description){
    if (!id) throw 'User Id required to add interested/applied university';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }

    if(!title) throw `Please provide Project name`;
    if(!description) throw `Please provide Project description`;
    const userproCollection = await userprofile();
    const updateInfo = await userproCollection.updateOne(
        {userid: obj_Id},
        {$addToSet: {projects: {title: title, description: description}}}
      );
  
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
          throw `Could not add the project`;
      }

      const userProject = await this.getUserProfile(obj_Id);
      return userProject.projects;
}

//Async function to add extracurriculars to the profile
async function addExtraCurriculars (id, title, description){
    if (!id) throw 'User Id required to add extracurriculars to the profile';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }

    if(!title) throw `Please provide the title`;
    if(!description) throw `Please provide the description`;
    const userproCollection = await userprofile();
    const updateInfo = await userproCollection.updateOne(
        {userid: obj_Id},
        {$addToSet: {extracurriculars: {title: title, description: description}}}
      );
  
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
          throw `Could not add the extracurricular info`;
      }

      const userExtracurricular = await this.getUserProfile(obj_Id);
      return userExtracurricular.extracurriculars;
}

   

//Async function to update userprofile
async function editUserProfile(id,interestedin, undergrad, GRE_GMAT, TOEFL_IELTS_PTE,int_app_university,work_exp,projects,tech_papers,extracurriculars){
    if (!id) throw 'User Id required to add extracurriculars to the profile';
    if(typeof id !== "object" && typeof id !== "string") throw `Input Id should of type Object or string`;
    var obj_Id;
    if(typeof id === "string"){
          obj_Id = mongodb.ObjectID.createFromHexString(id); 
    }
    if(typeof id === "object"){
        obj_Id = mongodb.ObjectID(id);
    }
    if(!interestedin.program) throw `Program of interest required`;
    if(!interestedin.masters_mba) throw 'Interested degree required';
    if(!interestedin.year) throw 'Interested to year to apply required';
    const userproCollection = await userprofile();
    let updatedUserProfile = {
        interestedin: {
            masters_mba: interestedin.masters_mba,
            program: interestedin.program,
            term: interestedin.term,
            year: interestedin.year
        },
        undergrad: {
            college: undergrad.college,
            program: undergrad.program,
            aggregate: undergrad.aggregate
        },
        GRE_GMAT: {
                gre_gmat_exam: GRE_GMAT.gre_gmat_exam,
                date_appeared: GRE_GMAT.date_appeared,
                verbal: GRE_GMAT.verbal,
                quant: GRE_GMAT.quant,
                awa: GRE_GMAT.awa,
                ir: GRE_GMAT.ir 
            },
        TOEFL_IELTS_PTE: {
            toefl_ielts_pte_exam: TOEFL_IELTS_PTE.toefl_ielts_pte_exam,
            date_appeared: TOEFL_IELTS_PTE.date_appeared,
            scores: TOEFL_IELTS_PTE.scores
        },
        int_app_university: int_app_university,
        work_exp:work_exp,
        projects:projects,
        tech_papers:tech_papers,
        extracurriculars:extracurriculars
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
    const userproCollection = await userprofile();

    const userproList = await userproCollection.find({}).toArray();
    const all_userpro=[];
    for(let each_userpro of userproList){
            const eachuser_info = [];
            let gre = parseInt(each_userpro.GRE_GMAT.verbal) + parseInt(each_userpro.GRE_GMAT.quant);
            for(let each_intappUni of each_userpro.int_app_university){
                if(each_intappUni.uniName === university && each_intappUni.uniProgram === course && each_intappUni.uniStatus===status){
                const eachuser_data = {
                  id: each_userpro.userid,  
                  uniName: each_intappUni.uniName,
                  year:each_userpro.interestedin.year,
                  status:status,
                  gre:gre,
                  toefl:each_userpro.TOEFL_IELTS_PTE.scores
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
module.exports = {
    getUserProfile,
    createUserProfile,
    addIntAppUniversity,
    addWorkExp,
    addProject,
    addTechPaper,
    addExtraCurriculars,
    editUserProfile,
    pastAdmitsRejects
};