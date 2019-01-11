require("dotenv").config();
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Middleware
var app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static("public"));
//We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes/Requiring our routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// needed to grab JSON, added by Erich to require the dialogue API 
require("./routes/apiroutes")(app);

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Syncing our database and logging a message to the user upon success
//this will listen to and show all activities on our terminal to 
//let us know what is happening in our app

  db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  });

module.exports = app;
