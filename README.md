### 音乐播放器管理端
#### 使用说明
- 将所有文件克隆到本地
- 进入文件所在文件夹内启动终端
- 执行 `http-server -c-1` 开启本地模拟服务器
- 另开一终端并执行 `node server.js 8888` 启动自定义后端服务器 
- 访问网址 http://127.0.0.1:8080/src/admin.html 即可预览效果

#### 用到的技术栈
- mvc mvvm 以及发布订阅思想
- js jquery html5 css3 es6
- 七牛云 LeanCloud

功能：

后台有上传歌曲、编辑歌曲功能。
后台支持歌单创建。
前端页面灵感来自网易云音乐。
可在线听歌、查看歌词。且配有播放动画。
用到的技术：
后台：LeanCloud 数据存储 API、七牛上传接口
前端：原生 JS、jQuery、CSS 3、iconfont、SVG、AJAX、MVC