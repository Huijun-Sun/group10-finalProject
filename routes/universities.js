const express = require("express");
const router = express.Router();
const data = require("../data");
const univData = data.universities;

router.get("/:id", async (req, res) => {
  try {
      
    const univ = await univData.getUniversity(req.params.id);
    res.json(univ);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/", async (req, res) => {
  try {
    const univList = await univData.getAllUniversity();
    res.json(univList);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/title/:title/course/:course/intake/:intake", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(req.params.title,req.params.course,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/course/:course/intake/:intake", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(null,req.params.course,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/title/:title/intake/:intake", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(req.params.title,null,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  
  router.get("/intake/:intake", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(null,null,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/title/:title/course/:course", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(req.params.title,req.params.course,null);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/title/:title", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(req.params.title,null,null);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/course/:course", async (req, res) => {
    try {
        
        
      const univList = await univData.getDeadline(null,req.params.course,null);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/:course/:score/:exp/:gpa/:papers", async (req, res) => {
    try {
        
      const univList = await univData.getUniversity_finder(req.params.course,parseInt(req.params.score),parseInt(req.params.exp),parseInt(req.params.gpa),parseInt(req.params.papers));
      res.json(univList);
    } catch (e) {
      res.status(500).json({message: e});
    }
  });

module.exports = router;