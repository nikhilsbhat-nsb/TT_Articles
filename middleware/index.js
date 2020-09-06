var TT = require("../models/tt");
var Comment = require("../models/comment");

var middlewareOgj={}

middlewareOgj.checkTTOwnership=function(req, res, next){
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

middlewareOgj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment){
            if(err){
                res.redirect('back');
            }else{
            if(foundComment.author.id.equals(req.user._id)){
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

middlewareOgj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}


module.exports = middlewareOgj;