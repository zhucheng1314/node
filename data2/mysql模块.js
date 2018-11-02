const mysql = require('mysql')

//创建连接
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql000'
})


//执行sql语句
//查询语句
// const selectSql='select * from user'
// conn.query(selectSql,(err,result)=>{
//     if(err) return console.log(err.message)
//     console.log(result)
// })

// 插入语句 set ? 语法只有在node的MySQL模块中才能使用, 其他地方无法使用 还是记忆标准的sql语法
//使用 set   条件要用{'',name:'张三', }    对象键值对方式
//插入语句
// const insertSql='insert into user values?'//?用来站位
// const user='(3,吴chan,20,女)'


// const insertSql='insert into user set ?'
// const user={id:'3',name:'吴change',age:'20',sex:'女'}
// conn.query(insertSql,user,(err,result)=>{
//     if(err) return console.log(err.message)

//     console.log(result)
// })

//更新语句
const updateSql = 'update users set ? where id = ?'
const user = {
    id: 1,
    uname: 'ls',
    age: '22',
    gender: '男'
}
conn.query(updateSql, [user, user.id], (err, result) => {
    if (err) return console.log(err.message)
    console.log(result)
})



//删除语句
const deleteSql = 'delete from users where id = ?'
conn.query(deleteSql, '1', (err, result) => {
	if (err) return console.log(err.message)
	console.log(result)
})