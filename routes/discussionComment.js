const express = require("express");
const router = express.Router();
const data = require("../data");
const discussionData = data.discussion;
const xss=require("xss");

router.get("/:id", async (req, res) => {
  try {
    if(!req.params.id)
    throw "Id is required";
    const comment = await discussionData.getDiscussionComment(req.params.id);
    res.json(comment);
  } catch (e) {
    res.status(404).json({ message: e});
  }
});

router.get("/discussionTopicId/:dtId", async (req, res) => {
    try {
      if(!req.params.dtId)
      throw "Discussion Topic Id is required";
      const comment = await discussionData.getDiscussionCommentTopicId(req.params.dtId);
      res.json(comment);
    } catch (e) {
      res.status(404).json({ message: e});
    }
  });
  
router.get("/", async (req, res) => {
  try {
    const dtList = await discussionData.getAllComments();
    res.json(dtList);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.post("/", async (req, res) => {
  const dtDataa = req.body;
  try {
    if(!req.session.user)
    throw "Please Login to add Discussion Comments";
      if(!req.body.Comments)
      throw "Comments is required in json";
      if(!req.body.dtId)
      throw "Discussion topic is required in json";
   //   user='5eb735d2ed3b004d14543f5a';
     
    const { Comments,dtId} = dtDataa;
    const newdt = await discussionData.addDiscussionComment(xss(Comments),xss(dtId),req.session.user);
  
    res.status(200).redirect('/discussionTopic');
  } catch (e) {
    res.status(400).render("error",{error: e ,isloggedin:req.session.isloggedin,username:req.session.user,userid:req.session.userid, loggedOut: !req.session.isloggedin});
  }
});


module.exports = router;