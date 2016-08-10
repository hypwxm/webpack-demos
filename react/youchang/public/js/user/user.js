webpackJsonp([3],{

/***/ 251:
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

	var Form = function (_React$Component) {
	    _inherits(Form, _React$Component);

	    function Form(props) {
	        _classCallCheck(this, Form);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));

	        _this.state = {
	            nameValue: "",
	            //sexValue: "sex is required",
	            phoneValue: ""
	        };
	        return _this;
	    }

	    _createClass(Form, [{
	        key: "handleSub",
	        value: function handleSub() {
	            var self = this;
	            var xhr = new XMLHttpRequest();
	            xhr.open("post", "/api/userInfo", true);
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
	                    if (xhr.response == "ok") {
	                        var img = document.createElement("img");
	                        img.src = xhr.response;
	                        document.body.appendChild(img);
	                        //browserHistory.push(`user/${self.refs.name.value}`)
	                    }
	                }
	            };

	            var params = {
	                name: this.refs.name.value,
	                phone: this.refs.phone.value,
	                headimg: this.refs.headPortrait.files
	            };

	            var formdata = new FormData();
	            formdata.append("name", this.refs.name.value);
	            formdata.append("phone", this.refs.phone.value);
	            var headimg = this.refs.headPortrait;
	            formdata.append("headimg", headimg.files[0]);

	            //xhr.setRequestHeader("Content-Type", "application/json,charset=utf-8");
	            xhr.send(formdata);
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange() {
	            this.setState({
	                nameValue: this.refs.name.value,
	                //sexValue: this.refs.sex.value
	                phoneValue: this.refs.phone.value
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "div",
	                { className: "useform" },
	                _react2.default.createElement(
	                    "form",
	                    null,
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "name: ",
	                        _react2.default.createElement("input", { type: "text", placeholder: "name is required", value: this.state.nameValue, ref: "name", onChange: this.handleChange.bind(this) })
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "headPortrait: ",
	                        _react2.default.createElement(
	                            "em",
	                            { className: "headstyle" },
	                            _react2.default.createElement("input", { className: "sendfilepic", onChange: setImagePreview, name: "headPortrait", type: "file", ref: "headPortrait" }),
	                            _react2.default.createElement(
	                                "span",
	                                null,
	                                "choose picture"
	                            )
	                        )
	                    ),
	                    _react2.default.createElement("div", { id: "pic_file" }),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "phone: ",
	                        _react2.default.createElement("input", { type: "text", placeholder: "write 11 number", value: this.state.phoneValue, ref: "phone", onChange: this.handleChange.bind(this) })
	                    ),
	                    _react2.default.createElement("input", { className: "sub", type: "button", onClick: this.handleSub.bind(this), value: "submit" })
	                )
	            );
	        }
	    }]);

	    return Form;
	}(_react2.default.Component);

	/*Form.defaultProps = {
	    nameValue: "name",
	    sexValue: "sex"
	}*/

	module.exports = Form;

/***/ }

});