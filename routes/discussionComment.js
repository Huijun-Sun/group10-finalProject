const express = require("express");
const router = express.Router();
const data = require("../data");
const discussionData = data.discussion;

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
      if(!req.body.Comments)
      throw "Comments is required in json";
      if(!req.body.dtId)
      throw "Discussion topic is required in json";
      dtDataa.user='5eb735d2ed3b004d14543f5a';
    const { Comments,dtId,user } = dtDataa;
    const newdt = await discussionData.addDiscussionComment(Comments,dtId,user);
  
    res.status(200).redirect('/discussionTopic');
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


module.exports = router;