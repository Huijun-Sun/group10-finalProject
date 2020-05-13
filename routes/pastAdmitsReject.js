const express = require("express");
const router = express.Router();
const data = require("../data");
const userproData = data.userprofile;
const xss = require("xss");
//console.log("am her11e");
router.get("/",async (req,res)=>{
    //if(req.session.isloggedin===true){
  //     console.log("am here");
        res.render("pastAdmitsReject",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid});   
    
  });
  router.post("/", async (req, res) => {
  //  console.log("am here222");
    if(!xss(req.body.university)) {
      res.status(400).render('pastAdmitsreject',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the university name'});
      return;
    }
    if(!xss(req.body.course)) {
      res.status(400).render('pastAdmitsreject',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the course name'});
      return;
    }
    if(!xss(req.body.status)) {
      res.status(400).render('pastAdmitsreject',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:'Please provide the status'});
      return;
    }

    try{
      const pastUserPro = await userproData.pastAdmitsRejects(xss(req.body.university), xss(req.body.course), xss(req.body.status));
      if(pastUserPro.length == 0){
        res.status(200).render("pastAdmitsreject", {isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,isEmpty:true});
      }
      else{
     res.status(200).render("pastAdmitsreject",{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,pastProfileList: pastUserPro})
    }
   } catch(e){
    res.status(400).render('pastAdmitsReject',{isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid,hasErrors:true, errors:e});
    return;
   }
}); 
module.exports = router;