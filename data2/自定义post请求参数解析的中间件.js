const express=require('express')
const app=express()

//导入querystring模块
const querystring=require('querystring')

//定义应用级别的中间件  只要客户端请求就会触发回调函数

app.use((req,res,next)=>{
    let dataStr=''

    //每次触发req的data事件都有不完整数据提交过来   
    req.on('data',chunk=>{
        //将不完整数据拼接成完整的 
        dataStr+=chunk
    })

    req.on('end',()=>{
        console.log(dataStr)
        //使用queryString.parse将字符串数据转换为对象键值对形式
        const obj=querystring.parse(dataStr)

        console.log(obj)

        //将数据存在req的属性中  一直带下去

        req.body=obj

        //调用下一个中间件
        next()
    })
})




//应用级别的中间件
app.get('/',(req,res)=>{
    res.sendFile('./views/中间件.html',{root:__dirname})
})

app.post('/postdata',(req,res)=>{
    //提交的数据
    res.send(req.body)
})


app.listen(3001,()=>{
    console.log('Express server running at http://127.0.0.1:3001')
})