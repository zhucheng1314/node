//引入express框架
const express=require('express')
//创建路由对象
const router=express.Router()

//挂在路由规则
router.get('/views',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})

//导出路由对象供外界使用
module.exports=router