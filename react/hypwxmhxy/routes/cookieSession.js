var express = require("express");
var router = express.Router();
var session = require("express-session");
var sessionStore = require("express-mysql-session");

//用cookieParser通过signedCookie方式加密HYPWXMHXY为本地加密字符串
/*var cookieParser = require("cookie-parser");

router.use(cookieParser("HYPWXMHXY"));*/

router.use(session({
    /*genid: function(req) {

        //随机加密字符串,,这里可以选择自己的加密方式
        return "HYP1993WXM1991HXY2016" + Date.now() + "" + Math.sqrt(Math.random()) * Math.sqrt(Math.random());
    },*/
    secret: "HYP1993WXM1991HXY2016" + Date.now() + "" + Math.sqrt(Math.random()) * Math.sqrt(Math.random()),
    cookie: {
        //secure: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUnitialized: false,
    store: new sessionStore({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'hyp2wxm2hxy',
        database: 'HYPWXMHXY'
    })
}));

module.exports = router;