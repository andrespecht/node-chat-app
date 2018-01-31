var socket = io();

function scrollToBottom(){

    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    console.log(scrollTop);

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',() => {
    console.log('connected to server');

});

socket.on('disconnect',() => {
    console.log('disconnected to server');
});

socket.on('newMessage', function(message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();

    // console.log('Got new message', message);
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

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

