const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let User = require("../models/user");
// The local authentication strategy authenticates users using a username and password.
// The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
passport.use(
  new LocalStrategy({ usernameField: "email" }, (
    username,
    password,
    done
  ) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      // checking username and password
      if (!user || !user.verifyPassword(password)) {
        return done(null, false, { message: "Incorrect username or password." });
      }
      return done(null, user);
    });
  })
);
