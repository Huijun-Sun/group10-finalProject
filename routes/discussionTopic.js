const express = require("express");
const router = express.Router();
const data = require("../data");
const discussionData = data.discussion;
const xss=require("xss");

router.get("/:id", async (req, res) => {
  try {
    if(!req.params.id)
    throw "Id is required";
    const topic = await discussionData.getDiscussionTopic(req.params.id);
    res.json(topic);
  } catch (e) {
    res.status(404).json({ error: "Topic not found" });
  }
});

router.get("/", async (req, res) => {
  try {
   
    const dtList = await discussionData.getAllTopics();
  //  res.render("forum_page",{dtList});isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid
  res.render("forum_page",{dtList,isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid});
  } catch (e) {
    res.status(500).render('error',{error: e});
  }
});


router.post("/", async (req, res) => {

  const dtDataa = req.body;
 // user='5eb735d2ed3b004d14543f5a';
  try {
  //console.log(req.session.user);
    const { title } = dtDataa;
    if(!req.session.user)
    throw "Please Login to add Discussion Topic";
    if(!req.body.title)
    throw "Invalid post format";
    const newdt = await discussionData.addDiscussionTopic(xss(title),req.session.user);
    res.status(200).redirect('/discussionTopic');
  } catch (e) {
   
    res.status(400).render('error',{ error: e });
  }
});


module.exports = router;