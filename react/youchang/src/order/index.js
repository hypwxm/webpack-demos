
export default {
    path: "order",
    getComponent(nextState, cb) {
        if (window.location.pathname === '/order') {
            require.ensure(["./component/order.js"], (require) => {
                cb(null, require("./component/order.js"))
            })
        }
    }
}

