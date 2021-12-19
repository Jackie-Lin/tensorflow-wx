# tensorflow-wx
![image](https://github.com/Jackie-Lin/test/blob/master/gh_f2285e36f1c5_258.jpg)
### 1. 在tensorflow-wx 目录内 npm install 安装依赖
- 关于依赖的安装，不会的同学可以百度下 node.js 的安装，基本都是傻瓜式安装，直接下一步下一步就行了。
- 下载完依赖后，用命令行进去到 tensorflow-wx 目录内用 npm install 命令就可以完成依赖的安装。
- 不会的同学，百度下基本就都能解决的
### 2. 在app.json 中修改一下部分
"plugins": {
    "tfjsPlugin": {
      "version": "0.1.0",
      "provider": "wx6afed118d9e81df9" //将这个修改成自己的申请的插件得到的 ID
   }
}
