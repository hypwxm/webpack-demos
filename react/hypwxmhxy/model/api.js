var mysql = require("mysql");
var connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "hyp2wxm2hxy",
    database: "hypwxmhxy",
    port: 3306
});

connection.on("connect", function(err) {
    if(err) {
        console.log(err)
    }

    console.log("已连接数据库。。。")
});

//获取team有关数据
exports.getTeam = function(callback) {
    connection.query("select * from team", function(err, rows) {
       if (typeof callback == "function") {
            callback(err, rows)
       } else if (typeof callback != "undefined") {
           throw new Error("callback is required to be a function");
       }
    })
};


//将新注册用户加入team
exports.inTeam = function(item, callback) {
    connection.query("insert into team(name,headimg,time,phone) values(?,?,?,?)", [item.name, item.headimg, item.time, item.phone], function(err) {
        if(typeof callback == "function") {
            callback(err);
        } else if (typeof callback != "undefined") {
            throw new Error("callback is required to be a function")
        }
    })
};


//用户注册
exports.userSignedUp = function(item, callback) {

    connection.query("select name from users where name=?", [item.name], function(err, rows) {
        if(err) {
            if(typeof callback == "function") {
                callback(err);
            } else if (typeof callback != "undefined") {
                throw new Error("callback is required to be a function")
            }
        } else if(rows.length == 0) {

            connection.query("insert into users(name,password,headportrait,phone,sex,email) values(?,?,?,?,?,?)", [item.name, item.password, item.headportrait, item.phone, item.sex, item.email], function(err) {
                if(typeof callback == "function") {
                    callback(err);
                } else if (typeof callback != "undefined") {
                    throw new Error("callback is required to be a function")
                }
            })
        } else {
            callback("error");
        }

    });
};


//查询匹配sessionID
exports.getSessionId = function(id, callback) {
    connection.query("select data from sessions where session_id=?", [id.toString()], function(err, rows) {
      
        callback(err, rows);
        
    })
};


//用户登录信息匹配，
exports.getUsers = function(item, callback) {
    connection.query("select name, password from users where name=?", [item.name], function(err, rows) {
        if(typeof callback == "function") {
            callback(err, rows);
        } else if (typeof callback != "undefined") {
            throw new Error("callback is required to be a function")
        }
    })
};

//获取首页文章信息
exports.getArticles = function(callback) {
    connection.query("select users.headportrait as headportrait ,users.name as name,articles.id as id,articles.title as title,articles.content as content,articles.time as createtime,articles.imglist as imglist from users,articles where users.id = articles.userid order by id desc", function(err, rows) {
        if(typeof callback == "function") {
            callback(err, rows)
        } else if (typeof callback != "undefined") {
            throw  new Error("callback is required to be a function");
        }
    })
};


//create table articles(id int primary key auto_increment not null,title varchar(50) not null, content varchar(500) not null,userid int not null,time char(20) not null,imglist varchar(200) not null);


//获取个人文章列表
exports.getUserArticles = function(item, callback) {
    connection.query("select users.name as name, users.headportrait as headportrait,articles.title as title, articles.id as id,articles.content as content,articles.time as createtime,articles.imglist as imglist from users,articles where users.name=? and articles.userid=users.id order by id desc", [item.name], function(err, rows) {
        if(typeof callback == "function") {
            callback(err, rows)
        } else if (typeof callback != "undefined") {
            throw  new Error("callback is required to be a function");
        }
    })
};


//提交文章
exports.postNewArticle = function(item, callback) {
    connection.query("select id from users where name=?", [item.name], function(err, rows) {
        if(err) {
            if(typeof callback == "function") {
                callback(err, rows)
            } else if (typeof callback != "undefined") {
                throw  new Error("callback is required to be a function");
            } 
        } else {
            connection.query("insert into articles(title,content,userid,time,imglist) values(?,?,?,?,?)", [item.title, item.content, rows[0].id, item.time, item.imglist], function(err) {
                if(typeof callback == "function") {
                    callback(err, rows)
                } else if (typeof callback != "undefined") {
                    throw  new Error("callback is required to be a function");
                }
            })
        }
        
    })
    
}

//根据session传回来的名称，获取用户信息
exports.getUseInfo = function(item, callback) {
    connection.query("select headportrait as headportrait,name as name,sex as sex,email as email from users where name=?", [item.name], function(err, rows) {
        if(typeof callback == "function") {
            callback(err, rows)
        } else if (typeof callback != "undefined") {
            throw  new Error("callback is required to be a function");
        }
    })
};