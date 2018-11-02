const express=require('express')
const app=express()

// app.use(express.static('./views'))//唯一的内置中间件  托管./views目录下的静态资源

app.use('pages',express.static('./views'))//虚拟目录  将.views 文件用虚拟目录 pages代替
                //放弃治疗ll


app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})