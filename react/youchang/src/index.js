import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from "react-router";
import App from "./App/component/app";

require("./resource/css/common.css");
require("./resource/css/loading.css");
require("./resource/css/preload.css");

const rootRouter = {
   
        path: "/",
        component: App,
        indexRoute: { onEnter: (nextState, replace) => replace('/order') },
    
        childRoutes: [
            require("./Order/index"),
            require("./Team/index"),
            {path: "/order", onEnter:(nextState, replace) => replace("/")}
        ]
    
    
    /*childRoutes: [
        { path: 'about', component: About },
        { path: 'inbox',
            component: Inbox,
            childRoutes: [
                { path: '/messages/:id', component: Message },
                { path: 'messages/:id',
                    onEnter: function (nextState, replaceState) {
                        replaceState(null, '/messages/' + nextState.params.id)
                    }
                }
            ]
        }
    ]*/
};



ReactDOM.render((
    <Router history={browserHistory} routes={rootRouter} />
), document.querySelector("#app"));