# muk
<h2>vue 仿写的muk网站，由18个组件、15个页面组成的 单页面应用</h2>

> A Vue.js project

前端使用vue，后端使用node

在线访问地址：http://2444f679p9.wicp.vip:37469/muk/


  本系统是基于B/S架构开发的，采用前后端分离的项目结构，该系统前端包括‘功能页面’和‘展示页面’，功能页面的操作可修改数据库，展示页面只从数据库获取信息
功能页面包括：用户登陆、注册、商品搜索、购物车、提交订单、支付、用户信息、查看订单、收藏列表、收货地址
展示页面包括：首页、关于我们、新闻、新闻详情、产品中心、购物中心、商品详情
前端介绍：
1.	该系统前端使用Vue编写的SPA，加载后切换页面不需要再向前端服务器发起页面请求加载迅速，使用了Ajax方式提交异步请求，用户体验良好
2.	该系统前端使用bootstrap，能自适应浏览器的宽度调整页面布局，无论是在pc、平板、手机都有良好的显示效果
3.	除了header、footer、about等组件外网站的显示数据皆跨域从后端服务器动态加载。
4.	登陆页面通过写入cookie保存用户名和密码，cookie才用了DES加密保存在浏览器中，用与下次自动填写登陆信息
后端介绍：
1.	使用了具有更高处理性能的node.js作为后端服务器
2.	使用了express 框架处理http请求，封装路由
3.	使用中间件“express-session”保持登陆，用户退出网站后下次打开网页浏览器直接与后端服务器发送session 登陆，用户体验良好
4.	用户订单查询，涉及到了mysql 订单表、地址表、出售商品表、商品详情表，通过订单表和地址表联合查询、出售商品表和商品详情表联合查询，获得的两份表进行循环匹配，最后获得了一份带有四个表的信息通过json格式返还前端。

<b>亮点</b>：js实现可推拽的广告轮播、响应式应布局、单页面应用、前后端分离结构
使用技术：vue、vue-router、Ajax、bootstrap、node、express、JSON、mysql
软件环境：WebStorm开发、数据库MYSQL、前端服务器XAMPP中的Apache、后端服务器Node.js



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
