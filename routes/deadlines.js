const express = require("express");
const router = express.Router();
const data = require("../data");
const univData = data.universities;
const xss = require("xss");

const pageScripts = [];


function getPageConfig(req, univList, query, error) {
  let pageConfig = {
    heading: "Deadline Tracker",
    subHeading: "We help you to keep things on track!",
    scripts: pageScripts,
    loggedOut: !req.session.isloggedin,
    univList: univList,
    query: query,
  }

  if (univList == [] || univList == undefined) {
    pageConfig["error"] = error;
  }
  return pageConfig;
}

router.get("/", async (req, res) => {
  try {
    res.render("deadlinePage", getPageConfig(req, [], {}, "try some searches!"));
  }
  catch (e) {
    res.status(400).render("error", { error: e });
  }
});

router.post("/", async (req, res) => {
  try {
    const univList = await univData.getDeadline(xss(req.body.name), xss(req.body.course), xss(req.body.intake));

    // xss checked above, no need to check again, 
    // handle bar will only use those checked fields anyways.
    res.render("deadlinePage", getPageConfig(req, univList, req.body));
  } catch (e) {
    res.render("deadlinePage", getPageConfig(req, [], req.body, e));
  }
});


module.exports = router;


// 