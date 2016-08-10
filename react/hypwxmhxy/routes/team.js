var model = require("../model/api");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    model.getTeam(function(err, rows) {
        if(err) {
            res.send({Msg: "error"})
        }
        res.render("team/team", {teams: rows}); 
    })
    
});


router.get("/add", function(req, res) {
    res.render("team/addTeam.ejs")
});
module.exports = router;
