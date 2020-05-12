const eventRoutes = require("./events");

const constructorMethod = app => {
  app.use("/events", eventRoutes);

  app.use("*", (req, res) => {
      res.sendStatus(404);
  });
};

module.exports = constructorMethod;