

export default {
    path: "team",
    getComponent(nextState, cb) {
        if (window.location.pathname === '/team') {
            require.ensure(["./component/team.js"], (require) => {
                cb(null, require("./component/team.js"))
            })
        }
    }
};