# wm.program

**前排致谢@[老A](https://github.com/wxiaoqi) 、@[潘大](https://github.com/PanJiaChen)**

基于Spring Cloud的开发平台，具有统一授权、认证后台管理系统。核心技术采用Eureka、Fegin、Ribbon、Zuul、Hystrix、JWT Token、Mybatis等主要框架和中间件。

[配套前端代码git](https://github.com/ycg000344/vueAdmin-template.git)

[日常知识备忘录](https://ycg000344.github.io/)

[线上地址(腾讯云的廉价小水管,望手下留情)](http://111.230.220.114/)
## 模块说明

![引用老A](https://camo.githubusercontent.com/fa090fc7a58baacfca946c1c0524c11fbf9b0e02/687474703a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f353730303333352d386436396634653838356134656338352e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

## 目前项目中的依赖

对所有引用的dependency进行版本和使用的插件进行控制。<br>
对目前的dependency有：<b1>
1. `Spring Boot` 2.0.1.RELEASE
2. `spring cloud` Finchley.RELEASE
3. `druid` 数据源 1.1.10
4. `hutool` 工具类 4.0.10
5. `tk.mybatis` 通用Mapper 2.0.2
6. `pagehelper` 分页插件 1.2.5
7. `jsonwebtoken` jjwt 0.9.0
8. `servlet` 4.0.1
9. `spring-web`  5.0.5.RELEASE
10. `spring-boot-admin` 2.0.1-SNAPSHOT
11. `mysql-connector-java` 8.0.11
12. `lombok` 1.16.18
13. `swagger` 2.8.0

目前使用的插件：<br>
1. `spring-boot-maven-plugin` <br>
    用于Spring Boot Application的package
2. `maven-jar-plugin`<br>
    non-execable.jar的package
3. `mybatis-generator-maven-plugin`<br>
    自动化生成 POJO、Mapper的插件
4. `maven-antrun-plugin`<br>
    将package的jar包copy到指定位置

## Modules

### helloworld

关于学习一些新的知识所进行的代码记录集

#### spring-boot-admin

采用Spring Boot Admin作为监控，监控注册在eureka上面各个应用服务的进程状态。

![springbootadmin](https://github.com/codecentric/spring-boot-admin/raw/master/images/screenshot.png)

### common

#### base

公共利用的基础包,其中包含的有：<b1>
1. 公用常量类
2. 自定义基础异常类
3. 全局异常处理类
4. 自定义自定义基础response对象

#### business

业务模块基础包,其中包含的有：<b1>
1. base-service
2. base-controller

#### auth

鉴权服务通用工具包，包含生成RSA公钥、私钥文件，生成Token、解析Token等功能

#### email

邮件发送功能提供的API

封装了*对象基类*，即*收件人*、*主题*、*抄送人*

##### email-templates-bean

目前已经实现的邮件信息字段bean：

1. `EurekaInstanceCanceledEventEmailinfo` EurekaInstanceCanceledEvent 服务挂掉发送邮件的信息

## Components

### email-send
使用`freemarker`模板进行邮件的发送.<br>
从消息队列 `rabbitmq` 获取消息进行消费，即发送邮件，采用**异步**的方式进行邮件的发送。
>Tips: <a href="https://si.gnatu.re/?utm_source=next.36kr.com" target="_blank">在线制作签名</a>

## Server

### Eureka Server

服务注册中心，提供服务的注册、监听，当检测到已经注册的服务出现宕机的情况时自动向消息队列中间件 `rabbitmq` 采取**异步**的方式发送宕机的服务实例的信息，如服务名称、服务端口号等。

### Zuul

使用Zuul实现gateway路由网关功能<br>
在作为路由转发请求前对请求头中的token进行校验，如果token合法则继续向下进行请求否则抛出异常。

### SBA server

采用`spring boot admin server` 作为应用的监控中心<br>

## Application

### auth-server

鉴权服务应用

### basic-manager

基础管理应用



