import React from "react";
import {Link} from "react-router";


class OrderList extends React.Component {

    constructor(props) {
        //es6写法必须写这个，继承父级的所有属性和方法
        super(props);

        //es6写法在这里指定初始状态
        this.state = {
            orderlist: []
        }
    }


    componentWillMount() {
        /*var self = this;
         var xhr = new XMLHttpRequest();
         xhr.open("get", "/api/order", false);
         xhr.send();
         //xhr.onreadystatechange = function() {
         if(/^2\d{2}/.test(xhr.status)) {
         self.setState({
         orderlist: JSON.parse(xhr.response)
         })
         }
         //};*/

    }

    static myScroll() {
        scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight)
    }
    
    componentDidMount() {
        
        console.log("order didmount");
        
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/order", true);
        xhr.responseType = "text";
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
                self.setState({
                    orderlist: JSON.parse(xhr.response)
                });
                //isLoadingOrIsLoaded("", false, true);
                scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
                window.addEventListener("scroll", OrderList.myScroll)
            }
        };
        xhr.send();
    }

    componentWillUnmount() {
        console.log("order willunmount")
        window.removeEventListener("scroll", OrderList.myScroll)
    }
    
    render() {
        return (
            <ul id="orderlist">
                {
                    this.state.orderlist.map(function(ele) {
                        return (
                            <li key={ele.id}>
                                <Link to={"/order/detail/" + ele.id}>
                                    <div className="order_head" data-codenumber={ele.codenum}>
                                        <span className="dearname"><em>订单号 : {ele.codenum}</em></span>
                                        <span className="PaystatusText">{ele.status}</span>
                                    </div>
                                    <div>
                                        <div className="order_xq">
                                            <div className="order_pic" dangerouslySetInnerHTML={{__html: preloadbg(ele.surface, ele.id, "/public/images/img06.jpg")}}>
                                            </div>
                                            <p className="order_xj">
                                                <span className="order_cpm">{ele.name}</span>
                                            </p>
                                            <p className="order_jg">¥{ele.eachprice}<i>x{ele.num}</i></p>
                                        </div>
                                    </div>
                                    <div className="order_total">实付款：<i className="totalmuch">¥{ele.totalprice}</i></div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

module.exports = OrderList;