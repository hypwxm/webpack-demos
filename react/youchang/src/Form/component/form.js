import React, {Component, PropTypes} from "react";
import {browserHistory} from "react-router"

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
            //sexValue: "sex is required",
            phoneValue: ""
        }
    }

    handleSub() {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("post", "/api/userInfo", true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
                if (xhr.response == "ok") {
                    var img=document.createElement("img");
                    img.src=xhr.response;
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
        xhr.send(formdata)
    };
    
    handleChange() {
        this.setState({
            nameValue: this.refs.name.value,
            //sexValue: this.refs.sex.value
            phoneValue: this.refs.phone.value,
        })
    }

    render() {
        return (
            <div className="useform">
                <form>
                    <p>name: <input type="text" placeholder="name is required" value={this.state.nameValue} ref="name" onChange={this.handleChange.bind(this)} /></p>
                    <p>headPortrait: <em className="headstyle"><input className="sendfilepic" onChange={setImagePreview} name="headPortrait" type="file" ref="headPortrait" /><span>choose picture</span></em></p>
                    <div id="pic_file"></div>
                    <p>phone: <input type="text" placeholder="write 11 number" value={this.state.phoneValue} ref="phone" onChange={this.handleChange.bind(this)} /></p>
                    <input className="sub" type="button" onClick={this.handleSub.bind(this)} value="submit"/>
                </form>
            </div>
        )
    }
}

/*Form.defaultProps = {
    nameValue: "name",
    sexValue: "sex"
}*/

module.exports = Form;