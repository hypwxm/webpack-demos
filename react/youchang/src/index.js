import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from "react-router";
import Order from "./order";
import Team from "./team";
import App from "./app";

require("../css/common.css");
require("../css/loading.css");
require("../css/preload.css");

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Order} />
            <IndexRedirect to="order" />
            <Route path="order" component={Order} />
            <Route path="team" component={Team} />
        </Route>

    </Router>
), document.querySelector("#app"));