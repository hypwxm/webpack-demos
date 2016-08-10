var express = require('express');
var router = express.Router();
var model = require("../model/api");
var busboy = require("busboy");
var gettime = require("../middle/getTime");

//处理文件上传模块
var multer = require("multer");

var validate = require("../middle/checkLogin");

/* GET users listing. */

router.get('/', validate.checkLogin, function (req, res, next) {
    var user = req.session.user;
    model.getUseInfo(user, function(err, rows) {
        if(err) {
            res.send({Msg: "error", title: "获取数据出错"})
        }
        res.render("user/user.ejs", {user: rows[0]});
    });
    
});


var storage = multer.diskStorage({

    //指定和创建文件存放路径
    destination: function (req, file, cb) {
        cb(null, '../public/uploads')
    },

    //修改文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() * Math.random() * 1000000 + file.originalname)
    }
});

//指定multer的相关属性，采用any（）的模式，接受上传的数据，任何。
//team  page
var upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 20, //限制非文件的值的字段长度，有默认单位bytes，不用加单位
        fieldSize: 1024 * 1024, //文件及数据大小限制，value限制
        fields: 3, //上传的非文件的最大数量，这里有name，phone，headimg三个参数，headimg为文件所以不算在里面，但是图片必须传，不传的话就会当成非文件了。
        fileSize: 1024 * 1024 * 5, //上传的文件的大小限制，这里默认单位就是bytes，不用自己加单位 1kb = 1024bytes
        files: 1, // 文件类型的数量限制，，这里有headimg是图片文件
        //parts: 3, //文件加非文件类型的总数，，这里一共有三个字段，，图片的话如果多图上传应该是一个图片算一个
    },
    /*fileFilter: function(req, file, cb) {

        //fileFilter方法可以对数据进行过滤，不允许的要cb(null, false) 一定要写上cb(null, true)否则就会停在这里，cb'是固定写法
        //这个地方还无法获取文件的大小
        if(file.fieldname != "headimg") {
            cb(null, false)
        } else {
            //用了这个方法必须有cb(null, true)；否则函数无法继续进行
            cb(null, true);
        }
    }*/
}).any();

function getMulterError(req, res, err) {
    if(err.code == "LIMIT_FIELD_KEY") {
        res.send({Msg: "error", errorcode: 1, title: "您输入的值超过了限制范围。"})
    } else if (err.code == "LIMIT_FILE_COUNT") {
        res.send({Msg: "error", errorcode: 2, title: "文件数量太多。"})
    } else if (err.code == "LIMIT_FILE_SIZE") {
        res.send({Msg: "error", errorcode: 3, title: "上传的文件过大。"})
    } else if (err.code == "LIMIT_FIELD_VALUE") {
        res.send({Msg: "error", errorcode: 4, title: "内容太长。"})
    }
}

router.post("/api/userInfo", function (req, res, next) {

    //处理接受到的数据
    upload(req, res, function (err) {

        if (err) {
            console.log(err);
            getMulterError(req, res, err)
        } else {
            var fields = req.body;
            var files = req.files;


            console.log(files)

            // 服务器验证用户信息是否完整
            if(!fields) {
                res.send({Msg: "error", errorcode: 1, title: "请将信息填写完整后再提交。"})
            } else if(fields.name == "" || typeof fields.name == "undefined") {
                res.send({Msg: "error", errorcode: 2, title: "请填写昵称。"})
            } else if (fields.phone == "" || typeof fields.phone == "undefined") {
                res.send({Msg: "error", errorcode: 3, title: "请填写手机号码。"});
            } else　if (files.length == 0) {
                res.send({Msg: "error", errorcode: 4, title: "你还未选择头像。"})
            } else {
                //存入数据库
                model.inTeam(setItem(req.body, req.files, req, res), function(err) {
                    if(err) {
                        res.send({Msg: "error"})
                    } else {
                        res.send({Msg: "success"})
                    }
                });
            }
        }
    })
});



function setItem(field, files, req, res) {

    var item = {};
    item.time = gettime();
    item.name = field.name;
    item.phone = field.phone;
    item.headimg = "/uploads/" + files[0].filename;
    return item;

}


//登录界面
router.get("/signedin", function(req, res) {
    res.render("user/signedin.ejs");
});

//用户登录
router.post("/api/signedin", function(req, res) {
    var user = req.body;
    if(req.headers["content-type"].toLowerCase() == "application/json;charset=utf-8") {
        
        var item = {};

        item.name = user.username;
        item.password = user.password;

        model.getUsers(item, function(err, rows) {
            if(err) {
                
                //数据库本身报错
                res.send({Msg: "error", errorcode: 1, title: "sorry, can not signed in!"})
            } else if (rows.length == 0) {
                
                //为找到该用户
                res.send({Msg: "error", errorcode: 2, title: "user is not exists, if signed up?"})
            } else {
                //用户存在，匹配密码
                if(item.password == rows[0].password) {
                    req.session.user = {name: item.name};
                    res.send({Msg: "success"});
                } else {
                    //密码错误
                    res.send({Msg: "error", errorcode: 3, title: "pasword wrong try again."})
                }
            }
        })
    }
});


