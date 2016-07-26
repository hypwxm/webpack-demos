import React from "react";
import {Link} from "react-router";
export default React.createClass({
    render() {
        return (
            <div>
                <ul>

                    {/*匹配根目录，要加上onlyActiveOnIndex
                        path支持通配符写法
                     （1）:paramName
                     :paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
                     （2）()
                     ()表示URL的这个部分是可选的。
                     （3）*
                     *匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
                     （4） **
                     ** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

                    */}
                    <li><Link to="/" activeStyle={{color:"red"}} onlyActiveOnIndex={true}>index</Link></li>
                    <li><Link to="/about" activeStyle={{color:"red"}}>about</Link></li>
                    <li><Link to="/repos" activeStyle={{color:"red"}}>repos</Link></li>
                </ul>
                {this.props.children}
            </div>
            
        )
    }
})