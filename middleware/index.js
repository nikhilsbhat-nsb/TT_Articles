var TT = require("../models/tt");
var Comment = require("../models/comment");

var middlewareOgj={}

middlewareOgj.checkTTOwnership=function(req, res, next){
    if(req.isAuthenticated()){
        TT.findById(req.params.id, function (err, foundTT){
            if(err || !foundTT){
                req.flash("error", "TT Equipment not found");
                res.redirect('back');
            }else{
            if(foundTT.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that");
                res.redirect('back');
            }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to that");
        res.redirect("back");
    }
}

middlewareOgj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect('back');
            }else{
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that");
                res.redirect('back');
            }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to that");
        res.redirect("back");
    }
}

middlewareOgj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareOgj;