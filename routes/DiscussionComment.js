const express = require("express");
const router = express.Router();
const data = require("../data");
const DiscussionData = data.Discussion;

router.get("/:id", async (req, res) => {
  try {
    const comment = await DiscussionData.getDiscussionComment(req.params.id);
    res.json(comment);
  } catch (e) {
    res.status(404).json({ message: e});
  }
});

router.get("/Discussiontopicid/:dtid", async (req, res) => {
    try {
      const comment = await DiscussionData.getDiscussionComment_topicid(req.params.dtid);
      res.json(comment);
    } catch (e) {
      res.status(404).json({ message: e });
    }
  });
  
router.get("/", async (req, res) => {
  try {
    const DTList = await DiscussionData.getAllComments();
    res.json(DTList);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.post("/", async (req, res) => {
  const DTDataa = req.body;
  try {
      if(!req.body.Comments)
      throw "Comments is required in json";
      if(!req.body.Dt_Id)
      throw "Discussion topic is required in json";
    const { Comments,Dt_Id } = DTDataa;
    const newDT = await DiscussionData.addDiscussionComment(Comments,Dt_Id);
    res.status(200).json(newDT);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


module.exports = router;