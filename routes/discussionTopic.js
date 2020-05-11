const express = require("express");
const router = express.Router();
const data = require("../data");
const discussionData = data.discussion;

router.get("/:id", async (req, res) => {
  try {
    if(!req.params.id)
    throw "Id is required";
    const topic = await discussionData.getDiscussionTopic(req.params.id);
    res.json(topic);
  } catch (e) {
    res.status(404).json({ message: "Topic not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const dtList = await discussionData.getAllTopics();
    
    res.render("forum_page",{dtList});
  } catch (e) {
    res.status(500).render(e);
  }
});


router.post("/", async (req, res) => {
  const dtDataa = req.body;
 // dtDataa.user='5eb735d2ed3b004d14543f5a';
  try {
    const { title,user } = dtDataa;
    
    if(!req.body.title)
    throw "Invalid post format";
    const newdt = await discussionData.addDiscussionTopic(title,req.session.user);
    res.status(200).redirect('/discussionTopic');
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


module.exports = router;