webpackJsonp([1],{

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OrderList = function (_React$Component) {
	    _inherits(OrderList, _React$Component);

	    function OrderList(props) {
	        _classCallCheck(this, OrderList);

	        //es6写法在这里指定初始状态

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OrderList).call(this, props));
	        //es6写法必须写这个，继承父级的所有属性和方法


	        _this.state = {
	            orderlist: []
	        };
	        return _this;
	    }

	    _createClass(OrderList, [{
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            /*var self = this;
	             var xhr = new XMLHttpRequest();
	             xhr.open("get", "/api/order", false);
	             xhr.send();
	             //xhr.onreadystatechange = function() {
	             if(/^2\d{2}/.test(xhr.status)) {
	             self.setState({
	             orderlist: JSON.parse(xhr.response)
	             })
	             }
	             //};*/

	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {

	            console.log("order didmount");

	            var self = this;
	            var xhr = new XMLHttpRequest();
	            xhr.open("get", "/api/order", true);
	            xhr.responseType = "text";
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
	                    self.setState({
	                        orderlist: JSON.parse(xhr.response)
	                    });
	                    //isLoadingOrIsLoaded("", false, true);
	                    scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
	                    window.addEventListener("scroll", OrderList.myScroll);
	                }
	            };
	            xhr.send();
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            console.log("order willunmount");
	            window.removeEventListener("scroll", OrderList.myScroll);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "ul",
	                { id: "orderlist" },
	                this.state.orderlist.map(function (ele) {
	                    return _react2.default.createElement(
	                        "li",
	                        { key: ele.id },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: "/order/detail/" + ele.id },
	                            _react2.default.createElement(
	                                "div",
	                                { className: "order_head", "data-codenumber": ele.codenum },
	                                _react2.default.createElement(
	                                    "span",
	                                    { className: "dearname" },
	                                    _react2.default.createElement(
	                                        "em",
	                                        null,
	                                        "订单号 : ",
	                                        ele.codenum
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    "span",
	                                    { className: "PaystatusText" },
	                                    ele.status
	                                )
	                            ),
	                            _react2.default.createElement(
	                                "div",
	                                null,
	                                _react2.default.createElement(
	                                    "div",
	                                    { className: "order_xq" },
	                                    _react2.default.createElement("div", { className: "order_pic", dangerouslySetInnerHTML: { __html: preloadbg(ele.surface, ele.id, "/public/images/img06.jpg") } }),
	                                    _react2.default.createElement(
	                                        "p",
	                                        { className: "order_xj" },
	                                        _react2.default.createElement(
	                                            "span",
	                                            { className: "order_cpm" },
	                                            ele.name
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        "p",
	                                        { className: "order_jg" },
	                                        "¥",
	                                        ele.eachprice,
	                                        _react2.default.createElement(
	                                            "i",
	                                            null,
	                                            "x",
	                                            ele.num
	                                        )
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                "div",
	                                { className: "order_total" },
	                                "实付款：",
	                                _react2.default.createElement(
	                                    "i",
	                                    { className: "totalmuch" },
	                                    "¥",
	                                    ele.totalprice
	                                )
	                            )
	                        )
	                    );
	                })
	            );
	        }
	    }], [{
	        key: "myScroll",
	        value: function myScroll() {
	            scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
	        }
	    }]);

	    return OrderList;
	}(_react2.default.Component);

	module.exports = OrderList;

/***/ }

});