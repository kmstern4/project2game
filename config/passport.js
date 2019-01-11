//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//We will need the models folder to check passport again
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password

passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    function (email, password, done) {
        console.log(email,password);
        // When a user tries to sign in this code runs
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email address."
                });
            }
            // If there is a user with the given email, but the password the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password. Please try again."
                });
            }
            // If none of the above are triggered then the user is returned
            return done(null, dbUser); 
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  
  
  // Exporting our configured passport
  module.exports = passport;