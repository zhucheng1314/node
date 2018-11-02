const express=require('express')
const app=express()

app.set('view engine','ejs')//配置模板引擎
app.set('views','./ejs')//配置模板页面所在的路径


app.get('/',(req,res)=>{

    res.render('index.ejs',{name:'王超',age:80,hobby:['打游戏','聊骚','花里胡哨的']})

})

app.listen(3000,()=>{
    console.log('请访问:http://127.0.0.1:3000')
})