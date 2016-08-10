var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "hyp2wxm2hxy",
    database: "yc",
    port: 3306
});


connection.connect();

//要执行的sql语句
var sql = 'select * from user';


/*
* err 错误对象
* row 返回的记录
* fields 返回的字段
* */
connection.query(sql, function(err, rows, fields) {
    if(err) {
        console.log(err)
    } else {
        /*console.log(rows);
        console.log(fields);*/
        rows.forEach(function(row) {
            console.log(row.name)
        })
    }
});

var sql2 = 'insert into user(name, age) values ("haha", 28)';
connection.query(sql2, function(err, result) {
    if(err) {
        console.log(err)
    } else {
        console.log(result);
    }
});

var sql3 = 'select * from user where name="haha"';
connection.query(sql3, function(err, result) {
    if(err) {
        console.log(err);
    } else {
        console.log(result)
    }

    //停止sql服务
    connection.destroy()
});




