import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";

class App extends React.Component {
    
    constructor(props) {
        super(props)
    }

    
    render() {
        return (
            <div>
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

export default App;