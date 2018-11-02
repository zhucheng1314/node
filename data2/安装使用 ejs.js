const express=require('express')
const app=express()

app.set('view engine','ejs')//配置模板引擎
app.set('views','./ejs')//配置模板页面所在路径

app.get('/',(req,res)=>{
    res.render('渲染.ejs',{name:'陈康',age:88,sex:'男',have:['狗子','皮卡丘','卡隆']})
})

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})