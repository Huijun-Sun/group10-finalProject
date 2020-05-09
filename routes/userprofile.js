const express = require("express");
const router = express.Router();
const data = require("../data");
const userproData = data.userprofile;

   //Async route function to get a particular userprofile
   router.get("/:id", async (req, res) => {
    try {
      const userprofile = await userproData.getUserProfile(req.params.id);
      res.status(200).json(userprofile);
    } catch (e) {
      res.status(404).json({ message: "User Profile not found!" });
    }
  });

//Async function to create a userprofile
  router.post("/:id", async (req, res) => {
    const userproInfo = req.body;
    
    if (!userproInfo) {
        res.status(400).json({error: 'You must provide data to to create userprofile'});
        return;
      }
     // console.log(userproInfo.undergrad.college);
      try {
        const createdUserPro = await userproData.createUserProfile(req.params.id, userproInfo.interestedin, userproInfo.undergrad, userproInfo.GRE_GMAT, userproInfo.TOEFL_IELTS_PTE);
        res.status(200).json(createdUserPro);
      } catch (e) {
        res.status(500).json({error: e});
      }
  });


//Async function to add work exp to userprofile
  router.patch("/addworkexp/:id", async (req, res) => {
    const addWorkExpInfo = req.body;
    
    if (!addWorkExpInfo) {
        res.status(400).json({error: 'You must provide data to add your work experience details'});
        return;
      }

      try{
    const addedWorkExp = await userproData.addWorkExp(req.params.id, addWorkExpInfo.orgName, addWorkExpInfo.startDate, addWorkExpInfo.endDate, addWorkExpInfo.position, addWorkExpInfo.location, addWorkExpInfo.description);
        res.status(200).json(addedWorkExp);
     } catch(e){
       res.status(400).json({error: e});
     }
});    

//Async function to add interested/applied university to userprofile
router.patch("/adduniversity/:id", async (req, res) => {
    const addUniInfo = req.body;
    
    if (!addUniInfo) {
        res.status(400).json({error: 'You must provide data to to add interested/Applied university'});
        return;
      }

      try{
        const addedUni = await userproData.addIntAppUniversity(req.params.id, addUniInfo.uniName, addUniInfo.uniProgram, addUniInfo.uniStatus, addUniInfo.comments);
        res.status(200).json(addedUni);
     } catch(e){
       res.status(400).json({error: e});
     }
});   

//Async function to add project to the userprofile
router.patch("/addproject/:id", async (req, res) => {
  const addProjectInfo = req.body;
  
  if (!addProjectInfo) {
      res.status(400).json({error: 'You must provide data to to add Project'});
      return;
    }

    try{
      const addedProject = await userproData.addProject(req.params.id, addProjectInfo.title, addProjectInfo.description);
      res.status(200).json(addedProject);
   } catch(e){
     res.status(400).json({error: e});
   }
}); 
//Async function to add tech papers to the userprofile
router.patch("/addtechpapers/:id", async (req, res) => {
  const addTechPaperInfo = req.body;
  
  if (!addTechPaperInfo) {
      res.status(400).json({error: 'You must provide data to to add Technical Paper'});
      return;
    }

    try{
      const addedTechPaper = await userproData.addTechPaper(req.params.id, addTechPaperInfo.title, addTechPaperInfo.description, addTechPaperInfo.link);
      res.status(200).json(addedTechPaper);
   } catch(e){
     res.status(400).json({error: e});
   }
}); 

//Async function to add extracurricular to the userprofile
router.patch("/addextracurricular/:id", async (req, res) => {
  const addExtraCurrInfo = req.body;
  
  if (!addExtraCurrInfo) {
      res.status(400).json({error: 'You must provide data to to add Extracurriculars'});
      return;
    }

    try{
      const addedExtraCurr = await userproData.addExtraCurriculars(req.params.id, addExtraCurrInfo.title, addExtraCurrInfo.description);
      res.status(200).json(addedExtraCurr);
   } catch(e){
     res.status(400).json({error: e});
   }
}); 

//Async function to update userprofile
router.put("/edituserprofile/:id", async (req, res) => {
  const editUserProInfo = req.body;
  
  if (!editUserProInfo) {
      res.status(400).json({error: 'You must provide data to edit userprofile'});
      return;
    }

    try{
      const editedUserPro = await userproData.editUserProfile(req.params.id, editUserProInfo.interestedin, editUserProInfo.undergrad, editUserProInfo.GRE_GMAT, editUserProInfo.TOEFL_IELTS_PTE, editUserProInfo.int_app_university,editUserProInfo.work_exp,editUserProInfo.projects,editUserProInfo.tech_papers,editUserProInfo.extracurriculars);
      res.status(200).json(editedUserPro);
   } catch(e){
     res.status(400).json({error: e});
   }
}); 

//Async function for past Admits & Rejects  
router.get("/", async (req, res) => {
   const pastAdmitRejectInfo = req.body;
  
  if (!pastAdmitRejectInfo) {
      res.status(400).json({error: 'You must provide data to edit userprofile'});
      return;
    }

    try{
      const pastUserPro = await userproData.pastAdmitsRejects(pastAdmitRejectInfo.uniName, pastAdmitRejectInfo.uniProgram, pastAdmitRejectInfo.uniStatus);
      res.status(200).json(pastUserPro);
   
   } catch(e){
     res.status(400).json({error: e});
   }
}); 
   //Exporting the route module
   module.exports = router;
