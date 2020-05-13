
const universitiesRoutes = require("./universities");
const dtRoutes = require("./discussionTopic");
const dcRoutes = require("./discussionComment");
const userproRoutes = require("./userprofile");
const introRoutes = require("./intro");
const eventsRoutes = require("./events");
const pastRoutes = require("./pastAdmitsReject");
//const forumRoutes = require("./forum")
//const userRoutes = require("./user");
//const forumRoutes = require("./forum")
const authRoutes = require("./user");
const deadlinesRoutes = require("./deadlines");
const guidesRoutes = require("./guides");

const constructorMethod = app => {
  app.use("/", introRoutes);
  app.use("/events", eventsRoutes);
  app.use("/pastAdmitsReject", pastRoutes);
  app.use("/universities", universitiesRoutes);
  app.use("/userprofile", userproRoutes);
  app.use("/discussionTopic", dtRoutes);
  app.use("/discussionComment", dcRoutes);
  app.use("/auth", authRoutes);
  app.use("/deadlines", deadlinesRoutes);
  app.use("/guides", guidesRoutes);
 
  app.use("*", (req, res) => {
  
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
