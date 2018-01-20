var socket = io();
socket.on('connect',() => {
    console.log('connected to server');

});

socket.on('disconnect',() => {
    console.log('disconnected to server');
});

socket.on('newMessage', function(message) {
    console.log('Got new message', message);
});
