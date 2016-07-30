var http = require("http");
var fs = require("fs");
var url = require("url");
var mime = require("mime");
http.createServer(function(req, res) {
    var urlobj = url.parse(req.url, true);

    console.log(urlobj);

    if(!/\./.test(urlobj.pathname) && !/api/.test(urlobj.pathname)) {
        fs.exists("./view/index.html", function(exists) {
            if(exists) {
                fs.readFile("./view/index.html", function(err, data) {
                    if(err) {
                        res.writeHead(404, {"Content-Type": "text/html"});
                        res.write("404, not found");
                        res.end();
                    } else {
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.write(data.toString());
                        res.end();
                    }
                })
            }
        })
    } else if (urlobj.pathname == "/myOrder") {
        fs.exists("./view/myOrder.html", function(exists) {
            if(exists) {
                fs.readFile("./view/myOrder.html", function(err, data) {
                    if(err) console.log(err);

                    console.log("render page");
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data);
                    res.end();
                })
            }
        })
    } else if (urlobj.pathname == "/myTeam") {
        fs.exists("./view/myTeam.html", function(exists) {
            if(exists) {
                fs.readFile("./view/myTeam.html", function(err, data) {
                    if(err) console.log(err);

                    console.log("render page");
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data);
                    res.end();
                })
            }
        })
    } else if (urlobj.pathname == "/api/order") {
        res.setHeader("Content-Type", mime.lookup(req.url));
        fs.exists("./data/order.json", function(exists) {
            if(exists) {
                fs.readFile("./data/order.json", function(err, data) {
                    if(err) {
                        console.log(err);
                        res.setStatusCode = 404;
                        res.end("404，文件出错")
                    } else {
                        res.setStatusCode = 200;
                        res.end(data)
                    }
                })  
            }
            
        })
    } else if (urlobj.pathname == "/api/team") {
        res.setHeader("Content-Type", mime.lookup(req.url));
        fs.exists("./data/team.json", function(exists) {
            if(exists) {
                fs.readFile("./data/team.json", function(err, data) {
                    if(err) {
                        console.log(err);
                        res.setStatusCode = 404;
                        res.end("404，文件出错")
                    } else {
                        res.setStatusCode = 200;
                        res.end(data)
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
                        res.setStatusCode = 404;
                        res.end("not found");
                    } else {
                        res.setStatusCode = 200;
                        res.end(data);
                    }
                })
            } else {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("404 not found");
            }
        })
    }

}).listen(8888);