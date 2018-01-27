var socket = io();
socket.on('connect',() => {
    console.log('connected to server');

});

socket.on('disconnect',() => {
    console.log('disconnected to server');
});

socket.on('newMessage', function(message) {
    console.log('Got new message', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    
    console.log(message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    
    var formattedTime = moment(message.createdAt).format('h:mm a');

    li.text(`${message.from} ${formattedTime}:`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');

    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('sending location ...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('send location');
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled');
        alert("unable to fetch location");
    })
})


