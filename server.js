require("dotenv").config();
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Added by Erich for testing purposes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "game.html"));
});

// Handlebars

// Routes

// needed to grab JSON, added by Erich to require the dialogue API 
require("./routes/apiroutes")(app);

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
// db.sequelize.sync().then(function() {

  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
// });

module.exports = app;
