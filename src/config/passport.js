const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");

let User = require("../models/user");
// The local authentication strategy authenticates users using a username and password.
// The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    username,
    password,
    done
  ) {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);
