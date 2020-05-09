const universitiesRoutes = require("./universities");
const DtRoutes = require("./DiscussionTopic");
const DcRoutes = require("./DiscussionComment");
const userproRoutes = require("./userprofile");
const introRoutes = require("./intro")
const eventsRoutes = require("./events")
const forumRoutes = require("./forum")
const userRoutes = require("./user");

const constructorMethod = app => {
  app.use("/", introRoutes);
  app.use("/events", eventsRoutes);
  app.use("/forum", forumRoutes);
  app.use("/universities", universitiesRoutes);
  app.use("/userprofile", userproRoutes);
  app.use("/user", userRoutes);
  app.use("/DiscussionTopic", DtRoutes);
  app.use("/DiscussionComment", DcRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
