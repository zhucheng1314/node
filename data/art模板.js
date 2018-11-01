const path = require('path')
const server = require('http').createServer()
const template = require('art-template')

server.on('request', (req, res) => {
    let url=req.url
    if (url === '/') {

        let data = template(path.join(__dirname, '/page/template.html'), {
            name: '王超',
            age: 80,
            have: ['dogson', '帽子', '锤子']
        })
        res.end(data)
    }
})
server.listen(3000, () => {
    console.log('请访问http://127.0.0.1:3000')
})