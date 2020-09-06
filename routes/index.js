var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

//ROOT
router.get('/', function(req, res) {
    res.render('landing');
});

//AUTH ROUTES

//SHOW REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});
//HANDLE SIGN UP
router.post("/register", function(req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to TT Article "+user.username);
            res.redirect("/tt");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});
//HANDLE LOGIN
router.post("/login", passport.authenticate("local",{
        successRedirect: "/tt",
        failureRedirect: "/login"
    }),function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", middleware.isLoggedIn,function(req, res){
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/tt");
});


module.exports = router;