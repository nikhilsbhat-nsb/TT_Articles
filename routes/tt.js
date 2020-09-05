var express = require('express');
var router = express.Router();
var TT = require('../models/tt');

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
router.post("/", isLoggedIn,function (req, res) {
    var name= req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newTT = {name:name,image:image, description:desc, author:author};

    TT.create(newTT, function (err, newTT) {
        if(err) {
            console.log(err);
        }else{
            res.redirect("/tt");
        }
    });
});

//New
router.get("/new", isLoggedIn,function (req, res) {
    res.render("tts/new")
});

//Show
router.get("/:id", function (req, res) {
    TT.findById(req.params.id).populate("comments").exec(function (err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.render("tts/show", {tt: result});
        }
    });
});

//EDIT TT ROUTE
router.get("/:id/edit", checkTTOwnership,function (req, res){
    TT.findById(req.params.id, function (err, foundTT){
        res.render("tts/edit", {tt: foundTT});
    });
});

//UPDATE TT ROUTE
router.put("/:id", checkTTOwnership,function (req, res){
    TT.findByIdAndUpdate(req.params.id, req.body.tt, function (err, updatedTT){
        if(err){
            res.redirect("/tt");
        }else{
            res.redirect("/tt/"+req.params.id);
        }
    });
});

//DESTROY TT ROUTE
router.delete("/:id", checkTTOwnership,function (req, res) {
    TT.findByIdAndRemove(req.params.id, function (err){
        if(err){
            res.redirect("/tt");
        }else{
            res.redirect("/tt");
        }
    });
});


//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

//CHECK OWNERSHIP
function checkTTOwnership(req, res, next){
    if(req.isAuthenticated()){
        TT.findById(req.params.id, function (err, foundTT){
            if(err){
                res.redirect('back');
            }else{
            if(foundTT.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect('back');
            }
            }
        });
    }else{
        res.redirect("back");
    }
}


module.exports=router;