const universitiesRoutes = require("./universities");
const DtRoutes = require("./DiscussionTopic");
const DcRoutes = require("./DiscussionComment");
const userproRoutes = require("./userprofile");

const constructorMethod = app => {
  app.use("/universities", universitiesRoutes);
  app.use("/userprofile", userproRoutes);
 
  app.use("/DiscussionTopic", DtRoutes);
  app.use("/DiscussionComment", DcRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
