exports.checkLogin = function(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect("/user/signedin")
    }
};