var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

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
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function(){
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
router.get("/logout", isLoggedIn,function(req, res){
    req.logout();
    res.redirect("/tt");
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports = router;