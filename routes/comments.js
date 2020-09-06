var express = require('express');
var router = express.Router({mergeParams: true});
var TT = require('../models/tt');
var Comment = require('../models/comment'); 
var middleware = require('../middleware');

//COMMENTS NEW
router.get("/new", middleware.isLoggedIn,function (req, res) {
    TT.findById(req.params.id, function (err, tt) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {tt: tt});
        }
    });
});

//COMMENTS CREATE
router.post("/", middleware.isLoggedIn,function (req, res) {
    TT.findById(req.params.id, function (err, tt) {
        if(err){
            console.log(err);
            res.redirect("/tt");
        }else{
            Comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    tt.comments.push(comment);
                    tt.save();
                    res.redirect("/tt/"+tt._id);
                }
            });
        }
    });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {tt_id:req.params.id, comment:foundComment});
        }
    });
});

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/tt/"+req.params.id);
        }
    });
});

//DESTROY COMMENT ROUTER
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
           res.redirect("back");
        }else{
            res.redirect("/tt/"+req.params.id)
        }
    });
});

module.exports=router;