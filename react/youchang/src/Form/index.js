module.exports = {
    path: "user",
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require("./component/form"))
        }, "./public/js/user/user")
    }
}