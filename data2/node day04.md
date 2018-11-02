## node day04 ##

### express常用方法 ###

	const express = require('express')

	const app = express()

	app.get('/', (req, res) => {
		// res.send()
		// res.sendFile()
	})

	app.listen(3000, () => {
		console.log('服务器开启成功!')
	})

`res.send`: 可以用来向客户端响应数据, 支持的数据类型有以下三种:

1. 字符串 ''   返回客户端普通字符串
2. 对象或数组 {} []  返回客户端JSON字符串
3. 二进制 Buffer   返回客户端二进制提示下载

`res.sendFile`: 可以用来向客户端响应文件, 直接可以将HTML页面返回

参数1: 路径, 如果只传入一个参数, 该路径必须是绝对路径

参数2: 如果第一个参数传入的是相对路径, 第二个参数必须指定相对路径相对于哪个绝对路径, root

	// 只用一个参数的方式
	res.sendFile(path.join(__dirname, './views/index.html'))

	// 用两个参数的方式
	res.sendFile('./views/index.html', {
		root: __dirname
	})

### 注册静态资源托管的中间件 ###

	// 托管./views目录下的静态资源
	app.use(express.static('./views'))


	// 参数1: 虚拟目录, 当传入该参数之后客户端请求./views目录下的静态资源时需要加上前缀pages
	app.use('pages', express.static('./views'))

### ejs简介 ###

ejs是服务端比较常用的一个模板引擎, 和artTemplate类似

使用ejs的步骤:

1. 在项目中安装ejs

	`npm install ejs`

2. 在express中配置模板引擎

	`app.set('view engine', 'ejs')`

3. 配置模板页面所在的路径

	`app.set('views', './ejs_pages')`

4. 当用户请求数据时, 做出响应之前可以进行模板引擎的渲染

	`res.render('index.ejs', {})`

### 在express中自定义模板引擎 ###

用art-template举例

1. 装两个包art-template express-art-template

2. 自定义模板引擎

	`app.engine('html', require('express-art-template'))`

3. 在express中配置模板引擎

	`app.set('view engine', 'html')`

4. 配置模板页面所在的路径

	`app.set('views', './art_pages')`

5. 当用户请求数据时, 做出响应之前可以进行模板引擎的渲染

	`res.render('index.html', {})`

### 封装express的路由模块 ###

路由: 前端向后台请求某个资源, 后台收到请求后将作出对应的处理, 例如:

	前端向URL发送请求:　/getUsers

	后台根据 /getUsers 接口地址作出对应的响应就被称为路由

主程序代码:

	const express = require('express')
	const app = express()
	
	// 1. 导入路由对象
	const router = require('./09.router.js')
	// 2. 调用 app.use 方法，安装路由模块
	app.use(router)
	
	app.listen(3000, () => {
	  console.log('server running at http://127.0.0.1:3000')
	})

路由模块:

1. 引入express框架

	`const express = require('express')`

2. 创建路由对象

	`const router = express.Router()`

3. 挂载路由规则
 
		router.get('/movie', (req, res) => {
			res.sendFile('./views/movie.html', , { root: __dirname })
		})


4. 导出路由对象供外界使用

	`module.exports = router`

### 中间件 ###

定义：中间件就是一个处理函数；只不过这个函数比较特殊，包含了三个参数，分别是 req，res，next

注意：中间件方法中的三个参数：

- req：请求对象；
- res：响应对象；
- next：next()可以被调用，表示调用下一个中间件方法；

### Express 框架中对中间件的5种分类 ###

1. 应用级别的中间件： 挂载到 app 上的中间件 app.get('URL地址', （req, res, next）=> {})；
2. 路由级别的中间件： 挂载到 router 对象上的中间件  router.get('url地址', (req, res, next)=>{})
3. 错误级别的中间件： 回调函数中，有四个参数 app.use((err, req, res, next)=>{})
4. 唯一内置的中间件： express.static()
5. 第三方中间件： 非express框架提供的，需要程序员手动安装才能使用的中间件；body-parser 解析post 表单数据

中间件的概念，了解即可，因为实际开发中，我们都直接使用第三方现成的中间件；

### 自定义post请求参数解析的中间件 ###

	// 导入 express 模块
	const express = require('express')
	const querystring = require('querystring')
	// 创建 express 的服务器实例
	const app = express()
	
	// 定义 应用级别的中间件 只要客户端请求服务器就会触发回调函数的执行
	app.use((req, res, next) => {
	  let dataStr = ''
	  // 只要客户端向服务器提交了表单，都会触发 req 的 data 事件
	  // 在 data 事件中，可以获取到客户端每次提交过来的，不完整的数据
	  req.on('data', chunk => {
	    dataStr += chunk
	  })
	
	  // 只要 req 触发了 end 事件，就表示表单数据，提交完毕了，dataStr 中存储的数据，就是完整的表单数据
	  req.on('end', () => {
	    console.log(dataStr)
	    const obj = querystring.parse(dataStr)
	    // 想要把 username=ls&password=123 字符串，解析为 { username: 'ls', password: 123 }
	    console.log(obj)
	    req.body = obj
	    // 进入下一个中间件的处理环节；
	    // 注意：在中间件中，最后，一定要合理的调用一下 next() 方法，否则，服务器 无法结束这次响应！
	    next()
	  })
	})
	
	// 这是应用级别的中间件
	app.get('/', (req, res) => {
	  res.sendFile('./11.index.html', { root: __dirname })
	})
	
	app.post('/postdata', (req, res) => {
	  console.log(req.body)
	  // 需求：如何从客户端提交的表单中，获取到 客户端提交过来的数据呢？
	  res.send(req.body)
	})
	
	// 调用 app.listen 方法，指定端口号并启动web服务器
	app.listen(3001, function() {
	  console.log('Express server running at http://127.0.0.1:3001')
	})

### MySQL模块 ###

在node中连接MySQL数据库的工具模块

1. 安装MySQL模块

		npm install mysql

2. 引入MySQL模块

		const mysql = require('mysql')

3. 创建连接

		const conn = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : 'root',
			database : 'my001'
		});

4. 执行sql语句

		// 查询语句 不需要补充sql
		const selectSql = 'select * from users'
		conn.query(selectSql, (err, result) => {
			if (err) return console.log(err.message)
			console.log(result)
		})
	
		// 插入语句 set ? 语法只有在node的MySQL模块中才能使用, 其他地方无法使用 还是记忆标准的sql语法
		// 标准的插入语句: insert into users values ('', 'zs', '18', '男')
		const insertSql = 'insert into users set ?'
		const user = {uname: 'zs', age: '18', gender: '男'}
		conn.query(insertSql, user, (err, result) => {
			if (err) return console.log(err.message)
			console.log(result)
		})
	
		// 修改语句
		const updateSql = 'update users set ? where id = ?'
		const user = {id: 1, uname: 'ls', age: '22', gender: '男'}
		conn.query(updateSql, [user, user.id], (err, result) => {
			if (err) return console.log(err.message)
			console.log(result)
		})
	
		// 删除语句
		const deleteSql = 'delete from users where id = ?'
		conn.query(deleteSql, '1', (err, result) => {
			if (err) return console.log(err.message)
			console.log(result)
		})
	

