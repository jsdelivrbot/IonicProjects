# 特易行 &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm)

> 出差竟是如此省心

差旅管理的 App。

## 安装与运行

Clone 后在项目根目录运行如下命令。如果已经安装了`ionic`和`cordova`则不必运行第一条命令。

```shell
npm install -g ionic cordova
npm i
ionic serve
```

系统会运行 Web 版的应用并打开浏览器定向到 8100 端口。

如果要部署导安卓和 iPhone 手机，请参考[ionic 部署文件](https://ionicframework.com/docs/intro/deploying/)。

To sovle CORS error in web testing, close all chrome pages and run `open -a Google\ Chrome --args --disable-web-security --user-data-dir`.

## 开发

采用 Ionic 3 开发。

## 测试

在项目根目录运行 `npm run test` 运行单元测试；`npm run e2e`运行端到端测试。

## 外部 Api

基于服务端的 API

## Database

采用本地数据库存储用户信息。
