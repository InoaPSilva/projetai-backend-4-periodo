const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const session = require("express-session");
const flash = require("connect-flash");

require('./config/passport');


// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//session
app.use(session({
    secret: "projetai",
    resave: true,
    saveUninitialized: true
}));
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

mongoose.connect("mongodb://localhost:27017/db").then(() => {
    console.log("MongoDB Connected!");
}).catch((err) => {
    console.log("Error trying to connect to MongoDB :( " + err);
});

//middleware
app.use((req, res, next) => {
    console.log("Middleware working...");
    next();
});

// Defines the listening door
const PORT = 8089;
app.listen(PORT, () => {
    console.log("Server ON!");
});

require('./routes/userRoutes')(app);
require('./routes/projectRoutes')(app);