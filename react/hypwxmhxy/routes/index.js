var express = require('express');
var router = express.Router();
var model = require("../model/api");

/* GET home page. */
router.get('/', function(req, res) {
  model.getArticles(function(err, rows) {
    if(err) {
      res.send({Msg: "error", title: "someerror in database occured"})
    } else {
      res.render('home/index', { articles:  rows});
    }
  })
 
});

module.exports = router;
