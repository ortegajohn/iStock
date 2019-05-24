require("dotenv").config();
// var express = require("express");
var exphbs = require("express-handlebars");
// const expresshandlebars = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const expresshandlebars = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const express_session = require('express-session');
const mysqlstore = require('express-mysql-session');
const passport = require('passport');
const colors = require('colors');


const {  
  keys
} = require('./database/database_keys');

require('./lib/passport');
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );

// app.set("view engine", "handlebars");

app.engine('.hbs', expresshandlebars({

  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  mainstock: path.join(app.get('views'), 'indexstock'),
  extname: '.hbs'

}));

app.set('view engine', '.hbs');

//https://stackoverflow.com/questions/30467456/multiple-layouts-with-handlebars-and-expressjs
// router.get('/', function(req, res) {
//   res.render('home', {layout: 'viewBLayout.hbs'});
// });

/* Middlewares */
app.use(express_session({

  secret: 'random_secrete_string',
  resave: false,
  saveUninitialized: false,
  store: new mysqlstore(keys)

}));

app.use(flash());

app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: false
}));

app.use(passport.initialize());

app.use(passport.session());

/* Global Variables */
app.use((req, res, next) => {

  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();

});



// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// app.use(require("./routes/apiRoutes"));
// app.use(require("./routes/htmlRoutes"));
app.use(require('./routes'));
app.use(require('./routes/authentication'));


/* Public */
app.use(express.static(path.join(__dirname, 'public')));




var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
