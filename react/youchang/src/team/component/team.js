import React from "react";


class TeamList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamlist: []
        }
    }

    static myScroll() {
        scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight)
    }

    componentDidMount() {
        
        console.log("team didmount");
        
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/team", true);
        xhr.responseType = "text";
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
                self.setState({
                    teamlist: JSON.parse(xhr.response)
                });
                isLoadingOrIsLoaded("", false, true);
                scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
                window.addEventListener("scroll", TeamList.myScroll)
            }
        };
        xhr.send();

    }

    componentWillUnmount() {
        console.log("team willunmount")
        window.removeEventListener("scroll", TeamList.myScroll)
    }

    render() {

        return (
            <ul className="teamboss">
                {
                    this.state.teamlist.map(function(ele) {
                        return (
                            <li key={ele.id} className="teamli">
                                <div className="memberhead" dangerouslySetInnerHTML={{__html: preloadbg(ele.headimg, ele.id, "/public/images/img05.jpg")}}>

                                </div>
                                <div className="membername"><span>{ele.name}</span><span className="time">{ele.time}</span></div>
                                <div data-phone={ele.phone} href={"tel:" + ele.phone} className="memberphone">电话联系</div>
                            </li>
                        )
                    })
                }
            </ul>

        )

    }
}

module.exports = TeamList;