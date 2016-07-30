

module.exports = {
    path: "team",
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require("./component/team.js"))
        }, "./public/js/team/team")
    }
};