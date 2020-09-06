var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose=require('mongoose'),
    flash = require('connect-flash'),
    User = require('./models/user'),
    passport = require('passport'),
    localStrategy =require('passport-local'),
    methodOverride = require('method-override'),
    passportLocalMongoose = require('passport-local-mongoose'),
    TT=require("./models/tt"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds");

//REQUIRING ROUTES
var commentRoutes=require("./routes/comments"),
    ttRoutes=require("./routes/tt"),
    indexRoutes=require("./routes/index");


mongoose.connect("mongodb://localhost/TTweb", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Table Tennis is best sport to me",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/tt/:id/comments", commentRoutes);
app.use("/tt", ttRoutes);



app.listen(1000, function() {
    console.log("Server Has Started");
});