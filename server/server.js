const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log("new connection");

    socket.emit('newMessage',{
        from: "ed@example.com",
        text: "Hey, what's goin on",
        createdAt: 1234
    });

    socket.on('createMessage', (email) => {
        console.log('Got Message:',email);
    });

    socket.on('disconnect',() => {
        console.log('disconnected from client');
    });
});

app.use(express.static(publicPath));


server.listen(port, ()=>{
    console.log('server listening on port', port);
})