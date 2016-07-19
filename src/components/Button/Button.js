import React, {Component} from "react";

class Button extends Component {

    handleClick() {
        alert("why clicked me?")
    }

    render(){
        const style = require("./Button.css");
        return (
            <h1 className="my-button" onClick={this.handleClick.bind(this)}>click me</h1>
        )
    }
}

export default Button;