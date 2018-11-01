const path = require('path')
const fs = require('fs')
const http = require('http')
// const template=require('alt-template')
const server = http.createServer()

server.on('request', (req, res) => {
    let url = req.url
    if (url ==='/') url = '/page/index.html'

    fs.readFile(path.join(__dirname, url), (err, data) => {
        if (err) res.end('404 not found')
        res.end(data)
        console.log(url)
    })
})
server.listen(3000, () => {
    console.log('server running  at http://127.0.0.1:3000')
})