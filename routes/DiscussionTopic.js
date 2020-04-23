const express = require("express");
const router = express.Router();
const data = require("../data");
const DiscussionData = data.Discussion;

router.get("/:id", async (req, res) => {
  try {
    const topic = await DiscussionData.getDiscussionTopic(req.params.id);
    res.json(topic);
  } catch (e) {
    res.status(404).json({ message: "Topic not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const DTList = await DiscussionData.getAllTopics();
    res.json(DTList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const DTDataa = req.body;
  try {
    const { title } = DTDataa;
    if(!req.body.title)
    throw "Invalid format";
    const newDT = await DiscussionData.addDiscussionTopic(title);

    res.status(200).json(newDT);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


module.exports = router;