import React from "react";
import {Link} from "react-router";
import Headbar from "./Nav";




class App extends React.Component {
    
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log("app willmount")
    }

    componentDidMount() {
        
        isLoadingOrIsLoaded("", false, true);
        console.log("app didmount")
    }

    componentWillUnmout() {
        console.log("app willunmont");
    }

    componentWillReceiveProps() {
        isLoadingOrIsLoaded("", true, false);
        console.log("app WillReciveProps")
    }

    componnetWillUpdate() {
        console.log("app willupdate");
    }   
    
    componentDidUpdate() {
        console.log("app didupdate");
        imgScrollIndex = 0;
        scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
        setTimeout(function() {
            isLoadingOrIsLoaded("", false, true);
        }, 300)
        

       
        
    }
    
    render() {
        return (
            <div>
                <Headbar />
                {this.props.children}
            </div>
        )
    }
}

module.exports = App;