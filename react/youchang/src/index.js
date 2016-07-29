import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect} from "react-router";
import Order from "./order/index.js";
import Team from "./team/index.js";
import App from "./app";

require("../css/common.css");
require("../css/loading.css");
require("../css/preload.css");

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="order" />
            <Route path="order" />
            <Route path="team" />
        </Route>

    </Router>
), document.querySelector("#app"));