const express = require("express");
const router = express.Router();
const data = require("../data");
const discussionData = data.discussion;

router.get("/:id", async (req, res) => {
  try {
    const topic = await discussionData.getDiscussionTopic(req.params.id);
    res.json(topic);
  } catch (e) {
    res.status(404).json({ message: "Topic not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const dtList = await discussionData.getAllTopics();
    res.json(dtList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const dtDataa = req.body;
  try {
    const { title } = dtDataa;
    if(!req.body.title)
    throw "Invalid post format";
    const newdt = await discussionData.addDiscussionTopic(title);
    res.status(200).json(newdt);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


module.exports = router;