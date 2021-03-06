import React from "react";
import {Link} from "react-router";

class Nav extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navShow: false
        }
    }
    
    navClick() {
        this.setState({
            navShow: !this.state.navShow
        });
    }
    
    componentDidUpdate() {
        this.refs.navlist.style.display = this.state.navShow == true ? "block" : "none";
    }
    
    render() {
        return (
            <div className="headbar">
                <div className="headnav" onClick={this.navClick.bind(this)}></div>
                <div className="navlist" ref="navlist">
                    <Link to="/index" activeStyle={{color: "red"}} className="eachnav">Index</Link>
                    <Link to="/case" activeStyle={{color: "red"}} className="eachnav">Case</Link>
                    <Link to="/community" activeStyle={{color: "red"}} className="eachnav">Community</Link>
                    <Link to="/team" activeStyle={{color: "red"}} className="eachnav">Team</Link>
                    <Link to="/order" activeStyle={{color: "red"}} className="eachnav">Order</Link>
                    <Link to="/user" activeStyle={{color: "red"}} className="eachnav">User</Link>
                </div>
            </div>
        )
    }
}

export default Nav;