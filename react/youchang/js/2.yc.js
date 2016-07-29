webpackJsonp([2],{

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TeamList = function (_React$Component) {
	    _inherits(TeamList, _React$Component);

	    function TeamList(props) {
	        _classCallCheck(this, TeamList);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TeamList).call(this, props));

	        _this.state = {
	            teamlist: []
	        };
	        return _this;
	    }

	    _createClass(TeamList, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {

	            var self = this;
	            var xhr = new XMLHttpRequest();
	            xhr.open("get", "/api/team", true);

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
	                    self.setState({
	                        teamlist: JSON.parse(xhr.response)
	                    });
	                    isLoadingOrIsLoaded("", false, true);
	                    scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
	                    window.addEventListener("scroll", TeamList.myScroll);
	                }
	            };
	            xhr.send();
	        }
	    }, {
	        key: "render",
	        value: function render() {

	            return _react2.default.createElement(
	                "ul",
	                { className: "teamboss" },
	                this.state.teamlist.map(function (ele) {
	                    return _react2.default.createElement(
	                        "li",
	                        { key: ele.id, className: "teamli" },
	                        _react2.default.createElement("div", { className: "memberhead", dangerouslySetInnerHTML: { __html: preloadbg(ele.headimg, ele.id, "./images/img05.jpg") } }),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "membername" },
	                            _react2.default.createElement(
	                                "span",
	                                null,
	                                ele.name
	                            ),
	                            _react2.default.createElement(
	                                "span",
	                                { className: "time" },
	                                ele.time
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { "data-phone": ele.phone, href: "tel:" + ele.phone, className: "memberphone" },
	                            "电话联系"
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
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            window.removeEventListener("scroll", TeamList.myScroll);
	        }
	    }]);

	    return TeamList;
	}(_react2.default.Component);

	exports.default = TeamList;

/***/ }

});