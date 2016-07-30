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
        console.log("app didmount")
    }

    componentWillUnmout() {
        console.log("app willunmont")
    }

    componentWillReceiveProps() {
        console.log("app WillReciveProps")
    }

    componnetWillUpdate() {
        console.log("app willupdate")
    }   
    
    componentDidUpdate() {
        console.log("app didupdate")
    }
    
    render() {
        return (
            <div>
                <Headbar />
                <div className="navbox">
                    <ul>
                        <li><Link to="/order" activeStyle={{color: "red"}}>order</Link></li>
                        <li><Link to="/team" activeStyle={{color: "red"}}>team</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
}

module.exports = App;