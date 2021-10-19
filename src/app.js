const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
require("dotenv").config("../.env");
require("./config/passport");

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//session
app.use(
  session({
    secret: "projetai",
    resave: true,
    saveUninitialized: true,
  })
);
// flash message
app.use(flash());

//flash message
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// parse the data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//mongoose
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.URL_MONGO)
  .then(() => {
    console.log(`MongoDB Connected! on this url: ${process.env.URL_MONGO}`);
  })
  .catch((err) => {
    console.log("Error trying to connect to MongoDB :( " + err);
  });

//middleware
app.use((req, res, next) => {
  console.log("Middleware working...");
  next();
});

// Defines the listening door
app.listen(process.env.PORT, () => {
  console.log(`SERVER ON! ON ${process.env.PORT}`);
});

require("./routes/userRoutes")(app);
require("./routes/projectRoutes")(app);
require("./routes/admRoutes")(app);
