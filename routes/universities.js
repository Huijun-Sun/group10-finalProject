const express = require("express");
const router = express.Router();
const data = require("../data");
const univData = data.universities;


const pageScripts =  [{script: "/public/js/universityPage.js"}];

router.get("/id/:id", async (req, res) => {
  try {   
    const univ = await univData.getUniversity(req.params.id);
    res.json(univ);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/", async (req, res) => {
  res.render("universityPage", {
    heading: "University Finder",
    sub_heading: "Find your best college here!",
    scripts: pageScripts,
    showSearch: false,
  });
});

router.get("/all", async (req, res) => {
  try {
    const univList = await univData.getAllUniversity();
    console.log("univList");
    console.log(univList);
    res.json(univList);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});


router.get("/top/topuniversities", async (req, res) => {
  try {
   
    const univList = await univData.getTopTrendingUniv();
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
  router.get("/course/:course/name/:name", async (req, res) => {
    try {
        
        
      const univList = await univData.getUniversityFrontpageFinder(req.params.course,req.params.name);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/:course/:score/:exp/:gpa/:papers", async (req, res) => {
    try {
        
      const univList = await univData.getUniversityFinder(req.params.course,parseInt(req.params.score),parseInt(req.params.exp),parseInt(req.params.gpa),parseInt(req.params.papers));
      res.json(univList);
    } catch (e) {
      res.status(500).json({message: e});
    }
  });
  router.get("/title/:title/score/:score", async (req, res) => {
    try {
        
      const univch = await univData.getChances(req.params.title,parseInt(req.params.score));
      res.json(univch);
    } catch (e) {
      res.status(500).json({message: e});
    }
  });
module.exports = router;


// 