//注册页面
router.get("/signedup", function(req, res) {
    res.render("user/signedup.ejs");
});

//采用cookie  signedCookie加密的时候的方法
/*var cookieParser = require("cookie-parser");

router.use(cookieParser("HYPWXMHXY"));*/

//提交注册信息
router.post("/api/signedup", function(req, res, next) {

    var user = req.body;
    console.log(req.headers["content-type"]);
    if(req.headers["content-type"].toLowerCase() == "application/json; charset=utf-8") {
        var item = {};
        item.name = user.username;
        item.password = user.password;
        item.email = user.useremail;
        item.headportrait = "/images/img01.jpg";
        item.sex = "";
        item.phone = 0;
        model.userSignedUp(item, function(err) {
            
            if(err) {
                if(err == "error") {
                    res.send({Msg: "error", errorcode: 2, title: "用户已存在！"})
                } else {
                    res.send({Msg: "error", errorcode: 1, title: "注册失败！"})
                }
            } else {

                //设置客户端的cookie格式，，客户端的cookie将会是 加密方法（scret + name的值）
                //res.cookie("name", user.username, {signed: true})

                //引入了mysql相关存储session的中间件（在app主程序里），req.session作为一个对象，对其设置的值都会更新到客户端请求过来的sessionID值锁对象的数据里
                req.session.user = {name: user.username, email: user.useremail};
                res.send({Msg: "success"});
            }
        })
    } else {
        res.send({Msg: "error", errorcode: 3, title: "请设置正确的请求头！"})
    }

});


//注册成功
router.get("/success", function(req, res, next) {
   res.render("user/success.ejs")
});


//个人文章
router.get("/myarticles", validate.checkLogin, function(req, res) {
    var user = req.session.user;
    model.getUserArticles(user, function(err, rows) {
        if(err) {
            res.send({Msg: "error", title: "数据库错误"});
        } else {
            res.render("user/myArticles.ejs", {articles: rows})
        }
    })
});


var upload2 = multer({
    storage: storage,
    limits: {
        fieldNameSize: 20, //限制非文件的值的字段长度，有默认单位bytes，不用加单位
        fieldSize: 1024 * 1024, //文件及数据大小限制，value限制
        fields: 3, //上传的非文件的最大数量，这里有name，phone，headimg三个参数，headimg为文件所以不算在里面，但是图片必须传，不传的话就会当成非文件了。
        fileSize: 1024 * 1024 * 5, //上传的文件的大小限制，这里默认单位就是bytes，不用自己加单位 1kb = 1024bytes
        files: 6, // 文件类型的数量限制，，这里有headimg是图片文件
        //parts: 3, //文件加非文件类型的总数，，这里一共有三个字段，，图片的话如果多图上传应该是一个图片算一个
    }
}).any();

//添加新文章页面
router.get("/addarticle", validate.checkLogin, function(req, res) {
    res.render("user/addArticle.ejs")
});


//添加新文章
router.post("/addArticle", validate.checkLogin, function(req, res) {
    upload2(req, res, function(err) {
        if(err) {
            console.log(err);
            getMulterError(req, res, err)
        } else {
            var article = req.body;
            var imglist = req.files;

            console.log(imglist[0])
            if (article.articletitle == "" || typeof article.articletitle == "undefined") {
                res.send({Msg: "error", errorcode: 2, title: "请填写标题。"})
            } else if (article.articlecontent == "" || typeof article.articlecontent == "undefined") {
                res.send({Msg: "error", errorcode: 3, title: "还未填写内容。"})
            } else{
                var allImg = "";
                if (imglist.length != 0) {
                    for(var i = 0; i < imglist.length; i++) {
                        allImg += "/uploads/" + imglist[i].filename + ",";
                    }
                }

                console.log(req.body)

                var user = req.session.user;
                var item = {};
                item.time = gettime();
                item.name = user.name;
                item.title = article.articletitle;
                item.content = article.articlecontent;
                item.imglist = allImg.slice(0, -1);
                model.postNewArticle(item, function(err) {
                    if(err) {
                        console.log(err);
                        res.send({Msg: "error", title: "数据库发生错误。"})
                    } else {
                        res.send({Msg: "success", title: "文章添加成功。"})
                    }
                })

            }
        }
    });
});


module.exports = router;