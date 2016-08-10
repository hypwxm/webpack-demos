var http = require("http");
var fs = require("fs");
var url = require("url");
var mime = require("mime");
var formidabel = require("formidable");
var model = require("./model/pool.js");
var user = [];

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
        /*fs.exists("./data/team.json", function(exists) {
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

        })*/


        model.getteam(function(data) {
            res.write(JSON.stringify(data));
            res.end();
        })
    } else if(urlobj.pathname == "/api/userInfo"){

        //构建一个解析器
        var form = new formidabel.IncomingForm();
        //用解析器解析请求体
        //把非file的input放在fields里
        //把文件类型的input放在files里
        form.parse(req, function(err, fields, files) {
            console.log(files);
            console.log(fields);
            fs.readFile(files.headimg.path, function(err, data) {
                var filename = "/" + files.headimg.name;
                fs.writeFile("./public/images/" + filename, data, function(err) {

                    var item = {};
                    
                    var nowtime = new Date();
                    var year = nowtime.getFullYear();
                    var month = /^\d$/.test(nowtime.getMonth()) ? "0" + nowtime.getMonth() : nowtime.getMonth();
                    var day = /^\d$/.test(nowtime.getDate()) ? "0" + nowtime.getDate() : nowtime.getDate();
                    var hour = /^\d$/.test(nowtime.getHours()) ? "0" + nowtime.getHours() : nowtime.getHours();
                    var minutes = /^\d$/.test(nowtime.getMinutes()) ? "0" + nowtime.getMinutes() : nowtime.getMinutes();
                    var seconds = /^\d$/.test(nowtime.getSeconds()) ? "0" + nowtime.getSeconds() : nowtime.getSeconds();
                    item.time = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
                    console.log(item.time)
                    item.name = fields.name;
                    item.phone = fields.phone;
                    item.headimg = "./public/images/" + filename;
                    
                    model.newteamuser("", item);

                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.write(filename);
                    res.end("ok");
                })
            })
        })

        /*var params = "";
        req.on("data", function(data) {
            params += data
        });
        req.on("end", function() {
            user.push(JSON.parse(params));
            console.log(user);
            res.end("ok");
        })*/
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