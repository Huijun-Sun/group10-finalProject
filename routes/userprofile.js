const express = require("express");
const router = express.Router();
const data = require("../data");
const userproData = data.userprofile;
const xss = require("xss");

//Async function to display create user profile page
router.get("/:id", async (req, res) =>{
  res.render("createUserProfile", {userid: req.params.id});
});

//Async function to display add university page
router.get("/addUniversity/:id", async (req, res) =>{
  res.render("addUniversity", {userid: req.params.id});
});

router.get("/pastadmitreject/",async function(req,res){
  //if(req.session.isloggedin===true){
      
      res.render("pastAdmitsReject");   
  
});

   //Async route function to get a particular userprofile
   router.get("/:id", async (req, res) => {
    try {
      const userprofile = await userproData.getUserProfile(req.params.id);
      res.status(200).render("userProfileDetails",{userProInfo: userprofile, intAppUniList: userprofile.int_app_university});
    } catch (e) {
      res.status(404).json({ message: "User Profile not found!" });
    }
  });

//Async function to create a userprofile
  router.post("/:id", async (req, res) => {
   
  
    const error = [];
    //get.session.id
   // let userid = "5eb885662bb63c866585f451"; 
   
      if(!xss(req.body.masters_mba)){
        error.push('You must provide the degree you are interested in');    
      }
      if(!xss(req.body.program)){
        error.push('You must provide the program you are interested in');
      }
      if(!xss(req.body.term)){
        error.push('You must provide the term you are interested in');
      }
      if(!xss(req.body.year)){
        error.push('You must provide the year you are interested in');
      }
      if(!xss(req.body.college)){
        error.push('You must provide the college you studied or are studyin in');
      }
     if(xss(req.body.verbal) || xss(req.body.quant) || xss(req.body.awa)) {
        if(xss(req.body.quant) === '' || xss(req.body.awa) === '' || xss(req.body.verbal) === ''){
          error.push('You must provide provide all the three scores for gre');
        }
      }
     
    if(error.length>0){
      res.status(400).render('createUserProfile',{hasErrors:true,errors:error});
      return;
  }

  
      try {
        const createdUserPro = await userproData.createUserProfile(req.params.id, xss(req.body.masters_mba),xss(req.body.program), xss(req.body.term), xss(req.body.year), xss(req.body.college), xss(req.body.undergradProgram), xss(req.body.verbal),xss(req.body.quant),xss(req.body.awa),xss(req.body.gmatScore), xss(req.body.toeflScore));
        res.status(200).render("userProfileDetails",{userProInfo: createdUserPro, intAppUniList:createdUserPro.int_app_university});
      } catch (e) {
        error.push(e);
        res.status(500).render('createUserProfile',{hasErrors:true, errors:error});
      }
  });



//Async function to add interested/applied university to userprofile
router.post("/adduniversity/:id", async (req, res) => {
   if(!xss(req.body.uniName)){
    res.status(400).render('addUniversity',{hasErrors:true, errors:'Please provide the university name'});
    return;
   }
   if(!xss(req.body.uniProgram)){
    res.status(400).render('addUniversity',{hasErrors:true, errors:'Please provide the Program name'});
    return;
   }
   if(!xss(req.body.uniStatus)){
    res.status(400).render('addUniversity',{hasErrors:true, errors:'Please provide the Status for the university'});
    return;
   }
   if(!xss(req.body.comments)){
    res.status(400).render('addUniversity',{hasErrors:true, errors:'Please provide the Comments for the university'});
    return;
   }
      try{
        const addedUni = await userproData.addIntAppUniversity(req.params.id, xss(req.body.uniName), xss(req.body.uniProgram), xss(req.body.uniStatus), xss(req.body.comments));
        res.status(200).render("userProfileDetails",{userProInfo: addedUni, intAppUniList: addedUni.int_app_university});
        //@monisha: Send the info to adduniversity page
      } catch(e){
      res.status(400).render('addUniversity',{hasErrors:true, errors:e});
    return;
     }
});   


//Async function to display edit user profile page
router.get("/edituserprofile/:id", async(req,res) => {
  try {
    const userprofile = await userproData.getUserProfile(req.params.id);
    res.status(200).render("editUserProfile",{userProInfo: userprofile});
  } catch (e) {
    res.status(404).json({ message: "User Profile not found!" });
  }
});

//Async function to update userprofile
router.post("/edituserprofile/:id", async (req, res) => {
 
    try{
      const editedUserPro = await userproData.editUserProfile(req.params.id, xss(req.body.intMastersMba),xss(req.body.intProgram), xss(req.body.intTerm), xss(req.body.intYear), xss(req.body.underGradCollege), xss(req.body.underGradProgram), xss(req.body.greVerbal),xss(req.body.greQuant),xss(req.body.greAwa),xss(req.body.gmatScore), xss(req.body.toeflScore));
      res.status(200).render("userProfileDetails",{userProInfo: editedUserPro, intAppUniList: editedUserPro.int_app_university});
   } catch(e){
    res.status(400).render('editUserProfile',{hasErrors:true, errors:e});
    return;
   }
}); 

//Async function for past Admits & Rejects  
router.post("/pastadmitreject/", async (req, res) => {
 
    if(!xss(req.body.university)) {
      res.status(400).render('pastadmitsReject',{hasErrors:true, errors:'Please provide the university name'});
      return;
    }
    if(!xss(req.body.course)) {
      res.status(400).render('pastadmitsReject',{hasErrors:true, errors:'Please provide the course name'});
      return;
    }
    if(!xss(req.body.status)) {
      res.status(400).render('pastadmitsReject',{hasErrors:true, errors:'Please provide the status'});
      return;
    }

    try{
      const pastUserPro = await userproData.pastAdmitsRejects(xss(req.body.university), xss(req.body.course), xss(req.body.status));
      if(pastUserPro.length == 0){
        res.status(200).render("pastAdmitsReject", {isEmpty:true});
      }
      else{
     res.status(200).render("pastAdmitsReject",{pastProfileList: pastUserPro})
    }
   } catch(e){
    res.status(400).render('pastAdmitsReject',{hasErrors:true, errors:e});
    return;
   }
}); 

router.get("/editUniversity/:id", async (req, res) =>{
  res.render("editUniversity", {userid: req.params.id});
});

//Async function for edit interested/applied unviersity
router.post("/edituniversity/:id", async (req, res) =>{
  if(!xss(req.body.uniName)){
    res.status(400).render('editUniversity',{hasErrors:true, errors:'Please provide the university name'});
    return;
   }
   if(!xss(req.body.uniProgram)){
    res.status(400).render('editUniversity',{hasErrors:true, errors:'Please provide the Program name'});
    return;
   }
   if(!xss(req.body.uniStatus)){
    res.status(400).render('editUniversity',{hasErrors:true, errors:'Please provide the Status to update'});
    return;
   }
   if(!xss(req.body.comments)){
    res.status(400).render('editUniversity',{hasErrors:true, errors:'Please provide the Comments for the university'});
    return;
   }
  
    try{
      const editedUni = await userproData.editIntAppUniversity(req.params.id, xss(req.body.uniName), xss(req.body.uniProgram), xss(req.body.uniStatus), xss(req.body.comments));
      if(editedUni.length == 0){
        res.status(200).render("sameStatusProfiles", {isEmpty:true});
      }else{
      res.status(200).render("sameStatusProfiles",{sameStatusList: editedUni});
      }
   } catch(e){
    res.status(400).render('editUniversity',{hasErrors:true, errors:e});
    return;
   }
});



   //Exporting the route module
   module.exports = router;
