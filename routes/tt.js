var express = require('express');
var router = express.Router();
var TT = require('../models/tt');
var middleware = require('../middleware');

//Index
router.get("/", function(req, res) {
    TT.find({}, function(err, allTT){
        if(err) {
            console.log(err);
        }else{
            res.render("tts/index", {tt:allTT, currentUser:req.user});
        }
    });
});

//Create
router.post("/", middleware.isLoggedIn,function (req, res) {
    var name= req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var price=req.body.price;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newTT = {name:name,price:price,image:image, description:desc, author:author};

    TT.create(newTT, function (err, newTT) {
        if(err) {
            console.log(err);
        }else{
            res.redirect("/tt");
        }
    });
});

//New
router.get("/new", middleware.isLoggedIn,function (req, res) {
    res.render("tts/new")
});

//Show
router.get("/:id", function (req, res) {
    TT.findById(req.params.id).populate("comments").exec(function (err, foundTT){
        if(err||!foundTT){
            req.flash("error", "TT Equipment not found");
            res.redirect("back");
        }else{
            console.log(foundTT);
            res.render("tts/show", {tt: foundTT});
        }
    });
});

//EDIT TT ROUTE
router.get("/:id/edit", middleware.checkTTOwnership,function (req, res){
    TT.findById(req.params.id, function (err, foundTT){
        res.render("tts/edit", {tt: foundTT});
    });
});

//UPDATE TT ROUTE
router.put("/:id", middleware.checkTTOwnership,function (req, res){
    TT.findByIdAndUpdate(req.params.id, req.body.tt, function (err, updatedTT){
        if(err){
            res.redirect("/tt");
        }else{
            res.redirect("/tt/"+req.params.id);
        }
    });
});

//DESTROY TT ROUTE
router.delete("/:id", middleware.checkTTOwnership,function (req, res) {
    TT.findByIdAndRemove(req.params.id, function (err){
        if(err){
            res.redirect("/tt");
        }else{
            res.redirect("/tt");
        }
    });
});



module.exports=router;