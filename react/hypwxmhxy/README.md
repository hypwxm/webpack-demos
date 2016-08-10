## 使用TLS
如果你的应用需要处理或传输敏感数据，请使用TLS来确保连接和信息的安全。这项技术会在数据被从客户端发出前加密它。尽管Ajax和POST请求中发出的数据看上去并不可见，但它们的网络环境仍可以被嗅探和进行中间人攻击。

你可能已经对SSL加密有所了解。TLS是进化版的SSL。换句话说，如果你正在使用SSL，请更新成使用TLS。大多数情况下，我们推荐使用Nginx来处理TLS。关于如何在Nginx（或其他服务器）上配置TLS，请参考推荐的服务器配置（Mozilla Wiki）。

另外，有一个可以很方便地取得TLS证书的工具是Let’s Encrypt。它是一个免费的，自动化的，开放的CA。由ISRG提供。

## 使用Helmet
Helmet通过适当地设置一些HTTP头，来帮助你的应用免受一些广为人知的web攻击。

Helmet其实就是九个设置与安全相关的HTTP头的中间件的集合：

csp 设置了Content-Security-Policy头来帮助抵挡跨站脚本攻击和其他跨站注入。
hidePoweredBy 移除了X-Powered-By头。
hpkp 添加了Public Key Pinning头来抵挡使用伪造证书的中间人攻击。
hsts 设置了Strict-Transport-Security头来强制使用安全连接。
ieNoOpen 为IE8+设置了X-Download-Options头。
noCache 设置了Cache-Control和Pragma头来禁止客户端缓存。
noSniff 设置了X-Content-Type-Options头来阻止浏览器进行MIME嗅探。
frameguard 设置了X-Frame-Options头来提供对点击劫持的保护。
xssFilter 设置了X-XSS-Protection头来启用大多数现代浏览器中的XSS过滤器。
安装Helmet的过程和其他模块没有什么两样：

#### $ npm install --save helmet
然后像其他中间件一样使用它：

```
var helmet = require('helmet');
app.use(helmet());
```
至少至少，你需要禁用X-Powered-By头
如果你不想使用Helmet，那么你至少需要禁用X-Powered-By头。攻击者可以利用这个头（默认被启用）来了解到你的应用是一个Express应用，然后进行有针对性的攻击。

所以，最佳实践是使用app.disable()关闭这个头：

app.disable('x-powered-by');
如果你使用了Helmet，则它会帮你完成这件事。

## 安全地使用cookies
确保不要让cookies暴露了你应用的信息。不要使用默认的session cookie名，并且要配置好cookie的安全选项。

Express中有两个主要的cookie session中间件模块：

express-session 代替了Express 3.x中内建的express.session中间件。
cookie-session 代替了Express 3.x中内建的express.cookieSession中间件。
这两个模块的主要区别是它们存储cookie session的方式。express-session在服务端存储session信息。它只在cookie中存储session ID，而不是session数据。默认情况下，它使用内存存储，在生产环境下，你需要自己配置可伸缩的session-store。以下是一个session-store的列表。

相反地，cookie-session中间件则把数据都存储在了cookie中：它将整个session序列化至cookie，而不仅仅是一个session ID。请仅仅在session数据很小且被早早得加密过时才使用它。浏览器支持的每个cookie的大小通常最多是4093B。所以请确保不要超过它。另外，cookie中的数据时可以被客户端看见的。所以如果你需要对其中的数据进行保密，使用express-session将是一个更好的选择。

不要使用默认的session cookie名
这点和禁用X-Powered-By头是类似的。潜在的攻击者可以通过它们进行针对性的攻击。

所以请使用比较普遍的cookie名；如：
```
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
  secret : 's3Cur3',
  name : 'sessionId',
  })
);
```
#### 配置cookie的安全选项
通过配置以下的cookie选项来加强安全性：

secure – 确保浏览器使用HTTPS发送cookie。
httpOnly – 确保cookie仅通过HTTP(S)被发送，而不是客户端的JavaScript。用来帮助抵御跨站脚本攻击。
domain – 指定cookie的域。使用它来与将要发送cookie的URL作比较。只有比较结果通过，才会继续检查下面的path属性。
path – 指定cookie的路径。使用它来比较请求的路径。如果比较结果通过，才会发送cookie。
expires – 为持久化的cookie设置过期时间。
以下是一个使用cookie-session中间件的例子：
```
var session = require('cookie-session');
var express = require('express');
var app = express();
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
          httpOnly: true,
          domain: 'example.com',
          path: 'foo/bar',
          expires: expiryDate
          }
  })
);
```
确保你的依赖库都是安全的
使用npm来管理你应用的依赖是强大而方便的。但是你的依赖库如果有安全隐患，这也会影响到你的应用。你的应用只会和其最虚弱的那部分一样的健壮。

幸运的是，有两个工具可以帮助你检查第三方库的安全性：nsp和requireSafe。这两个工具大致上干了相同的事情，所以选其一使用便好。

nsp是一个用来检查你应用的依赖库与它的Node Security Project数据库中的存储的漏洞相对比的命令行工具，你可以通过以下方式安装它：

```$ npm i nsp -g```
然后使用以下命令来进行检查你应用的npm-shrinkwrap.json和package.json：

```$ cd your-app```
```$ nap check```
使用requireSafe的过程也是类似的：

```$ npm install -g requiresafe```
```$ cd your-app```
```$ require safe check```
其他值得考虑的事
以下是一些从Node.js安全清单中提出安全建议。详细的建议请自行参阅它：

对应用实现一个访问频率限制机制来抵御暴力破解。你可以使用如express-limiter这样的中间件。
使用csurf中间件来抵挡跨站请求伪造（CSRF）。
总是检查和过滤用户的输入，来防止XSS和命令注入。
通过使用参数化的查询（parameterized queries）或预处理语句（prepared statements），来抵挡SQL注入攻击。
使用开源的sqlmap工具来侦测你的应用中可能被SQL注入的地方。
使用namp和sslyze来测试你的SSL配置。
使用safe-regex来确保你的正则表达式的健壮性。
避免其他已知的漏洞
除了Node Security Project代替你检查出的Express或其他模块的漏洞外。Express应用也是一个web应用，所以你也要关注其他相关的已知的web漏洞，并且避免它们。

## 最后
原文链接：https://strongloop.com/strongblog/best-practices-for-express-in-production-part-one-security/