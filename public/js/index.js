var socket = io();
socket.on('connect',() => {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'somebody@somewhere.com',
        text: 'Hey, are you there'
    });
});

socket.on('disconnect',() => {
    console.log('disconnected to server');
});

socket.on('newMessage', function(message) {
    console.log('Got new message', message);
});
