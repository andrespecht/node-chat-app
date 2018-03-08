const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {
    isRealString
} = require('./utils/validation');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');

const {
    Users
} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

io.on('connection', (socket) => {
    console.log("new connection");



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name are required');
        }
        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();

    });

    socket.on('createMessage', (message, callback) => {
        console.log('Got Message:', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("this is a string from the server");
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));

        }
        console.log('disconnected from client');
    });
});

app.use(express.static(publicPath));


server.listen(port, () => {
    console.log('server listening on port', port);
})