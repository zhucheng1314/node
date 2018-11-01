## node day03 ##

### npm指令 ###

**安装全局包**

`npm install 包名 -g`

**卸载全局包**

`npm uninstall 包名 -g`

**安装本地包(将包装在项目的node_modules,其他人无法使用仅供当前项目使用)**

`npm install 包名`

**卸载本地包**

`npm uninstall 包名`

**初始化npm项目目录**

`npm init` 可以自定义配置来初始化

`npm init -y` 使用默认配置

`npm install`的常用的参数:

	--save  :  会将依赖包添加到当前项目的package.json的dependencies节点下
	--save-dev  :  会将依赖包添加到当前项目的package.json的devDependencies节点下
	--production  :  只安装dependencies节点下的依赖包

dependencies节点: 记录的是当前项目任何阶段所依赖的包

devDependencies节点: 记录的是当前项目开发阶段所依赖的包, 项目上线后不需要依赖这些包

注意: 在NPM5.x以后, --save都可以省略, 直接npm install会默认将包加入dependencies节点下

`--save`简写为`-S`

`--save-dev`简写为`-D`

`npm install` 简写为 `npm i`

package.json文件:

所有npm项目都需要有该文件, 在项目的根目录下, 该文件中有三个必须的节点:

1. name
2. version
3. main

如果当前项目依赖了其他的包, 则会把依赖的包名和版本号记录在dependencies节点下

还会把具体的版本信息以及下载地址记录在 package-lock.json文件, 为了提高后期的下载速度

### 使用cnpm提高下载速度 ###

1. 安装cnpm包到全局

		npm install cnpm -g

2. 使用cnpm  用法同npm, 只需要把指令换成cnpm即可

		cnpm install 包名

B/S : Browser Server
C/S : Client Server

### http模块 ###

创建一个最基本的web服务器

	// 1. 引入http模块
	const http = require('http')

	// 2. 创建http服务器
	const httpServer = http.createServer();

	// 3. 绑定request事件
	httpServer.on('request', (req, res) => {
		// 处理业务逻辑
		res.end('hello itheima')
	})

	// 4. 开启服务器 listen
	httpServer.listen('3000', '127.0.0.1', () => {
		console.log('开启服务器成功!请访问: http://127.0.0.1:3000') 
	})

解决中文乱码问题, 在响应之前添加响应头信息:

	res.writeHeader(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	})

获取客户端请求的URL:

	req.url


MIME类型, 在网络传输中起到了标识的作用, 根据后缀名来划分的类型:

	text/plain   纯文本  .txt
	text/html	 HTML数据  .html
	image/jpeg	 jpg/jpeg图片  .jpg/.jpeg
	image/gif	 gif图片  .gif

### nodemon工具的介绍 ###

因为每次修改服务器的代码后都需要重新运行服务器才可以让最新的代码生效, 所以有个小机灵鬼创造了一个小工具 --> nodemon

该工具的作用非常简单, 当服务器代码发生改变时自动重启服务器

安装:

	npm install nodemon -g

### express基本用法 ###

1. 安装express包

		npm install express

2. 代码中引入express包

		const express = require('express')

3. 调用express函数创建服务器

		const app = express()

4. 监听用户的请求

		app.get('/', (req, res) => {
			// 原生http模块的方法返回数据
			// res.end()
			// express封装的方法, 也可以向客户端返回数据并且解决了乱码的问题
			res.send()
		})

5. 开启服务器

		app.listen(3000, () => {
			console.log('服务器启动成功, 请访问:http://127.0.0.1:3000') 
		})