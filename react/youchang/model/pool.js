/*
 * 连接池是一种创建产品管理连接的而技术
 * 1：减少连接时间
 * 2：简化编程模型
 * 3：资源受控制
 * */

var mysql = require("mysql");

var pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "hyp2wxm2hxy",
    database: "yc",
    port: 3306
});

exports.getteam = function(callback) {
    pool.query("select * from team", function(err, rows) {
        if(err) {
            console.log(err);
        } else {
            callback(rows);
            console.log(rows)
        }
    }); 
};
exports.newteamuser = function(callback, item) {
    pool.query("insert into team (headimg,name,time,phone) values (?,?,?,?)", [item.headimg, item.name, item.time, item.phone], function(err, rows) {
        if(err) {
            console.log(err);
        } else {
            if(typeof callback == "function") {
                callback(rows);
            }
            console.log(rows)
        }
    });
};
