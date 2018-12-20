// initiat an request and open up a connection to server
let socket = io(); // returns a Socket api. see doc https://socket.io/docs/client-api/
// register a handler for given event 'connect'
//Fired upon a connection including a successful reconnection.
// server will listen for incomming connection request

// client side use normal function declare, avoid using arrow function
// because some browser will not support it. 
socket.on('connect', function (){
    console.log('connected to server');
    
});

socket.on('disconnect', function(){
    console.log('disconnect to server');
});

socket.on('newMessage', function(message){
    console.log('newEmail', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// example of ack
// socket.emit('createMessage', {from: 'suki', text: 'hi there'},  function(ack){
//     console.log('received it', ack);
// });

// on is the event listener e -> event
jQuery('#message-form').on('submit', function(e){
    e.preventDefault(); // prevent default full page refresh when submit a form

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
        // ack
    });
});