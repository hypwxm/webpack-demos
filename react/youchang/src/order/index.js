
module.exports = {
    path: "order",
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require("./component/order.js"))
        }, "./public/js/order/order")
    }
}

