# Nodejs代码阅读成果
### 一. 项目介绍
     名称：combined-stream
     功能：将一个一个的流连接起来
     项目地址：https://github.com/felixge/node-combined-stream
     项目中的各个文件介绍：
   Readme.md
     项目的功能、相关API、版权·的介绍：
1. .gitginore<br/>
    用于排除不必要的项目文件或敏感文件
2. License<br/>
      文件统一用的MIT共享协议
3. Package.json<br/>
     存储工程的元数据，描述项目的依赖项，类似配置文件
4. Combined-stream.js<br/>
      项目的主文件，模块的安装
5. .travis.yml<br/>
    Travis-ci持续集成工具配置文件
6. Test文件夹<br/>
    Run.js 
       用于mocha自动化测试
7. Common.js<br/>
     用于创建tmp文件夹，及相关异常处理
8. Integeration文件夹<br/>
    存放被测试相关的文件
9. Node_modules<br/>
     项目用到的相关模块
### 二.运行截图
  <img src="img/img.png">
  
  <br/>
### 三.问题清单
1. 项目类型？<br/>
     第三方库
2. 项目入口文件<br/>
    Combined-stream.js文件
3. 项目的依赖项有哪些，各个依赖项都做神魔的？有什么功能？<br/>
    Util 用于继承其他模块
    Stream combined-stream 继承了stream‘的特性
4. 代码中是否有bug<br/>
    无
5. 数据类型 <br/>
    String 、number 、function  、 boolean’ <br/>
6. 项目是如何划分模块、划分函数，划分的好吗？ <br/>
   项目的函数从基本的内容操作到结构的操作，项目中先先写了 combined-stream 的创建 、 连接 、暂停状态与流动状态的转换 、错误异常的处理 最     后写了有关combined-stream内存数据的处理。
7. 代码的可读性如何？结构清晰吗？ <br/>
    代码的可读性很高，结构清晰。缩进合理，语句的末尾以 ‘ ；’ 结束
.

