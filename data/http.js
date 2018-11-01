const http=require('http')
                    const server=http.createServer()

                
                    server.on('request',(request,res)=>{
                    
                        
                        res.writeHeader(200,{
                            'Content-Type':'text/plain;charset=utf-8'
                        })
                       
                        const url=request.url

                        if(url==='/'||url==='/index.html'){
                            res.end('首页')
                        }else if(url==='/move.html'){
                            res.end('电影')
                        }else if(url==='/music.html'){
                            res.end('音乐')
                        }else if(url==='/about.html'){
                            res.end('关于')
                        }else{
                            res.end('请求不存在 404')
                        }
                    })

               
                    server.listen('3000','127.0.0.1',()=>{
                        console.log('开启服务器成功,请访问:http://127.0.0.1:3000')
                    })