const express=require('express')
const app=express()

const router=require('./express路由模块.js')//导入路由对象

app.use(router) //调用use方法安装路由模块

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})
