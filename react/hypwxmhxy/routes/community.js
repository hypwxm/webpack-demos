var express = require("express");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, "../public/uploads")
   },
   filename: function(req, file, cb) {
       cb(null, file.originalname)
   }
});
var upload = multer({storage: storage}).any();
router.post("/api/newarticle", function(req, res, next) {
    
});

