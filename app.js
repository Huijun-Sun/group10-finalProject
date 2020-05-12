const express = require('express');
const app = express();

//const session = require('express-session');

const static = express.static(__dirname + '/public');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//const bcrypt = require('bcryptjs');

const configRoutes = require('./routes');
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
