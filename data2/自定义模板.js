const express=require('express')
const app=express()

app.engine('html',require('express-art-template'))//自定义模板引擎

app.set('view engine','html') //配置模板
app.set('views','./ejs')//配置模板页面路径

app.get('/',(req,res)=>{
    res.render('自定义模板.html',{name:'陈康',age:88,sex:'男',have:['狗子','皮卡丘','卡隆']})
    //调用渲染方法
})

app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})

