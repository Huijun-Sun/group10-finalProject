const express = require("express");
const router = express.Router();
const data = require("../data");
const discussionData = data.discussion;

router.get("/:id", async (req, res) => {
  try {
    const comment = await discussionData.getDiscussionComment(req.params.id);
    res.json(comment);
  } catch (e) {
    res.status(404).json({ message: e});
  }
});

router.get("/discussionTopicId/:dtId", async (req, res) => {
    try {
      const comment = await discussionData.getDiscussionCommentTopicId(req.params.dtId);
      res.json(comment);
    } catch (e) {
      res.status(404).json({ message: e });
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
    const { Comments,dtId } = dtDataa;
    const newdt = await discussionData.addDiscussionComment(Comments,dtId);
  
    res.status(200).json(newdt);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


module.exports = router;