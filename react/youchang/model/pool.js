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
    database: "game",
    port: 3306
});
var sql4 = "select * from user";
pool.query(sql4, function(err, rows) {
    if(err) {
        console.lo(err);
    } else {
        console.log(rows)
    }
});