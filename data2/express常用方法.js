const express=require('express')
const path=require('path')
const app=express()

app.get('/',(req,res)=>{
    res.send('这是默认首页')
        //1:字符串   2:对象或者数组   3:二进制buffer
    res.sendFile(path.join(__dirname,'相对路径'))
    res.sendFile('相对路径',{root:__dirname})
        
})

app.listen(3000,()=>{
    console.log('服务器开启成功http://127.0.0.1:3000')
})