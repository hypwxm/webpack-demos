import React from "react";
import {render} from "react-dom";
import { Router, Route, browserHistory, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import App from './app';
import About from './about';
import Repos from './repos';

render((
    
    <Router history={browserHistory}>
        
        {/*

         browserHistory和hashHistory不一样，使用browserHistory的时候，浏览器中导航栏的URL就不会用hashHistory出现_k的hash键值对。实际项目中也一般用browserHistory.
        */}
        
        <Route path="/" component={App}>
            <IndexRoute component={About} />

            {/*
                   指定重定向当访问/repos的时候跳转到/about
            */}
            <Redirect from="/repos" to="/about" />

            {/*
             IndexRedirect组件用于访问根路由的时候，将用户重定向到某个子组件。
            */}
            <IndexRedirect to="/repos" />
            {/*
                   因为我把repos重定向到about，所以index重定向到repos，也会重定向到about

            */}

            <Route path="/repos" component={Repos} />
            <Route path="/about" component={About} />
            <Route path="/:about" component={About} />
        </Route>
    </Router>
), document.querySelector("#app"));
