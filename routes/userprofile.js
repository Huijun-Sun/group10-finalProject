const express = require("express");
const router = express.Router();
const data = require("../data");
const userproData = data.userprofile;

const xss = require("xss");


//Async function to display add university page
router.get("/addUniversity/:id", async (req, res) =>{
  res.render("addUniversity", {isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,userid: req.params.id});
});



   //Async route function to get a particular userprofile
   router.get("/:id", async (req, res) => {
    try {
      const userprofile = await userproData.getUserProfile(req.params.id);
      res.status(200).render("userProfileDetails",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,userProInfo: userprofile, intAppUniList: userprofile.int_app_university});
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
      res.status(400).render('createUserProfile',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true,errors:error});
      return;
  }

  
      try {
        const createdUserPro = await userproData.createUserProfile(req.params.id, xss(req.body.masters_mba),xss(req.body.program), xss(req.body.term), xss(req.body.year), xss(req.body.college), xss(req.body.undergradProgram), xss(req.body.verbal),xss(req.body.quant),xss(req.body.awa),xss(req.body.gmatScore), xss(req.body.toeflScore));
        res.status(200).render("userProfileDetails",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,userProInfo: createdUserPro, intAppUniList:createdUserPro.int_app_university});
      } catch (e) {
        error.push(e);
        res.status(500).render('createUserProfile',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:error});
      }
  });



//Async function to add interested/applied university to userprofile
router.post("/adduniversity/:id", async (req, res) => {
  try{
   if(!xss(req.body.uniName)){
    res.status(400).render('addUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the university name',userid:req.params.id});
    return;
   }
   if(!xss(req.body.uniProgram)){
    res.status(400).render('addUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the Program name',userid:req.params.id});
    return;
   }
   if(!xss(req.body.uniStatus)){
    res.status(400).render('addUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the Status for the university',userid:req.params.id});
    return;
   }
   if(!xss(req.body.comments)){
    res.status(400).render('addUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the Comments for the university',userid:req.params.id});
    return;
   }
      
      //  console.log(req.params.id);
                const addedUni = await userproData.addIntAppUniversity(req.params.id, xss(req.body.uniName), xss(req.body.uniProgram), xss(req.body.uniStatus), xss(req.body.comments));
      
        if(addedUni !== null && addedUni !== "" && addedUni !== undefined && typeof addedUni !== 'object')
        {
          res.status(200).render("addUniversity",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,status:addedUni,isStatus:true});
        }
        else{
        res.status(200).render("userProfileDetails",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,userProInfo: addedUni, intAppUniList: addedUni.int_app_university});}
        //@monisha: Send the info to adduniversity page
      } catch(e){
      res.status(400).render('addUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:e});
    return;
     }
});   


//Async function to display edit user profile page
router.get("/edituserprofile/:id", async(req,res) => {
  try {
    const userprofile = await userproData.getUserProfile(req.params.id);
    res.status(200).render("editUserProfile",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,userProInfo: userprofile});
  } catch (e) {
    res.status(404).json({ message: "User Profile not found!" });
  }
});

//Async function to update userprofile
router.post("/edituserprofile/:id", async (req, res) => {
 
    try{
      console.log()
      const editedUserPro = await userproData.editUserProfile(req.params.id, xss(req.body.intMastersMba),xss(req.body.intProgram), xss(req.body.intTerm), xss(req.body.intYear), xss(req.body.underGradCollege), xss(req.body.underGradProgram), xss(req.body.greVerbal),xss(req.body.greQuant),xss(req.body.greAwa),xss(req.body.gmatScore), xss(req.body.toeflScore));

      res.status(200).render("userProfileDetails",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,userProInfo: editedUserPro, intAppUniList: editedUserPro.int_app_university});
   } catch(e){
    //res.status(400).render('editUserProfile',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:e,userid:req.params.id,userProInfo: editedUserPro, intAppUniList: editedUserPro.int_app_university});
    res.status(400).render('editUserProfile',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:e});
    return;
   }
}); 

//Async function for past Admits & Rejects  


router.get("/editUniversity/:id", async (req, res) =>{
  res.render("editUniversity", {isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid});
});

//Async function for edit interested/applied unviersity
router.post("/edituniversity/:id", async (req, res) =>{
  if(!xss(req.body.uniName)){
    res.status(400).render('editUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the university name',userid:req.params.id});
    return;
   }
   if(!xss(req.body.uniProgram)){
    res.status(400).render('editUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the Program name',userid:req.params.id});
    return;
   }
   if(!xss(req.body.uniStatus)){
    res.status(400).render('editUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the Status to update',userid:req.params.id});
    return;
   }
   if(!xss(req.body.comments)){
    res.status(400).render('editUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the Comments for the university',userid:req.params.id});
    return;
   }
  
    try{
      //console.log(req.body);

      const editedUni = await userproData.editIntAppUniversity(req.params.id, xss(req.body.uniName), xss(req.body.uniProgram), xss(req.body.uniStatus), xss(req.body.comments));
     // console.log(editedUni);
      if(editedUni.length == 0){
        res.status(200).render("sameStatusProfiles", {isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,isEmpty:true});
      }else{
      res.status(200).render("sameStatusProfiles",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,sameStatusList: editedUni});
      }
   } catch(e){
    res.status(400).render('editUniversity',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:e,userid:req.params.id});
    return;
   }
});



   //Exporting the route module
   module.exports = router;
