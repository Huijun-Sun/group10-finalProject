const universitiesRoutes = require("./universities");
const dtRoutes = require("./discussionTopic");
const dcRoutes = require("./discussionComment");
const userproRoutes = require("./userprofile");

const constructorMethod = app => {
  app.use("/universities", universitiesRoutes);
  app.use("/userprofile", userproRoutes);
 
  app.use("/discussionTopic", dtRoutes);
  app.use("/discussionComment", dcRoutes);
  app.use("*", (req, res) => {
   console.log("hi");
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
