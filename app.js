const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require('express-session');
const app = express();
const configRoutes = require("./routes");
const mail = require("./emailNotification");

app.use(session({
  name: 'AuthCookie',
  secret: 'some scret string',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.engine("hbs", exphbs({
  extname: 'hbs', defaultLayout: "main",
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next)
 {
    let user_authentication = "Not Authorised User";
    if (req.session.users) {
      user_authentication = "Authorised User";
    }
   // console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${user_authentication})`);
    next();
  });
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

