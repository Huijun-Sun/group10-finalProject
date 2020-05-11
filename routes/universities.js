const express = require("express");
const router = express.Router();
const data = require("../data");
const univData = data.universities;


const pageScripts =  [{script: "/public/js/universityPage.js"}];

function getPageConfig(query, univList) {
  let pageConfig = {
    heading: "University Finder",
    subHeading: "Find your best college here!",
    scripts: pageScripts,
    showSearch: false,
    showRegBanner: true,
    univList: univList,
    query: query,
  }

  if(univList == [] || univList == undefined) {
    pageConfig["error"] = "ops, no university found with given criteria";   
  }
  return pageConfig;
}

router.get("/id/:id", async (req, res) => {
  try {   
    
    if(!req.params.id)
    throw "Id is required"
    const univ = await univData.getUniversity(req.params.id);
    res.json(univ);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.get("/", async (req, res) => {
  const univList = await univData.getAllUniversity();  
  res.render("universityPage", {
    heading: "University Finder",
    subHeading: "Find your best college here!",
    scripts: pageScripts,
    showSearch: false,
    showRegBanner: true,
    univList: univList,
    query: {course: "computer science", score:"315", exp:"4000", gpa:"3.5", papers:"3"},

  });
});

router.get("/names", async (req, res) => {
  const univList = await univData.getAllUniversity();
  const nameList = []
  for (const univ of univList) {
    nameList.push(univ.title)
  }  
  res.json(nameList);
});

router.get("/top", async (req, res) => {
  try {
    const univList = await univData.getTopTrendingUniv();
    res.json(univList);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/title/:title/course/:course/intake/:intake", async (req, res) => {
    try {
        
        if(!req.params.title)
        throw "Title is required";
        if(!req.params.course)
        throw "Course is required";
        if(!req.params.intake)
        throw "Intake is required";
      const univList = await univData.getDeadline(req.params.title,req.params.course,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/course/:course/intake/:intake", async (req, res) => {
    try {
        
      if(!req.params.course)
      throw "Course is required";
      if(!req.params.intake)
      throw "Intake is required";
      const univList = await univData.getDeadline(null,req.params.course,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/title/:title/intake/:intake", async (req, res) => {
    try {
     
      if(!req.params.title)
      throw "Title is required";
      if(!req.params.intake)
      throw "Intake is required"; 
      const univList = await univData.getDeadline(req.params.title,null,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  
  router.get("/intake/:intake", async (req, res) => {
    try {
    
      if(!req.params.intake)
      throw "Intake is required";
      const univList = await univData.getDeadline(null,null,req.params.intake);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/title/:title/course/:course", async (req, res) => {
    try {
     
      if(!req.params.title)
      throw "Title is required";
      if(!req.params.course)
      throw "Course is required";
      const univList = await univData.getDeadline(req.params.title,req.params.course,null);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });

  router.post("/simpleSearch", async (req, res) => {
    console.log(req.body);
    try {
      if(!req.body.name)
      throw "Title is required";
      if(!req.body.course)
      throw "Course is required";
      const univList = await univData.getUniversityFrontpageFinder(req.body.course, req.body.name);
      res.render("universityPage", getPageConfig(req.body, univList));
    } catch (e) {
      res.render("universityPage", getPageConfig(req.body, []));
    }
  });

  router.get("/title/:title", async (req, res) => {
    try {
     
      if(!req.params.title)
      throw "Title is required";
      const univList = await univData.getDeadline(req.params.title,null,null);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/course/:course", async (req, res) => {
    try {
      
      if(!req.params.course)
      throw "Course is required";
      const univList = await univData.getDeadline(null,req.params.course,null);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.get("/course/:course/name/:name", async (req, res) => {
    try {
      if(!req.params.name)
      throw "Title is required";
      if(!req.params.course)
      throw "Course is required";   
      const univList = await univData.getUniversityFrontpageFinder(req.params.course,req.params.name);
      res.json(univList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
  });
  router.post("/search", async (req, res) => {
    try {
        console.log(req.body);
      const univList = await univData.getUniversityFinder(req.body.course,parseInt(req.body.score),parseInt(req.body.exp),parseInt(req.body.gpa),parseInt(req.body.papers));
      res.render("universityPage", getPageConfig(req.body, univList));

    } catch (e) {
      res.render("universityPage", getPageConfig(req.body, []));
    }
  });
  router.get("/title/:title/score/:score", async (req, res) => {
    try {
      if(!req.params.score)
      throw "score is required";
      if(!req.params.title)
      throw "Title is required";
      const univch = await univData.getChances(req.params.title,parseInt(req.params.score));
      res.json(univch);
    } catch (e) {
      res.status(500).json({message: e});
    }
  });
module.exports = router;


// 