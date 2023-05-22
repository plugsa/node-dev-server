const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const open = require('open');
const chokidar = require('chokidar');
const fs = require('fs');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;


const watcher = chokidar.watch('./src', {
    ignoreInitial:true
})


io.on('connection', Socket => {
    watcher.on('all',()=> {
        Socket.emit('message','reload')
    })
})


app.get('/*',(req,res)=> {
    if (req.url == '/') {
        fs.readFile('./src/index.html','utf-8',(err,data)=> {
            const dom = new JSDOM(data)

            //creating and appending the secript-tag loading Socket.io
            const scriptSocketLink = dom.window.document.createElement('script');
            scriptSocketLink.src = 'http://cdn.socket.io/socket.io-3.0.0.min.js';
            dom.window.document.head.appendChild(scriptSocketLink)

            const scriptSocketCode = dom.window.document.createElement('script');
            scriptSocketCode.text =  `
                const socket = io() 
                socket.on('message',(data)=>{
                    if (data == 'reload'){
                        location.reload();
                    }
                })            
            `
            dom.window.document.head.appendChild(scriptSocketCode)

            //sending the manipulated and ready DOM to Me browser
            res.send(dom.serialize())
        })
    } else {
        res.sendFile(_dirname + 'src' + req.url)
    }
})


http.listen(3000);

open('http://localhost:3000/')