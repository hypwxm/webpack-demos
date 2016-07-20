var http = require("http");
var url = require("url");
var fs = require("fs");
var mime = require("mime");



var server = http.createServer(function(req, res) {
    var urlobj = url.parse(req.url, true);

    console.log(urlobj);

    if(urlobj.pathname == "/") {
        res.setHeader("Content-Type", "text/html");
        fs.readFile("./demo.html", function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {"Content-Type": "text/html"});
            }
            res.write(data);
            res.end();

        })
    } else if(urlobj.pathname == "/api/comment") {
        res.setHeader("Content-Type", mime.lookup(req.url));
        fs.exists("./comments.json", function(exists) {
            if(exists) {
                fs.readFile("./comments.json", function(err, data) {
                    if(err) {
                        res.statusCode = 404;
                        res.end();
                    } else {
                        res.statusCode = 200;
                        res.write(data);
                        res.end();
                    }

                })
            }
        })
    } else {
        res.setHeader("Content-Type", mime.lookup(req.url));
        fs.exists("." + urlobj.pathname, function(exists) {
            if(exists) {
                fs.readFile("." + urlobj.pathname, function(err, data) {
                    if(err) {
                        res.statusCode = 404;
                        res.end();
                    } else {
                        res.statusCode = 200;
                        res.write(data);
                        res.end();
                    }
                    
                })
            }
        })
    }


}).listen(8080);

var io = require("socket.io")(server);



io.on("connection", function(socket) {
    fs.exists("./comments.json", function(exists) {
        if(exists) {
            fs.readFile("./comments.json", function(err, data) {
                if(err) {
                    console.log(err)
                }
                socket.send({data: JSON.parse(data.toString())});
            });
            socket.on("message", function(msg) {
                console.log(msg);

                fs.readFile("./comments.json", function(err, data) {
                    if(err) {
                        console.log(err)
                    }

                    var _data = JSON.parse(data.toString()).concat(msg);

                    console.log(data);

                    if(msg != "/api/comment") {
                        fs.writeFile("./comments.json", JSON.stringify(_data), {encoding: "utf8"}, function(err) {
                            if(err) {
                                console.log(err);
                            }
                            
                            socket.send({data: _data});
                        })
                    } else {
                        socket.send({data: _data});
                    }




                });

            })
        }
    });

});
