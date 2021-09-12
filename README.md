# 项目说明

[Listen-Player](http://testingecs.top/player/)是一个网页音乐播放器，它支持qq音乐和网易云音乐这两个音乐平台，并对其中的音乐进行播放，下载，收藏等功能。

## 技术选型

技术 | 说明
----|----
[Vue](https://cn.vuejs.org/) | 前端框架
[Vue-router](https://router.vuejs.org/zh/) | 路由框架
[Vuex](https://vuex.vuejs.org/zh/) | 全局状态管理框架
[Less](http://lesscss.org/) | CSS预处理语言
[Axios](https://github.com/axios/axios) | AJAX封装库

## 项目布局
```

├─ src
│  ├─ api -- 项目接口
│  │  ├─ http.js -- 定义并配置Axios
│  │  ├─ netease -- 网易云音乐的接口
│  │  └─ qq -- qq音乐的接口
│  ├─ App.vue -- Vue根文件
│  ├─ assets -- 静态资源文件
│  │  ├─ iconfont -- 字体图标
│  │  └─ img -- 静态图片
│  ├─ components -- vue组件
│  │  ├─ Layout -- 基本布局
│  │  │  ├─ Header -- 顶部布局组件
│  │  │  ├─ Nav -- 导航栏组件
│  │  │  ├─ Player -- 播放器组件
│  │  │  └─ Sidebar -- 侧边栏组件
│  │  ├─ LoadingImg -- 图片加载中组件
│  │  ├─ Modal -- 对话框组件
│  │  └─ Toast -- 消息组件
│  ├─ libs -- 依赖函数
│  ├─ router -- Router路由组件
│  ├─ store -- Vuex的状态管理
│  └─ views -- 基本页面
│     ├─ NewSong -- 最新歌曲(主页)
│     ├─ SearchResult -- 搜索页
│     └─ SongPage -- 音乐播放页

```

## 运行项目（nodejs 6.0+）

```
 npm i  或者运行  yarn(推荐)
  
 npm run serve

 npm run build （发布）
```

# 总结

## 个人感悟

1. vue本体因其轻量级的框架在中小型项目中表现亮眼。但我认为，如果加上vue-router和vuex的配合，vue在制作大型单页面表现依然出色。模板的存在使得vue对于刚学习框架的新人及其友好。并且由于Babel插件的存在，在vue也可以使用jsx这种更加灵活的渲染方式。

2. 项目由于立项较早，当时的我才刚学会使用框架，对于文件的分类和命名的规范还相当不熟悉，所以当我继续完成这个项目的时候，我花了大把时间放在对项目的注释和解耦上，几个流程走下来，我也对vue有了更深刻的认识。

3. 由于这是一个需要接口才能实现的项目，所以我对Axios和跨域也有了更深刻的理解，我知道如何使用webpack的代理能力来完成线下的编程，我也知道如何使用axios的拦截器对全局的网络报文进行检验并抛错。

4. 该项目是一个第三方的音乐播放器，所以所有的接口都必须使用代理才能使用。并且破解对方的网络报文也不是一件简单的事，所以我通过网上的相关资料及项目知道了它们的加密流程和发送的报文。也就是说，没有网上的各位大神，单凭我的实力其实是很难破解所有的网络报文。
   
## 难点及解决

  该项目最大的难点其实是网易云音乐和qq音乐的报文破解，由于大型的网站的网络报文肯定不会明文直接发送，所以需要查看网页中js文件找出其加密的流程，于是我使用Fiddler的自动响应功能，替换网页中的js文件，使之可以打印出原始报文和加密中使用到的数据，网易云中加密中使用的数据是固定的字符串组合，于是我采用了[知乎大佬的方法](https://www.zhihu.com/question/36081767/answer/140287795)，直接选取了几个字符串进行使用。而qq音乐的情况比较复杂，因为qq音乐有许多域名，所以每一个对需要进行相应代理，并且发送的报文也比较复杂，所以我直接查看了一位大神写的[qq音乐的API](https://github.com/Rain120/qq-music-api)，成功破解了qq音乐的报文请求。

## 改进方案

1. qq音乐有部分歌曲无法播放，因为该音乐播放需要用户有VIP身份。因为需要在获取播放链接的时候才能进行判断是否该音乐需要VIP，所以在展示的时候未进行剔除，只是在播放的时候弹出错误框提醒用户。所以在下次编写的时候打算接入试听版的接口或者登入接口来解决这个问题。

2. 由于该项目创建之初并未使用UI框架，所以大部分的样式和功能都是我自己靠我自己的渣渣审美来写的，部分页面设计的并不好看。所以如果有机会，我想使用iview来重构一下展示样式，使其可以漂亮一些。

3. 由于项目创建的时候，vue3.0还是demo版本，所以当时并未使用vue3.0来写该项目。听网上的资料说vue3.0对ts的支持更加完善，所以等下次重写该项目的使用我打算使用vue3.0和ts来编写该项目。

# 部分截图
## 主页

<img src="https://github.com/TPJTA/Listen-Player/blob/master/screen/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90.jpg"/>

<img src="https://github.com/TPJTA/Listen-Player/blob/master/screen/qq%E9%9F%B3%E4%B9%90.jpg"/>

## 搜索页

<img src="https://github.com/TPJTA/Listen-Player/blob/master/screen/%E6%90%9C%E7%B4%A2.jpg"/>

## 播放页

<img src="https://github.com/TPJTA/Listen-Player/blob/master/screen/%E6%92%AD%E6%94%BE%E9%A1%B5.jpg"/>


